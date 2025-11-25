const Patient = require("../../../models/patient");


//handling new patient registration
module.exports.create = async function (req, res) {
  try {
    let patient = await Patient.findOne({ phone: req.body.phone });
    if (patient) {
      return res.status(200).json({
        message: "Patient already exist",
        data: patient,
      });
    } else {
      await Patient.create({
        ...req.body,
        doctor: req.user._id,
      });
      return res.status(200).json({
        message: "Patient created",
      });
    }
  } catch (err) {
    console.log("error in patient create controller", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


//handling individual patient report generation
module.exports.report = async function (req, res) {
  try {
    let patient = await Patient.findOne({ phone: req.params.phone }).populate({
      path: "doctor",
      select: ["name"],    //this will only give the name of the doctor and not the entire doctor details
    });

    //converting each status code to respective full status name
    if (patient) {
      if (patient.status == "neg") patient.status = "Negative";
      else if (patient.status == "trav-quar")
        patient.status = "Travelled-Quarantine";
      else if (patient.status == "sym-quar")
        patient.status = "Symptoms-Quarantine";
      else if (patient.status == "pos-admit") patient.status = "Positive-Admit";
      return res.status(200).json({
        message: "Patient report generated.Here are the details",
        data: patient,
      });
    } else {
      return res.status(404).json({
        message: "Sorry the patient not found.Kindly verify the phone number",
      });
    }
  } catch (err) {
    console.log("Error in single patient report controller", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

//handling report generation of all patients
module.exports.reportAll = async function (req, res) {
  try {
    let patients = await Patient.find({})
      .sort({ createdAt: 1 })      //sorting ascending
      .populate({
        path: "doctor",
        select: ["name"],
      });
    if (patients) {
      patients.map((patient) => {
        if (patient.status == "neg") return (patient.status = "Negative");
        else if (patient.status == "trav-quar")
          return (patient.status = "Travelled-Quarantine");
        else if (patient.status == "sym-quar")
          return (patient.status = "Symptoms-Quarantine");
        else if (patient.status == "pos-admit")
          return (patient.status = "Positive-Admit");
      });
      return res.status(200).json({
        message: "All "+patients.length+" patient report generated",
        data: patients,
      });
    } else {
      return res.status(404).json({
        message: "No patients",
      });
    }
  } catch (err) {
    console.log("Error in all patient report controller", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

//handling the status change for patients(extra feature)
module.exports.updatestatus = async function (req, res) {
  try {
    let patient = await Patient.findOne({ phone: req.params.phone });
    if(!patient){
      return res.status(404).json({
        message: "Patient not found.Kindly verify the phone number"
      });
    }
    else {
      patient.status = req.body.newstatus;
      await patient.save();
      return res.status(200).json({
        message: "Patient status updated.Here are the updated details",
        data: patient,
      });
    }
  } catch (err) {
    console.log("Error in status change controller", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

//handling the report generation of all patients of particular status
module.exports.status = async function (req, res) {
  try {
    let status;
    let patients = await Patient.find({ status: req.params.status })
      .sort({ createdAt: 1 })
      .populate({
        path: "doctor",
        select: ["name"],
      });
    if (patients.length>0) {
      patients.map((patient) => {
        if (patient.status == "neg") {
          status = "Negative";
          return (patient.status = status);
        } else if (patient.status == "trav-quar") {
          status = "Travelled-Quarantine";
          return (patient.status = status);
        } else if (patient.status == "sym-quar") {
          status = "Symptoms-Quarantine";
          return (patient.status = status);
        } else if (patient.status == "pos-admit") {
          status = "Positive-Admit";
          return (patient.status = status);
        }
      });
      return res.status(200).json({
        message:
          "All "+patients.length+" patient with status " + status + " report generated",
        data: patients,
      });
    } else {
      return res.status(404).json({
        message: "No patients found",
      });
    }
  } catch (err) {
    console.log("Error in all patient report controller", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
