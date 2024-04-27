import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database/database';

export const getTasks = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query('SELECT * FROM tasks');
        return res.status(200).json(response.rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server error');
    }
};

export const getTaskById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const query = {
            text: 'SELECT * FROM tasks WHERE id = $1',
            values: [req.params.id],
        };

        const response: QueryResult = await pool.query(query);
        if (response.rows.length === 0) {
            return res.status(404).json('Dont Id in BD');
        }
        return res.status(200).json(response.rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server error');
    }
};

export const createTask = async (req: Request, res: Response): Promise<Response> => {
    const { title, description, completed } = req.body;
    try {
        const query = {
            text: 'INSERT INTO tasks (title, description, completed) VALUES ($1, $2, $3)',
            values: [title, description, completed],
        };

        await pool.query(query);

        return res.status(201).json({
            message: 'Task created successfully',
            task: {
                title,
                description,
                completed,
            },
        });
    } catch (error) {
        return res.status(404).json(error);
    }
};

export const updateTask = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    try {
        const query = {
            text: 'UPDATE tasks SET title = $1, description = $2, completed = $3 WHERE id = $4',
            values: [title, description, completed, id],
        };

        await pool.query(query);

        return res.status(200).json({
            message: 'Task updated successfully',
            task: {
                id,
                title,
                description,
                completed,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server error');
    }
};

export const deleteTask = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    // TODO: обработать ошибку, если id в БД нет
    const query = {
        text: 'DELETE FROM tasks WHERE id = $1',
        values: [id],
    };

    try {
        const response: QueryResult = await pool.query(query);
        return res.status(200).json(`Task ${id} deleted successfully`);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server error');
    }
};
