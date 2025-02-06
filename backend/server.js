//D:\shopify-hydra\clonezore\backend\server.js

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service provider
  auth: {
    user: 'clonezore@gmail.com', // Your email
    pass: 'Kuldip72@', // Your email password or app password
  },
});

// Endpoint to handle form submission
app.get('/app/custom-page/contactForm', (req, res) => {
  const {name, email, subject, message} = req.body;

  const mailOptions = {
    from: email, // Sender's email
    to: 'clonezore@gmail.com', // Recipient's email
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      return res.status(500).send('Error sending email');
    }
    console.log('Email sent:', info.response);
    res.status(200).send('Email sent successfully');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
