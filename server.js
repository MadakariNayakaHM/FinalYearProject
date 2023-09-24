const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
//const app = express();
//app.use(express.json());
dotenv.config({ path: './config.env' });


const port = process.env.PORT || 3000;

const DB = process.env.DATA_BASE;
try {
    mongoose.connect(DB).then(() => { console.log("database connected successfully") })
} catch (e) {
    console.log("error in connecting to database")
}

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});