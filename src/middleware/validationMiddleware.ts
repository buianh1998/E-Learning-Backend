import { Request, Response, NextFunction } from "express";
import { validateErrorsResponse } from "../@types/Response";
import { validForm } from "../validates/validForm";

// function is middleware validate form before move on controller
export const validateMiddleware = <T>(
  formClass: { new (): T; [type: string]: any },
  Propertype: "body" | "params" | "query"
) => async (req: Request & { form: T }, res: Response, next: NextFunction) => {
  let { form, error } = await validForm(formClass, req[Propertype]);
  if (error) {
    return res.status(412).json(validateErrorsResponse(error));
  }
  req.form = form;
  next();
};
