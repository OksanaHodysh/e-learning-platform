import { TestBed } from '@angular/core/testing';

import { CourseService } from './course.service';
import { courses } from './courses.mock';

describe('CourseService', () => {
  let service: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CourseService
      ]
    });
    service = TestBed.get(CourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return list of all courses', () => {
    expect(service.getCourses()).toBe(courses);
  });

  it('should create a new course', () => {
    expect(service.createCourse()).toBeUndefined();
  });

  it('should return a course by its id if there is one', () => {
    expect(service.getCourseById(1).title).toBe('Angular 7 - The Complete Guide');
  });

  it('should not return a course by its id if there is none', () => {
    expect(service.getCourseById(11)).toBeUndefined();
  });

  it('should update an existing course', () => {
    expect(service.updateCourse(1)).toBeUndefined();
  });

  it('should remove a course by its id', () => {
    service.removeCourse(7);
    expect(service.getCourseById(7)).toBeUndefined();
  });
});
