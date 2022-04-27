const { request } = require('express');
const { response } = require('express');
const fs = require('fs');
const path = require('path');
const User = require('../models/user');

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const fileUploads = async (req = request, res = response) => {
  try {
    let model;
    const { to: folder } = req.params;
    const { uid, base64, type } = req.body;

    if (!base64 || !uid || !type) {
      res.status(400).send({ error: 'Base64, UID and Type are required.' });
      return;
    }

    const tempFolder = `../uploads/${folder}`;
    const tempImgPath = `${tempFolder}/${uid}.${type.split('/')[1]}`;
    if (!fs.existsSync(path.join(__dirname, tempFolder))) {
      console.log('no existe');
      await fs.promises.mkdir(
        path.join(__dirname, tempFolder), 
        { recursive: true }, 
        (err) => {
        if (err) throw err;
      });
    }

    fs.writeFileSync(
      path.join(__dirname, tempImgPath),
      base64,
      'base64',
      (error) => {if (error) throw new Error(error);},
    );

    const { secure_url } = await cloudinary.uploader.upload(
      path.join(__dirname, tempImgPath),
      { folder }
    );

    if (folder === 'avatar') {
      model = await User.findById(uid);

      if (model.img) {
        const splittedImg = model.img.split('/');
        const [imgCloudId] = splittedImg[splittedImg.length - 1].split('.');
        cloudinary.uploader.destroy(
          `${folder}/${imgCloudId}`,
          { invalidate: true, resource_type: 'image' },
          (err, _) => {
            if(err) console.error('error destruyendo img: ', err);
          }
        );
      }
    }
    model.img = secure_url;
    await model.save();
    fs.readdir(path.join(__dirname, tempFolder), (err, files) => {
      if (err) throw err;
    
      for (const file of files) {
        fs.unlink(path.join(path.join(__dirname, tempFolder), file), err => {
          if (err) throw err;
        });
      }
    });
    res.json({ model });
  } catch (err) {
    console.error('Error actualizando imagen: ', err);
    res.status(500).json({ err: `Error actualizando imagen`, err });
  }
};

module.exports = { fileUploads };
