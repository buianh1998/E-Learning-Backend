import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { ValidateErrors } from "../@types/Response";

// convert error is array to object of type validateErrors
const convertError = (errors: ValidationError[]): ValidateErrors => {
  let result = {};
  for (const err of errors) {
    if (err.children && err.children.length > 0) {
      result[err.property] = convertError(err.children);
    } else {
      // create field result with name field is name of field form and element is array with object is errors of constraints
      result[err.property] = Object.keys(err.constraints).map((key) => ({
        value: err.value,
        code: key,
        message: err.constraints[key],
      }));
    }
  }
  return result;
};

// validate form, and send to validate function object with 2 field form, errors,
// if field form is exits, field error null and versa
export const validForm = async <T>(
  formClass: { new (...argt): T },
  data
): Promise<{ form?: T; error?: ValidateErrors }> => {
  // transform object to some instance class
  let form = plainToClass(formClass, data);
  // check form is errors
  let errors = await validate(form);
  if (errors && errors.length > 0) {
    // if errors converts error and return error
    let errorValidate: ValidateErrors = convertError(errors);
    // return {error: errorValidate}
    return { error: errorValidate };
  }
  // return form if error is null
  return { form };
};
