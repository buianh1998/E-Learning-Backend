import { Request, Response } from "express";
import {
  ErrorResponse,
  PaginationResponse,
  SuccessResponse,
} from "../../@types/Response";
import {
  findManyAndTotal,
  createSubject,
  findSubjectByName,
  findSubjectById,
  updateSubject,
  deleteSubjectById,
} from "../../daos/SubjectDao";
import { Subject } from "../../entity/Subject";
import {
  CreateSubjectForm,
  UpdateSubjectForm,
} from "../../inputforms/SubjectForm";
import { validateMiddleware } from "../../middleware/validationMiddleware";

// get many subject
const getMany = [
  async (req: Request, res: Response) => {
    try {
      // check request have query is a limit, offset, select
      let { limit, offset } = req.query as any;
      try {
        // if limit has exits limit = limit verse limit = 12, and offset = 0
        limit = parseInt(limit) || 12;
        offset = parseInt(offset) || 0;
      } catch (error) {
        limit = 12;
        offset = 0;
      }
      // find and count total element of subject
      const [subjects, total] = await findManyAndTotal({
        take: limit,
        skip: offset,
      });
      // send response to client is a pagination with skip, limit
      const dataReponse: PaginationResponse<Subject> = {
        success: true,
        message: "Get Subject Success",
        metadate: "Get Many Subject",
        data: {
          limit: limit,
          offset: offset,
          total: total,
          data: subjects,
        },
      };
      res.status(200).json(dataReponse);
    } catch (error) {
      // if error send response to client is message error
      const messageError: ErrorResponse = {
        code: 400,
        error: "Get Subject Errors",
        message: error.message,
      };
      res.status(400).json(messageError);
    }
  },
];

// create one subject
const create = [
  // middleware validate if error return error verse send form to controller is a form of subject class
  validateMiddleware(CreateSubjectForm, "body"),
  async (req: Request & { form: Subject }, res: Response) => {
    try {
      // check name subject is exist.
      // if new exist send message to client and ask the user to re-enter

      const checkNameSubject = await findSubjectByName(req.form["name"]);
      if (checkNameSubject) {
        const messageError: ErrorResponse = {
          code: 400,
          error: "Subject is exist, please choose new name subject",
          message: "Subject is exist, please choose new name subject",
        };
        return res.status(400).json(messageError);
      }
      const subject = await createSubject(req.form);
      // send response to client when create new a subject
      const dataReponse: SuccessResponse<Subject> = {
        success: true,
        message: "Create Subject Success",
        metadate: "Create new a Subject",
        data: subject,
      };
      res.status(200).json(dataReponse);
    } catch (error) {
      console.log(error);

      // if error send response to client is message error
      const messageError: ErrorResponse = {
        code: 400,
        error: "Create Subject Errors",
        message: error.message,
      };
      res.status(400).json(messageError);
    }
  },
];

// find subject By Id
const findById = async (req: Request, res: Response) => {
  try {
    const subject = await findSubjectById(req.params.id);
    // if subject not exist send message error to client
    if (!subject) {
      const messageError: ErrorResponse = {
        code: 400,
        error: "Subject is not exist",
        message: "Subject is not exist",
      };
      return res.status(400).json(messageError);
    }
    // send response to client when find subject by id success
    const dataReponse: SuccessResponse<Subject> = {
      success: true,
      message: "Create Subject Success",
      metadate: "Create new a Subject",
      data: subject,
    };
    res.status(200).json(dataReponse);
  } catch (error) {
    // if error send response to client is message error
    const messageError: ErrorResponse = {
      code: 400,
      error: "Find Subject  by Error",
      message: error.message,
    };
    res.status(400).json(messageError);
  }
};

const updateById = [
  validateMiddleware(UpdateSubjectForm, "body"),
  async (req: Request & { form: Subject }, res: Response) => {
    try {
      // check name subject is exist.
      // if new exist send message to client and ask the user to re-enter
      const checkIdSubject = await findSubjectById(req.params["id"]);
      if (!checkIdSubject) {
        const messageError: ErrorResponse = {
          code: 400,
          error: "Subject is not exist",
          message: "Subject is not exist",
        };
        return res.status(400).json(messageError);
      }
      // update subject by id
      await updateSubject(req.params["id"], req.form);

      // send response to client when find subject by id success
      const dataReponse: SuccessResponse<Subject> = {
        success: true,
        message: "update Subject Success",
        metadate: "update one Subject",
      };
      res.status(200).json(dataReponse);
    } catch (error) {
      // if error send response to client is message error
      const messageError: ErrorResponse = {
        code: 400,
        error: "Update Subject Error",
        message: error.message,
      };
      res.status(400).json(messageError);
    }
  },
];

// delete subject By Id
const deleteById = async (req: Request, res: Response) => {
  try {
    const checkSubjectById = await findSubjectById(req.params.id);
    // if subject not exist send message error to client
    if (!checkSubjectById) {
      const messageError: ErrorResponse = {
        code: 400,
        error: "Subject is not exist",
        message: "Subject is not exist",
      };
      return res.status(400).json(messageError);
    }

    // delete subject by id
    await deleteSubjectById(req.params["id"]);
    // send response to client when find subject by id success
    const dataReponse: SuccessResponse<Subject> = {
      success: true,
      message: "Delete Subject Success",
      metadate: "Delete one Subject",
    };
    res.status(200).json(dataReponse);
  } catch (error) {
    // if error send response to client is message error
    const messageError: ErrorResponse = {
      code: 400,
      error: "Find Subject  by Error",
      message: error.message,
    };
    res.status(400).json(messageError);
  }
};
export default {
  getMany,
  create,
  findById,
  updateById,
  deleteById,
};
