import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { Task } from '../models/Task';

export const getTasks = async (req: Request, res: Response): Promise<Response> => {
    try {
        const tasks = await Task.findAll();
        return res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server error');
    }
};

export const getTaskById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) {
            return res.status(404).json(`Dont id: ${req.params.id} in BD`);
        }
        return res.status(200).json(task);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server error');
    }
};

export const createTask = async (req: Request, res: Response): Promise<Response> => {
    const { title, description, completed } = req.body;
    try {
        const task = await Task.create({ title, description, completed });

        return res.status(201).json({
            message: 'Task created successfully',
            task,
        });
    } catch (error) {
        return res.status(404).json(error);
    }
};

export const updateTask = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    try {
        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({ error: `Task ${id} not found` });
        }

        await Task.update(
            { title, description, completed },
            {
                where: {
                    id,
                },
            },
        );

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
    const { id } = req.params;

    try {
        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({ error: `Can't delete ${id}` });
        }

        await task.destroy();

        return res.status(200).json(`Task ${id} deleted successfully`);
    } catch (error) {
        return res.status(500).json(error);
    }
};
