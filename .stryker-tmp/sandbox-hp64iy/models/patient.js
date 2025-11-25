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

//schema for patients
const patientSchema = new mongoose.Schema(stryMutAct_9fa48("224") ? {} : (stryCov_9fa48("224"), {
  name: stryMutAct_9fa48("225") ? {} : (stryCov_9fa48("225"), {
    type: String,
    required: stryMutAct_9fa48("226") ? false : (stryCov_9fa48("226"), true)
  }),
  phone: stryMutAct_9fa48("227") ? {} : (stryCov_9fa48("227"), {
    type: Number,
    required: stryMutAct_9fa48("228") ? false : (stryCov_9fa48("228"), true),
    unique: stryMutAct_9fa48("229") ? false : (stryCov_9fa48("229"), true)
  }),
  age: stryMutAct_9fa48("230") ? {} : (stryCov_9fa48("230"), {
    type: Number,
    required: stryMutAct_9fa48("231") ? false : (stryCov_9fa48("231"), true)
  }),
  status: stryMutAct_9fa48("232") ? {} : (stryCov_9fa48("232"), {
    type: String,
    enum: stryMutAct_9fa48("233") ? [] : (stryCov_9fa48("233"), [stryMutAct_9fa48("234") ? "" : (stryCov_9fa48("234"), "neg"), stryMutAct_9fa48("235") ? "" : (stryCov_9fa48("235"), "trav-quar"), stryMutAct_9fa48("236") ? "" : (stryCov_9fa48("236"), "sym-quar"), stryMutAct_9fa48("237") ? "" : (stryCov_9fa48("237"), "pos-admit")]),
    required: stryMutAct_9fa48("238") ? false : (stryCov_9fa48("238"), true)
  }),
  doctor: stryMutAct_9fa48("239") ? {} : (stryCov_9fa48("239"), {
    type: mongoose.Schema.Types.ObjectId,
    ref: stryMutAct_9fa48("240") ? "" : (stryCov_9fa48("240"), "Doctor")
  })
}), stryMutAct_9fa48("241") ? {} : (stryCov_9fa48("241"), {
  timestamps: stryMutAct_9fa48("242") ? false : (stryCov_9fa48("242"), true)
}));
const Patient = mongoose.model(stryMutAct_9fa48("243") ? "" : (stryCov_9fa48("243"), "Patient"), patientSchema);
module.exports = Patient;