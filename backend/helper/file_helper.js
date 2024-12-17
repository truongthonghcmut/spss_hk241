const fs = require("fs");
const { google } = require("googleapis");
const path = require("path");

const client_email = process.env.CLIENT_EMAIL;
const private_key = process.env.PRIVATE_KEY;
const SCOPE = ["https://www.googleapis.com/auth/drive"];
const PARENTS = [process.env.PARENTS];

const authorize = async () => {
  const jwtClient = new google.auth.JWT(
    client_email,
    null,
    private_key,
    SCOPE
  );
  await jwtClient.authorize();
  return jwtClient;
};

const uploadFile = async (authClient, filePath) => {
  return new Promise((resolve, reject) => {
    const drive = google.drive({ version: "v3", auth: authClient });
    const fileMetaData = {
      name: path.basename(filePath), // Lấy tên file từ đường dẫn
      parents: PARENTS, // Thay bằng folder ID thực tế
    };
    
    const mimeType = "application/pdf"; // Giả định là PDF, có thể điều chỉnh nếu có nhiều loại

    drive.files.create(
      {
        resource: fileMetaData,
        media: {
          body: fs.createReadStream(filePath), // Tệp sẽ được tải lên
          mimeType: mimeType, // MIME type
        },
        fields: "id",
      },
      function (error, file) {
        if (error) {
          return reject(error);
        }
        // Thay đổi quyền truy cập của tệp

        setFilePermission(drive, file.data.id)
          .then(() => resolve(file))
          .catch(reject);
      }
    );
  });
};

const setFilePermission = async (drive, fileId) => {
  return new Promise((resolve, reject) => {
    drive.permissions.create(
      {
        fileId: fileId,
        resource: {
          type: "anyone",
          role: "reader", // Quyền đọc cho bất kỳ ai
        },
      },
      function (error, permission) {
        if (error) {
          return reject(error);
        }
        resolve(permission);
      }
    );
  });
};

module.exports = {
  authorize,
  uploadFile
};
