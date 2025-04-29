const User = require('../models/user-model');
const bcrypt = require('bcryptjs');
const home = async (req, res) => {
  try {
    console.log('this is home page');
    res
      .status(200)
      .send(
        'Welcome to registration Page usign router using registration routerrrr'
      );
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  console.log('this is register page');
  try {
    console.log(req.body);
    console.log('register page ');
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ message: 'email already exists' });
    }
    const usercreated = await User.create({ username, email, phone, password });
    res.status(201).json({
      msg: ' user created Successfully',
      // msg: usercreated,
      token: await usercreated.generateToken(),
      userId: usercreated._id.toString(),
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
const login = async (req, res) => {
  try {
    console.log(req.body);
    console.log('this is the login form');
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }
    const userexits = await User.findOne({ email: email });
    console.log(userexits);

    if (!userexits) {
      return res.status(400).json({ message: 'Invalid Credentals' });
    }

    // const isppasswordmatch = await bcrypt.compare(password, userexits.password);

    const isppasswordmatch = await bcrypt.compare(password, userexits.password);

    if (isppasswordmatch) {
      res.status(200).json({
        message: 'Login successfully',
        token: await userexits.generateToken(),
        userId: userexits._id.toString(),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Internal server error !!' });
    console.log(error);
  }
};

const user = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ userData });
  } catch (error) {
    console.log(`error from the user route ${error}`);
  }
};

const fetcheduser = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalUsersdetails = await User.find({}, { password: 0 });
    console.log('Admin :successfully fetched user data ', totalUsers);
    return res.status(200).json({ totalUsers, totalUsersdetails });
  } catch (error) {
    console.log('fetching users data');
  }
};

const deleteuser = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('your userID is ', userId);
    // Try to find and delete the exam by ID
    const deleteuser = await User.findByIdAndDelete(userId);

    if (!deleteuser) {
      return res.status(404).json({ message: 'user not found' });
    }

    return res.status(200).json({
      message: 'USER deleted successfully',
      deleteuser,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting USER' });
  }
};

const updateuser = async (req, res) => {
  try {
    const { userId } = req.params;
    const updateuserdetails = req.body;
    const updateusers = await User.findByIdAndUpdate(
      userId,
      updateuserdetails,
      {
        new: true,
      }
    );
    if (!updateusers) {
      return res.status(404).json({ message: 'User  not found' });
    }

    return res.status(200).json(updateusers);
  } catch (error) {
    console.log('error in updating the user details ');
    return res
      .status(400)
      .json({ message: 'error in updating the user details' });
  }
};
module.exports = {
  home,
  register,
  login,
  user,
  fetcheduser,
  deleteuser,
  updateuser,
};
