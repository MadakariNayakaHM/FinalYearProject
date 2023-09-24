const express = require("express");
const path = require('path');
const pug = require('pug');

const viewsRoutes = require("./routes/viewsRoutes");
const userRouter = require("./routes/userRouter");

const app = express();
app.use(express.json());

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})
console.log("hlooo");
app.use("/api/v1/user", userRouter);
app.use('/', viewsRoutes)





// app.all("*", (req, res, next) => {
//     next(new AppError(`cant find ${req.originalUrl}`, 404));
// });
module.exports = app;