import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async(req, res)=>{
    /*
    //steps to login register

    01 get user details from frontend
    02 validation - not empty
    03 check if user already exists: email, username
    04 check for images and avatar
    05 upload them to cloudinary - avatar
    06 create user object - create entry in db
    07 remove password and refresh token field from response
    08 check for user creation
    09 return res
    */

    const { fullName, username, email, password } = req.body
    console.log("email :", email);

    // if (fullName==="" || username==="" || password==="" || email==="") {
    //     throw new ApiError(400, "all fields are required")     
    // }

    if (
        [fullName, username, email, password].some((fields)=> fields?.trim()==="") 
    ) {
        throw new ApiError(400, "all fields are required");
    }

    const existedUser = User.findOne({
        $or: [{username}, {email}]
    });

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists.");
    }
    
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    //things that we dont want to show user---password and refreshToken.
    const createdUser = await User.findById(User._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user.")
    }

    //things that we dont want to show user---password and refreshToken.
    
    return res.status(201).json(
        new ApiResponse (200, createdUser, "User registered successfully.")
    )
});

export {registerUser}