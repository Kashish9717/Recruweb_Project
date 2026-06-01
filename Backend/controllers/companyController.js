import Company from '../models/Company.js';

export const getCompanies = async (req, res) => {
  try {
    const { search, industry, size, location, page = 1, limit = 12 } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { industry: { $regex: search, $options: 'i' } }
      ];
    }

    if (industry) {
      query.industry = { $regex: industry, $options: 'i' };
    }

    if (size) {
      query.size = size;
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    const skip = (page - 1) * limit;

    const companies = await Company.find(query)
      .sort({ featured: -1, activeJobs: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Company.countDocuments(query);

    res.status(200).json({
      success: true,
      count: companies.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: companies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch companies',
      error: error.message
    });
  }
};

export const getFeaturedCompanies = async (req, res) => {
  try {
    const companies = await Company.find({ featured: true })
      .sort({ activeJobs: -1 })
      .limit(8);

    res.status(200).json({
      success: true,
      count: companies.length,
      data: companies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured companies',
      error: error.message
    });
  }
};

export const getCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    res.status(200).json({
      success: true,
      data: company
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch company',
      error: error.message
    });
  }
};

export const createCompany = async (req, res) => {
  try {
    const company = await Company.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Company created successfully',
      data: company
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create company',
      error: error.message
    });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Company updated successfully',
      data: company
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update company',
      error: error.message
    });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Company deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete company',
      error: error.message
    });
  }
};

export const getIndustries = async (req, res) => {
  try {
    const industries = await Company.distinct('industry');

    res.status(200).json({
      success: true,
      data: industries.sort()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch industries',
      error: error.message
    });
  }
};

