const router = require('express').Router();
const Profile = require('../models/profile');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'Image/');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });
  
  router.post('/api/addProfile', upload.single('image'), async (req, res) => {
    try {
      let image = '';
      if (req.file) {
        image = req.file.filename;
      }
      const newProfile = new Profile({
        name: req.body.HolderName,
        email: req.body.HolderName,
        mobile: req.body.HolderName,
        gender: req.body.HolderName,
        dob: req.body.HolderName,
        category: req.body.HolderName,
        idProof: req.body.HolderName,
        image: image,
        institutionName: req.body.HolderName,
        institutionCategory: req.body.HolderName,
        semesterYear: req.body.HolderName,
        department: req.body.HolderName,
        bankName: req.body.HolderName,
        accountNumber: req.body.HolderName,
        ifsc: req.body.HolderName,
        
        
      });
  
      const savedProfile = await newProfile.save();
      res.status(200).json(savedProfile);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });






module.exports = router;
