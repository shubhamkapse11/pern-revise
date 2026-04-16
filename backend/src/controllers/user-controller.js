const prisma = require('../config/prisma');
const { successResponse, errorResponse } = require('../utils/response');
const bcrypt = require('bcrypt');


const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });
        if (existingUser) {
            return errorResponse(res, "User with this email already exists", 400);
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });
        if (!newUser) {
            return errorResponse(res, "Error creating user", 500);
        }
        return successResponse(res, "User created successfully", newUser, 201);
    } catch (err) {
        console.error("Error creating user: ", err?.err);
        return errorResponse(res, "Error creating user", 500, err);
    }
};



const updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const userExists = await prisma.user.findUnique({
            where: { id: parseInt(id) }
        });

        if (!userExists) {
            return errorResponse(res, "User not found", 404);
        }
        const { name, email } = req.body;
        console.log("name-->", name, "email-->", email);
        if (!name && !email) {
            return errorResponse(res, "Name and email are required", 400);
        }
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: {
                name,
                email
            }
        });
        return successResponse(res, "User updated successfully", updatedUser);
    } catch (err) {
        console.error("Error updating user: ", err?.err);
        return errorResponse(res, "Error updating user", 500, err);
    }
}


module.exports = { createUser, updateUser };