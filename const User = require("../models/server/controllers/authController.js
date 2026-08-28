const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {

  return jwt.sign(
    {
      id: user._id,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d"
    }
  );

};


exports.register = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      collegeId,
      department,
      year
    } = req.body;


    const existingUser =
      await User.findOne({
        $or: [
          { email },
          { collegeId }
        ]
      });


    if (existingUser) {

      return res.status(400).json({
        message:
          "Email or College ID already exists"
      });

    }


    const hashedPassword =
      await bcrypt.hash(password, 12);


    const user = await User.create({

      name,

      email,

      password: hashedPassword,

      collegeId,

      department,

      year

    });


    const token =
      generateToken(user);


    res.status(201).json({

      message:
        "Account created successfully",

      token,

      user: {

        id: user._id,

        name: user.name,

        email: user.email,

        role: user.role

      }

    });

  } catch (error) {

    res.status(500).json({

      message:
        "Registration failed"

    });

  }

};


exports.login = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;


    const user =
      await User.findOne({ email });


    if (!user) {

      return res.status(401).json({

        message:
          "Invalid email or password"

      });

    }


    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );


    if (!passwordMatch) {

      return res.status(401).json({

        message:
          "Invalid email or password"

      });

    }


    const token =
      generateToken(user);


    res.json({

      token,

      user: {

        id: user._id,

        name: user.name,

        email: user.email,

        role: user.role

      }

    });

  } catch (error) {

    res.status(500).json({

      message: "Login failed"

    });

  }

};
