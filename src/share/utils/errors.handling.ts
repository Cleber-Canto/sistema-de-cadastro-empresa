import { Request, Response, NextFunction } from 'express';

export default function (error: Error, request: Request, response: Response, next: NextFunction) {
  if (process.env.NODE_ENV !== 'development') {
    const dt = new Date();
    const day = dt.getDate();
    const month = dt.getMonth() + 1;
    const year = dt.getFullYear();
    const sequency = dt.valueOf();
  } else {
    console.log(error.stack);
  }

  response.status(500);
  response.send('Ocorreu um erro interno no sistema!');
}
