import { Response } from 'express';
import { redisClient } from '.';

export const checkCache = async (key: string, res: Response, callBack: () => Promise<Response>) => {
    const cachedData = await redisClient.get(key);
    return cachedData ? res.status(200).json(JSON.parse(cachedData)) : callBack();
};
