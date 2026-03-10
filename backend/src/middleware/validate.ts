import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError } from 'zod';

export const validate = (schema: ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: 'Ошибка валидации',
          details: error.issues.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
      }
      next(error);
    }
  };
};

export const validateId = (req: Request, res: Response, next: NextFunction) => {
  const idParam = req.params.id;
  
  if (typeof idParam !== 'string') {
    return res.status(400).json({ error: 'Некорректный ID' });
  }
  
  const id = parseInt(idParam);
  
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: 'ID должен быть положительным числом' });
  }
  
  (req as any).validatedId = id;
  next();
};