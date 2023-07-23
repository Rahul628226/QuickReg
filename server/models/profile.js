const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    gender: String,
    dob: String,
    category: String,
    idProof: String,
    image: String,
    institutionName: String,
    institutionCategory: String,
    semesterYear: String,
    department: String,
    bankName: String,
    accountNumber: String,
    ifsc: String,
  
},
{
  timestamps: true,
});

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;