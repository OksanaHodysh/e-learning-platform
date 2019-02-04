import { Injectable } from '@angular/core';

import { Course } from '../course.model';
import { courses } from './courses.mock';

@Injectable()
export class CourseService {
  public getCourses(): Array<Course> {
    return courses;
  }

  public createCourse(): void {
    console.log('Adding new course...');
  }

  public getCourseById(courseId: number): Course {
    return courses.find((item) => item.id === courseId);
  }

  public updateCourse(courseId: number): void {
    console.log(courseId);
  }

  public removeCourse(courseId: number): void {
    courses.splice(courses.indexOf(this.getCourseById(courseId)), 1);
  }
}
