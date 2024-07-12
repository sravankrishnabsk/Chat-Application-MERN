const express = require('express');
const registerUser = require('../controllers/registerUser');
const checkEmail = require('../controllers/checkEmail');
const checkPassword = require('../controllers/checkPassword');
const userDetails = require('../controllers/userDetails');
const logout = require('../controllers/logout');
const updateUserDetails = require('../controllers/updateUserDetails');

const router = express.Router();

// CREATE USER API
router.post('/register',registerUser);

// CHECK EMAIL
router.post('/email',checkEmail);
// CHECK PASSWORD
router.post('/password',checkPassword);
// LOGIN USER DETAILS
router.get('/user-details',userDetails)
// LOGOUT USER
router.get('/logout',logout);
// UPDATE USER DETAILS
router.post('/update-user',updateUserDetails);

module.exports = router;