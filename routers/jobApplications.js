/*
* @author: Maan Mandaliya (B00903171 | mn638205@dal.ca)
* @description: This file has routes with different methods for JobApplications API. 
*/
const express = require("express");
const { JobApplications, validate } = require("../models/jobApplication")
const auth = require("../middleware/auth")
const admin = require("../middleware/admin")

const router = express.Router();

// Method to get Job Applications
router.post("/", async (req, res) => {
    try {
        const { position } = req.body;
        const jobApplications = await JobApplications.find({ status: "not-selected", position: position });
        res.status(200).json(jobApplications)
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
});

// Method to apply for Job Posting
router.post("/apply", async (req, res) => {
    try {
        const jobApplicationJSON = req.body;
        const jobApplicationModel = {
            name: jobApplicationJSON.name.value,
            contact: jobApplicationJSON.contact.value,
            email: jobApplicationJSON.email.value,
            status: "not-selected",
            position: jobApplicationJSON.position
        }
        const jobApplication = new JobApplications(jobApplicationModel);
        const { jobApplicationError } = validate(jobApplication);
        if (jobApplicationError) return res.status(500).json(jobApplicationError.details[0].message);
        const result = await jobApplication.save();
        res.status(200).json(result);
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
});

module.exports = router;