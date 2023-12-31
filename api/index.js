// IMPORTS FROM PACKAGES
const express = require("express");
const dotenv = require("dotenv");
const authRouter = require("./routes/auth");
const mongoose = require('mongoose')
const fs = require('fs');
const adminRoutes = require("./routes/admin");
const pdfRoutes = require("./routes/pdf");
const userRoutes = require("./routes/user");
const app = express();

const PORT = 3000

dotenv.config();
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Banco de dados connectado com sucesso"))
// middleware
app.use(express.json());
app.use(authRouter);
app.use(adminRoutes);
app.use(pdfRoutes);
app.use(userRoutes);
app.listen(process.env.PORT || PORT, () => {
  console.log(`connected at port ${PORT}`);
});
