const User = require("../models/user");
const express = require("express");
const pdfRoutes = express.Router();
const fs = require('fs');
const PDFDocument = require('pdfkit');
const path = require('path');
const auth = require("../middlewares/auth");


pdfRoutes.get('/generate-pdf', auth, async (req, res) => {
   
    
    
    const updatedUser = await User.findById(req.user);
    
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
    doc.fontSize(14).text(`Estatus de aprovação: ${updatedUser.status}`, 50, yPosition + 300);

        yPosition += 60;

        
    

    doc.end();

    res.status(200).send({ message: 'PDF gerado com sucesso' });
});

pdfRoutes.get('/download', (req, res) => {
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

module.exports = pdfRoutes;
