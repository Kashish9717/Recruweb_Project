import { useState } from 'react';
import ScrollIndicator from '../components/ScrollIndicator';

const PostJob = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    companyLogo: '',
    companyWebsite: '',
    contactName: '',
    email: '',
    phone: '',
    jobTitle: '',
    location: '',
    jobType: 'full-time',
    experience: '',
    salaryMin: '',
    salaryMax: '',
    department: '',
    description: '',
    requirements: '',
    responsibilities: '',
    skills: '',
    benefits: '',
    openings: 1
  });

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [successMessage, setSuccessMessage] =
    useState('');

  const [errorMessage, setErrorMessage] =
    useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const resetForm = () => {
    setFormData({
      companyName: '',
      companyLogo: '',
      companyWebsite: '',
      contactName: '',
      email: '',
      phone: '',
      jobTitle: '',
      location: '',
      jobType: 'full-time',
      experience: '',
      salaryMin: '',
      salaryMax: '',
      department: '',
      description: '',
      requirements: '',
      responsibilities: '',
      skills: '',
      benefits: '',
      openings: 1
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const jobData = {
        company: formData.companyName,
        companyLogo:
          formData.companyLogo ||
          'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',

        companyWebsite:
          formData.companyWebsite,

        contactName: formData.contactName,

        email: formData.email,

        phone: formData.phone,

        title: formData.jobTitle,

        location: formData.location,

        jobType: formData.jobType,

        experience: formData.experience,

        department: formData.department,

        openings: Number(
          formData.openings
        ),

        description:
          formData.description,

        salary: {
          min:
            parseInt(
              formData.salaryMin
            ) || 0,

          max:
            parseInt(
              formData.salaryMax
            ) || 0,

          currency: 'INR'
        },

        requirements:
          formData.requirements
            .split('\n')
            .filter((item) =>
              item.trim()
            ),

        responsibilities:
          formData.responsibilities
            .split('\n')
            .filter((item) =>
              item.trim()
            ),

        skills: formData.skills
          .split(',')
          .map((item) =>
            item.trim()
          )
          .filter(Boolean),

        benefits:
          formData.benefits
            .split('\n')
            .filter((item) =>
              item.trim()
            ),

        featured: false
      };

      const response = await fetch(
        `${
          import.meta.env
            .VITE_API_URL ||
          'http://localhost:5001/api'
        }/jobs`,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json'
          },

          body: JSON.stringify(
            jobData
          )
        }
      );

      const data =
        await response.json();

      if (data.success) {
        setSuccessMessage(
          'Job posted successfully!'
        );

        resetForm();
      } else {
        setErrorMessage(
          data.message ||
            'Failed to post job'
        );
      }
    } catch (error) {
      const localJobs =
        JSON.parse(
          localStorage.getItem(
            'recruweb_jobs'
          ) || '[]'
        );

      localJobs.push({
        ...formData,
        _id: Date.now().toString()
      });

      localStorage.setItem(
        'recruweb_jobs',
        JSON.stringify(localJobs)
      );

      setSuccessMessage(
        'Job posted successfully! (Demo Mode)'
      );

      resetForm();
    }

    setIsSubmitting(false);
  };

  return (
    <>
      {/* HERO */}
      <section
        className="hero"
        style={{
          minHeight: '55vh',
          paddingTop: '140px'
        }}
      >
        <div className="hero-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>

        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              Employer Portal
            </span>

            <h1
              className="section-title"
              style={{
                fontSize: '54px'
              }}
            >
              Post a Job
            </h1>

            <p className="section-subtitle">
              Hire top talent faster with
              Recruweb's advanced job
              platform.
            </p>
          </div>
        </div>

        <ScrollIndicator />
      </section>

      {/* FORM SECTION */}
      <section
        className="section"
        style={{
          paddingTop: '20px'
        }}
      >
        <div className="container">
          <div className="post-job-layout">
            {/* LEFT */}
            <div className="post-job-card">
              <div className="card-header">
                <h2>Job Information</h2>

                <p>
                  Fill all required fields
                  carefully.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
              >
                {/* COMPANY */}
                <div className="form-section">
                  <h3>
                    Company Details
                  </h3>

                  <div className="form-row">
                    <div className="form-group">
                      <label>
                        Company Name *
                      </label>

                      <input
                        type="text"
                        name="companyName"
                        value={
                          formData.companyName
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="Recruweb Pvt Ltd"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        Company Website
                      </label>

                      <input
                        type="url"
                        name="companyWebsite"
                        value={
                          formData.companyWebsite
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>
                      Company Logo URL
                    </label>

                    <input
                      type="url"
                      name="companyLogo"
                      value={
                        formData.companyLogo
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Paste logo image URL"
                    />
                  </div>
                </div>

                {/* CONTACT */}
                <div className="form-section">
                  <h3>
                    Contact Information
                  </h3>

                  <div className="form-row">
                    <div className="form-group">
                      <label>
                        Contact Person *
                      </label>

                      <input
                        type="text"
                        name="contactName"
                        value={
                          formData.contactName
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="Your Name"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        Email Address *
                      </label>

                      <input
                        type="email"
                        name="email"
                        value={
                          formData.email
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="hr@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={
                        formData.phone
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>

                {/* JOB */}
                <div className="form-section">
                  <h3>
                    Job Details
                  </h3>

                  <div className="form-group">
                    <label>
                      Job Title *
                    </label>

                    <input
                      type="text"
                      name="jobTitle"
                      value={
                        formData.jobTitle
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Frontend Developer"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>
                        Location *
                      </label>

                      <input
                        type="text"
                        name="location"
                        value={
                          formData.location
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="Noida, Uttar Pradesh"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        Job Type *
                      </label>

                      <select
                        name="jobType"
                        value={
                          formData.jobType
                        }
                        onChange={
                          handleChange
                        }
                      >
                        <option value="full-time">
                          Full Time
                        </option>

                        <option value="part-time">
                          Part Time
                        </option>

                        <option value="internship">
                          Internship
                        </option>

                        <option value="contract">
                          Contract
                        </option>

                        <option value="remote">
                          Remote
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>
                        Experience
                      </label>

                      <select
                        name="experience"
                        value={
                          formData.experience
                        }
                        onChange={
                          handleChange
                        }
                      >
                        <option value="">
                          Select
                        </option>

                        <option value="fresher">
                          Fresher
                        </option>

                        <option value="1-2 years">
                          1-2 Years
                        </option>

                        <option value="3-5 years">
                          3-5 Years
                        </option>

                        <option value="5-10 years">
                          5-10 Years
                        </option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>
                        Department
                      </label>

                      <input
                        type="text"
                        name="department"
                        value={
                          formData.department
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="Engineering"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>
                        Minimum Salary
                      </label>

                      <input
                        type="number"
                        name="salaryMin"
                        value={
                          formData.salaryMin
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="30000"
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        Maximum Salary
                      </label>

                      <input
                        type="number"
                        name="salaryMax"
                        value={
                          formData.salaryMax
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="80000"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>
                      Openings
                    </label>

                    <input
                      type="number"
                      name="openings"
                      value={
                        formData.openings
                      }
                      onChange={
                        handleChange
                      }
                      min="1"
                    />
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div className="form-section">
                  <h3>
                    Description & Skills
                  </h3>

                  <div className="form-group">
                    <label>
                      Job Description *
                    </label>

                    <textarea
                      rows="5"
                      name="description"
                      value={
                        formData.description
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Describe the job role..."
                      required
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label>
                      Requirements
                    </label>

                    <textarea
                      rows="4"
                      name="requirements"
                      value={
                        formData.requirements
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="One requirement per line"
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label>
                      Responsibilities
                    </label>

                    <textarea
                      rows="4"
                      name="responsibilities"
                      value={
                        formData.responsibilities
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="One responsibility per line"
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label>
                      Skills
                    </label>

                    <input
                      type="text"
                      name="skills"
                      value={
                        formData.skills
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="React, JavaScript, Node.js"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Benefits
                    </label>

                    <textarea
                      rows="3"
                      name="benefits"
                      value={
                        formData.benefits
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="One benefit per line"
                    ></textarea>
                  </div>
                </div>

                {/* ALERTS */}
                {successMessage && (
                  <div className="form-success">
                    {successMessage}
                  </div>
                )}

                {errorMessage && (
                  <div className="form-error">
                    {errorMessage}
                  </div>
                )}

                {/* BUTTON */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={
                    isSubmitting
                  }
                >
                  {isSubmitting
                    ? 'Posting Job...'
                    : 'Post Job'}
                </button>
              </form>
            </div>

            {/* SIDEBAR */}
            <div className="post-sidebar">
              <div className="sidebar-card">
                <h3>
                  Why Choose Recruweb?
                </h3>

                <ul className="feature-list">
                  <li>
                    ✔ Reach thousands of
                    candidates
                  </li>

                  <li>
                    ✔ Advanced filtering &
                    hiring tools
                  </li>

                  <li>
                    ✔ Featured listings
                  </li>

                  <li>
                    ✔ Premium support
                  </li>

                  <li>
                    ✔ Candidate management
                  </li>
                </ul>
              </div>

              <div className="sidebar-card">
                <h3>Contact Support</h3>

                <p>
                  Need help posting your
                  job?
                </p>

                <div className="support-box">
                  <p>
                    📧 info@recruweb.com
                  </p>

                  <p>
                    📞 +91 9336532636
                  </p>

                  <p>
                    📍 Noida Sector 63
                  </p>
                </div>
              </div>

              <div className="sidebar-card premium-card">
                <h3>Premium Plan</h3>

                <h2>₹2,999/month</h2>

                <p>
                  Unlimited job posts +
                  featured listings.
                </p>

                <button className="btn btn-secondary">
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostJob;