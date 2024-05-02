import express from 'express';
import taskRouter from './routes';
import { sequelize } from './database/database';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(taskRouter);

const PORT = 3000;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
});
