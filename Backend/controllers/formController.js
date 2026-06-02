import Candidate from "../models/Candidate.js";
import ClientRequirement from "../models/ClientRequirement.js";

/* ---------------- ERROR HANDLER ---------------- */
const respondError = (res, message, error, statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error: error?.message || error,
  });
};

/* ---------------- CANDIDATE ---------------- */

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
      currentCompany,
    } = req.body;

    console.log("📁 FILE RECEIVED:", req.file);

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

      // ✅ FINAL FIX (ONLY THIS)
      resumeUrl: req.file ? req.file.path : null,
    });

    return res.status(201).json({
      success: true,
      message: "Candidate form submitted successfully.",
      data: candidate,
    });
  } catch (error) {
    return respondError(res, "Failed to submit candidate form.", error);
  }
};

/* ---------------- GET ALL CANDIDATES ---------------- */
export const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: candidates.length,
      data: candidates,
    });
  } catch (error) {
    return respondError(res, "Failed to fetch candidates.", error);
  }
};

/* ---------------- GET SINGLE CANDIDATE ---------------- */
export const getCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: candidate,
    });
  } catch (error) {
    return respondError(res, "Failed to fetch candidate.", error);
  }
};

/* ---------------- UPDATE ---------------- */
export const updateCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      data: candidate,
    });
  } catch (error) {
    return respondError(res, "Failed to update candidate.", error);
  }
};

/* ---------------- DELETE ---------------- */
export const deleteCandidate = async (req, res) => {
  try {
    await Candidate.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Candidate deleted successfully",
    });
  } catch (error) {
    return respondError(res, "Failed to delete candidate.", error);
  }
};

/* ---------------- CLIENT ---------------- */

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
      jobDescription,
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
      jobDescription,
    });

    return res.status(201).json({
      success: true,
      message: "Client requirement submitted successfully.",
      data: clientRequirement,
    });
  } catch (error) {
    return respondError(res, "Failed to submit client requirement.", error);
  }
};

/* ---------------- CLIENT GET ALL ---------------- */
export const getClientRequirements = async (req, res) => {
  try {
    const data = await ClientRequirement.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    return respondError(res, "Failed to fetch clients.", error);
  }
};

/* ---------------- CLIENT GET ONE ---------------- */
export const getClientRequirement = async (req, res) => {
  try {
    const data = await ClientRequirement.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return respondError(res, "Failed to fetch client.", error);
  }
};

/* ---------------- CLIENT UPDATE ---------------- */
export const updateClientRequirement = async (req, res) => {
  try {
    const data = await ClientRequirement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return respondError(res, "Failed to update client.", error);
  }
};

/* ---------------- CLIENT DELETE ---------------- */
export const deleteClientRequirement = async (req, res) => {
  try {
    await ClientRequirement.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Client deleted successfully",
    });
  } catch (error) {
    return respondError(res, "Failed to delete client.", error);
  }
};