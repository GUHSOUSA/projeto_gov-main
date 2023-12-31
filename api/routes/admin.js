const auth = require("../middlewares/auth");
const User = require("../models/user");
const express = require("express");
const adminRoutes = express.Router();

adminRoutes.get("/users", async (req, res) => {
    const user = await User.find();
    res.json(user)     
});

adminRoutes.put("/users/:id", auth, async (req, res) => {
    const id = req.params;
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
        NGOSupport,
        status
     } = req.body;

    const admin = await User.findById(req.user);
    console.log(admin.type)
    if(admin.type == "admin"){
        console.log(id)
        console.log(req.user)
         const updatedUser = await User.findByIdAndUpdate(
                    id.id,
                    {   
                        status,
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
                res.json(updatedUser)     
    }else{
        res
        .status(400)
        .json({ msg: "Você nao e admin" });
    }
    
    
});

module.exports = adminRoutes;
