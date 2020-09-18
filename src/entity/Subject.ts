import { timeStamp } from "console";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Course } from "./Course";
@Entity()
export class Subject {
  // contructor of subject
  // data is object with field id, name, imageUrl, description
  constructor(data?: Partial<Subject>) {
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

  @OneToMany((type) => Course, (course) => course.subject)
  courses: Course[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
