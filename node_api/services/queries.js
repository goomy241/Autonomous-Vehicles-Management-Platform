const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(table_name){
  const rows = await db.query(
    `SELECT * FROM ${table_name}`
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}


// *********** USERS ***********

async function postUser(user){
  var username = 'not_valid';
  var pw_sha = helper.encrypt(user.user_pw);
  // console.log(pw_sha);

  const result = await db.query(
    `INSERT INTO users(user_name, user_pw, user_email, user_phone)
    VALUES 
    ('${user.user_name}', '${pw_sha}', '${user.user_email}', '${user.user_phone}')`
  );

  let message = 'Error in creating user. ';

  if (result.affectedRows) {
    message = 'New user created successfully!';
    username = user.user_name;
  }

  return {username, message};
}


async function loginUser(user){
  var username = 'not_valid';
  const result = await db.query(
    `SELECT user_pw FROM users WHERE user_name = '${user.user_name}'`
  );
  // console.log(result);

// ref: https://stackoverflow.com/questions/48782788/convert-nodejs-mysql-result-to-accessible-json-object
  var jsonObj = Object.assign({}, result[0]);
  // console.log(jsonObj);
  if (Object.keys(jsonObj).length === 0) {
    // throw new Error('User does not exist');
    message = 'User does not exist';
  } else {
    var pw_sha = helper.decrypt(jsonObj.user_pw);
    // console.log(pw_sha);

    if (pw_sha === user.user_pw) {
      message = 'Log in successfully!';
      username = user.user_name;
    }
    else 
      // throw new Error('Password does not match');
      message = 'Password does not match';
  }

  return {username, message};
}


async function deleteUser(user_name){
  const result = await db.query(
    `DELETE FROM users WHERE user_name='${user_name}'`
  );

  let message = 'Error in deleting user. ';

  if (result.affectedRows) {
    message = 'User deleted successfully!';
  }

  return {message};
}


async function getOneUser(user_name){
  const row = await db.query(
    `SELECT * FROM users WHERE user_name='${user_name}'`
  );

  const data = helper.emptyOrRows(row);

  return {
    data
  }
}


async function putUser(user, user_name){
  var new_pw_sha = helper.encrypt(user.user_pw);
  const query = 'UPDATE `users` SET user_pw = ?, user_email = ?, user_phone = ? WHERE user_name = ?';
  const result = await db.query(query, [new_pw_sha, user.user_email, user.user_phone, user_name]);

  let message = 'Error in updating user. ';

  if (result.affectedRows) {
    message = 'User updated successfully!';
  }

  return {message};
}


// *********** ADMINS ***********

async function postAdmin(admin){
  var pw_sha = helper.encrypt(admin.admin_pw);
  // console.log(pw_sha);

  const result = await db.query(
    `INSERT INTO admins VALUES ('${admin.admin_id}', '${pw_sha}')`);

  let message = 'Error in adding admin. ';

  if (result.affectedRows) {
    message = 'New admin created successfully!';
  }

  return {message};
}


async function loginAdmin(admin){
  var admin_id = 'not_valid';
  const result = await db.query(
    `SELECT admin_pw FROM admins WHERE admin_id = '${admin.admin_id}'`
  );
  // console.log(result);

  var jsonObj = Object.assign({}, result[0]);
  // console.log(jsonObj);

  if (Object.keys(jsonObj).length === 0) {
    message = 'Admin does not exist';
  } else {
    var pw_sha = helper.decrypt(jsonObj.admin_pw);
    // console.log(pw_sha);

    if (pw_sha === admin.admin_pw) {
      message = 'Log in successfully!';
      admin_id = admin.admin_id;
    }
    else 
      message = 'Error in logging in. ';
  }

  return {admin_id, message};
}


// *********** CARS ***********

async function postCar(car){
  const result = await db.query(
    `INSERT INTO cars (use_state, car_type, car_loc_x, car_loc_y)
    VALUES 
    ('${car.use_state}', '${car.car_type}', '${car.car_loc_x}', '${car.car_loc_y}')`
  );

  let message = 'Error in posting a car. ';

  if (result.affectedRows) {
    message = 'New car posted successfully!';
  }

  return {message};
}


async function getOneCar(car_id){
  const row = await db.query(
    `SELECT * FROM cars WHERE car_id='${car_id}'`
  );

  const data = helper.emptyOrRows(row);

  return {
    data
  }
}


async function deleteCar(car_id){
  const result = await db.query(
    `DELETE FROM cars WHERE car_id='${car_id}'`
  );

  let message = 'Error in deleting car. ';

  if (result.affectedRows) {
    message = 'Car deleted successfully!';
  }

  return {message};
}


async function putCar(car, car_id){
  const query = 'UPDATE `cars` SET moving_state = ?, car_loc_x = ?, car_loc_y = ? WHERE car_id = ?';
  const result = await db.query( query, [car.moving_state, car.car_loc_x, car.car_loc_y, car_id]);

  let message = 'Error in updating car info. ';

  if (result.affectedRows) {
    message = 'Car info updated successfully!';
  }

  return {message};
}

async function getAvailableCar(){
  const row = await db.query(
    `SELECT * FROM cars WHERE use_state = 'connected'`
  );

  const data = helper.emptyOrRows(row);

  return {
    data
  }
}

// async function getCarNearBy(location){
//   var radius = location.radius;
//   const query = `SELECT * FROM cars WHERE use_state = 'idle' AND car_loc_x BETWEEN ? AND ? AND car_loc_y BETWEEN ? AND ?`;
//   const rows = await db.query(query, [location.x - radius, location.x + radius, location.y - radius, location.y + radius]);

//   const data = helper.emptyOrRows(rows);

//   return {
//     data
//   }
// }

// *********** BOOKINGS ***********

async function postBooking(booking, user_name){
  const query = `INSERT INTO bookings (reserve_time, start_loc, destination_loc, customer_name, b_car_id)
    VALUES (?, ?, ?, ?, ?)`;

  // ref: https://stackoverflow.com/questions/85116/display-date-time-in-users-locale-format-and-time-offset
  var time = new Date();
  time_local = new Date(time.getTime() - time.getTimezoneOffset() * 60000);
  console.log(time);
  console.log(time_local);
  const result = await db.query( query, [time, booking.start_loc, booking.destination_loc, user_name, booking.car_id]);
  var booking_id = null;
  
  let message = 'Error in posting booking. ';

  if (result.affectedRows) {
    message = 'New booking posted successfully!';
    var convert = time_local.toISOString().slice(0, 19).replace('T', ' ');
    console.log(convert);
    const buffer = await db.query(
        `SELECT booking_id FROM bookings WHERE reserve_time = '${convert}'`
    );
    var jsonObj = Object.assign({}, buffer[0]);
    booking_id = jsonObj.booking_id;
  }

  return {booking_id, message};
}


async function getBookings(user_name){
  const row = await db.query(
    `SELECT * FROM bookings WHERE customer_name='${user_name}'`
  );

  const data = helper.emptyOrRows(row);

  return {
    data
  }
}

// *********** TRIP ***********

async function postStart(booking_id){
  // get booking info first
  const pre = await db.query(
    `SELECT b_car_id as car_id, customer_name FROM bookings WHERE booking_id = '${booking_id}'`
  );

  var jsonObj = Object.assign({}, pre[0]);

  // inser start time to orders
  const query = `INSERT INTO orders (start_time, customer_name, o_booking_id)
    VALUES (?, ?, ?)`;
  const result = await db.query( query, [new Date(), jsonObj.customer_name, booking_id]);

  // change car state to "active"
  const after = await db.query(
    `UPDATE cars SET use_state = 'active' WHERE car_id = '${jsonObj.car_id}'`
  );

  let message = 'Error in starting trip. ';
  if (result.affectedRows) {
    message = 'Trip started successfully!';
  }

  return {message};
}


async function putPickup(booking_id){
  // inser pickup time to orders
  const query = `UPDATE orders SET pickup_time = ? WHERE o_booking_id = ?`;
  const result = await db.query( query, [new Date(), booking_id] );

  let message = 'Error in insert pickup time. ';
  if (result.affectedRows) {
    message = 'Pickup time inserted successfully!';
  }

  return {message};
}


async function putEnd(invoice, booking_id){
  // get booking info first
  const pre = await db.query(
    `SELECT b_car_id as car_id, customer_name FROM bookings WHERE booking_id = '${booking_id}'`
  );

  var jsonObj = Object.assign({}, pre[0]);

  // inser end time to orders
  const query = `UPDATE orders SET finish_time = ?, cost = ?, distance = ? WHERE o_booking_id = ?`;
  const result = await db.query( query, [new Date(), invoice.cost, invoice.distance, booking_id]);

  // change car state to "connected" which indicates it can be booked later
  const after = await db.query(
    `UPDATE cars SET use_state = 'connected' WHERE car_id = '${jsonObj.car_id}'`
  );

  let message = 'Error in ending trip. ';
  if (result.affectedRows) {
    message = 'Trip end successfully!';
  }

  return {message};
}

  module.exports = {
  getMultiple,
  postUser,
  loginUser,
  deleteUser,
  getOneUser,
  putUser,
  postAdmin,
  loginAdmin,
  postCar,
  getOneCar,
  deleteCar,
  putCar,
  getAvailableCar,
  // getCarNearBy,
  postBooking,
  getBookings,
  postStart,
  putPickup,
  putEnd
}