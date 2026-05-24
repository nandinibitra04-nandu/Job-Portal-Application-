const Application = require('../models/Application');

const applyJob = async (req, res) => {

  try {

    const { jobId, applicantName, applicantEmail } = req.body;

    const application = await Application.create({

      jobId,
      applicantName,
      applicantEmail

    });

    res.json({

      message: 'Application Submitted Successfully',

      application

    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};

module.exports = {
  applyJob
};