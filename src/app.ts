import express from "express";
import taskRouter from "./routes";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(taskRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is start on port ${PORT}`);
});
