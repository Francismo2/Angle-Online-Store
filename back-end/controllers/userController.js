import bcrypt from 'bcrypt' 
import validator from 'validator'
import jwt from 'jsonwebtoken'
import Customer from '../models/customers.js'
import nodemailer from 'nodemailer'

const generateVerificationCode = () => Math.floor(100000 + Math.random() * 900000).toString();

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.AOS_EMAIL,
      pass: process.env.AOS_PASSWORD,
    },
});


// Verify Email Route
const verifyEmail = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await Customer.findOne({ where: { email } });
      if (!user) {
        return res.json({ success: false, message: 'Email does not exist.' });
      }
  
      // Generate verification code
      const verificationCode = generateVerificationCode();
      const expirationTime = new Date(Date.now() + 15 * 60 * 1000); // 15 MINUTE
  
      // Send verification email
      await transporter.sendMail({
        from: `Verification Code ${process.env.AOS_EMAIL}`,
        to: email,
        subject: 'Password Reset Verification Code',
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Verification</title>
    <style>
        /* Basic Reset */
        body, table, td, a {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
        }

        img {
            border: 0;
            display: block;
            max-width: 100%;
        }

        /* Layout */
        .email-container {
            width: 100%;
            background-color: #f4f6f9;
            padding: 20px 0;
        }

        .email-content {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        /* Header */
        .email-header {
            margin-bottom: 30px;
            display: flex;
            justify-content: center;
        }

        .email-header img {
            margin: 0 auto;
            max-width: 120px;
        }

        /* Body */
        .email-body {
            text-align: center;
            font-size: 16px;
            line-height: 1.5;
            color: #333333;
        }

        .verification-code {
            font-size: 24px;
            font-weight: bold;
            color: #d53737;
            margin: 20px 0;
            margin-bottom: 7rem
        }

        /* Footer */
        .email-footer {
            text-align: center;
            font-size: 12px;
            color: #777777;
            margin-top: 30px;
        }

        .email-footer a {
            color: #d53737;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <table class="email-container" role="presentation">
        <tr>
            <td>
                <div class="email-content">
                    <!-- Header Section with Logo -->
                    <div class="email-header">
                        <img src="cid:aos_logo" alt="Company Logo">
                    </div>

                    <!-- Body Section -->
                    <div class="email-body">
                        <h2>Reset Password Verification</h2>
                        <p>Hi ${user.user_name}, Here's your 6-digit verification code:</p>
                        <div class="verification-code">${verificationCode}</div>
                        <p>This code will expire in <b>15 minutes.</b></p>
                        <p>Enter the code on the verification page to reset your password.</p>
                    </div>

                    <!-- Footer Section -->
                    <div class="email-footer">
                        <p>If you did not request a password reset, please disregard this email.</p>
                        <p>Need help? <a href="https://www.instagram.com/angleofficial_ph?igsh=MTQ0a2NrdmY4a2xjYw==" target='blank'>Message us in our instagram</a>.</p>
                    </div>
                </div>
            </td>
        </tr>
    </table>
</body>
</html>`,
attachments: [
    {
      filename: 'AOS.png',
      path: './controllers/emailsender/img/AOS.png',
      cid: 'aos_logo',
    },
  ],
      });

      // Update user with the code (if using database)
      await user.update({ verification_code: verificationCode, verification_code_expires_at: expirationTime});

      res.json({ success: true, message: 'Verification code sent!' });

    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error sending verification email.' });
    }
};

const verifyCode = async (req, res) => {
    try {
      const { email, code } = req.body;
      const user = await Customer.findOne({ where: { email } });

      if (!user) {
        return res.json({ success: false, message: 'Email address not found. Please try again.' });
      }
  
      if (user.verification_code !== code) {
        return res.json({ success: false, message: 'Invalid verification code.', });
      }

      if (new Date() > user.verification_code_expires_at) {
        await user.update({ verification_code: null});
        return res.json({ success: false, message: 'Verification code has expired. Please request a new one.'});
        
      }

      res.json({ success: true, message: 'Code verified successfully!' });

    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error verifying code.' });
    }
};

const resetPassword = async (req, res) => {
    try {
      const { email, code, newPassword } = req.body;
      const user = await Customer.findOne({ where: { email } });
  
      if (!user || user.verification_code !== code) {
        return res.json({ success: false, message: 'Invalid verification code or email. Please try again.' });
      }

      if (new Date() > user.verification_code_expires_at) {
        await user.update({ verification_code: null});
        return res.json({ success: false, message: 'Verification code has expired. Please request a new one.'});
      }

      // PASSWORD VALIDATION
      if (!validator.isLength(newPassword, { min: 8 })) {
        return res.json({success: false, message:"Password must be at least 8 characters long"});
      }
      if (!/[A-Z]/.test(newPassword)) {
        return res.json({success: false, message:"Password must contain at least one uppercase letter."});
      }
      if (!/[a-z]/.test(newPassword)) {
        return res.json({success: false, message:"Password must contain at least one lowercase letter."});
      }
      if (!/[0-9]/.test(newPassword)) {
        return res.json({success: false, message:"Password must contain at least one number."});
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
        return res.json({success: false, message:"Password must contain at least one special character (e.g., !, @, #, $, etc.)."});
      }

      // HASHING USER PASSWORD
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      await user.update({ password: hashedPassword, verification_code: null, verification_code_expires_at: null,}); 
  
      res.json({ success: true, message: 'Password updated successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error resetting password.' });
    }
};



//  ROUTE FOR USER LOGIN
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await Customer.findOne({where: {email}});
        if (!user) {
            return res.json({success: false, message:"This user does not exist."});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user.customer_id);
            return res.json({success: true, message: "Login Succesfully", token});
        }
        else {
            return res.json({success: false, message:"Invalid Credentials"});
        }


    } catch (error) {
        console.log(error);
        res.json({success: false, message:error.message})
    }
}

// ROUTE FOR ADMIN LOGIN
const adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({success: true, token, message: "Successfully Login"})
        } else {
            res.json({success: false, message: "Invalid Credentials"})
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message:error.message})
    }
}


// REGISTRATION
let tempUserData = {};
const registerUser = async (req, res) => {
    try {
        const { user_name, email, password } = req.body;

        // Check if user already exists
        const exists = await Customer.findOne({ where: { email } });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // PASSWORD VALIDATION
        if (!validator.isLength(password, { min: 8 })) {
            return res.json({success: false, message:"Password must be at least 8 characters long"});
        }
        if (!/[A-Z]/.test(password)) {
            return res.json({success: false, message:"Password must contain at least one uppercase letter."});
        }
        if (!/[a-z]/.test(password)) {
            return res.json({success: false, message:"Password must contain at least one lowercase letter."});
        }
        if (!/[0-9]/.test(password)) {
            return res.json({success: false, message:"Password must contain at least one number."});
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return res.json({success: false, message:"Password must contain at least one special character (e.g., !, @, #, $, etc.)."});
        }

        // Generate a verification code
        const verificationCode = generateVerificationCode();

        // Temporarily store user data
        tempUserData[email] = {
            user_name,
            email,
            password,
            verificationCode,
            expiresAt: Date.now() + 15 * 60 * 1000, // 15-minute expiration
        };

        // Send verification email
        await transporter.sendMail({
            from: `Verification Code ${process.env.AOS_EMAIL}`,
            to: email,
            subject: 'Account Verification Code',
            html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Verification</title>
    <style>
        /* Basic Reset */
        body, table, td, a {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
        }

        img {
            border: 0;
            display: block;
            max-width: 100%;
        }

        /* Layout */
        .email-container {
            width: 100%;
            background-color: #f4f6f9;
            padding: 20px 0;
        }

        .email-content {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        /* Header */
        .email-header {
            margin-bottom: 30px;
            display: flex;
            justify-content: center;
        }

        .email-header img {
            margin: 0 auto;
            max-width: 120px;
        }

        /* Body */
        .email-body {
            text-align: center;
            font-size: 16px;
            line-height: 1.5;
            color: #333333;
        }

        .verification-code {
            font-size: 24px;
            font-weight: bold;
            color: #d53737;
            margin: 20px 0;
            margin-bottom: 7rem
        }

        /* Footer */
        .email-footer {
            text-align: center;
            font-size: 12px;
            color: #777777;
            margin-top: 30px;
        }

        .email-footer a {
            color: #d53737;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <table class="email-container" role="presentation">
        <tr>
            <td>
                <div class="email-content">
                    <!-- Header Section with Logo -->
                    <div class="email-header">
                        <img src="cid:aos_logo" alt="Company Logo">
                    </div>

                    <!-- Body Section -->
                    <div class="email-body">
                        <h2>Account Verification</h2>
                        <p>Greetings from Angle Online Store, Here's your 6-digit verification code:</p>
                        <div class="verification-code">${verificationCode}</div>
                        <p>This code will expire in <b>15 minutes.</b></p>
                        <p>Please enter the code to complete your account registration.</p>
                    </div>

                    <!-- Footer Section -->
                    <div class="email-footer">
                        <p>If you did not request a account verification, please disregard this email.</p>
                        <p>Need help? <a href="https://www.instagram.com/angleofficial_ph?igsh=MTQ0a2NrdmY4a2xjYw==" target='blank'>Message us in our instagram</a>.</p>
                    </div>
                </div>
            </td>
        </tr>
    </table>
</body>
</html>`,
attachments: [
    {
      filename: 'AOS.png',
      path: './controllers/emailsender/img/AOS.png',
      cid: 'aos_logo',
    },
  ],
        });

        res.json({ success: true, message: "Verification code sent to your email." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error during registration.' });
    }
};

const verifyAndCreateUser = async (req, res) => {
    try {
        const { email, code } = req.body;

        // Check if the email exists in temp storage
        const userData = tempUserData[email];
        if (!userData) {
            return res.json({ success: false, message: "Verification expired or not initiated." });
        }

        // Validate the code
        if (userData.verificationCode !== code) {
            return res.json({ success: false, message: "Invalid verification code." });
        }

        if (Date.now() > userData.expiresAt) {
            delete tempUserData[email]; // Remove expired data
            return res.json({ success: false, message: "Verification code expired. Please register again." });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        // Save user in the database
        const newUser = await Customer.create({
            user_name: userData.user_name,
            email: userData.email,
            password: hashedPassword,
        });

        const token = createToken(newUser.customer_id);

        // Clean up temp data
        delete tempUserData[email];

        res.json({
            success: true,
            message: "Account created successfully.",
            token,
            user: {
                customer_id: newUser.customer_id,
                user_name: newUser.user_name,
                email: newUser.email,
                password: newUser.password,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error during account creation.' });
    }
};





export {loginUser, registerUser, adminLogin, verifyEmail, verifyCode, resetPassword, verifyAndCreateUser}