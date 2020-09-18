import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Subject } from "./Subject";

// class course
@Entity()
export class Course {
  // contructor with data is object with field id name, imageUrl, description, subject
  constructor(data?: Partial<Course>) {
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  imageUrl: string;

  @Column()
  description: string;

  @ManyToOne((type) => Subject, (subject) => subject.courses)
  subject: Subject;
}
