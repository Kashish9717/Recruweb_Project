import { useState } from 'react';
import ScrollIndicator from '../components/ScrollIndicator';

const EmployeeJoiningForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [formData, setFormData] = useState({
    employeeId: '',
    joiningDate: '',
    department: '',
    designation: '',
    reportingManager: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    maritalStatus: '',
    bloodGroup: '',
    email: '',
    personalEmail: '',
    phone: '',
    alternatePhone: '',
    currentAddress: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India'
    },
    permanentAddress: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India'
    },
    sameAddress: true,
    education: [{
      degree: '',
      institution: '',
      yearOfPassing: '',
      percentage: ''
    }],
    experience: [{
      company: '',
      designation: '',
      fromDate: '',
      toDate: '',
      responsibilities: ''
    }],
    bankDetails: {
      bankName: '',
      accountNumber: '',
      confirmAccountNumber: '',
      ifscCode: '',
      branchName: '',
      accountHolderName: ''
    },
    aadharNumber: '',
    panNumber: '',
    passportNumber: '',
    passportExpiry: '',
    emergencyContact: {
      name: '',
      relationship: '',
      phone: '',
      email: ''
    },
    previousEmployer: {
      companyName: '',
      designation: '',
      lastSalary: '',
      relievingDate: '',
      reasonForLeaving: ''
    },
    references: [{
      name: '',
      designation: '',
      company: '',
      phone: '',
      email: ''
    }],
    declaration: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleArrayChange = (arrayName, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addArrayItem = (arrayName, template) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], template]
    }));
  };

  const removeArrayItem = (arrayName, index) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 5));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      localStorage.setItem(`joining_form_${formData.employeeId || Date.now()}`, JSON.stringify({
        ...formData,
        submittedAt: new Date().toISOString()
      }));
      setSubmitSuccess(true);
    } catch (error) {
      alert('Error submitting form. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  if (submitSuccess) {
    return (
      <>
        <section className="hero" style={{ minHeight: '50vh', paddingTop: '140px' }}>
          <div className="hero-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
          </div>
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Congratulations!</span>
              <h1 className="section-title">Form Submitted Successfully</h1>
              <p className="section-subtitle">
                Your joining form has been submitted. Our HR team will review your details and get in touch with you shortly.
              </p>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="success-card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '60px 40px', background: 'white', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
              <div style={{ width: '80px', height: '80px', background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <svg width="40" height="40" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 style={{ color: '#1f2937', marginBottom: '16px' }}>Thank You!</h2>
              <p style={{ color: '#6b7280', marginBottom: '24px' }}>
                Please carry the following documents on your joining date:<br/>
                1. Original ID Proof (Aadhar/PAN/Passport)<br/>
                2. Address Proof<br/>
                3. Educational Certificates<br/>
                4. Previous Experience Letters<br/>
                5. Passport Size Photos (3)
              </p>
              <p style={{ color: '#6b7280', fontSize: '14px' }}>
                <strong>HR Contact:</strong> info@recruweb.com<br/>
                <strong>Phone:</strong> +91 9336532636
              </p>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="hero" style={{ minHeight: '50vh', paddingTop: '140px' }}>
        <div className="hero-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">For New Joiners</span>
            <h1 className="section-title" style={{ fontSize: '52px' }}>Employee Joining Form</h1>
            <p className="section-subtitle">
              Welcome to Recruweb! Please fill out this form to complete your joining process.
            </p>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      <section className="section" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="form-progress">
            <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>
              <span className="step-number">1</span>
              <span className="step-label">Employment</span>
            </div>
            <div className="progress-line"></div>
            <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>
              <span className="step-number">2</span>
              <span className="step-label">Personal</span>
            </div>
            <div className="progress-line"></div>
            <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
              <span className="step-number">3</span>
              <span className="step-label">Address</span>
            </div>
            <div className="progress-line"></div>
            <div className={`progress-step ${currentStep >= 4 ? 'active' : ''}`}>
              <span className="step-number">4</span>
              <span className="step-label">Documents</span>
            </div>
            <div className="progress-line"></div>
            <div className={`progress-step ${currentStep >= 5 ? 'active' : ''}`}>
              <span className="step-number">5</span>
              <span className="step-label">Declaration</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="joining-form">
            {currentStep === 1 && (
              <div className="form-step">
                <h2><span className="step-icon">1</span> Employment Details</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label>Employee ID</label>
                    <input type="text" name="employeeId" value={formData.employeeId} onChange={handleChange} placeholder="EMP-XXXX" />
                  </div>
                  <div className="form-group">
                    <label>Joining Date *</label>
                    <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Department *</label>
                    <select name="department" value={formData.department} onChange={handleChange} required>
                      <option value="">Select Department</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Human Resources">Human Resources</option>
                      <option value="Sales">Sales</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Finance">Finance</option>
                      <option value="Operations">Operations</option>
                      <option value="Admin">Admin</option>
                      <option value="Support">Support</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Designation *</label>
                    <input type="text" name="designation" value={formData.designation} onChange={handleChange} placeholder="e.g., Software Engineer" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Reporting Manager</label>
                  <input type="text" name="reportingManager" value={formData.reportingManager} onChange={handleChange} placeholder="Name of reporting manager" />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="form-step">
                <h2><span className="step-icon">2</span> Personal Information</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name *</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
                  </div>
                  <div className="form-group">
                    <label>Last Name *</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Date of Birth *</label>
                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Gender *</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} required>
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Marital Status</label>
                    <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
                      <option value="">Select Status</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Blood Group</label>
                    <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}>
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Official Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your.name@info.recruweb.com" required />
                  </div>
                  <div className="form-group">
                    <label>Personal Email</label>
                    <input type="email" name="personalEmail" value={formData.personalEmail} onChange={handleChange} placeholder="personal@email.com" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" required />
                  </div>
                  <div className="form-group">
                    <label>Alternate Phone</label>
                    <input type="tel" name="alternatePhone" value={formData.alternatePhone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="form-step">
                <h2><span className="step-icon">3</span> Address Details</h2>
                <div className="form-group checkbox-group">
                  <input type="checkbox" id="sameAddress" name="sameAddress" checked={formData.sameAddress} onChange={handleChange} />
                  <label htmlFor="sameAddress">Permanent address same as current address</label>
                </div>
                
                <h3>Current Address</h3>
                <div className="form-group">
                  <label>Street Address *</label>
                  <input type="text" name="currentAddress.street" value={formData.currentAddress.street} onChange={handleChange} placeholder="House No., Building, Street" required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>City *</label>
                    <input type="text" name="currentAddress.city" value={formData.currentAddress.city} onChange={handleChange} placeholder="City" required />
                  </div>
                  <div className="form-group">
                    <label>State *</label>
                    <input type="text" name="currentAddress.state" value={formData.currentAddress.state} onChange={handleChange} placeholder="State" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Pincode *</label>
                    <input type="text" name="currentAddress.pincode" value={formData.currentAddress.pincode} onChange={handleChange} placeholder="110001" maxLength={6} required />
                  </div>
                  <div className="form-group">
                    <label>Country</label>
                    <input type="text" name="currentAddress.country" value={formData.currentAddress.country} onChange={handleChange} disabled />
                  </div>
                </div>

                {!formData.sameAddress && (
                  <>
                    <h3>Permanent Address</h3>
                    <div className="form-group">
                      <label>Street Address *</label>
                      <input type="text" name="permanentAddress.street" value={formData.permanentAddress.street} onChange={handleChange} placeholder="House No., Building, Street" required={!formData.sameAddress} />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>City *</label>
                        <input type="text" name="permanentAddress.city" value={formData.permanentAddress.city} onChange={handleChange} placeholder="City" required={!formData.sameAddress} />
                      </div>
                      <div className="form-group">
                        <label>State *</label>
                        <input type="text" name="permanentAddress.state" value={formData.permanentAddress.state} onChange={handleChange} placeholder="State" required={!formData.sameAddress} />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Pincode *</label>
                        <input type="text" name="permanentAddress.pincode" value={formData.permanentAddress.pincode} onChange={handleChange} placeholder="110001" maxLength={6} required={!formData.sameAddress} />
                      </div>
                      <div className="form-group">
                        <label>Country</label>
                        <input type="text" name="permanentAddress.country" value={formData.permanentAddress.country} onChange={handleChange} disabled />
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {currentStep === 4 && (
              <div className="form-step">
                <h2><span className="step-icon">4</span> Documents & Bank Details</h2>
                
                <h3>Identity Documents</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Aadhar Number *</label>
                    <input type="text" name="aadharNumber" value={formData.aadharNumber} onChange={handleChange} placeholder="XXXX XXXX XXXX" maxLength={14} required />
                  </div>
                  <div className="form-group">
                    <label>PAN Number *</label>
                    <input type="text" name="panNumber" value={formData.panNumber} onChange={handleChange} placeholder="ABCDE1234F" maxLength={10} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Passport Number</label>
                    <input type="text" name="passportNumber" value={formData.passportNumber} onChange={handleChange} placeholder="J1234567" />
                  </div>
                  <div className="form-group">
                    <label>Passport Expiry</label>
                    <input type="date" name="passportExpiry" value={formData.passportExpiry} onChange={handleChange} />
                  </div>
                </div>

                <h3>Bank Account Details</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Bank Name *</label>
                    <input type="text" name="bankDetails.bankName" value={formData.bankDetails.bankName} onChange={handleChange} placeholder="e.g., State Bank of India" required />
                  </div>
                  <div className="form-group">
                    <label>Branch Name</label>
                    <input type="text" name="bankDetails.branchName" value={formData.bankDetails.branchName} onChange={handleChange} placeholder="e.g., Noida Branch" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Account Number *</label>
                    <input type="text" name="bankDetails.accountNumber" value={formData.bankDetails.accountNumber} onChange={handleChange} placeholder="XXXXXXXXXX" required />
                  </div>
                  <div className="form-group">
                    <label>Confirm Account Number *</label>
                    <input type="text" name="bankDetails.confirmAccountNumber" value={formData.bankDetails.confirmAccountNumber} onChange={handleChange} placeholder="Re-enter account number" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>IFSC Code *</label>
                    <input type="text" name="bankDetails.ifscCode" value={formData.bankDetails.ifscCode} onChange={handleChange} placeholder="SBIN0001234" maxLength={11} required />
                  </div>
                  <div className="form-group">
                    <label>Account Holder Name *</label>
                    <input type="text" name="bankDetails.accountHolderName" value={formData.bankDetails.accountHolderName} onChange={handleChange} placeholder="As per bank records" required />
                  </div>
                </div>

                <h3>Emergency Contact</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Contact Name *</label>
                    <input type="text" name="emergencyContact.name" value={formData.emergencyContact.name} onChange={handleChange} placeholder="Emergency contact name" required />
                  </div>
                  <div className="form-group">
                    <label>Relationship *</label>
                    <select name="emergencyContact.relationship" value={formData.emergencyContact.relationship} onChange={handleChange} required>
                      <option value="">Select Relationship</option>
                      <option value="Spouse">Spouse</option>
                      <option value="Parent">Parent</option>
                      <option value="Sibling">Sibling</option>
                      <option value="Friend">Friend</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input type="tel" name="emergencyContact.phone" value={formData.emergencyContact.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" required />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="emergencyContact.email" value={formData.emergencyContact.email} onChange={handleChange} placeholder="emergency@email.com" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="form-step">
                <h2><span className="step-icon">5</span> Education, Experience & Declaration</h2>
                
                <h3>Educational Qualification</h3>
                {formData.education.map((edu, index) => (
                  <div key={index} className="experience-block">
                    <div className="block-header">
                      <span>Education {index + 1}</span>
                      {formData.education.length > 1 && (
                        <button type="button" className="btn-remove" onClick={() => removeArrayItem('education', index)}>Remove</button>
                      )}
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Degree/Certificate *</label>
                        <input type="text" value={edu.degree} onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)} placeholder="e.g., B.Tech in Computer Science" required />
                      </div>
                      <div className="form-group">
                        <label>Institution *</label>
                        <input type="text" value={edu.institution} onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)} placeholder="University/College name" required />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Year of Passing *</label>
                        <input type="text" value={edu.yearOfPassing} onChange={(e) => handleArrayChange('education', index, 'yearOfPassing', e.target.value)} placeholder="e.g., 2020" maxLength={4} required />
                      </div>
                      <div className="form-group">
                        <label>Percentage/CGPA</label>
                        <input type="text" value={edu.percentage} onChange={(e) => handleArrayChange('education', index, 'percentage', e.target.value)} placeholder="e.g., 8.5 CGPA" />
                      </div>
                    </div>
                  </div>
                ))}
                <button type="button" className="btn-add" onClick={() => addArrayItem('education', { degree: '', institution: '', yearOfPassing: '', percentage: '' })}>+ Add Education</button>

                <h3>Previous Work Experience</h3>
                {formData.experience.map((exp, index) => (
                  <div key={index} className="experience-block">
                    <div className="block-header">
                      <span>Experience {index + 1}</span>
                      {formData.experience.length > 1 && (
                        <button type="button" className="btn-remove" onClick={() => removeArrayItem('experience', index)}>Remove</button>
                      )}
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Company Name</label>
                        <input type="text" value={exp.company} onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)} placeholder="Company name" />
                      </div>
                      <div className="form-group">
                        <label>Designation</label>
                        <input type="text" value={exp.designation} onChange={(e) => handleArrayChange('experience', index, 'designation', e.target.value)} placeholder="Job title" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>From Date</label>
                        <input type="date" value={exp.fromDate} onChange={(e) => handleArrayChange('experience', index, 'fromDate', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>To Date</label>
                        <input type="date" value={exp.toDate} onChange={(e) => handleArrayChange('experience', index, 'toDate', e.target.value)} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Responsibilities</label>
                      <textarea value={exp.responsibilities} onChange={(e) => handleArrayChange('experience', index, 'responsibilities', e.target.value)} placeholder="Key responsibilities and achievements" rows="3"></textarea>
                    </div>
                  </div>
                ))}
                <button type="button" className="btn-add" onClick={() => addArrayItem('experience', { company: '', designation: '', fromDate: '', toDate: '', responsibilities: '' })}>+ Add Experience</button>

                <h3>Reference</h3>
                {formData.references.map((ref, index) => (
                  <div key={index} className="experience-block">
                    <div className="block-header">
                      <span>Reference {index + 1}</span>
                      {formData.references.length > 1 && (
                        <button type="button" className="btn-remove" onClick={() => removeArrayItem('references', index)}>Remove</button>
                      )}
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Name</label>
                        <input type="text" value={ref.name} onChange={(e) => handleArrayChange('references', index, 'name', e.target.value)} placeholder="Reference name" />
                      </div>
                      <div className="form-group">
                        <label>Designation</label>
                        <input type="text" value={ref.designation} onChange={(e) => handleArrayChange('references', index, 'designation', e.target.value)} placeholder="Their designation" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Company</label>
                        <input type="text" value={ref.company} onChange={(e) => handleArrayChange('references', index, 'company', e.target.value)} placeholder="Company name" />
                      </div>
                      <div className="form-group">
                        <label>Phone</label>
                        <input type="tel" value={ref.phone} onChange={(e) => handleArrayChange('references', index, 'phone', e.target.value)} placeholder="+91 XXXXX XXXXX" />
                      </div>
                    </div>
                  </div>
                ))}
                <button type="button" className="btn-add" onClick={() => addArrayItem('references', { name: '', designation: '', company: '', phone: '', email: '' })}>+ Add Reference</button>

                <h3>Declaration</h3>
                <div className="declaration-box">
                  <p>I hereby declare that all the information provided by me in this form is true and correct to the best of my knowledge. I understand that any false information may lead to termination of my employment. I agree to abide by the company's policies and code of conduct.</p>
                  <div className="form-group checkbox-group">
                    <input type="checkbox" id="declaration" name="declaration" checked={formData.declaration} onChange={handleChange} required />
                    <label htmlFor="declaration">I have read and agree to the above declaration *</label>
                  </div>
                </div>
              </div>
            )}

            <div className="form-navigation">
              {currentStep > 1 && (
                <button type="button" className="btn btn-secondary" onClick={prevStep}>
                  Previous
                </button>
              )}
              {currentStep < 5 ? (
                <button type="button" className="btn btn-primary" onClick={nextStep}>
                  Next
                </button>
              ) : (
                <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Form'}
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default EmployeeJoiningForm;
