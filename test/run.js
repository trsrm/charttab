const fs = require('fs');
const vm = require('vm');

// Minimal test framework
const tests = [];
let beforeEachFns = [];

global.describe = function(desc, fn){ console.log(desc); fn(); };
global.it = function(desc, fn){ tests.push({desc, fn}); };
global.beforeEach = function(fn){ beforeEachFns.push(fn); };
global.expect = function(actual){ return { toBe: expected => { if(actual !== expected) throw new Error(`Expected ${actual} to be ${expected}`); }, toEqual: expected => { const a=JSON.stringify(actual); const b=JSON.stringify(expected); if(a!==b) throw new Error(`Expected ${a} to equal ${b}`); }}; };

async function run(){
  for(const t of tests){
    for(const fn of beforeEachFns){ await fn(); }
    try {
      await t.fn();
      console.log('\u2713', t.desc);
    } catch (e){
      console.error('\u2717', t.desc);
      console.error(e);
      process.exitCode = 1;
    }
  }
}

const moment = require('moment');
const $q = { defer(){ let resolve, reject; const promise = new Promise((res, rej)=>{resolve=res;reject=rej;}); return {resolve, reject, promise}; } };

function createAngular(){
  const modules = {};
  function module(name){
    if(!modules[name]){
      const services = {};
      const constants = {};
      modules[name] = {
        services,
        constants,
        constant(name, value){ constants[name]=value; },
        value(name,value){ constants[name]=value; },
        service(name, fn){ services[name] = {}; fn.call(services[name], $q, moment, constants.config, constants.uid); }
      };
    }
    return modules[name];
  }
  return {module, forEach(obj, iterator){ if(Array.isArray(obj)){ obj.forEach(iterator); } else { for(const k in obj) if(Object.prototype.hasOwnProperty.call(obj,k)) iterator(obj[k], k); } }};
}

const angular = createAngular();
const chrome = { storage:{ sync:{ _data:{}, set(obj,cb){Object.assign(this._data,obj);cb&&cb();}, get(key,cb){ if(key===null) cb({...this._data}); else { const r={}; r[key]=this._data[key]; cb(r); } }, remove(key,cb){ delete this._data[key]; cb&&cb(); } } } };
global.chrome = chrome;

const mod = angular.module('charttab');
mod.constant('config', {dateFormat:'YYYY-MM-DD', dateTimeFormat:'YYYY-MM-DD HH:mm:ss'});
mod.constant('uid', ()=> 'testuid');

const code = fs.readFileSync('app/scripts/services/krs.js','utf8');
vm.runInNewContext(code, {angular, chrome, moment, console});

global.krs = angular.module('charttab').services.krs;

require('./krs.spec.js');

run();
