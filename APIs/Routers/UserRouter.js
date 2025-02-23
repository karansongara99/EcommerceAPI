import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import UserSchema from '../../Schemas/UserSchema.js';

const router = express.Router();
router.use(bodyParser.json());

router.post("/login", async (req, res) => {
    const { UserEmail, UserPassword } = req.body;

    const user = await UserSchema.findOne({ UserEmail });
    
    if (!user) {
        return res.send("User not found");
    }
    const isMatch = UserPassword == user.UserPassword;
    if (!isMatch) {
        return res.send("Invalid credentials");
    }

    res.send("Login successful");
});

// Set up multer for file upload handling (User profile images)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../../Images/UserImage'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

    const upload = multer({ storage: storage });

// Add User API (POST)
router.post("/create/user", upload.single('UserProfileImage'), async (req, res) => {
    const { UserId, UserName, UserEmail, UserPassword, UserContact, UserAddress, UserCity, UserState, UserCountry, UserPincode } = req.body;
    const UserProfileImage = req.file ? req.file.filename : null;

    const newUser = new UserSchema({
        UserId,
        UserName,
        UserEmail,
        UserPassword,
        UserContact,
        UserProfileImage,
        UserAddress,
        UserCity,
        UserState,
        UserCountry,
        UserPincode,
    });
    
    await newUser.save();
    res.send("User created successfully");
});

// Update User API (PUT)
router.put("/:id", upload.single('UserProfileImage'), async (req, res) => {
    const {UserId, UserName, UserEmail, UserPassword, UserContact, UserAddress, UserCity, UserState, UserCountry, UserPincode } = req.body;
    const UserProfileImage = req.file ? req.file.filename : null;

    const updatedUser = await UserSchema.findByIdAndUpdate(
        req.params.id,
        { 
            UserId,
            UserName, 
            UserEmail, 
            UserPassword, 
            UserContact, 
            UserAddress,
            UserCity,
            UserState,
            UserCountry,
            UserPincode,
            UserProfileImage: UserProfileImage || undefined
        },
        { new: true }
    );

    if (!updatedUser) {
        return res.send("User not found");
    }
    res.send("User updated successfully");
});


//Get User All
router.get('/', async (req, res) => {
    const data = await UserSchema.find()
    res.send(data)
})

// Get User By ID
router.get("/:id", async (req, res) => {
    const data = await UserSchema.findOne({ _id: req.params.id });
    res.send(data);
});

// Delete User By ID
router.delete("/:id", async (req, res) => {
    const data = await UserSchema.deleteOne({ _id: req.params.id });
    res.send(data);
});

export default router;