const express = require('express');
const cors = require('cors'); 
const savedMenuRoutes = require("./routes/savedMenuRoutes");
const userRoutes = require("./routes/userRoutes");
require('dotenv').config();

const { sequelize } = require('./models'); 

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
    .then(() => {
        console.log('MySQL에 연결되었습니다.');
    })
    .catch((err) => {
        console.error('MySQL 연결 실패:', err.message);
        process.exit(1);
    });

app.use("/api/saved-menus", savedMenuRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
    console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
});