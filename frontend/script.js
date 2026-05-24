const jobList = document.getElementById('job-list');

async function fetchJobs() {

  try {

    const res = await fetch('/api/jobs');

    const jobs = await res.json();

    jobList.innerHTML = jobs.map(job => `

      <div class="job-card">

        <h3>${job.title}</h3>

        <p><strong>Company:</strong> ${job.company}</p>

        <p><strong>Location:</strong> ${job.location}</p>

        <p><strong>Salary:</strong> ${job.salary}</p>

        <p>${job.description}</p>

        <button onclick="applyJob('${job._id}')">
          Apply Now
        </button>

      </div>

    `).join('');

  } catch (error) {

    console.log(error);

  }

}

async function applyJob(jobId) {

  const applicantName = prompt(
    'Enter Your Name'
  );

  const applicantEmail = prompt(
    'Enter Your Email'
  );

  if(!applicantName || !applicantEmail){

    alert('All fields required');

    return;
  }

  try {

    const response = await fetch(
      '/api/application/apply',
      {

        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({

          jobId,
          applicantName,
          applicantEmail

        })

      }
    );

    const data = await response.json();

    alert(data.message);

  } catch (error) {

    console.log(error);

  }

}

fetchJobs();