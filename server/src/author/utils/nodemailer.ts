import * as nodemailer from 'nodemailer';
// async..await is not allowed in global scope, must use a wrapper
export async function sendMail(username, email, link) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'pinkie.murphy26@ethereal.email', // generated ethereal user
      pass: 'PWhkhNAdChpQJxZdYE', // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"noreply@test.com', // sender address
    to: `${email}`, // list of receivers
    subject: 'Email Verification',
    // text: 'Hello world?', // plain text body
    html: `<h1>Dear ${username}</h1> <br /> <p>Please click on this <a href='${link}'>link</a> to confirm your account. <br /> <p> Thank You </p>`, // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// sendMail().catch(console.error);