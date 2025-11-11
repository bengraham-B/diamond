const { createHash } = require('crypto');

export const hashTransaction = (txn: string) => {
    console.log(txn)
    let hash = createHash('sha256').update(txn).digest('base64');
    console.log(hash)
    return hash
}

export const base64Encode = (txn: string) => {
    return Buffer.from(txn).toString('base64')
}

export const base64Dencode = (txn: string) => {
    console.log()
    return Buffer.from(txn, 'base64').toString('ascii')
}

function tokenizeByPlus(txn: string) {
  return txn.split("+");
}
console.log(
    base64Dencode(`U3dlZXRzIGZyb20gU3Bhcis4OS45Nis1M2JmZjQ3YS01OWJkLTRhZjMtYmFjNS0wNGIyODc5YTNlZTErK2RlYml0K2NlZDY2YjFiLWJlODgtNDE2My04YmExLTc3MjA3ZWMyMGNhOStlNDM2MWRiMi0yYWEwLTQyZGMtYThjYi0yMDk0M2RmNWFkM2QrMjAyNS0xMC0wMisyKzQwKzEwK09jdCsyMDI1`))// 
    const tokens = tokenizeByPlus(base64Dencode("U3dlZXRzIGZyb20gU3Bhcis4OS45Nis1M2JmZjQ3YS01OWJkLTRhZjMtYmFjNS0wNGIyODc5YTNlZTErK2RlYml0K2NlZDY2YjFiLWJlODgtNDE2My04YmExLTc3MjA3ZWMyMGNhOStlNDM2MWRiMi0yYWEwLTQyZGMtYThjYi0yMDk0M2RmNWFkM2QrMjAyNS0xMC0wMisyKzQwKzEwK09jdCsyMDI1"));

console.log(tokens);
