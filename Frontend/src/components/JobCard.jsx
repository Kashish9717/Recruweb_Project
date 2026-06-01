import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  const formatSalary = (salary) => {
    return `₹${salary.min.toLocaleString()} - ₹${salary.max.toLocaleString()}`;
  };

  return (
    <div className="job-card">
      <div className="job-card-top">
        <div className="job-company">
          <img
            src={
              job.companyLogo ||
              'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
            }
            alt={job.company}
          />

          <div>
            <h3>{job.title}</h3>

            <p>{job.company}</p>
          </div>
        </div>

        <span className="job-type">
          {job.jobType}
        </span>
      </div>

      <div className="job-meta">
        <span>📍 {job.location}</span>

        <span>
          💼 {job.experience}
        </span>

        <span>
          💰 {formatSalary(job.salary)}
        </span>
      </div>

      <p className="job-description">
        {job.description}
      </p>

      <div className="skills-wrap">
        {job.skills
          ?.slice(0, 4)
          .map((skill, index) => (
            <span
              key={index}
              className="skill-pill"
            >
              {skill}
            </span>
          ))}
      </div>

      <div className="job-actions">
        <Link
          to={`/jobs/${job._id}`}
          className="btn btn-primary"
        >
          View Details
        </Link>

        <Link
          to={`/jobs/${job._id}#apply`}
          className="btn btn-secondary"
        >
          Apply
        </Link>
      </div>
    </div>
  );
};

export default JobCard;