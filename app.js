const express = require("express");
const path = require('path');
const pug = require('pug');
const cookieParser=require('cookie-parser')

const viewsRoutes = require("./routes/viewsRoutes");
const userRoutes = require("./routes/userRouter");
const serverRoutes=require('./routes/serverRoutes');

const app = express();
app.use(cookieParser())
app.use(express.json());

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

app.use("/api/v1/user", userRoutes);
app.use('/', viewsRoutes)
app.use("/api/v1/server",serverRoutes);




// app.all("*", (req, res, next) => {
//     next(new AppError(`cant find ${req.originalUrl}`, 404));
// });
module.exports = app;