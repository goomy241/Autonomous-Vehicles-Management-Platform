const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const crypto = require('crypto');
const ENC= 'bf3c199c2470cb477d907b1e0917c17b';
const IV = "5183666c72eec9e4";
const ALGO = "aes-256-cbc"

function encrypt (text) {
  let cipher = crypto.createCipheriv(ALGO, ENC, IV);
  let encrypted = cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
 };

 function decrypt (text) {
   let decipher = crypto.createDecipheriv(ALGO, ENC, IV);
   let decrypted = decipher.update(text, 'base64', 'utf8');
   return (decrypted + decipher.final('utf8'));
};


async function getMultipleUsers(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM users LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}


async function postUser(user){
  var pw_sha = encrypt(user.user_pw);
  // console.log(pw_sha);

  const result = await db.query(
    `INSERT INTO users(user_name, user_pw, user_email, user_phone)
    VALUES 
    ('${user.user_name}', '${pw_sha}', '${user.user_email}', '${user.user_phone}')`
  );

  let message = 'Error in creating user.';

  if (result.affectedRows) {
    message = 'New user created successfully';
  }

  return {message};
}


async function loginUser(user){
  const result = await db.query(
    `SELECT user_pw FROM users WHERE user_name = '${user.user_name}'`
  );
  console.log(result);

// ref: https://stackoverflow.com/questions/48782788/convert-nodejs-mysql-result-to-accessible-json-object
  var jsonObj = Object.assign({}, result[0]);
  console.log(jsonObj.user_pw);

  var pw_sha = decrypt(jsonObj.user_pw);
  console.log(pw_sha);

  if (pw_sha === user.user_pw) 
    message = 'Log in successfully!';
  else 
    message = 'Error in logging in.';

  return {message};
}


async function deleteUser(user_name){
  const result = await db.query(
    `DELETE FROM users WHERE user_name='${user_name}'`
  );

  let message = 'Error in deleting user';

  if (result.affectedRows) {
    message = 'user deleted successfully';
  }

  return {message};
}

  module.exports = {
  getMultipleUsers,
  postUser,
  loginUser,
  deleteUser
}