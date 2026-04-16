import express from "express";
import cors from "cors";
import router from "./routes";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors())

app.get("/", (_req, res) => {
    res.send("Testing app health!")
})

app.use("/api/v1/auth", router)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})