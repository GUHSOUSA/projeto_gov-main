const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    trim: true,
  },
  age: {
    required: true,
    type: String,
    trim: true,
  },
  gender: {
    default: "Prefiro não dizer",
    type: String,
    trim: true,
  },
  rg: {
    required: true,
    type: String,
    trim: true,
  },

  email: {
    required: true,
    type: String,
    trim: true,
    validate: {
      validator: (value) => {
        const re =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return value.match(re);
      },
      message: "Please enter a valid email address",
    },
  },
  password: {
    required: true,
    type: String,
  },
  type: {
    type: String,
    default: "user",
  },
  address: {
    type: String,
    default: ""
  },
  maritalStatus: {
    type: String,
    default: ""
  },
  
  familyMembers: {
    type: String,
    default: ""
  },
  
  familyIncome: {
    type: String,
    default: ""
  },
  
  monthlyExpenses: {
    type: String,
    default: ""
  },
  
  educationLevel: {
    type: String,
    default: ""
  },
  
  jobLevel: {
    type: String,
    default: ""
  },
  
  healthStatus: {
    type: String,
    default: ""
  },
  
  housingType: {
    type: String,
    default: ""
  },
  
  transportAccess: {
    type: String,
    default: ""
  },
  
  specialNeeds: {
    type: String,
    default: ""
  },
  
  governmentSupport: {
    type: String,
    default: ""
  },
  
  NGOSupport: {
    type: String,
    default: ""
  },
  
});

const User = mongoose.model("User", userSchema);
module.exports = User;
