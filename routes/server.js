import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
app.use(express.json());
// for encoding the URL
app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.use(express.json());

app.use(cors());

// Need to find why we need to use this
//  mostly to access the static images or something from the build
app.use(express.static(path.resolve(__dirname, "../../client/build")));

// Env file configuration
const ENV_FILE = path.join(__dirname, `../.env`);

dotenv.config({ path: ENV_FILE });

const port = process.env.PORT || 3001;

mongoose.connect("mongodb://localhost/ecommerce", { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
	console.log("Connected to MongoDB");
});


/* Define the Reoutes here for the backend */
app.get("/api", (req, res) => {
	res.send({ message: "Hello from the backend!" });
});

app.get("/", (req, res) => {
	res.send({ message: "Hello from the backend!" });
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
