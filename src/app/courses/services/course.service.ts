import { Injectable } from '@angular/core';

import { Course } from '../course.model';
import { courses } from './courses.mock';

@Injectable()
export class CourseService {
  public courses: Array<Course>;

  constructor() {
    this.courses = courses;
  }

  public getCourses(): Array<Course> {
    return this.courses;
  }

  public createCourse(newCourse: Course): void {
    this.courses.push(newCourse);
  }

  public getCourseById(courseId: number): Course {
    return this.courses.find((item) => item.id === courseId);
  }

  public updateCourse(oldCourse: Course, newCourse: Course): void {
    this.courses.splice(this.courses.indexOf(oldCourse), 1, newCourse);
  }

  public removeCourse(courseId: number): void {
    this.courses.splice(this.courses.indexOf(this.getCourseById(courseId)), 1);
  }
}
