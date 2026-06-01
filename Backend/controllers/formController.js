import Candidate from '../models/Candidate.js';
import ClientRequirement from '../models/ClientRequirement.js';

const normalizePath = (filePath) => filePath ? filePath.replace(/\\/g, '/') : filePath;

const respondError = (res, message, error, statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error: error?.message || error
  });
};

export const createCandidateForm = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      city,
      qualification,
      experience,
      skills,
      expectedSalary,
      preferredLocation,
      currentCompany
    } = req.body;

    const candidate = await Candidate.create({
      fullName,
      email,
      phone,
      city,
      qualification,
      experience,
      skills,
      expectedSalary,
      preferredLocation,
      currentCompany,
   resumeUrl: req.file ? req.file.path : null    });

    res.status(201).json({
      success: true,
      message: 'Candidate form submitted successfully.',
      data: candidate
    });
  } catch (error) {
    respondError(res, 'Failed to submit candidate form. Please try again.', error);
  }
};

export const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: candidates.length,
      data: candidates
    });
  } catch (error) {
    respondError(res, 'Failed to fetch candidate forms.', error);
  }
};

  export const deleteClientRequirement = async (req, res) => {
  try {

    await ClientRequirement.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Client requirement deleted successfully'
    });

  } catch (error) {
    respondError(res, 'Failed to delete client requirement.', error);
  }
};

export const getCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate form not found.'
      });
    }

    res.status(200).json({
      success: true,
      data: candidate
    });
  } catch (error) {
    respondError(res, 'Failed to fetch candidate form.', error);
  }
};

export const createClientForm = async (req, res) => {
  try {
    const {
      companyName,
      hrName,
      email,
      phone,
      jobRole,
      openings,
      salary,
      experience,
      location,
      employmentType,
      skillsRequired,
      joiningTimeline,
      jobDescription
    } = req.body;

    const clientRequirement = await ClientRequirement.create({
      companyName,
      hrName,
      email,
      phone,
      jobRole,
      openings: openings ? Number(openings) : 0,
      salary,
      experience,
      location,
      employmentType,
      skillsRequired,
      joiningTimeline,
      jobDescription
    });

    res.status(201).json({
      success: true,
      message: 'Client requirement submitted successfully.',
      data: clientRequirement
    });
  } catch (error) {
    respondError(res, 'Failed to submit client requirement. Please try again.', error);
  }
};

export const getClientRequirements = async (req, res) => {
  try {
    const requirements = await ClientRequirement.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: requirements.length,
      data: requirements
    });
  } catch (error) {
    respondError(res, 'Failed to fetch client requirements.', error);
  }
};

export const getClientRequirement = async (req, res) => {
  try {
    const requirement = await ClientRequirement.findById(req.params.id);

    if (!requirement) {
      return res.status(404).json({
        success: false,
        message: 'Client requirement not found.'
      });
    }

    res.status(200).json({
      success: true,
      data: requirement
    });
  } catch (error) {
    respondError(res, 'Failed to fetch client requirement.', error);
  }
};


export const updateCandidate = async (req, res) => {
  try {

    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: candidate
    });

  } catch (error) {
    respondError(res, 'Failed to update candidate.', error);
  }
};

export const deleteCandidate = async (req, res) => {
  try {

    await Candidate.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Candidate deleted successfully'
    });

  } catch (error) {
    respondError(res, 'Failed to delete candidate.', error);
  }
};

export const updateClientRequirement = async (req, res) => {
  try {

    const requirement = await ClientRequirement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: requirement
    });

  } catch (error) {
    respondError(res, 'Failed to update client requirement.', error);
  }
};

