import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

import { Course } from '../course.model';
import { courses } from './courses.mock';

@Injectable()
export class CourseService {
  public courses: Array<Course>;
  public readonly API_URL = 'http://localhost:3004';

  constructor(private http: HttpClient) {
    this.courses = courses;
  }

  public getCourses(textFragment = '', to: number, from = 0): Observable<Array<Course>> {
    return this.http.get<Array<Course>>(`${this.API_URL}/courses`, {
      params: new HttpParams()
        .set('textFragment', `${textFragment}`)
        .set('start', `${from}`)
        .set('count', `${to}`)
    });
  }

  public createCourse(newCourse: Course): Subscription {
    return this.http.post<Course>(`${this.API_URL}/courses`, newCourse)
      .subscribe();
  }

  public getCourseById(courseId: number): Observable<Course> {
    return this.http.get<Course>(`${this.API_URL}/courses/${courseId}`);
  }

  public updateCourse(oldCourse: Course, newCourse: Course): Subscription {
    return this.http.put<Course>(`${this.API_URL}/courses/${oldCourse.id}`, newCourse)
      .subscribe();
  }

  public removeCourse(courseId: number): Observable<{}> {
    return this.http.delete<Course>(`${this.API_URL}/courses/${courseId}`);
  }
}
