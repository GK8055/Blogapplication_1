// // const accountSid='VAafffdf74203dd6b5fce238efc72c1f56'
// // const authToken="GRPK9ULMBRQ6N2B3ACHG7WWA"

// // const client=twilio(accountSid,authToken)


// // let users = {}; 

// // // POST route to generate and send OTP via SMS
// // app.post('/generate-otp', (req, res) => {
// //     const { phoneNumber } = req.body;

// //     // Generate OTP
// //     const otp = speakeasy.totp({
// //         secret: phoneNumber, // Use phone number as a secret for simplicity
// //         encoding: 'base32',
// //         step: 300, // OTP valid for 5 minutes
// //     });

// //     // Store the OTP for verification (in a real app, store in DB)
// //     users[post_id] = otp;

// //     // Send OTP via SMS using Twilio
// //     client.messages
// //         .create({
// //             body: `Your OTP code is ${otp}`,
// //             from: '+1234567890', // Replace with your Twilio number
// //             to: phoneNumber,
// //         })
// //         .then(message => res.status(200).send(`OTP sent to ${phoneNumber}`))
// //         .catch(error => res.status(500).send('Error sending OTP via SMS'));
// // });

// // // POST route to verify OTP
// // app.post('/verify-otp', (req, res) => {
// //     const { phoneNumber, otp } = req.body;

// //     // Verify OTP
// //     const isVerified = speakeasy.totp.verify({
// //         secret: phoneNumber,
// //         encoding: 'base32',
// //         token: otp,
// //         step: 300,
// //     });

// //     if (isVerified) {
// //         res.status(200).send('OTP verified successfully');
// //     } else {
// //         res.status(400).send('Invalid OTP');
// //     }
// // });







// let users = {}; // For demo purposes, storing users and OTPs in memory
// // POST route to generate and send OTP
//  app.post('/generate-otp', (req, res) => {
//     const { email } = req.body;

//     // Generate OTP
//     const otp = speakeasy.totp({
//         secret: email, // Use email as a secret for simplicity
//         encoding: 'base32',
//         step: 300, // OTP valid for 5 minutes
//     });

//     // Store the OTP for verification (in a real app, store in DB)
//     users[email] = otp;

//     // Send OTP via email (for demo, using a mock email service)
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'vihaanofc8055@gmail.com', // Replace with your email
//             pass: '7989201428@#$Gk',        // Replace with your email password
//         },
//     });

//     const mailOptions = {
//         from: 'vihaanofc8055@gmail.com',
//         to: email,
//         subject: 'Your OTP Code',
//         text: `Your OTP code is ${otp}`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return res.status(500).send('Error sending OTP');
//         }
//         res.status(200).send('OTP sent');
//     });
// });

// // POST route to verify OTP
// app.post('/verify-otp', (req, res) => {
//     const { email, otp } = req.body;

//     // Verify OTP
//     const isVerified = speakeasy.totp.verify({
//         secret: email,
//         encoding: 'base32',
//         token: otp,
//         step: 300,
//     });

//     if (isVerified) {
//         res.status(200).send('OTP verified successfully');
//     } else {
//         res.status(400).send('Invalid OTP');
//     }
// });
