export const verifyAccountTempl = (code) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <style>
      body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f9;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    
    .otp-box {
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      padding: 2rem;
      text-align: center;
      max-width: 300px;
      width: 100%;
    }
    
    .title {
      color: #333333;
      font-size: 24px;
      margin-bottom: 1.5rem;
    }
    
    .otp-text {
      color: #666666;
      font-size: 18px;
      margin: 0;
    }
    
    .otp {
      font-weight: bold;
      color: #007bff;
      font-size: 20px;
    }
      </style>
    </head>
    <body>
      <div class="otp-box">
        <h2 class="title">OTP Verification</h2>
        <p class="otp-text">Your OTP is: <span class="otp">${code}</span></p>
      </div>
    </body>
    </html>`;
};