export const seedCompanies = async (req, res) => {
  try {
    const sampleCompanies = [
      {
        name: 'TechVision Solutions',
        logo: 'https://via.placeholder.com/100x100/5FA8D3/ffffff?text=TV',
        industry: 'Information Technology',
        description: 'Leading provider of enterprise software solutions and digital transformation services. We help businesses modernize their operations with cutting-edge technology.',
        website: 'https://techvision.example.com',
        size: '501-1000',
        location: 'Bengaluru, Karnataka',
        founded: 2010,
        specialties: ['Cloud Computing', 'AI/ML', 'Enterprise Software', 'DevOps'],
        hiringFor: ['Software Engineers', 'Data Scientists', 'Project Managers'],
        activeJobs: 45,
        featured: true,
        isVerified: true
      },
      {
        name: 'HealthFirst Medical',
        logo: 'https://via.placeholder.com/100x100/10b981/ffffff?text=HF',
        industry: 'Healthcare',
        description: 'Comprehensive healthcare provider offering medical services, health insurance, and wellness programs across India.',
        website: 'https://healthfirst.example.com',
        size: '1000+',
        location: 'Mumbai, Maharashtra',
        founded: 2005,
        specialties: ['Healthcare Services', 'Medical Insurance', 'Telemedicine', 'Pharmacy'],
        hiringFor: ['Doctors', 'Nurses', 'Healthcare Administrators'],
        activeJobs: 32,
        featured: true,
        isVerified: true
      },
      {
        name: 'FinanceHub India',
        logo: 'https://via.placeholder.com/100x100/f59e0b/ffffff?text=FH',
        industry: 'Financial Services',
        description: 'Premier financial services company specializing in investment banking, wealth management, and fintech solutions.',
        website: 'https://financehub.example.com',
        size: '201-500',
        location: 'Mumbai, Maharashtra',
        founded: 2012,
        specialties: ['Investment Banking', 'Wealth Management', 'Fintech', 'Insurance'],
        hiringFor: ['Financial Analysts', 'Investment Bankers', 'Software Developers'],
        activeJobs: 28,
        featured: true,
        isVerified: true
      },
      {
        name: 'GreenEnergy Corp',
        logo: 'https://via.placeholder.com/100x100/22c55e/ffffff?text=GE',
        industry: 'Renewable Energy',
        description: 'Pioneering sustainable energy solutions including solar, wind, and hydroelectric power generation projects.',
        website: 'https://greenenergy.example.com',
        size: '51-200',
        location: 'Gurugram, Haryana',
        founded: 2018,
        specialties: ['Solar Energy', 'Wind Power', 'Energy Storage', 'Carbon Credits'],
        hiringFor: ['Engineers', 'Project Managers', 'Environmental Specialists'],
        activeJobs: 15,
        featured: false,
        isVerified: true
      },
      {
        name: 'RetailMax',
        logo: 'https://via.placeholder.com/100x100/ec4899/ffffff?text=RM',
        industry: 'Retail & E-commerce',
        description: 'Omnichannel retail company offering fashion, electronics, and home goods through physical stores and online platforms.',
        website: 'https://retailmax.example.com',
        size: '1000+',
        location: 'Delhi NCR',
        founded: 2008,
        specialties: ['E-commerce', 'Retail', 'Supply Chain', 'Customer Experience'],
        hiringFor: ['Sales Associates', 'Marketing', 'Logistics', 'IT'],
        activeJobs: 56,
        featured: true,
        isVerified: true
      },
      {
        name: 'EduLearn Platform',
        logo: 'https://via.placeholder.com/100x100/8b5cf6/ffffff?text=EL',
        industry: 'Education & EdTech',
        description: 'Innovative online learning platform offering courses, certifications, and degree programs in partnership with top universities.',
        website: 'https://edulearn.example.com',
        size: '201-500',
        location: 'Bengaluru, Karnataka',
        founded: 2015,
        specialties: ['Online Learning', 'Higher Education', 'Corporate Training', 'Skill Development'],
        hiringFor: ['Instructors', 'Content Developers', 'Marketing', 'Technology'],
        activeJobs: 22,
        featured: false,
        isVerified: true
      },
      {
        name: 'AutoDrive Motors',
        logo: 'https://via.placeholder.com/100x100/3b82f6/ffffff?text=AD',
        industry: 'Automotive',
        description: 'Electric and autonomous vehicle manufacturer committed to sustainable transportation solutions.',
        website: 'https://autodrive.example.com',
        size: '501-1000',
        location: 'Pune, Maharashtra',
        founded: 2016,
        specialties: ['Electric Vehicles', 'Autonomous Driving', 'Battery Technology', 'Smart Mobility'],
        hiringFor: ['Engineers', 'Designers', 'Quality Assurance', 'Manufacturing'],
        activeJobs: 38,
        featured: true,
        isVerified: true
      },
      {
        name: 'LogiPrime Logistics',
        logo: 'https://via.placeholder.com/100x100/f97316/ffffff?text=LP',
        industry: 'Logistics & Supply Chain',
        description: 'End-to-end logistics and supply chain management company offering warehousing, transportation, and inventory solutions.',
        website: 'https://logiprime.example.com',
        size: '501-1000',
        location: 'Hyderabad, Telangana',
        founded: 2011,
        specialties: ['Warehousing', 'Transportation', 'Last Mile Delivery', 'Inventory Management'],
        hiringFor: ['Operations', 'Drivers', 'Warehouse Staff', 'Technology'],
        activeJobs: 41,
        featured: false,
        isVerified: true
      },
      {
        name: 'MediaMax Entertainment',
        logo: 'https://via.placeholder.com/100x100/ef4444/ffffff?text=MM',
        industry: 'Media & Entertainment',
        description: 'Content creation and broadcasting company producing films, television shows, and digital content.',
        website: 'https://mediamax.example.com',
        size: '201-500',
        location: 'Mumbai, Maharashtra',
        founded: 2009,
        specialties: ['Film Production', 'Television', 'Digital Content', 'Music'],
        hiringFor: ['Creative Roles', 'Production', 'Marketing', 'Technology'],
        activeJobs: 18,
        featured: false,
        isVerified: true
      },
      {
        name: 'ConstructionPro',
        logo: 'https://via.placeholder.com/100x100/78716c/ffffff?text=CP',
        industry: 'Construction & Real Estate',
        description: 'Premier construction and real estate development company specializing in residential, commercial, and infrastructure projects.',
        website: 'https://constructionpro.example.com',
        size: '501-1000',
        location: 'Noida, Uttar Pradesh',
        founded: 2007,
        specialties: ['Commercial Construction', 'Residential Projects', 'Infrastructure', 'Interior Design'],
        hiringFor: ['Engineers', 'Project Managers', 'Architects', 'Sales'],
        activeJobs: 25,
        featured: true,
        isVerified: true
      },
      {
        name: 'FoodieHub',
        logo: 'https://via.placeholder.com/100x100/14b8a6/ffffff?text=FH',
        industry: 'Food & Beverage',
        description: 'Fast-growing food delivery and restaurant aggregation platform connecting diners with the best local cuisines.',
        website: 'https://foodiehub.example.com',
        size: '501-1000',
        location: 'Gurugram, Haryana',
        founded: 2017,
        specialties: ['Food Delivery', 'Restaurant Partner', 'Cloud Kitchen', 'Grocery'],
        hiringFor: ['Delivery Partners', 'Marketing', 'Technology', 'Operations'],
        activeJobs: 35,
        featured: false,
        isVerified: true
      },
      {
        name: 'CyberShield Security',
        logo: 'https://via.placeholder.com/100x100/64748b/ffffff?text=CS',
        industry: 'Cybersecurity',
        description: 'Advanced cybersecurity solutions provider offering threat detection, penetration testing, and security consulting services.',
        website: 'https://cybershield.example.com',
        size: '51-200',
        location: 'Pune, Maharashtra',
        founded: 2019,
        specialties: ['Threat Detection', 'Penetration Testing', 'Security Audit', 'Incident Response'],
        hiringFor: ['Security Analysts', 'Ethical Hackers', 'Consultants'],
        activeJobs: 12,
        featured: false,
        isVerified: true
      },
      {
        name: 'CloudNine Technologies',
        logo: 'https://via.placeholder.com/100x100/0ea5e9/ffffff?text=CN',
        industry: 'Information Technology',
        description: 'Cloud infrastructure and DevOps services company helping enterprises migrate and manage cloud workloads efficiently.',
        website: 'https://cloudnine.example.com',
        size: '201-500',
        location: 'Hyderabad, Telangana',
        founded: 2014,
        specialties: ['Cloud Migration', 'DevOps', 'AWS', 'Azure', 'Kubernetes'],
        hiringFor: ['Cloud Engineers', 'DevOps Engineers', 'Solutions Architects'],
        activeJobs: 28,
        featured: true,
        isVerified: true
      },
      {
        name: 'PharmaCare Labs',
        logo: 'https://via.placeholder.com/100x100/22c55e/ffffff?text=PC',
        industry: 'Pharmaceuticals',
        description: 'Research-driven pharmaceutical company developing innovative medicines and healthcare solutions for a healthier tomorrow.',
        website: 'https://pharmacare.example.com',
        size: '1000+',
        location: 'Ahmedabad, Gujarat',
        founded: 2003,
        specialties: ['Drug Research', 'Clinical Trials', 'Manufacturing', 'Quality Assurance'],
        hiringFor: ['Researchers', 'Pharmacists', 'Quality Control', 'Sales'],
        activeJobs: 55,
        featured: true,
        isVerified: true
      },
      {
        name: 'BankSecure Finance',
        logo: 'https://via.placeholder.com/100x100/1e40af/ffffff?text=BS',
        industry: 'Banking & Financial Services',
        description: 'Digital banking and fintech company providing secure online banking, loans, and investment solutions.',
        website: 'https://banksecure.example.com',
        size: '501-1000',
        location: 'Mumbai, Maharashtra',
        founded: 2015,
        specialties: ['Digital Banking', 'Lending', 'Payments', 'Wealth Management'],
        hiringFor: ['Software Developers', 'Bankers', 'Compliance Officers', 'Analysts'],
        activeJobs: 42,
        featured: false,
        isVerified: true
      },
      {
        name: 'EduSpark Academy',
        logo: 'https://via.placeholder.com/100x100/a855f7/ffffff?text=ES',
        industry: 'Education & EdTech',
        description: 'Interactive learning platform offering coding bootcamps, professional courses, and career counseling services.',
        website: 'https://eduspark.example.com',
        size: '51-200',
        location: 'Bengaluru, Karnataka',
        founded: 2020,
        specialties: ['Coding Bootcamps', 'Professional Courses', 'Career Counseling', 'Skill Development'],
        hiringFor: ['Instructors', 'Content Creators', 'Marketing', 'Tech Team'],
        activeJobs: 15,
        featured: false,
        isVerified: true
      },
      {
        name: 'GreenLeaf Agriculture',
        logo: 'https://via.placeholder.com/100x100/16a34a/ffffff?text=GL',
        industry: 'Agriculture & AgTech',
        description: 'Sustainable agriculture company using technology to improve farming practices and connect farmers with markets.',
        website: 'https://greenleaf.example.com',
        size: '201-500',
        location: 'Pune, Maharashtra',
        founded: 2016,
        specialties: ['Smart Farming', 'Organic Products', 'Supply Chain', 'Agricultural Technology'],
        hiringFor: ['Agronomists', 'Engineers', 'Operations', 'Sales'],
        activeJobs: 20,
        featured: false,
        isVerified: true
      },
      {
        name: 'TravelEase Holidays',
        logo: 'https://via.placeholder.com/100x100/f43f5e/ffffff?text=TE',
        industry: 'Travel & Tourism',
        description: 'Full-service travel agency offering personalized vacation packages, corporate travel, and destination management.',
        website: 'https://travelease.example.com',
        size: '201-500',
        location: 'Jaipur, Rajasthan',
        founded: 2012,
        specialties: ['Vacation Packages', 'Corporate Travel', 'Visa Services', 'Hotel Bookings'],
        hiringFor: ['Travel Consultants', 'Tour Guides', 'Marketing', 'Operations'],
        activeJobs: 18,
        featured: false,
        isVerified: true
      },
      {
        name: 'FitLife Sports',
        logo: 'https://via.placeholder.com/100x100/f97316/ffffff?text=FL',
        industry: 'Sports & Fitness',
        description: 'Premium fitness chain offering gym memberships, personal training, and sports nutrition products.',
        website: 'https://fitlife.example.com',
        size: '501-1000',
        location: 'Delhi NCR',
        founded: 2010,
        specialties: ['Fitness Centers', 'Personal Training', 'Sports Nutrition', 'Wellness Programs'],
        hiringFor: ['Fitness Trainers', 'Nutritionists', 'Sales', 'Operations'],
        activeJobs: 33,
        featured: false,
        isVerified: true
      },
      {
        name: 'LegalEase Advocates',
        logo: 'https://via.placeholder.com/100x100/6366f1/ffffff?text=LE',
        industry: 'Legal Services',
        description: 'Full-service law firm providing corporate legal advice, litigation support, and compliance consulting.',
        website: 'https://legalease.example.com',
        size: '51-200',
        location: 'Mumbai, Maharashtra',
        founded: 2008,
        specialties: ['Corporate Law', 'Litigation', 'Compliance', 'Intellectual Property'],
        hiringFor: ['Lawyers', 'Paralegals', 'Legal Analysts', 'Compliance Officers'],
        activeJobs: 10,
        featured: false,
        isVerified: true
      },
      {
        name: 'SmartHome Solutions',
        logo: 'https://via.placeholder.com/100x100/8b5cf6/ffffff?text=SH',
        industry: 'Internet of Things (IoT)',
        description: 'Smart home automation company developing IoT devices, home security systems, and intelligent living solutions.',
        website: 'https://smarthome.example.com',
        size: '51-200',
        location: 'Bengaluru, Karnataka',
        founded: 2018,
        specialties: ['Home Automation', 'IoT Devices', 'Security Systems', 'Voice Assistants'],
        hiringFor: ['IoT Engineers', 'Hardware Designers', 'Software Developers', 'Designers'],
        activeJobs: 22,
        featured: true,
        isVerified: true
      },
      {
        name: 'FashionForward Retail',
        logo: 'https://via.placeholder.com/100x100/ec4899/ffffff?text=FF',
        industry: 'Fashion & Apparel',
        description: 'Trendy fashion brand designing and retailing contemporary clothing, accessories, and footwear.',
        website: 'https://fashionforward.example.com',
        size: '501-1000',
        location: 'Mumbai, Maharashtra',
        founded: 2013,
        specialties: ['Fashion Design', 'E-commerce', 'Retail', 'Supply Chain'],
        hiringFor: ['Designers', 'Merchandisers', 'E-commerce', 'Store Managers'],
        activeJobs: 40,
        featured: false,
        isVerified: true
      },
      {
        name: 'DataDriven Analytics',
        logo: 'https://via.placeholder.com/100x100/06b6d4/ffffff?text=DD',
        industry: 'Data Analytics & Big Data',
        description: 'Business intelligence company providing data analytics, machine learning, and predictive modeling solutions.',
        website: 'https://datadriven.example.com',
        size: '201-500',
        location: 'Bengaluru, Karnataka',
        founded: 2017,
        specialties: ['Business Intelligence', 'Machine Learning', 'Data Visualization', 'Predictive Analytics'],
        hiringFor: ['Data Scientists', 'ML Engineers', 'Data Analysts', 'BI Developers'],
        activeJobs: 35,
        featured: true,
        isVerified: true
      },
      {
        name: 'EcoBuild Constructions',
        logo: 'https://via.placeholder.com/100x100/84cc16/ffffff?text=EB',
        industry: 'Construction & Real Estate',
        description: 'Sustainable construction company focusing on green buildings, eco-friendly materials, and renewable energy integration.',
        website: 'https://ecobuild.example.com',
        size: '201-500',
        location: 'Chennai, Tamil Nadu',
        founded: 2014,
        specialties: ['Green Buildings', 'Sustainable Design', 'Renewable Energy', 'Infrastructure'],
        hiringFor: ['Civil Engineers', 'Architects', 'Project Managers', 'Safety Officers'],
        activeJobs: 28,
        featured: false,
        isVerified: true
      },
      {
        name: 'MediCare Plus',
        logo: 'https://via.placeholder.com/100x100/ef4444/ffffff?text=MC',
        industry: 'Healthcare',
        description: 'Multi-specialty hospital chain offering comprehensive medical care, emergency services, and diagnostic facilities.',
        website: 'https://medicareplus.example.com',
        size: '1000+',
        location: 'Hyderabad, Telangana',
        founded: 2000,
        specialties: ['Multi-specialty Care', 'Emergency Services', 'Diagnostics', 'Telemedicine'],
        hiringFor: ['Doctors', 'Nurses', 'Technicians', 'Administrators'],
        activeJobs: 75,
        featured: true,
        isVerified: true
      },
      {
        name: 'GameSphere Studios',
        logo: 'https://via.placeholder.com/100x100/7c3aed/ffffff?text=GS',
        industry: 'Gaming & Entertainment',
        description: 'Mobile and PC game development studio creating engaging games, AR/VR experiences, and interactive content.',
        website: 'https://gamesphere.example.com',
        size: '51-200',
        location: 'Pune, Maharashtra',
        founded: 2019,
        specialties: ['Game Development', 'AR/VR', 'Unity/Unreal', 'Game Design'],
        hiringFor: ['Game Developers', 'Artists', 'Game Designers', 'QA Testers'],
        activeJobs: 16,
        featured: false,
        isVerified: true
      },
      {
        name: 'TalentFirst HR',
        logo: 'https://via.placeholder.com/100x100/fbbf24/ffffff?text=TF',
        industry: 'Human Resources',
        description: 'HR consulting firm offering recruitment Process outsourcing, background verification, and HRIS solutions.',
        website: 'https://talentfirst.example.com',
        size: '201-500',
        location: 'Gurugram, Haryana',
        founded: 2011,
        specialties: ['RPO', 'Background Verification', 'HRIS', 'Payroll Processing'],
        hiringFor: ['Recruiters', 'HR Consultants', 'Payroll Specialists', 'Tech Team'],
        activeJobs: 30,
        featured: true,
        isVerified: true
      },
      {
        name: 'InnoTech Solutions',
        logo: 'https://via.placeholder.com/100x100/0891b2/ffffff?text=IT',
        industry: 'Information Technology',
        description: 'Innovative software development company specializing in mobile apps, web platforms, and enterprise solutions.',
        website: 'https://innotech.example.com',
        size: '201-500',
        location: 'Bengaluru, Karnataka',
        founded: 2013,
        specialties: ['Mobile Development', 'Web Apps', 'SaaS', 'AI Solutions'],
        hiringFor: ['Developers', 'Designers', 'QA', 'Managers'],
        activeJobs: 38,
        featured: true,
        isVerified: true
      },
      {
        name: 'NeuroCare Neurology',
        logo: 'https://via.placeholder.com/100x100/be185d/ffffff?text=NC',
        industry: 'Healthcare',
        description: 'Specialized neurology and psychiatry hospital providing advanced brain and nervous system treatments.',
        website: 'https://neurocare.example.com',
        size: '201-500',
        location: 'Chennai, Tamil Nadu',
        founded: 2009,
        specialties: ['Neurology', 'Psychiatry', 'Rehabilitation', 'Diagnostics'],
        hiringFor: ['Neurologists', 'Psychiatrists', 'Therapists', 'Nurses'],
        activeJobs: 45,
        featured: false,
        isVerified: true
      },
      {
        name: 'WealthGrow Advisors',
        logo: 'https://via.placeholder.com/100x100/15803d/ffffff?text=WG',
        industry: 'Financial Services',
        description: 'Independent financial advisory firm helping individuals and families plan for retirement and wealth creation.',
        website: 'https://wealthgrow.example.com',
        size: '51-200',
        location: 'Mumbai, Maharashtra',
        founded: 2016,
        specialties: ['Financial Planning', 'Investment Advisory', 'Tax Planning', 'Insurance'],
        hiringFor: ['Financial Advisors', 'Analysts', 'Relationship Managers'],
        activeJobs: 18,
        featured: false,
        isVerified: true
      },
      {
        name: 'AgriSmart Tech',
        logo: 'https://via.placeholder.com/100x100/65a30d/ffffff?text=AS',
        industry: 'Agriculture & AgTech',
        description: 'Technology-driven agriculture company providing smart farming solutions and precision agriculture services.',
        website: 'https://agrismart.example.com',
        size: '51-200',
        location: 'Pune, Maharashtra',
        founded: 2019,
        specialties: ['Precision Farming', 'IoT Sensors', 'Crop Monitoring', 'Drones'],
        hiringFor: ['Agronomists', 'Data Scientists', 'Engineers', 'Sales'],
        activeJobs: 15,
        featured: false,
        isVerified: true
      },
      {
        name: 'RetailBuzz Commerce',
        logo: 'https://via.placeholder.com/100x100/db2777/ffffff?text=RB',
        industry: 'Retail & E-commerce',
        description: 'Fast-growing D2C brand aggregator acquiring and scaling direct-to-consumer brands across categories.',
        website: 'https://retailbuzz.example.com',
        size: '201-500',
        location: 'Gurugram, Haryana',
        founded: 2018,
        specialties: ['D2C Brands', 'E-commerce', 'Brand Building', 'Digital Marketing'],
        hiringFor: ['Category Managers', 'Marketers', 'Operations', 'Tech'],
        activeJobs: 32,
        featured: true,
        isVerified: true
      },
      {
        name: 'EduQuest Global',
        logo: 'https://via.placeholder.com/100x100/7c3aed/ffffff?text=EQ',
        industry: 'Education & EdTech',
        description: 'International education consultancy helping students with study abroad admissions and visa processing.',
        website: 'https://eduquest.example.com',
        size: '51-200',
        location: 'Hyderabad, Telangana',
        founded: 2015,
        specialties: ['Study Abroad', 'Visa Processing', 'Test Prep', 'Career Counseling'],
        hiringFor: ['Counselors', 'Visa Experts', 'Marketing', 'Operations'],
        activeJobs: 14,
        featured: false,
        isVerified: true
      },
      {
        name: 'ElectroVolt Energy',
        logo: 'https://via.placeholder.com/100x100/ca8a04/ffffff?text=EV',
        industry: 'Renewable Energy',
        description: 'Battery and energy storage solutions company developing next-generation EV batteries and solar systems.',
        website: 'https://electrovoldt.example.com',
        size: '201-500',
        location: 'Bengaluru, Karnataka',
        founded: 2017,
        specialties: ['Battery Tech', 'Energy Storage', 'EV Charging', 'Solar Solutions'],
        hiringFor: ['Researchers', 'Engineers', 'Production', 'Quality'],
        activeJobs: 40,
        featured: true,
        isVerified: true
      },
      {
        name: 'MediLab Diagnostics',
        logo: 'https://via.placeholder.com/100x100/dc2626/ffffff?text=ML',
        industry: 'Healthcare',
        description: 'Network of diagnostic labs offering comprehensive pathology and radiology services across India.',
        website: 'https://medilab.example.com',
        size: '501-1000',
        location: 'Delhi NCR',
        founded: 2010,
        specialties: ['Pathology', 'Radiology', 'Home Collection', 'Corporate Health'],
        hiringFor: ['Lab Technicians', 'Radiologists', 'Phlebotomists', 'Sales'],
        activeJobs: 52,
        featured: false,
        isVerified: true
      },
      {
        name: 'BuildRight Construction',
        logo: 'https://via.placeholder.com/100x100/78350f/ffffff?text=BR',
        industry: 'Construction & Real Estate',
        description: 'Premium real estate developer building luxury apartments, villas, and commercial spaces.',
        website: 'https://buildright.example.com',
        size: '201-500',
        location: 'Mumbai, Maharashtra',
        founded: 2006,
        specialties: ['Residential', 'Commercial', 'Interior Design', 'Smart Homes'],
        hiringFor: ['Engineers', 'Architects', 'Sales', 'Marketing'],
        activeJobs: 25,
        featured: false,
        isVerified: true
      },
      {
        name: 'FinServe Technologies',
        logo: 'https://via.placeholder.com/100x100/1d4ed8/ffffff?text=FS',
        industry: 'Fintech',
        description: 'B2B fintech company providing payment gateway, lending, and banking solutions to enterprises.',
        website: 'https://finserve.example.com',
        size: '501-1000',
        location: 'Bengaluru, Karnataka',
        founded: 2014,
        specialties: ['Payments', 'Lending', 'Banking APIs', 'Compliance'],
        hiringFor: ['Developers', 'Product Managers', 'Sales', 'Compliance'],
        activeJobs: 48,
        featured: true,
        isVerified: true
      },
      {
        name: 'ChefBox Foods',
        logo: 'https://via.placeholder.com/100x100/ea580c/ffffff?text=CB',
        industry: 'Food & Beverage',
        description: 'Meal kit and ready-to-cook food startup delivering chef-made recipes and fresh ingredients.',
        website: 'https://chefbox.example.com',
        size: '201-500',
        location: 'Mumbai, Maharashtra',
        founded: 2020,
        specialties: ['Meal Kits', 'Ready-to-Cook', 'Fresh Delivery', 'Subscription'],
        hiringFor: ['Chefs', 'Supply Chain', 'Marketing', 'Tech'],
        activeJobs: 28,
        featured: false,
        isVerified: true
      },
      {
        name: 'TalentHive Solutions',
        logo: 'https://via.placeholder.com/100x100/f59e0b/ffffff?text=TH',
        industry: 'Human Resources',
        description: 'AI-powered recruitment platform helping companies hire faster with intelligent candidate matching.',
        website: 'https://talenthive.example.com',
        size: '51-200',
        location: 'Gurugram, Haryana',
        founded: 2019,
        specialties: ['AI Recruitment', 'Candidate Matching', 'HR Tech', 'Assessment'],
        hiringFor: ['Tech Team', 'Recruiters', 'Sales', 'Product'],
        activeJobs: 20,
        featured: true,
        isVerified: true
      },
      {
        name: 'SecureNet Cyber',
        logo: 'https://via.placeholder.com/100x100/475569/ffffff?text=SN',
        industry: 'Cybersecurity',
        description: 'Managed security services provider offering 24/7 monitoring, threat response, and compliance solutions.',
        website: 'https://securenet.example.com',
        size: '201-500',
        location: 'Pune, Maharashtra',
        founded: 2017,
        specialties: ['SOC Operations', 'Threat Intelligence', 'Pen Testing', 'Compliance'],
        hiringFor: ['Security Analysts', 'Engineers', 'Consultants', 'Sales'],
        activeJobs: 35,
        featured: true,
        isVerified: true
      },
      {
        name: 'LogiTrack Systems',
        logo: 'https://via.placeholder.com/100x100/b45309/ffffff?text=LT',
        industry: 'Logistics & Supply Chain',
        description: 'Tech-enabled logistics company with fleet management and last-mile delivery solutions.',
        website: 'https://logitrack.example.com',
        size: '501-1000',
        location: 'Hyderabad, Telangana',
        founded: 2016,
        specialties: ['Fleet Management', 'Last Mile', 'Cold Chain', 'Freight'],
        hiringFor: ['Operations', 'Drivers', 'Tech', 'Sales'],
        activeJobs: 60,
        featured: false,
        isVerified: true
      },
      {
        name: 'WellnessFirst Clinic',
        logo: 'https://via.placeholder.com/100x100/059669/ffffff?text=WF',
        industry: 'Healthcare',
        description: 'Chain of wellness clinics offering preventive healthcare, physiotherapy, and alternative medicine.',
        website: 'https://wellnessfirst.example.com',
        size: '201-500',
        location: 'Pune, Maharashtra',
        founded: 2012,
        specialties: ['Preventive Care', 'Physiotherapy', 'Ayurveda', 'Nutrition'],
        hiringFor: ['Physiotherapists', 'Ayurvedic Doctors', 'Nutritionists', 'Reception'],
        activeJobs: 22,
        featured: false,
        isVerified: true
      },
      {
        name: 'Designo Studio',
        logo: 'https://via.placeholder.com/100x100/9333ea/ffffff?text=DS',
        industry: 'Design & Creative',
        description: 'Award-winning design agency specializing in branding, UI/UX, and creative marketing campaigns.',
        website: 'https://designo.example.com',
        size: '11-50',
        location: 'Mumbai, Maharashtra',
        founded: 2018,
        specialties: ['Branding', 'UI/UX Design', 'Motion Graphics', 'Marketing'],
        hiringFor: ['Designers', 'Illustrators', 'Strategists', 'Project Managers'],
        activeJobs: 8,
        featured: false,
        isVerified: true
      },
      {
        name: 'CloudScale Infra',
        logo: 'https://via.placeholder.com/100x100/0284c7/ffffff?text=CS',
        industry: 'Cloud Computing',
        description: 'Cloud infrastructure company helping enterprises migrate, optimize, and manage multi-cloud environments.',
        website: 'https://cloudscale.example.com',
        size: '201-500',
        location: 'Bengaluru, Karnataka',
        founded: 2015,
        specialties: ['Cloud Migration', 'Multi-Cloud', 'DevOps', 'Infrastructure'],
        hiringFor: ['Cloud Architects', 'DevOps Engineers', 'SRE', 'Sales'],
        activeJobs: 30,
        featured: true,
        isVerified: true
      },
      {
        name: 'RetailServe Group',
        logo: 'https://via.placeholder.com/100x100/be185d/ffffff?text=RS',
        industry: 'Retail & E-commerce',
        description: 'Retail management company operating multiple brand stores and franchises across India.',
        website: 'https://retailserve.example.com',
        size: '1000+',
        location: 'Delhi NCR',
        founded: 2005,
        specialties: ['Retail Operations', 'Franchise', 'Category Management', 'Visual Merchandising'],
        hiringFor: ['Store Managers', 'Merchandisers', 'Operations', 'HR'],
        activeJobs: 85,
        featured: false,
        isVerified: true
      },
      {
        name: 'EduBridge Institute',
        logo: 'https://via.placeholder.com/100x100/6366f1/ffffff?text=EB',
        industry: 'Education & EdTech',
        description: 'Skill development institute offering vocational training, certifications, and placement services.',
        website: 'https://edubridge.example.com',
        size: '201-500',
        location: 'Jaipur, Rajasthan',
        founded: 2013,
        specialties: ['Vocational Training', 'Certifications', 'Placements', 'Online Learning'],
        hiringFor: ['Trainers', 'Counselors', 'Tech Team', 'Operations'],
        activeJobs: 24,
        featured: false,
        isVerified: true
      },
      {
        name: 'SolarPower India',
        logo: 'https://via.placeholder.com/100x100/84cc16/ffffff?text=SP',
        industry: 'Renewable Energy',
        description: 'End-to-end solar energy solutions provider for residential, commercial, and industrial segments.',
        website: 'https://solarpowerindia.example.com',
        size: '201-500',
        location: 'Ahmedabad, Gujarat',
        founded: 2011,
        specialties: ['Solar Installation', 'Rooftop Systems', 'Maintenance', 'Financing'],
        hiringFor: ['Engineers', 'Technicians', 'Sales', 'Finance'],
        activeJobs: 35,
        featured: false,
        isVerified: true
      }
    ];

    await Company.deleteMany({});
    await Company.insertMany(sampleCompanies);

    res.status(201).json({
      success: true,
      message: 'Sample companies seeded successfully',
      count: sampleCompanies.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to seed companies',
      error: error.message
    });
  }
};
