import {catchAsyncErrors} from "../middleware/catchAsyncErrors.js";
import {User} from "../models/User.js";
import {genrateToken} from "../utils/jwtToken.js";


export const login = catchAsyncErrors(async(req,res,next) => {
    const {username, password} = req.body;

    if(!username || !password )
    {
        return next(res.status(400).json({
            message : "Please fill all the details in the form"
        }));
    }

    const user = await User.findOne({username }).select("+password");
    if(!user)
    {
        return next(res.status(400).json({
            message : "Invalid Email or Password"
        }));
    }
    const isPasswordMatched = await user.comparePasswords(password);
    if(!isPasswordMatched)
    {
        return next(res.status(400).json({
            message : "Invalid Email or Password"
        }));
    }
   
    genrateToken(user, "User Logged In Successfully",200, res);
});

export const signup = catchAsyncErrors(async(req,res,next) => {
    const { name,  phone, email,  password, username} = req.body;

    if(!name || !phone || !email || !password || !username){
        return next(res.status(400).json({
            message : "Please fill all details in the form"
        }));
    }
    const isRegistered = await  User.findOne({userName : username });
    if(isRegistered)
    {
        return next(res.status(400).json({
            message : "Same username already exists"
        }));
    }
    const user = await User.create({name, phone, email,  password, username});
   
    genrateToken(user, "User Registered",200, res);
   
   
});
