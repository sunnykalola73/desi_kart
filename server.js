import express from "express";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost/ecommerce", { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
	console.log("Connected to MongoDB");
});

app.get("/api", (req, res) => {
	res.send({ message: "Hello from the backend!" });
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
