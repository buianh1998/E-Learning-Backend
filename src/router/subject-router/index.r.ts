import { Router } from "express";
import subjectController from "../../controller/subject-controller/index.c";
const router = Router();
router.get("/", subjectController.getMany);
router.get("/:id", subjectController.findById);
router.post("/", subjectController.create);
router.put("/:id", subjectController.updateById);
router.delete("/:id", subjectController.deleteById);

export const SubjectRouter = Router();
SubjectRouter.use("/subject", router);
