// @ts-nocheck
// const express = require('express');
// const app=express();
// const port = 8000;
// const db = require('./config/mongoose');
// const passport = require('passport');

// app.use(express.urlencoded({extended: false}));

// //all routes will be forwarded to routes folder
// app.use('/',require('./routes'));

// //server running
// app.listen(port,function(err){
//     if(err){
//         console.log("error in creating server",err);
//         return;
//     }
//     console.log("Server running on port "+port);
// })

// index.js
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
const app = require('./app');
const db = require('./config/mongoose');
const port = 8000;

// start the server only when running the app, not in tests
app.listen(port, function (err) {
  if (stryMutAct_9fa48("207")) {
    {}
  } else {
    stryCov_9fa48("207");
    if (stryMutAct_9fa48("209") ? false : stryMutAct_9fa48("208") ? true : (stryCov_9fa48("208", "209"), err)) {
      if (stryMutAct_9fa48("210")) {
        {}
      } else {
        stryCov_9fa48("210");
        console.log(stryMutAct_9fa48("211") ? "" : (stryCov_9fa48("211"), 'error in creating server'), err);
        return;
      }
    }
    console.log((stryMutAct_9fa48("212") ? "" : (stryCov_9fa48("212"), 'Server running on port ')) + port);
  }
});