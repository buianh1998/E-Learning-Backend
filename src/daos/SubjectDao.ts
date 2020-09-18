import { FindManyOptions, getManager } from "typeorm";
import { Subject } from "../entity/Subject";

// function get and pagination and select and find data of subject
export async function findManyAndTotal(options?: FindManyOptions<Subject>) {
  return await getManager().findAndCount(Subject, options);
}

// function find  subject with parameter is a id subject
export async function findSubjectById(subjectId: string) {
  return await getManager().findOne(Subject, { id: subjectId });
}

// function find  subject with parameter is a name subject
export async function findSubjectByName(subjectName: string) {
  return await getManager().findOne(Subject, { name: subjectName });
}

// function create subject with parameter is object of Subject
export async function createSubject(subject: Subject) {
  return await getManager().save(Subject, subject);
}

// function upadte subject with parameter is object of Subject and id subject
export async function updateSubject(subjectId: string, subject: Subject) {
  return await getManager().update(Subject, subjectId, subject);
}

// function delete subject with parameter is id subject
export async function deleteSubjectById(subjectId: string) {
  return await getManager().delete(Subject, { id: subjectId });
}
