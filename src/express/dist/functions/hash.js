"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64Dencode = exports.base64Encode = exports.hashTransaction = void 0;
const { createHash } = require('crypto');
const hashTransaction = (txn) => {
    console.log(txn);
    let hash = createHash('sha256').update(txn).digest('base64');
    console.log(hash);
    return hash;
};
exports.hashTransaction = hashTransaction;
const base64Encode = (txn) => {
    return Buffer.from(txn).toString('base64');
};
exports.base64Encode = base64Encode;
const base64Dencode = (txn) => {
    console.log();
    return Buffer.from(txn, 'base64').toString('ascii');
};
exports.base64Dencode = base64Dencode;
function tokenizeByPlus(txn) {
    return txn.split("+");
}
console.log((0, exports.base64Dencode)(`U3dlZXRzIGZyb20gU3Bhcis4OS45Nis1M2JmZjQ3YS01OWJkLTRhZjMtYmFjNS0wNGIyODc5YTNlZTErK2RlYml0K2NlZDY2YjFiLWJlODgtNDE2My04YmExLTc3MjA3ZWMyMGNhOStlNDM2MWRiMi0yYWEwLTQyZGMtYThjYi0yMDk0M2RmNWFkM2QrMjAyNS0xMC0wMisyKzQwKzEwK09jdCsyMDI1`)); // 
const tokens = tokenizeByPlus((0, exports.base64Dencode)("U3dlZXRzIGZyb20gU3Bhcis4OS45Nis1M2JmZjQ3YS01OWJkLTRhZjMtYmFjNS0wNGIyODc5YTNlZTErK2RlYml0K2NlZDY2YjFiLWJlODgtNDE2My04YmExLTc3MjA3ZWMyMGNhOStlNDM2MWRiMi0yYWEwLTQyZGMtYThjYi0yMDk0M2RmNWFkM2QrMjAyNS0xMC0wMisyKzQwKzEwK09jdCsyMDI1"));
console.log(tokens);
