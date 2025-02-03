const express = require('express');
const router = express.Router();
const Applicant = require('../models/applicant');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post('/form', upload.single('uploadCV'), async (req, res) => {
    try {
        const { name, email, contactnumber, noticeperiod, joblocation, currentorganization, currentCTC, expectedCTC, experienceYearsandMonths } = req.body;
        const fileName =  req.file ? req.file.originalname: "No file uploaded";
        const newApplicant = new Applicant({ 
            name, 
            email, 
            contactnumber, 
            noticeperiod, 
            joblocation, 
            currentorganization, 
            currentCTC, 
            expectedCTC, 
            experienceYearsandMonths, 
            uploadCV: {
                data: req.file.buffer,  
                contentType: req.file.mimetype,
                filename: fileName
            } 
        });
        const response = await newApplicant.save();

        res.json({ response, message: 'Form submitted successfully' });
    } catch (error) {
        console.error('Form submission error:', error);
        res.status(500).json({ error: `Form submission failed: ${error.message}` });
    }
});


router.get('/form/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const showApplicant = await Applicant.findById(id);
        res.status(200).json(showApplicant);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/form', async (req, res) => {
    try {
        const allApplicants = await Applicant.find();
        res.status(200).json(allApplicants);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/form/:id/download', async (req, res) => {
    try {
        const applicant = await Applicant.findById(req.params.id);
        if (!applicant || !applicant.uploadCV || !applicant.uploadCV.data) {
            return res.status(404).json({ error: 'File not found' });
        }

        res.setHeader("Content-Type", applicant.uploadCV.contentType);
        res.setHeader("Content-Disposition", `attachment ; filename = "${applicant.uploadCV.filename}"`);

        res.send(applicant.uploadCV.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
