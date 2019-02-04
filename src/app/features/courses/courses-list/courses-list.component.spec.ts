import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { CoursesListComponent } from './courses-list.component';
import { CoursesListItemComponent } from '../courses-list-item/courses-list-item.component';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { PaintBorderDirective } from '../directives/paint-border.directive';
import { Course } from '../course.model';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { DurationPipe } from '../pipes/duration.pipe';
import { FilterPipe } from '../pipes/filter.pipe';
import { CourseService } from '../services/course.service';
import { courses } from '../services/courses.mock';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;
  let pipe: FilterPipe;
  let searchResult: Array<Course>;
  let serviceSpy: jasmine.SpyObj<CourseService>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('CourseService', [
      'getCourses',
      'createCourse',
      'updateCourse',
      'removeCourse'
    ]);
    TestBed.configureTestingModule({
      declarations: [
        CoursesListComponent,
        CoursesListItemComponent,
        BreadcrumbsComponent,
        PaintBorderDirective,
        OrderByPipe,
        DurationPipe
      ],
      imports: [
        FormsModule
      ],
      providers: [
        FilterPipe,
        {provide: CourseService, useValue: spy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.debugElement.componentInstance;
    serviceSpy = TestBed.get(CourseService);
    pipe = TestBed.get(FilterPipe);
    searchResult = [{
      id: 6,
      title: 'Testing Angular 4 Apps with Jasmine',
      creationDate: '03.05.2018',
      duration: '172',
      topRated: false,
      description: `In this course, author of several best selling courses on Udemy takes you from the ground and gives you a
      solid foundation to write automated tests for your Angular apps. Whether you're an absolute beginner or have some familiarity
      with automated testing, this course will give you all the necessary skills to write automated tests for your Angular apps. `
    }];
    serviceSpy.getCourses.and.returnValue(courses);
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize data properly', () => {
    expect(component.limit).toBe(5);
    expect(component.step).toBe(5);
    expect(component.searchCourse).toBe('');
    expect(component.searchedCourses).toBe(courses);
    expect(serviceSpy.getCourses).toHaveBeenCalled();
  });

  it('should find courses if there are any', () => {
    const searchBtn = fixture.debugElement.query(By.css('.search-btn'));
    component.searchCourse = 'Jasmine';
    searchBtn.triggerEventHandler('click', null);
    expect(component.searchedCourses[0].title).toEqual(searchResult[0].title);
  });

  it('should return emty array if no matches found', () => {
    const searchBtn = fixture.debugElement.query(By.css('.search-btn'));
    component.searchCourse = 'React';
    searchBtn.triggerEventHandler('click', null);
    expect(component.searchedCourses).toEqual([]);
  });

  it('should add a new course', () => {
    const addBtn = fixture.debugElement.query(By.css('.add-btn'));
    addBtn.triggerEventHandler('click', null);
    expect(serviceSpy.createCourse).toHaveBeenCalled();
  });

  it('should edit an existing course', () => {
    component.editCourse(3);
    expect(serviceSpy.updateCourse).toHaveBeenCalledWith(3);
  });

  it('should load more courses if the end was not reached', () => {
    const loadMoreBtn = fixture.debugElement.query(By.css('.load-btn'));
    loadMoreBtn.triggerEventHandler('click', null);
    expect(component.limit).toBe(10);
  });

  it('should not load more courses if the end was reached', () => {
    const loadMoreBtn = fixture.debugElement.query(By.css('.load-btn'));
    loadMoreBtn.triggerEventHandler('click', null);
    loadMoreBtn.triggerEventHandler('click', null);
    expect(component.limit).toBe(10);
  });

  it('should not delete item by its id if deletion not confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(false);

    const courseId = 5;
    const listItemEl = fixture.debugElement.query(By.css('.list-item'));
    const listItem = listItemEl.componentInstance;
    listItem.removeCourse.emit(courseId);
    expect(serviceSpy.removeCourse).not.toHaveBeenCalled();
  });

  it('should delete item by its id if deletion confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);

    const courseId = 5;
    const listItemEl = fixture.debugElement.query(By.css('.list-item'));
    const listItem = listItemEl.componentInstance;
    listItem.removeCourse.emit(courseId);
    expect(serviceSpy.removeCourse).toHaveBeenCalledWith(5);
  });
});
