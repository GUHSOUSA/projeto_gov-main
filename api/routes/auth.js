const express = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const fs = require('fs');
const PDFDocument = require('pdfkit');
const path = require('path');
const auth = require("../middlewares/auth");

authRouter.post("/api/signup", async (req, res) => {
    try {
        const { name, age, gender, rg, email, password } = req.body;
        if (!name) {
            return res
                .json({ msg: "Preencha o campo nome" });
        }
        if (!age) {
            return res
                .json({ msg: "Preencha o campo age" });
        }

        if (!rg) {
            return res
                .json({ msg: "Preencha o campo rg" });
        }
        if (!email) {
            return res
                .json({ msg: "Preencha o campo email" });
        }
        if (!password) {
            return res
                .json({ msg: "Preencha o campo senha" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ msg: "Usuario com mesmo endereço de email cadastrado!" });
        }

        const hashedPassword = await bcryptjs.hash(password, 8);

        let user = new User({
            age,
            gender,
            rg,
            email,
            password: hashedPassword,
            name,
        });
        user = await user.save();
        res.json(user);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

authRouter.post("/api/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ msg: "Esse email não existe no banco de dados!" });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Senha incorreta" });
        }

        const token = jwt.sign({ id: user._id }, "passwordKey");
        res.json({ token, ...user._doc });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

authRouter.post("/tokenIsValid", async (req, res) => {
    try {
        const {email} = req.body;
        if (!email) return res
        .status(400)
        .json({ msg: "email não encontrado" });
        const user = await User.findOne({email})
        if (!user) return res
        .status(400)
        .json({ msg: "usuario não encontrado" });
        res.json(true);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

authRouter.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json(user);
});

module.exports = authRouter;
