import mongoose from "mongoose";
const otpSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 300 }, // expires in 5 mins
  });
  
 const Otp =  mongoose.models.Otp || mongoose.model("otp", otpSchema);
//  const User = mongoose.models.User || mongoose.model('User', userSchema);
  export default Otp;
  