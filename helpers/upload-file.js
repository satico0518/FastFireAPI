const path = require('path');
const { v4: uuidv4 } =  require('uuid');

const fileUpload = (file, folderName = '' ) => {
  return new Promise((resolve, reject) => {
    splittedName = file.name.split('.');
    const fileExtension = splittedName[splittedName.length - 1];
    const allowedExtensions = ['png', 'jpg', 'jpeg', 'gif'];
    if (!allowedExtensions.includes(fileExtension)) {
      return reject({ error: `La extension [${fileExtension}] no es permitida` });
    }

    const tempName = uuidv4() + '.' + fileExtension;
    const uploadPath = path.join(__dirname, '../uploads', folderName, tempName);

    file.mv(uploadPath, (error) => {
      if (error) {
        console.error(error);
        return reject({ error });
      }

      resolve(tempName);
    });
  });
};

module.exports = {
  fileUpload,
};
