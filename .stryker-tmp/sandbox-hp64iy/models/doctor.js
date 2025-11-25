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
const mongoose = require("mongoose");

// schema for doctor
const doctorSchema = new mongoose.Schema(stryMutAct_9fa48("213") ? {} : (stryCov_9fa48("213"), {
  name: stryMutAct_9fa48("214") ? {} : (stryCov_9fa48("214"), {
    type: String,
    required: stryMutAct_9fa48("215") ? false : (stryCov_9fa48("215"), true)
  }),
  email: stryMutAct_9fa48("216") ? {} : (stryCov_9fa48("216"), {
    type: String,
    required: stryMutAct_9fa48("217") ? false : (stryCov_9fa48("217"), true),
    unique: stryMutAct_9fa48("218") ? false : (stryCov_9fa48("218"), true)
  }),
  password: stryMutAct_9fa48("219") ? {} : (stryCov_9fa48("219"), {
    type: String,
    required: stryMutAct_9fa48("220") ? false : (stryCov_9fa48("220"), true)
  })
}), stryMutAct_9fa48("221") ? {} : (stryCov_9fa48("221"), {
  timestamps: stryMutAct_9fa48("222") ? false : (stryCov_9fa48("222"), true)
}));
const Doctor = mongoose.model(stryMutAct_9fa48("223") ? "" : (stryCov_9fa48("223"), "Doctor"), doctorSchema);
module.exports = Doctor;