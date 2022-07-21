/*
* @author: Maan Mandaliya (B00903171 | mn638205@dal.ca)
* @description: This file has routes with different methods for JobPostings API. 
*/
const express = require("express");
const { JobPostings, validate } = require("../models/jobPosting")
const auth = require("../middleware/auth")
const admin = require("../middleware/admin")

const router = express.Router();

// Method to get Job Postings
router.get("/", async (req, res) => {
    try {
        const jobPostings = await JobPostings.find({ status: "enable" });
        res.status(200).json(jobPostings)
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
});

// Method to create Job Posting
router.post("/create", async (req, res) => {
    try {
        const jobPostingJSON = req.body;
        jobPostingModel = {
            position: jobPostingJSON.position.value,
            location: jobPostingJSON.location.value,
            pay: jobPostingJSON.pay.value,
            jobType: jobPostingJSON.jobType.value,
            expiryDate: new Date(jobPostingJSON.expiryDate.value)
        }
        const jobPosting = new JobPostings(jobPostingModel);
        const { jobPostingError } = validate(jobPosting);
        if (jobPostingError) return res.status(500).json(jobPostingError.details[0].message);
        const result = await jobPosting.save();
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