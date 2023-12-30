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

authRouter.put('/api/:id', async (req, res) => {
    try {
        const { id } = req.params;
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
        
        if(!updatedUser){
            return res
            .status(400)
            .json({ msg: "Esse email não existe no banco de dados!" });
        }
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

authRouter.post('/generate-pdf', async (req, res) => {
    const { email } = req.body;
    
    
    const updatedUser = await User.findOne(
        {email}
    );
    
    const doc = new PDFDocument();
    const pdfName = 'usuario.pdf';
    doc.pipe(fs.createWriteStream(pdfName));
    doc.fontSize(20).text('Formulario socio economico', 50, 20);

    let yPosition = 150;

    doc.fontSize(14).text(`Endereço: ${updatedUser.name}`, 50, yPosition - 100);
    doc.fontSize(14).text(`Idade: ${updatedUser.age}`, 50, yPosition - 80);
    doc.fontSize(14).text(`Genero: ${updatedUser.gender}`, 50, yPosition - 60);
    doc.fontSize(14).text(`RG: ${updatedUser.rg}`, 50, yPosition - 40);
    doc.fontSize(14).text(`Email: ${updatedUser.email}`, 50, yPosition -20);

    doc.fontSize(14).text(`Endereço: ${updatedUser.address}`, 50, yPosition);
    doc.fontSize(14).text(`Estado Civil: ${updatedUser.maritalStatus}`, 50, yPosition + 20);
    doc.fontSize(14).text(`Membros da Família: ${updatedUser.familyMembers}`, 50, yPosition + 40);
    doc.fontSize(14).text(`Renda Familiar: ${updatedUser.familyIncome}`, 50, yPosition + 60);
    doc.fontSize(14).text(`Despesas Mensais: ${updatedUser.monthlyExpenses}`, 50, yPosition + 80);
    doc.fontSize(14).text(`Nível de Educação: ${updatedUser.educationLevel}`, 50, yPosition + 100);
    doc.fontSize(14).text(`Nível de Emprego: ${updatedUser.jobLevel}`, 50, yPosition + 120);
    doc.fontSize(14).text(`Estado de Saúde: ${updatedUser.healthStatus}`, 50, yPosition + 140);
    doc.fontSize(14).text(`Tipo de Moradia: ${updatedUser.housingType}`, 50, yPosition + 160);
    doc.fontSize(14).text(`Acesso ao Transporte: ${updatedUser.transportAccess}`, 50, yPosition + 180);
    doc.fontSize(14).text(`Necessidades Especiais: ${updatedUser.specialNeeds}`, 50, yPosition + 200);
    doc.fontSize(14).text(`Apoio Governamental: ${updatedUser.governmentSupport}`, 50, yPosition + 220);
    doc.fontSize(14).text(`Apoio de ONGs: ${updatedUser.NGOSupport}`, 50, yPosition + 240);

        yPosition += 60;

        
    

    doc.end();

    res.status(200).send({ message: 'PDF gerado com sucesso' });
});

authRouter.get('/download', (req, res) => {
    const filePath = path.join(__dirname, '../', 'usuario.pdf');
    const stat = fs.statSync(filePath);
   

    res.writeHead(200, {
       'Content-Type': 'application/pdf',
       'Content-Length': stat.size,
       'Content-Disposition': 'attachment; filename=usuario.pdf',
    });
   
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
   });
   




module.exports = authRouter;
