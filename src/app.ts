import express from 'express';
import taskRouter from './routes';
import { sequelize } from './database/database';
import authGitHubRouter from './routes/authGitHubRouter';

const app = express();

app.get('/', (req, res) => {
    res.send("<button><a href='/auth/github'>Login With GitHub</a></button>");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(authGitHubRouter);
app.use(taskRouter);

const PORT = 3000;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
});
