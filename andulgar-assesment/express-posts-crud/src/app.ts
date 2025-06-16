import express from "express";
import bodyParser from "body-parser";
import setPostsRoutes from "./routes/posts";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());
setPostsRoutes(app);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
