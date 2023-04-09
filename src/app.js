import express from "express";
import bodyParser from "body-parser";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";

/* Local imports */
import { userRouter } from "./routes/user";
import { categoryRouter } from "./routes/category";
import { productRouter } from "./routes/product";
import { orderRouter } from "./routes/order";
import { searchRouter } from "./routes/search";

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

app.use(cors());

// Need to find why we need to use this
// mostly to access the static images or something from the build
app.use(express.static(path.resolve(__dirname, "../client/build")));

// Env file configuration
const ENV_FILE = path.join(__dirname, `../.env`);

dotenv.config({ path: ENV_FILE });

// All other GET requests not handled before will return our React app
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
// });

app.use("/auth", userRouter);
app.use("/categories", categoryRouter);
app.use("/products", productRouter);
app.use("/order", orderRouter);
app.use("/search", searchRouter);

module.exports = app;
