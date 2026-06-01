import Job from '../models/Job.js';
import Application from '../models/Application.js';

export const getJobs = async (req, res) => {
  try {
    const { 
      search, 
      location, 
      jobType, 
      experience, 
      department,
      minSalary,
      maxSalary,
      page = 1,
      limit = 10
    } = req.query;

    const query = { isActive: true };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { skills: { $regex: search, $options: 'i' } }
      ];
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (jobType) {
      query.jobType = jobType;
    }

    if (experience) {
      query.experience = experience;
    }

    if (department) {
      query.department = department;
    }

    if (minSalary || maxSalary) {
      query['salary.min'] = { $gte: minSalary || 0 };
      if (maxSalary) {
        query['salary.max'] = { $lte: maxSalary };
      }
    }

    const skip = (page - 1) * limit;

    const jobs = await Job.find(query)
      .sort({ featured: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Job.countDocuments(query);

    res.status(200).json({
      success: true,
      count: jobs.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: jobs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch jobs',
      error: error.message
    });
  }
};

export const getFeaturedJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ isActive: true, featured: true })
      .sort({ createdAt: -1 })
      .limit(6);

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured jobs',
      error: error.message
    });
  }
};

export const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    res.status(200).json({
      success: true,
      data: job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch job',
      error: error.message
    });
  }
};

export const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Job created successfully',
      data: job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create job',
      error: error.message
    });
  }
};

export const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Job updated successfully',
      data: job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update job',
      error: error.message
    });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete job',
      error: error.message
    });
  }
};

export const applyForJob = async (req, res) => {
  try {
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      resume,
      linkedIn,
      portfolio,
      coverLetter,
      experience,
      currentCompany,
      currentPosition
    } = req.body;

    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    const application = await Application.create({
      job: req.params.id,
      firstName,
      lastName,
      email,
      phone,
      resume,
      linkedIn,
      portfolio,
      coverLetter,
      experience,
      currentCompany,
      currentPosition
    });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully! We will contact you soon.',
      data: application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to submit application',
      error: error.message
    });
  }
};

export const getJobApplications = async (req, res) => {
  try {
    const applications = await Application.find({ job: req.params.id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applications',
      error: error.message
    });
  }
};

