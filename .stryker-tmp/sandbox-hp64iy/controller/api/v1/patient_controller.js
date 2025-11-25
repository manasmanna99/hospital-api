// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
const Patient = require("../../../models/patient");

//handling new patient registration
module.exports.create = async function (req, res) {
  if (stryMutAct_9fa48("44")) {
    {}
  } else {
    stryCov_9fa48("44");
    try {
      if (stryMutAct_9fa48("45")) {
        {}
      } else {
        stryCov_9fa48("45");
        let patient = await Patient.findOne(stryMutAct_9fa48("46") ? {} : (stryCov_9fa48("46"), {
          phone: req.body.phone
        }));
        if (stryMutAct_9fa48("48") ? false : stryMutAct_9fa48("47") ? true : (stryCov_9fa48("47", "48"), patient)) {
          if (stryMutAct_9fa48("49")) {
            {}
          } else {
            stryCov_9fa48("49");
            return res.status(200).json(stryMutAct_9fa48("50") ? {} : (stryCov_9fa48("50"), {
              message: stryMutAct_9fa48("51") ? "" : (stryCov_9fa48("51"), "Patient already exist"),
              data: patient
            }));
          }
        } else {
          if (stryMutAct_9fa48("52")) {
            {}
          } else {
            stryCov_9fa48("52");
            await Patient.create(stryMutAct_9fa48("53") ? {} : (stryCov_9fa48("53"), {
              ...req.body,
              doctor: req.user._id
            }));
            return res.status(200).json(stryMutAct_9fa48("54") ? {} : (stryCov_9fa48("54"), {
              message: stryMutAct_9fa48("55") ? "" : (stryCov_9fa48("55"), "Patient created")
            }));
          }
        }
      }
    } catch (err) {
      if (stryMutAct_9fa48("56")) {
        {}
      } else {
        stryCov_9fa48("56");
        console.log(stryMutAct_9fa48("57") ? "" : (stryCov_9fa48("57"), "error in patient create controller"), err);
        return res.status(500).json(stryMutAct_9fa48("58") ? {} : (stryCov_9fa48("58"), {
          message: stryMutAct_9fa48("59") ? "" : (stryCov_9fa48("59"), "Internal server error")
        }));
      }
    }
  }
};

//handling individual patient report generation
module.exports.report = async function (req, res) {
  if (stryMutAct_9fa48("60")) {
    {}
  } else {
    stryCov_9fa48("60");
    try {
      if (stryMutAct_9fa48("61")) {
        {}
      } else {
        stryCov_9fa48("61");
        let patient = await Patient.findOne(stryMutAct_9fa48("62") ? {} : (stryCov_9fa48("62"), {
          phone: req.params.phone
        })).populate(stryMutAct_9fa48("63") ? {} : (stryCov_9fa48("63"), {
          path: stryMutAct_9fa48("64") ? "" : (stryCov_9fa48("64"), "doctor"),
          select: stryMutAct_9fa48("65") ? [] : (stryCov_9fa48("65"), [stryMutAct_9fa48("66") ? "" : (stryCov_9fa48("66"), "name")]) //this will only give the name of the doctor and not the entire doctor details
        }));

        //converting each status code to respective full status name
        if (stryMutAct_9fa48("68") ? false : stryMutAct_9fa48("67") ? true : (stryCov_9fa48("67", "68"), patient)) {
          if (stryMutAct_9fa48("69")) {
            {}
          } else {
            stryCov_9fa48("69");
            if (stryMutAct_9fa48("72") ? patient.status != "neg" : stryMutAct_9fa48("71") ? false : stryMutAct_9fa48("70") ? true : (stryCov_9fa48("70", "71", "72"), patient.status == (stryMutAct_9fa48("73") ? "" : (stryCov_9fa48("73"), "neg")))) patient.status = stryMutAct_9fa48("74") ? "" : (stryCov_9fa48("74"), "Negative");else if (stryMutAct_9fa48("77") ? patient.status != "trav-quar" : stryMutAct_9fa48("76") ? false : stryMutAct_9fa48("75") ? true : (stryCov_9fa48("75", "76", "77"), patient.status == (stryMutAct_9fa48("78") ? "" : (stryCov_9fa48("78"), "trav-quar")))) patient.status = stryMutAct_9fa48("79") ? "" : (stryCov_9fa48("79"), "Travelled-Quarantine");else if (stryMutAct_9fa48("82") ? patient.status != "sym-quar" : stryMutAct_9fa48("81") ? false : stryMutAct_9fa48("80") ? true : (stryCov_9fa48("80", "81", "82"), patient.status == (stryMutAct_9fa48("83") ? "" : (stryCov_9fa48("83"), "sym-quar")))) patient.status = stryMutAct_9fa48("84") ? "" : (stryCov_9fa48("84"), "Symptoms-Quarantine");else if (stryMutAct_9fa48("87") ? patient.status != "pos-admit" : stryMutAct_9fa48("86") ? false : stryMutAct_9fa48("85") ? true : (stryCov_9fa48("85", "86", "87"), patient.status == (stryMutAct_9fa48("88") ? "" : (stryCov_9fa48("88"), "pos-admit")))) patient.status = stryMutAct_9fa48("89") ? "" : (stryCov_9fa48("89"), "Positive-Admit");
            return res.status(200).json(stryMutAct_9fa48("90") ? {} : (stryCov_9fa48("90"), {
              message: stryMutAct_9fa48("91") ? "" : (stryCov_9fa48("91"), "Patient report generated.Here are the details"),
              data: patient
            }));
          }
        } else {
          if (stryMutAct_9fa48("92")) {
            {}
          } else {
            stryCov_9fa48("92");
            return res.status(404).json(stryMutAct_9fa48("93") ? {} : (stryCov_9fa48("93"), {
              message: stryMutAct_9fa48("94") ? "" : (stryCov_9fa48("94"), "Sorry the patient not found.Kindly verify the phone number")
            }));
          }
        }
      }
    } catch (err) {
      if (stryMutAct_9fa48("95")) {
        {}
      } else {
        stryCov_9fa48("95");
        console.log(stryMutAct_9fa48("96") ? "" : (stryCov_9fa48("96"), "Error in single patient report controller"), err);
        return res.status(500).json(stryMutAct_9fa48("97") ? {} : (stryCov_9fa48("97"), {
          message: stryMutAct_9fa48("98") ? "" : (stryCov_9fa48("98"), "Internal server error")
        }));
      }
    }
  }
};

