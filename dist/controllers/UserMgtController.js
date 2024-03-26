"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const { updateUsernameSchema, updatePasswordSchema, updateEmailSchema, updateProfileSchema } = require('../ValidationSchema/UserSchema');
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
class userMgtController {
    static async getUsers(req, res) {
        try {
            const users = await User.find({}, { password: 0 });
            return res.status(200).json({ userList: users });
        }
        catch (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    static async deleteUser(req, res) {
        const id = new ObjectId(req.params.id);
        try {
            const deletedUser = await User.findByIdAndDelete(id);
            if (!deletedUser) {
                return res.status(404).json({ msg: "User not found" });
            }
            return res.status(204).json({});
        }
        catch (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    static async updateUsername(req, res) {
        const formData = req.body;
        const id = new ObjectId(formData.id);
        const validationResult = updateUsernameSchema.validate(formData);
        if (validationResult.error) {
            return res.status(400).json({ msg: validationResult.error.details[0].message });
        }
        const newUsername = formData.newUsername;
        const password = formData.password;
        try {
            const user = await User.findOne({ _id: id });
            if (user) {
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) {
                    const updatedDoc = await User.findByIdAndUpdate(id, { username: newUsername }, { new: true });
                    if (updatedDoc) {
                        return res.status(200).json({ msg: "Username successfully updated" });
                    }
                    else {
                        return res.status(400).json({ msg: "Update unsuccessful" });
                    }
                }
                else {
                    return res.status(401).json({ msg: "Incorrect password" });
                }
            }
            else {
                return res.status(404).json({ msg: "User not found" });
            }
        }
        catch (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    static async updatePassword(req, res) {
        const formData = req.body;
        const id = new ObjectId(formData.id);
        const validationResult = updatePasswordSchema.validate(formData);
        if (validationResult.error) {
            return res.status(400).json({ msg: validationResult.error.details[0].message });
        }
        const oldPassword = formData.oldPassword;
        const newPassword = formData.newPassword;
        try {
            const user = await User.findOne({ _id: id });
            if (user) {
                const passwordMatch = await bcrypt.compare(oldPassword, user.password);
                if (passwordMatch) {
                    const hashedPassword = await bcrypt.hash(newPassword, 10);
                    const updatedDoc = await User.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });
                    if (updatedDoc) {
                        return res.status(200).json({ msg: "Password successfully updated" });
                    }
                    else {
                        return res.status(400).json({ msg: "Update unsuccessful" });
                    }
                }
                else {
                    return res.status(401).json({ msg: "Incorrect password" });
                }
            }
            else {
                return res.status(404).json({ msg: "User not found" });
            }
        }
        catch (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    static async updateEmail(req, res) {
        const formData = req.body;
        const id = new ObjectId(formData.id);
        const validationResult = updateEmailSchema.validate(formData);
        if (validationResult.error) {
            return res.status(400).json({ msg: validationResult.error.details[0].message });
        }
        const password = formData.password;
        const newEmail = formData.newEmail;
        try {
            const user = await User.findOne({ _id: id });
            if (user) {
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) {
                    const updatedDoc = await User.findByIdAndUpdate(id, { email: newEmail }, { new: true });
                    if (updatedDoc) {
                        return res.status(200).json({ msg: "Email successfully updated" });
                    }
                    else {
                        return res.status(400).json({ msg: "Update unsuccessful" });
                    }
                }
                else {
                    return res.status(401).json({ msg: "Incorrect password" });
                }
            }
            else {
                return res.status(404).json({ msg: "User not found" });
            }
        }
        catch (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    static async updateProfile(req, res) {
        const formData = req.body;
        const validationResult = updateProfileSchema.validate(formData);
        if (validationResult.error) {
            return res.status(400).json({ msg: validationResult.error.details[0].message });
        }
        const id = new ObjectId(formData.id);
        const password = formData.password;
        const files = req.files;
        const file = files.image[0];
        try {
            const user = await User.findOne({ _id: id });
            if (user) {
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) {
                    const uploadResult = await new Promise((resolve) => {
                        cloudinary_1.v2.uploader.upload_stream((error, uploadResult) => {
                            return resolve(uploadResult);
                        }).end(file.buffer);
                    });
                    const updatedDoc = await User.findByIdAndUpdate(id, { imageUrl: uploadResult.url }, { new: true });
                    if (updatedDoc) {
                        return res.json({ msg: "ProfileImg successfully updated" });
                    }
                    else {
                        return res.json({ msg: "Update unsuccessful" });
                    }
                }
                else {
                    return res.json({ msg: "Incorrect password" });
                }
            }
            else {
                return res.json({ msg: "User not found" });
            }
        }
        catch (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}
module.exports = {
    userMgtController
};