export const seedJobs = async (req, res) => {
  try {
    const sampleJobs = [
      {
        title: 'Senior HR Manager',
        company: 'Ardhnarishwar',
        location: 'Noida, UP',
        jobType: 'full-time',
        experience: '5-10 years',
        salary: { min: 80000, max: 120000, currency: 'INR' },
        description: 'We are looking for an experienced HR Manager to oversee all aspects of human resources practices and objectives. You will provide strategic guidance to management on employment-related issues.',
        requirements: ['HR Management experience', 'Knowledge of labor laws', 'Strong communication skills', 'Strategic thinking'],
        responsibilities: ['Develop HR policies', 'Manage recruitment process', 'Handle employee relations', 'Ensure compliance'],
        skills: ['HRIS', 'Recruitment', 'Employee Relations', 'Compliance'],
        qualifications: ['MBA in HR', '7+ years experience'],
        benefits: ['Health Insurance', 'Flexible Hours', 'Remote Work Options'],
        department: 'Human Resources',
        featured: true
      },
      {
        title: 'Talent Acquisition Specialist',
        company: 'Ardhnarishwar',
        location: 'Noida, UP',
        jobType: 'full-time',
        experience: '1-2 years',
        salary: { min: 35000, max: 50000, currency: 'INR' },
        description: 'Join our talent acquisition team to help us find and hire the best candidates for our clients. You will be responsible for sourcing, screening, and placing candidates.',
        requirements: ['Recruitment experience', 'Excellent communication', 'CRM knowledge', 'Team player'],
        responsibilities: ['Source candidates', 'Conduct interviews', 'Coordinate with clients', 'Maintain database'],
        skills: ['Sourcing', 'Interviewing', 'LinkedIn Recruiter', 'ATS'],
        qualifications: ['Bachelor\'s degree', '1-3 years experience'],
        benefits: ['Career Growth', 'Training Program', 'Performance Bonus'],
        department: 'Recruitment',
        featured: true
      },
      {
        title: 'Payroll Executive',
        company: 'Ardhnarishwar',
        location: 'Noida, UP',
        jobType: 'full-time',
        experience: '1-2 years',
        salary: { min: 25000, max: 40000, currency: 'INR' },
        description: 'We need a detail-oriented Payroll Executive to manage our payroll operations efficiently and accurately.',
        requirements: ['Payroll experience', 'Knowledge of Indian payroll', 'Tally proficiency', 'Attention to detail'],
        responsibilities: ['Process monthly payroll', 'Handle statutory compliance', 'Manage employee queries', 'Generate reports'],
        skills: ['Payroll Software', 'Excel', 'Tally', 'Statutory Compliance'],
        qualifications: ['B.Com/M.Com', '1-3 years payroll experience'],
        benefits: ['Medical Insurance', 'Paid Leave', 'Learning Opportunities'],
        department: 'Payroll',
        featured: false
      },
      {
        title: 'HR Analyst',
        company: 'Ardhnarishwar',
        location: 'Remote',
        jobType: 'remote',
        experience: 'fresher',
        salary: { min: 20000, max: 30000, currency: 'INR' },
        description: 'Entry-level position for HR Analytics. Ideal for fresh graduates interested in data-driven HR practices.',
        requirements: ['Graduate in any discipline', 'Analytical mindset', 'Excel proficiency', 'Interest in HR analytics'],
        responsibilities: ['Analyze HR data', 'Generate reports', 'Support HR team', 'Maintain dashboards'],
        skills: ['Excel', 'Power BI', 'Data Analysis', 'Reporting'],
        qualifications: ['Any graduate', 'Freshers welcome'],
        benefits: ['Work from Home', 'Training', 'Certification Support'],
        department: 'Human Resources',
        featured: true
      },
      {
        title: 'HR Coordinator',
        company: 'Ardhnarishwar',
        location: 'Noida, UP',
        jobType: 'full-time',
        experience: 'fresher',
        salary: { min: 18000, max: 25000, currency: 'INR' },
        description: 'Support our HR team with administrative tasks and employee onboarding processes.',
        requirements: ['Graduate', 'Good communication', 'Organization skills', 'Multitasking ability'],
        responsibilities: ['Manage documentation', 'Coordinate onboarding', 'Handle employee queries', 'Schedule meetings'],
        skills: ['MS Office', 'Communication', 'Organization', 'Time Management'],
        qualifications: ['Any graduate', 'Freshers encouraged'],
        benefits: ['Friendly Environment', 'Growth Path', 'Health Benefits'],
        department: 'Human Resources',
        featured: false
      },
      {
        title: 'Recruitment Consultant',
        company: 'Ardhnarishwar',
        location: 'Noida, UP',
        jobType: 'contract',
        experience: '1-2 years',
        salary: { min: 30000, max: 45000, currency: 'INR' },
        description: 'Work as a recruitment consultant, handling client requirements and candidate placements across various industries.',
        requirements: ['Sales mindset', 'Recruitment background', 'Client handling', 'Target oriented'],
        responsibilities: ['Handle client requirements', 'Source candidates', 'Coordinate interviews', 'Achieve targets'],
        skills: ['Client Relations', 'Sourcing', 'Negotiation', 'Target Management'],
        qualifications: ['Any graduate', '1-2 years in recruitment'],
        benefits: ['Incentives', 'Flexible Hours', 'Training'],
        department: 'Recruitment',
        featured: true
      }
    ];

    await Job.deleteMany({});
    await Job.insertMany(sampleJobs);

    res.status(201).json({
      success: true,
      message: 'Sample jobs seeded successfully',
      count: sampleJobs.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to seed jobs',
      error: error.message
    });
  }
};
