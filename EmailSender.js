var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'groupshive@gmail.com', //* ToDo: Create Exchange user
    pass: 'groups1234'
  }
});

var mailOptions = {
  from: 'groupshive@gmail.com',  //! Sent from the T of the user
  to: 'ronabet0@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});