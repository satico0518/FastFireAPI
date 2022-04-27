const { request } = require('express');
const { response } = require('express');
const User = require('../models/user');

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const fileUploads = async (req = request, res = response) => {
  try {
    let model;
    const { to: folder } = req.params;
    const { uid } = req.params;

    // if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    //   res.status(400).send({ error: 'No files were uploaded.' });
    //   return;
    // }

    // const { secure_url } = await cloudinary.uploader.upload(
    //   req.files.file.tempFilePath,
    //   { folder }
    // );

    // if (folder === 'avatar') {
    //   model = await User.findById(uid);

    //   if (model.img) {
    //     const splittedImg = model.img.split('/');
    //     const [imgCloudId] = splittedImg[splittedImg.length - 1].split('.');
    //     cloudinary.uploader.destroy(
    //       `${folder}/${imgCloudId}`,
    //       { invalidate: true, resource_type: 'image' },
    //       (err, _) => {
    //         if(err) console.error('error destruyendo img: ', err);
    //       }
    //     );
    //   }
    // }
    // model.img = secure_url;
    // await model.save();
    // res.json({ model });
    res.json({ folder, uid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: `Error actualizando imagen de ${folder}` });
  }
};

module.exports = { fileUploads };
