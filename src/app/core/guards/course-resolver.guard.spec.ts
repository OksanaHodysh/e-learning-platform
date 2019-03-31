import { TestBed, async } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, convertToParamMap } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';

import { CourseResolverGuard } from './course-resolver.guard';
import { CourseService } from '../../courses/services/course.service';
import { Course } from 'src/app/courses/models/course.model';

const mockActivatedRoute = {
  paramMap: {
    get: () => 1
  }
};

describe('CourseResolverGuard', () => {
  let guard: CourseResolverGuard;
  let coursesSpy: jasmine.SpyObj<CourseService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRouteSnapshot;
  let course: Course;

  beforeEach(() => {
    const corSpy = jasmine.createSpyObj('CourseService', [
      'getCourseById'
    ]);
    const navSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        CourseResolverGuard,
        { provide: CourseService, useValue: corSpy },
        { provide: Router, useValue: navSpy },
        { provide: ActivatedRouteSnapshot, useValue: mockActivatedRoute }
      ]
    });

    guard = TestBed.get(CourseResolverGuard);
    coursesSpy = TestBed.get(CourseService);
    routerSpy = TestBed.get(Router);
    activatedRoute = TestBed.get(ActivatedRouteSnapshot);
    course = {
      id: 1,
      title: 'Angular 7 - The Complete Guide',
      date: '2019-01-29',
      duration: 1688,
      isTopRated: true,
      authors: [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe'
        }
      ],
      description: 'Test Description'
    };
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return the course if found', () => {
    coursesSpy.getCourseById.and.returnValue(course);

    (guard.resolve(activatedRoute, null) as Observable<Course>)
      .subscribe((data) => expect(data).toBe(course));
    expect(coursesSpy.getCourseById).toHaveBeenCalledWith(1);
  });

  it('should return empty observable', () => {
    coursesSpy.getCourseById.and.returnValue(undefined);

    guard.resolve(activatedRoute, null);
    expect(coursesSpy.getCourseById).toHaveBeenCalledWith(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/courses']);
  });
});
