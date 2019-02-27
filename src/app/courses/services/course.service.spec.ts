import { TestBed } from '@angular/core/testing';

import { CourseService } from './course.service';
import { courses } from './courses.mock';
import { Course } from '../course.model';

describe('CourseService', () => {
  let service: CourseService;
  let newCourse: Course;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CourseService
      ]
    });
    service = TestBed.get(CourseService);
    newCourse = {
      id: null,
      title: '',
      date: '',
      duration: 0,
      description: '',
      authors: [],
      isTopRated: false
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return list of all courses', () => {
    expect(service.getCourses()).toBe(courses);
  });

  it('should create a new course', () => {
    service.createCourse(newCourse);

    expect(service.courses.indexOf(newCourse)).not.toBe(-1);
  });

  it('should return a course by its id if there is one', () => {
    expect(service.getCourseById(1).title).toBe('Angular 7 - The Complete Guide');
  });

  it('should not return a course by its id if there is none', () => {
    expect(service.getCourseById(11)).toBeUndefined();
  });

  it('should update an existing course', () => {
    service.updateCourse(service.courses[0], newCourse);

    expect(service.courses[0]).toBe(newCourse);
  });

  it('should remove a course by its id', () => {
    service.removeCourse(7);
    expect(service.getCourseById(7)).toBeUndefined();
  });
});
