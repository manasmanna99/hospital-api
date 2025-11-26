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
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('../../../config/passport-jwt-strategy');
const patientController = require('../../../controller/api/v1/patient_controller');

//after the jwt authenticates the doctor details then it forwards to respective controller
router.post(stryMutAct_9fa48("48") ? "" : (stryCov_9fa48("48"), '/register'), passport.authenticate(stryMutAct_9fa48("49") ? "" : (stryCov_9fa48("49"), 'jwt'), stryMutAct_9fa48("50") ? {} : (stryCov_9fa48("50"), {
  session: stryMutAct_9fa48("51") ? true : (stryCov_9fa48("51"), false)
})), patientController.create);
router.get(stryMutAct_9fa48("52") ? "" : (stryCov_9fa48("52"), '/create_report/:phone'), passport.authenticate(stryMutAct_9fa48("53") ? "" : (stryCov_9fa48("53"), 'jwt'), stryMutAct_9fa48("54") ? {} : (stryCov_9fa48("54"), {
  session: stryMutAct_9fa48("55") ? true : (stryCov_9fa48("55"), false)
})), patientController.report);
router.get(stryMutAct_9fa48("56") ? "" : (stryCov_9fa48("56"), '/all_reports'), passport.authenticate(stryMutAct_9fa48("57") ? "" : (stryCov_9fa48("57"), 'jwt'), stryMutAct_9fa48("58") ? {} : (stryCov_9fa48("58"), {
  session: stryMutAct_9fa48("59") ? true : (stryCov_9fa48("59"), false)
})), patientController.reportAll);
router.get(stryMutAct_9fa48("60") ? "" : (stryCov_9fa48("60"), '/update_status/:phone'), passport.authenticate(stryMutAct_9fa48("61") ? "" : (stryCov_9fa48("61"), 'jwt'), stryMutAct_9fa48("62") ? {} : (stryCov_9fa48("62"), {
  session: stryMutAct_9fa48("63") ? true : (stryCov_9fa48("63"), false)
})), patientController.updatestatus);
router.get(stryMutAct_9fa48("64") ? "" : (stryCov_9fa48("64"), '/status/:status'), passport.authenticate(stryMutAct_9fa48("65") ? "" : (stryCov_9fa48("65"), 'jwt'), stryMutAct_9fa48("66") ? {} : (stryCov_9fa48("66"), {
  session: stryMutAct_9fa48("67") ? true : (stryCov_9fa48("67"), false)
})), patientController.status);
module.exports = router;