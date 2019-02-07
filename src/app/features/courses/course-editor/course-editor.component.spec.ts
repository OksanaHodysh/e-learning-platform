import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { CourseEditorComponent } from './course-editor.component';
import { DurationCalculatorComponent } from '../duration-calculator/duration-calculator.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { DurationPipe } from '../pipes/duration.pipe';
import { Course } from '../course.model';

describe('CourseEditorComponent', () => {
  let component: CourseEditorComponent;
  let fixture: ComponentFixture<CourseEditorComponent>;
  let newCourse: Course;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CourseEditorComponent,
        DurationCalculatorComponent,
        DatePickerComponent,
        DurationPipe
      ],
      imports: [
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseEditorComponent);
    component = fixture.debugElement.componentInstance;
    newCourse = {
      id: null,
      title: '',
      creationDate: '',
      duration: '',
      description: '',
      authors: [],
      topRated: false
    };
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize data properly', () => {
    expect(component.newCourse).toEqual(newCourse);
  });

  it('should set new course duration', () => {
    const durationCalcEl = fixture.debugElement.query(By.css('.duration-calc'));
    const durationCalc = durationCalcEl.componentInstance;
    const newDuration = '77';

    durationCalc.changeDuration.emit(newDuration);
    expect(component.newCourse.duration).toBe(newDuration);
  });

  it('should set new course date', () => {
    const datePickerEl = fixture.debugElement.query(By.css('.date-picker'));
    const datePicker = datePickerEl.componentInstance;
    const newDate = '1970-01-01';

    datePicker.changeDate.emit(newDate);
    expect(component.newCourse.creationDate).toBe(newDate);
  });

  it('should reset a new course', () => {
    const event = jasmine.createSpyObj('event', [ 'preventDefault' ]);

    component.resetCourse(event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(component.newCourse).toEqual(newCourse);
  });

  it('should save a newly created course', () => {
    const saveBtn = fixture.debugElement.query(By.css('.save'));

    saveBtn.triggerEventHandler('click', null);
    expect(component.newCourse).toEqual(newCourse);
  });

  it('should update authors array', async(() => {
    const spy1 = spyOnProperty(component, 'authors').and.callThrough();
    const spy2 = spyOnProperty(component, 'authors', 'set').and.callThrough();
    const result = component.authors;

    expect(spy1).toHaveBeenCalled();
    expect(result).toBe('');
    component.authors = 'John Doe, Jane Doe';
    expect(spy2).toHaveBeenCalledWith('John Doe, Jane Doe');
    expect(component.newCourse.authors).toEqual([
      'John Doe',
      'Jane Doe'
    ]);
  }));
});
