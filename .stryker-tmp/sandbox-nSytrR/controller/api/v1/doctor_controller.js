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
const Doctor = require('../../../models/doctor');
const jwt = require('jsonwebtoken');

// handling new doctor registration
module.exports.create = async function (req, res) {
  if (stryMutAct_9fa48("0")) {
    {}
  } else {
    stryCov_9fa48("0");
    try {
      if (stryMutAct_9fa48("1")) {
        {}
      } else {
        stryCov_9fa48("1");
        if (stryMutAct_9fa48("4") ? req.body.password == req.body.confirm_password : stryMutAct_9fa48("3") ? false : stryMutAct_9fa48("2") ? true : (stryCov_9fa48("2", "3", "4"), req.body.password != req.body.confirm_password)) {
          if (stryMutAct_9fa48("5")) {
            {}
          } else {
            stryCov_9fa48("5");
            return res.status(200).json(stryMutAct_9fa48("6") ? {} : (stryCov_9fa48("6"), {
              message: stryMutAct_9fa48("7") ? "" : (stryCov_9fa48("7"), 'Passwords do not match')
            }));
          }
        } else {
          if (stryMutAct_9fa48("8")) {
            {}
          } else {
            stryCov_9fa48("8");
            let doctor = await Doctor.findOne(stryMutAct_9fa48("9") ? {} : (stryCov_9fa48("9"), {
              email: req.body.email
            }));
            if (stryMutAct_9fa48("11") ? false : stryMutAct_9fa48("10") ? true : (stryCov_9fa48("10", "11"), doctor)) {
              if (stryMutAct_9fa48("12")) {
                {}
              } else {
                stryCov_9fa48("12");
                return res.status(200).json(stryMutAct_9fa48("13") ? {} : (stryCov_9fa48("13"), {
                  message: stryMutAct_9fa48("14") ? "" : (stryCov_9fa48("14"), 'You are already registered.Please signin')
                }));
              }
            } else {
              if (stryMutAct_9fa48("15")) {
                {}
              } else {
                stryCov_9fa48("15");
                await Doctor.create(req.body);
                return res.status(200).json(stryMutAct_9fa48("16") ? {} : (stryCov_9fa48("16"), {
                  message: stryMutAct_9fa48("17") ? "" : (stryCov_9fa48("17"), 'You have successfully signed up')
                }));
              }
            }
          }
        }
      }
    } catch (err) {
      if (stryMutAct_9fa48("18")) {
        {}
      } else {
        stryCov_9fa48("18");
        console.log(stryMutAct_9fa48("19") ? "" : (stryCov_9fa48("19"), "Error in doctor create controller"), err);
        return res.status(500).json(stryMutAct_9fa48("20") ? {} : (stryCov_9fa48("20"), {
          message: stryMutAct_9fa48("21") ? "" : (stryCov_9fa48("21"), "Internal server error")
        }));
      }
    }
  }
};

//handling doctor signin
module.exports.createSession = async function (req, res) {
  if (stryMutAct_9fa48("22")) {
    {}
  } else {
    stryCov_9fa48("22");
    try {
      if (stryMutAct_9fa48("23")) {
        {}
      } else {
        stryCov_9fa48("23");
        let doctor = await Doctor.findOne(stryMutAct_9fa48("24") ? {} : (stryCov_9fa48("24"), {
          email: req.body.email
        }));
        if (stryMutAct_9fa48("27") ? !doctor && doctor.password != req.body.password : stryMutAct_9fa48("26") ? false : stryMutAct_9fa48("25") ? true : (stryCov_9fa48("25", "26", "27"), (stryMutAct_9fa48("28") ? doctor : (stryCov_9fa48("28"), !doctor)) || (stryMutAct_9fa48("30") ? doctor.password == req.body.password : stryMutAct_9fa48("29") ? false : (stryCov_9fa48("29", "30"), doctor.password != req.body.password)))) {
          if (stryMutAct_9fa48("31")) {
            {}
          } else {
            stryCov_9fa48("31");
            return res.status(422).json(stryMutAct_9fa48("32") ? {} : (stryCov_9fa48("32"), {
              message: stryMutAct_9fa48("33") ? "" : (stryCov_9fa48("33"), "Invalid username/password")
            }));
          }
        }
        return res.status(200).json(stryMutAct_9fa48("34") ? {} : (stryCov_9fa48("34"), {
          message: stryMutAct_9fa48("35") ? "" : (stryCov_9fa48("35"), 'Sign in successful.Here is your token'),
          data: stryMutAct_9fa48("36") ? {} : (stryCov_9fa48("36"), {
            //this will generate the jwt token and send in response
            token: jwt.sign(doctor.toJSON(), stryMutAct_9fa48("37") ? "" : (stryCov_9fa48("37"), 'verysecret'), stryMutAct_9fa48("38") ? {} : (stryCov_9fa48("38"), {
              expiresIn: stryMutAct_9fa48("39") ? "" : (stryCov_9fa48("39"), '1h')
            }))
          })
        }));
      }
    } catch (err) {
      if (stryMutAct_9fa48("40")) {
        {}
      } else {
        stryCov_9fa48("40");
        console.log(stryMutAct_9fa48("41") ? "" : (stryCov_9fa48("41"), 'Error in doctor create session controller'), err);
        return res.status(500).json(stryMutAct_9fa48("42") ? {} : (stryCov_9fa48("42"), {
          message: stryMutAct_9fa48("43") ? "" : (stryCov_9fa48("43"), "Internal server error")
        }));
      }
    }
  }
};