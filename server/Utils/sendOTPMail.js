const nodemailer=require("nodemailer")

const sendOTPMail=async(Email,OTP)=>{
    const transporter=nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "test.mail240723@gmail.com",
            pass: "glzehocovyvofevf"
        }
    })
const htmlData=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
  <style>
    /* Font Import */
    @import url("https://fonts.googleapis.com/css?family=Open+Sans");

    /* Global Styling */
    * {
      box-sizing: border-box;
    }

    body {
      background-color: #fafafa;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    /* .c-email */
    .c-email {
      width: 40vw;
      border-radius: 40px;
      overflow: hidden;
      box-shadow: 0px 7px 22px 0px rgba(0, 0, 0, 0.1);
    }

    /* .c-email__header */
    .c-email__header {
      background-color: blue;
      width: 100%;
      height: 60px;
    }

    /* .c-email__header__title */
    .c-email__header__title {
      font-size: 23px;
      font-family: "Open Sans";
      height: 60px;
      line-height: 60px;
      margin: 0;
      text-align: center;
      color: white;
    }

    /* .c-email__content */
    .c-email__content {
        display: block;
      width: 100%;
      height: 300px;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      padding: 15px;
    }

    /* .c-email__content__text */
    .c-email__content__text {
        display: inline-block;
                font-size: 20px;
      text-align: center;
      color: #343434;
      margin-top: 0;
    }

    /* .c-email__code */
    .c-email__code {
      display: block;
      width: 60%;
      margin: 30px auto;
      background-color: #ddd;
      border-radius: 40px;
      padding: 20px;
      text-align: center;
      font-size: 36px;
      font-family: "Open Sans";
      letter-spacing: 10px;
      box-shadow: 0px 7px 22px 0px rgba(0, 0, 0, 0.1);
    }

    /* .c-email__footer */
    .c-email__footer {
      width: 100%;
      height: 60px;
      background-color: #fff;
    }

    /* Text Utility Classes */
    .text-title {
      font-family: "Open Sans";
    }

    .text-center {
      text-align: center;
    }

    .text-italic {
      font-style: italic;
    }

    .opacity-30 {
      opacity: 0.3;
    }

    .mb-0 {
      margin-bottom: 0;
    }

    /* Responsive Styling */
    @media screen and (max-width: 768px) {
      .c-email {
        width: 70vw;
      }
      .c-email__code {
        width: 70%;
        font-size: 30px;
      }
    }

    @media screen and (max-width: 480px) {
      .c-email {
        width: 80vw;
      }
      .c-email__code {
        width: 70%;
        font-size: 22px;
      }
    }
  </style>
</head>
<body>
 
<div class="c-email">  
    <div class="c-email__header">
      <h1 class="c-email__header__title">Your Verification Code</h1>
    </div>
    <div class="c-email__content">
      <p class="c-email__content__text text-title">
        Enter this verification code in field:
      </p>
      <div class="c-email__code">
        <span class="c-email__code__text">${OTP}</span>
      </div>
      <p class="c-email__content__text text-italic opacity-30 text-title mb-0">Verification code is valid only for 10 minutes</p>
    </div>
    <div class="c-email__footer"></div>
  </div>
</body>
</html>
`
  
    const mailOptions={
        from:"test.mail240723@gmail.com",
        to:Email,
        subject:"OTP",
        html:htmlData
    }

    return transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error)
        } else {
            console.log('Email sent successfully')
        }
    })
   
  
}

module.exports=sendOTPMail