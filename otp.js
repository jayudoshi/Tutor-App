const axios = require('axios');
const otpGenerator = require('otp-generator');

const sendOTP = async(msgType , phoneNo) => {
    baseUrl = "https://www.fast2sms.com/dev/bulkV2?";
    const auth = "authorization=" + process.env.FAST2SMS_TOKEN;
    route = "&route=v3";
    senderId = "&sender_id=" + process.env.SENDERID;
    const number= "&numbers=" + phoneNo;
    let message = "";
    const otp = otpGenerator.generate(4,{alphabets:false , upperCase:false , specialChars:false});
    if(msgType === "Registration"){
        message= "&message=Vidyayan Tutor App\n\nYour OTP for registration is " + otp + "\nValid for 3min\n\n";
    }else if(msgType === "Login"){
        message= "&message=Vidyayan Tutor App\n\nYour OTP for login is " + otp + "\nValid for 3min\n\n";
    }
    const url= baseUrl+auth+route+senderId+message+number;
    try{
        await axios.get(url);
        return otp
    }catch(err){
        console.log(err);
        return null;
    }
}

module.exports = {sendOTP};