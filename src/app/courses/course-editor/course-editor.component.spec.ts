import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, convertToParamMap, ParamMap, Params } from '@angular/router';
import { ReplaySubject } from 'rxjs';

import { CourseEditorComponent } from './course-editor.component';
import { DurationCalculatorComponent } from '../duration-calculator/duration-calculator.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { DurationPipe } from '../pipes/duration.pipe';
import { Course } from '../models/course.model';
import { CourseService } from '../services/course.service';

class ActivatedRouteStub {
  private subject = new ReplaySubject<ParamMap>();

  constructor(initialParams?: Params) {
    this.setParamMap(initialParams);
  }

  readonly paramMap = this.subject.asObservable();

  setParamMap(params?: Params) {
    this.subject.next(convertToParamMap(params));
  }
}

describe('CourseEditorComponent', () => {
  let component: CourseEditorComponent;
  let fixture: ComponentFixture<CourseEditorComponent>;
  let newCourse: Course;
  let existingCourse: Course;
  let coursesSpy: jasmine.SpyObj<CourseService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async(() => {
    const corSpy = jasmine.createSpyObj('CourseService', [
      'getCourseById',
      'createCourse',
      'updateCourse'
    ]);
    const navSpy = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteInstance = new ActivatedRouteStub();

    TestBed.configureTestingModule({
      declarations: [
        CourseEditorComponent,
        DurationCalculatorComponent,
        DatePickerComponent,
        DurationPipe
      ],
      imports: [
        FormsModule
      ],
      providers: [
        { provide: CourseService, useValue: corSpy },
        { provide: Router, useValue: navSpy },
        { provide: ActivatedRoute, useValue: activatedRouteInstance}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseEditorComponent);
    component = fixture.debugElement.componentInstance;
    coursesSpy = TestBed.get(CourseService);
    routerSpy = TestBed.get(Router);
    activatedRoute = TestBed.get(ActivatedRoute);
    newCourse = new Course(1);
    existingCourse = {
      id: 1,
      title: 'Angular 7 - The Complete Guide',
      date: '2019-01-29',
      duration: 1688,
      isTopRated: true,
      authors: [
        {
          id: 2,
          firstName: 'Maximilian',
          lastName: 'Schwarzmüller'
        }
      ],
      description: `This course starts from scratch, you neither need to know Angular 1 nor Angular 2!
        From Setup to Deployment, this course covers it all! You'll learn all about Components, Directives,
        Services, Forms, Http Access, Authentication, Optimizing an Angular App with Modules and Offline
        Compilation and much more - and in the end: You'll learn how to deploy an application!`
    };
    activatedRoute.setParamMap({id: 1});
  });

  describe('edit existing course', () => {
    beforeEach(() => {
      coursesSpy.getCourseById.and.returnValue(existingCourse);
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize data properly', () => {
      expect(coursesSpy.getCourseById).toHaveBeenCalledWith(1);
      expect(component.editedCourse).toBe(existingCourse);
      expect(component.newCourse).toEqual(existingCourse);
      expect(component.isSaved).toBe(false);
    });

    it('should set new course duration', () => {
      const durationCalcEl = fixture.debugElement.query(By.css('.duration-calc'));
      const durationCalc = durationCalcEl.componentInstance;
      const newDuration = 77;

      durationCalc.changeDuration.emit(newDuration);

      expect(component.newCourse.duration).toBe(newDuration);
    });

    it('should set new course date', () => {
      const datePickerEl = fixture.debugElement.query(By.css('.date-picker'));
      const datePicker = datePickerEl.componentInstance;
      const newDate = '1970-01-01';

      datePicker.changeDate.emit(newDate);

      expect(component.newCourse.date).toBe(newDate);
    });

    it('should return to list of courses if there are no changes', () => {
      component.returnToCourses();

      expect(routerSpy.navigate).toHaveBeenCalledWith(['/courses']);
    });

    it('should return true if there are unsaved changes to be discarded', () => {
      spyOn(window, 'confirm').and.returnValue(true);

      component.newCourse.title = 'Angular 7';
      const result = component.canDeactivate();

      expect(window.confirm).toHaveBeenCalled();
      expect(result).toBe(true);
    });

    it('should return false if there are unsaved changes not to be discarded', () => {
      spyOn(window, 'confirm').and.returnValue(false);

      component.newCourse.title = 'Angular 7';
      const result = component.canDeactivate();

      expect(window.confirm).toHaveBeenCalled();
      expect(result).toBe(false);
    });

    it('should return true if there are no changes', () => {
      spyOn(window, 'confirm');

      const result = component.canDeactivate();

      expect(window.confirm).not.toHaveBeenCalled();
      expect(result).toBe(true);
    });

    it('should save a newly created course', () => {
      const saveBtn = fixture.debugElement.query(By.css('.save'));

      saveBtn.triggerEventHandler('click', null);
      component.newCourse.title = 'Angular 7';

      expect(coursesSpy.updateCourse).toHaveBeenCalledWith(component.editedCourse, component.newCourse);
      expect(component.isSaved).toBe(true);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/courses']);
    });

    it('should update authors array', async(() => {
      const spy1 = spyOnProperty(component, 'authors').and.callThrough();
      const spy2 = spyOnProperty(component, 'authors', 'set').and.callThrough();
      const result = component.authors;

      expect(spy1).toHaveBeenCalled();
      expect(result).toBe('Maximilian Schwarzmüller');
      component.authors = 'John Doe, Jane Doe';
      expect(spy2).toHaveBeenCalledWith('John Doe, Jane Doe');
      expect(component.newCourse.authors).toEqual([
        {
          id: 12,
          firstName: 'John',
          lastName: 'Doe'
        },
        {
          id: 11,
          firstName: 'Jane',
          lastName: 'Doe'
        }
      ]);
    }));
  });

  describe('create a new course', () => {
    beforeEach(() => {
      coursesSpy.getCourseById.and.returnValue(undefined);
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should initialize data properly', () => {
      expect(coursesSpy.getCourseById).toHaveBeenCalledWith(1);
      expect(component.editedCourse).toBeNull();
      expect(component.newCourse).toEqual(newCourse);
      expect(component.isSaved).toBe(false);
    });

    it('should save a newly created course', () => {
      const saveBtn = fixture.debugElement.query(By.css('.save'));

      saveBtn.triggerEventHandler('click', null);

      expect(coursesSpy.createCourse).toHaveBeenCalledWith(newCourse);
      expect(component.isSaved).toBe(true);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/courses']);
    });
  });
});
