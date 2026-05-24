const express = require('express');
const router = express.Router();

const {
  createJob,
  getJobs,
  deleteJob
} = require('../controllers/jobController');

router.get('/', getJobs);

router.post('/', createJob);

router.delete('/:id', deleteJob);

module.exports = router;