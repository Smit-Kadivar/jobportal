const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const applicantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contactnumber: {
        type: Number,
        required: true
    },
    noticeperiod: {
        type: String,
        required: true
    },
    joblocation: {
        type: String,
        required: true
    },
    currentorganization: {
        type: String,
        required: true
    },
    currentCTC: {
        type: String,
        required: true
    },
    expectedCTC: {
        type: String,
        required: true
    },
    experienceYearsandMonths: {
        type: String,
        required: true
    
    },
    uploadCV: {
        data: Buffer, 
        contentType: String,
        filename: String
    }
});

const applicant = mongoose.model('Applicant', applicantSchema);
module.exports = applicant;