//handling report generation of all patients
module.exports.reportAll = async function (req, res) {
  if (stryMutAct_9fa48("99")) {
    {}
  } else {
    stryCov_9fa48("99");
    try {
      if (stryMutAct_9fa48("100")) {
        {}
      } else {
        stryCov_9fa48("100");
        let patients = await (stryMutAct_9fa48("101") ? Patient.find({})
        //sorting ascending
        .populate({
          path: "doctor",
          select: ["name"]
        }) : (stryCov_9fa48("101"), Patient.find({}).sort(stryMutAct_9fa48("102") ? {} : (stryCov_9fa48("102"), {
          createdAt: 1
        })) //sorting ascending
        .populate(stryMutAct_9fa48("103") ? {} : (stryCov_9fa48("103"), {
          path: stryMutAct_9fa48("104") ? "" : (stryCov_9fa48("104"), "doctor"),
          select: stryMutAct_9fa48("105") ? [] : (stryCov_9fa48("105"), [stryMutAct_9fa48("106") ? "" : (stryCov_9fa48("106"), "name")])
        }))));
        if (stryMutAct_9fa48("108") ? false : stryMutAct_9fa48("107") ? true : (stryCov_9fa48("107", "108"), patients)) {
          if (stryMutAct_9fa48("109")) {
            {}
          } else {
            stryCov_9fa48("109");
            patients.map(patient => {
              if (stryMutAct_9fa48("110")) {
                {}
              } else {
                stryCov_9fa48("110");
                if (stryMutAct_9fa48("113") ? patient.status != "neg" : stryMutAct_9fa48("112") ? false : stryMutAct_9fa48("111") ? true : (stryCov_9fa48("111", "112", "113"), patient.status == (stryMutAct_9fa48("114") ? "" : (stryCov_9fa48("114"), "neg")))) return patient.status = stryMutAct_9fa48("115") ? "" : (stryCov_9fa48("115"), "Negative");else if (stryMutAct_9fa48("118") ? patient.status != "trav-quar" : stryMutAct_9fa48("117") ? false : stryMutAct_9fa48("116") ? true : (stryCov_9fa48("116", "117", "118"), patient.status == (stryMutAct_9fa48("119") ? "" : (stryCov_9fa48("119"), "trav-quar")))) return patient.status = stryMutAct_9fa48("120") ? "" : (stryCov_9fa48("120"), "Travelled-Quarantine");else if (stryMutAct_9fa48("123") ? patient.status != "sym-quar" : stryMutAct_9fa48("122") ? false : stryMutAct_9fa48("121") ? true : (stryCov_9fa48("121", "122", "123"), patient.status == (stryMutAct_9fa48("124") ? "" : (stryCov_9fa48("124"), "sym-quar")))) return patient.status = stryMutAct_9fa48("125") ? "" : (stryCov_9fa48("125"), "Symptoms-Quarantine");else if (stryMutAct_9fa48("128") ? patient.status != "pos-admit" : stryMutAct_9fa48("127") ? false : stryMutAct_9fa48("126") ? true : (stryCov_9fa48("126", "127", "128"), patient.status == (stryMutAct_9fa48("129") ? "" : (stryCov_9fa48("129"), "pos-admit")))) return patient.status = stryMutAct_9fa48("130") ? "" : (stryCov_9fa48("130"), "Positive-Admit");
              }
            });
            return res.status(200).json(stryMutAct_9fa48("131") ? {} : (stryCov_9fa48("131"), {
              message: (stryMutAct_9fa48("132") ? "" : (stryCov_9fa48("132"), "All ")) + patients.length + (stryMutAct_9fa48("133") ? "" : (stryCov_9fa48("133"), " patient report generated")),
              data: patients
            }));
          }
        } else {
          if (stryMutAct_9fa48("134")) {
            {}
          } else {
            stryCov_9fa48("134");
            return res.status(404).json(stryMutAct_9fa48("135") ? {} : (stryCov_9fa48("135"), {
              message: stryMutAct_9fa48("136") ? "" : (stryCov_9fa48("136"), "No patients")
            }));
          }
        }
      }
    } catch (err) {
      if (stryMutAct_9fa48("137")) {
        {}
      } else {
        stryCov_9fa48("137");
        console.log(stryMutAct_9fa48("138") ? "" : (stryCov_9fa48("138"), "Error in all patient report controller"), err);
        return res.status(500).json(stryMutAct_9fa48("139") ? {} : (stryCov_9fa48("139"), {
          message: stryMutAct_9fa48("140") ? "" : (stryCov_9fa48("140"), "Internal server error")
        }));
      }
    }
  }
};

