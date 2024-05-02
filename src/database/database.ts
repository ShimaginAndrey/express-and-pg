import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
    database: 'Task',
    host: 'localhost',
    username: 'postgres',
    password: 'password',
    dialect: 'postgres',
    port: 5432,
    define: {
        timestamps: false,
    },
    models: [__dirname + '/models'],
});
