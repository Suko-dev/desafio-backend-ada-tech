import { NextFunction, Request, Response } from 'express';
import Logger from '../../application/utils/logger';

const methodsToLog = ['PUT', 'DELETE'];

const ACTION: Record<string, string> = {
  PUT: 'Alterar',
  DELETE: 'Remover',
};

export async function modificationLogging(req: Request, res: Response, next: NextFunction) {
  if (methodsToLog.includes(req.method) && req.url.includes('cards')) {
    const date = new Date();
    const [, id] = req.url.split('/cards/');
    const action = ACTION[req.method];
    const titulo = req.body?.titulo;
    Logger.info(
      `${date.toLocaleDateString()} ${date.toLocaleTimeString()} - Card ${id} ${titulo && titulo} - ${action}`,
    );
  }

  next();
}