//handling the status change for patients(extra feature)
module.exports.updatestatus = async function (req, res) {
  if (stryMutAct_9fa48("141")) {
    {}
  } else {
    stryCov_9fa48("141");
    try {
      if (stryMutAct_9fa48("142")) {
        {}
      } else {
        stryCov_9fa48("142");
        let patient = await Patient.findOne(stryMutAct_9fa48("143") ? {} : (stryCov_9fa48("143"), {
          phone: req.params.phone
        }));
        if (stryMutAct_9fa48("146") ? false : stryMutAct_9fa48("145") ? true : stryMutAct_9fa48("144") ? patient : (stryCov_9fa48("144", "145", "146"), !patient)) {
          if (stryMutAct_9fa48("147")) {
            {}
          } else {
            stryCov_9fa48("147");
            return res.status(404).json(stryMutAct_9fa48("148") ? {} : (stryCov_9fa48("148"), {
              message: stryMutAct_9fa48("149") ? "" : (stryCov_9fa48("149"), "Patient not found.Kindly verify the phone number")
            }));
          }
        } else {
          if (stryMutAct_9fa48("150")) {
            {}
          } else {
            stryCov_9fa48("150");
            patient.status = req.body.newstatus;
            await patient.save();
            return res.status(200).json(stryMutAct_9fa48("151") ? {} : (stryCov_9fa48("151"), {
              message: stryMutAct_9fa48("152") ? "" : (stryCov_9fa48("152"), "Patient status updated.Here are the updated details"),
              data: patient
            }));
          }
        }
      }
    } catch (err) {
      if (stryMutAct_9fa48("153")) {
        {}
      } else {
        stryCov_9fa48("153");
        console.log(stryMutAct_9fa48("154") ? "" : (stryCov_9fa48("154"), "Error in status change controller"), err);
        return res.status(500).json(stryMutAct_9fa48("155") ? {} : (stryCov_9fa48("155"), {
          message: stryMutAct_9fa48("156") ? "" : (stryCov_9fa48("156"), "Internal server error")
        }));
      }
    }
  }
};

