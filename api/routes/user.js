const auth = require("../middlewares/auth");
const User = require("../models/user");
const express = require("express");
const userRoutes = express.Router();

userRoutes.put('/api',auth, async (req, res) => {
    
    const { 
        address,
        maritalStatus,
        familyMembers,
        familyIncome,
        monthlyExpenses,
        educationLevel,
        jobLevel,
        healthStatus,
        housingType,
        transportAccess,
        specialNeeds,
        governmentSupport,
        NGOSupport
     } = req.body;
     const id = req.user;
    const updatedUser = await User.findByIdAndUpdate(
        id,
        {
            address,
            maritalStatus,
            familyMembers,
            familyIncome,
            monthlyExpenses,
            educationLevel,
            jobLevel,
            healthStatus,
            housingType,
            transportAccess,
            specialNeeds,
            governmentSupport,
            NGOSupport
        },

    );
    
    res.status(200).json(updatedUser);

});

module.exports = userRoutes;
