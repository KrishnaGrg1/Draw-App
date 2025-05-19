import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

interface Ivalidation {
  body?: ObjectSchema;
  query?: ObjectSchema;
  params?: ObjectSchema;
  headers?: ObjectSchema;
}

const validate = (validateSchema: Ivalidation = {}) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { body, query, params, headers } = validateSchema;
    try {
      if (body) {
        const validationResult = await body.validateAsync(req.body, {
          abortEarly: false
        });
        req.body = validationResult;
      }
      if (query) {
        const validateResult = await query.validateAsync(req.query, {
          abortEarly: false
        });
        req.query = validateResult;
      }
      if (params) {
        const validateResult = await params.validateAsync(req.params, {
          abortEarly: false
        });
        req.params = validateResult;
      }
      if (headers) {
        const validateResult = await headers.validateAsync(req.headers, {
          abortEarly: false
        });
        req.headers = validateResult;
      }
      next();
    } catch (e: any) {
      if (e instanceof Error) {
        console.error(e.message);
        res.status(500).json({
          message: e.message
        });
        return;
      } else {
        console.error("Unexpected error has occurred");
        res.status(500).json({
          message: "Unexpected error has occurred"
        });
        return;
      }
    }
  };
};

export default validate;