//handling the report generation of all patients of particular status
module.exports.status = async function (req, res) {
  if (stryMutAct_9fa48("157")) {
    {}
  } else {
    stryCov_9fa48("157");
    try {
      if (stryMutAct_9fa48("158")) {
        {}
      } else {
        stryCov_9fa48("158");
        let status;
        let patients = await (stryMutAct_9fa48("159") ? Patient.find({
          status: req.params.status
        }).populate({
          path: "doctor",
          select: ["name"]
        }) : (stryCov_9fa48("159"), Patient.find(stryMutAct_9fa48("160") ? {} : (stryCov_9fa48("160"), {
          status: req.params.status
        })).sort(stryMutAct_9fa48("161") ? {} : (stryCov_9fa48("161"), {
          createdAt: 1
        })).populate(stryMutAct_9fa48("162") ? {} : (stryCov_9fa48("162"), {
          path: stryMutAct_9fa48("163") ? "" : (stryCov_9fa48("163"), "doctor"),
          select: stryMutAct_9fa48("164") ? [] : (stryCov_9fa48("164"), [stryMutAct_9fa48("165") ? "" : (stryCov_9fa48("165"), "name")])
        }))));
        if (stryMutAct_9fa48("169") ? patients.length <= 0 : stryMutAct_9fa48("168") ? patients.length >= 0 : stryMutAct_9fa48("167") ? false : stryMutAct_9fa48("166") ? true : (stryCov_9fa48("166", "167", "168", "169"), patients.length > 0)) {
          if (stryMutAct_9fa48("170")) {
            {}
          } else {
            stryCov_9fa48("170");
            patients.map(patient => {
              if (stryMutAct_9fa48("171")) {
                {}
              } else {
                stryCov_9fa48("171");
                if (stryMutAct_9fa48("174") ? patient.status != "neg" : stryMutAct_9fa48("173") ? false : stryMutAct_9fa48("172") ? true : (stryCov_9fa48("172", "173", "174"), patient.status == (stryMutAct_9fa48("175") ? "" : (stryCov_9fa48("175"), "neg")))) {
                  if (stryMutAct_9fa48("176")) {
                    {}
                  } else {
                    stryCov_9fa48("176");
                    status = stryMutAct_9fa48("177") ? "" : (stryCov_9fa48("177"), "Negative");
                    return patient.status = status;
                  }
                } else if (stryMutAct_9fa48("180") ? patient.status != "trav-quar" : stryMutAct_9fa48("179") ? false : stryMutAct_9fa48("178") ? true : (stryCov_9fa48("178", "179", "180"), patient.status == (stryMutAct_9fa48("181") ? "" : (stryCov_9fa48("181"), "trav-quar")))) {
                  if (stryMutAct_9fa48("182")) {
                    {}
                  } else {
                    stryCov_9fa48("182");
                    status = stryMutAct_9fa48("183") ? "" : (stryCov_9fa48("183"), "Travelled-Quarantine");
                    return patient.status = status;
                  }
                } else if (stryMutAct_9fa48("186") ? patient.status != "sym-quar" : stryMutAct_9fa48("185") ? false : stryMutAct_9fa48("184") ? true : (stryCov_9fa48("184", "185", "186"), patient.status == (stryMutAct_9fa48("187") ? "" : (stryCov_9fa48("187"), "sym-quar")))) {
                  if (stryMutAct_9fa48("188")) {
                    {}
                  } else {
                    stryCov_9fa48("188");
                    status = stryMutAct_9fa48("189") ? "" : (stryCov_9fa48("189"), "Symptoms-Quarantine");
                    return patient.status = status;
                  }
                } else if (stryMutAct_9fa48("192") ? patient.status != "pos-admit" : stryMutAct_9fa48("191") ? false : stryMutAct_9fa48("190") ? true : (stryCov_9fa48("190", "191", "192"), patient.status == (stryMutAct_9fa48("193") ? "" : (stryCov_9fa48("193"), "pos-admit")))) {
                  if (stryMutAct_9fa48("194")) {
                    {}
                  } else {
                    stryCov_9fa48("194");
                    status = stryMutAct_9fa48("195") ? "" : (stryCov_9fa48("195"), "Positive-Admit");
                    return patient.status = status;
                  }
                }
              }
            });
            return res.status(200).json(stryMutAct_9fa48("196") ? {} : (stryCov_9fa48("196"), {
              message: (stryMutAct_9fa48("197") ? "" : (stryCov_9fa48("197"), "All ")) + patients.length + (stryMutAct_9fa48("198") ? "" : (stryCov_9fa48("198"), " patient with status ")) + status + (stryMutAct_9fa48("199") ? "" : (stryCov_9fa48("199"), " report generated")),
              data: patients
            }));
          }
        } else {
          if (stryMutAct_9fa48("200")) {
            {}
          } else {
            stryCov_9fa48("200");
            return res.status(404).json(stryMutAct_9fa48("201") ? {} : (stryCov_9fa48("201"), {
              message: stryMutAct_9fa48("202") ? "" : (stryCov_9fa48("202"), "No patients found")
            }));
          }
        }
      }
    } catch (err) {
      if (stryMutAct_9fa48("203")) {
        {}
      } else {
        stryCov_9fa48("203");
        console.log(stryMutAct_9fa48("204") ? "" : (stryCov_9fa48("204"), "Error in all patient report controller"), err);
        return res.status(500).json(stryMutAct_9fa48("205") ? {} : (stryCov_9fa48("205"), {
          message: stryMutAct_9fa48("206") ? "" : (stryCov_9fa48("206"), "Internal server error")
        }));
      }
    }
  }
};