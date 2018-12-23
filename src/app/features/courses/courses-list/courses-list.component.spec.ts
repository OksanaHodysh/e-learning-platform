import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { CoursesListComponent } from './courses-list.component';
import { CoursesListItemComponent } from '../courses-list-item/courses-list-item.component';
import { Course } from '../course.model';

// Approach 2: Stand-alone testing
describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;
  let searchResult: Array<Course>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesListComponent,
        CoursesListItemComponent
      ],
      imports: [
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.debugElement.componentInstance;
    searchResult = [{
      id: 6,
      title: 'Testing Angular 4 Apps with Jasmine',
      creationDate: '03.05.2018',
      duration: '2h 12min',
      description: `In this course, author of several best selling courses on Udemy takes you from the ground and gives you a
      solid foundation to write automated tests for your Angular apps. Whether you're an absolute beginner or have some familiarity
      with automated testing, this course will give you all the necessary skills to write automated tests for your Angular apps. `
    }];
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
    expect(component.courses[0].id).toBe(1);
  });

  it('should find courses if there are any', () => {
    const searchBtn = fixture.debugElement.query(By.css('.search-btn'));
    component.searchCourse = 'Jasmine';
    searchBtn.triggerEventHandler('click', null);
    expect(component.findCourses()[0].title).toEqual(searchResult[0].title);
  });

  it('should return emty array if no matches found', () => {
    const searchBtn = fixture.debugElement.query(By.css('.search-btn'));
    component.searchCourse = 'React';
    searchBtn.triggerEventHandler('click', null);
    expect(component.findCourses()).toEqual([]);
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

  it('should delete item by its id', () => {
    const courseId = 5;
    const listItemEl = fixture.debugElement.query(By.css('.list-item'));
    const listItem = listItemEl.componentInstance;
    listItem.removeCourse.emit(courseId);
    const result = component.courses.find(({id}) => id === courseId);
    expect(result).toBeUndefined();
  });
});

// Approach 1: Class testing
// describe('CoursesListComponent', () => {
//   let component: CoursesListComponent;
//   let searchResult: Array<Course>;

//   beforeEach(() => {
//     component = new CoursesListComponent();
//     searchResult = [{
//       id: 6,
//       title: 'Testing Angular 4 Apps with Jasmine',
//       creationDate: '03.05.2018',
//       duration: '2h 12min',
//       description: `In this course, author of several best selling courses on Udemy takes you from the ground and gives you a
//       solid foundation to write automated tests for your Angular apps. Whether you're an absolute beginner or have some familiarity
//       with automated testing, this course will give you all the necessary skills to write automated tests for your Angular apps. `
//     }];
//     component.ngOnInit();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should initialize data properly', () => {
//     expect(component.limit).toBe(5);
//     expect(component.step).toBe(5);
//     expect(component.searchCourse).toBe('');
//     expect(component.courses[0].id).toBe(1);
//   });

//   it('should find courses if there are any', () => {
//     component.searchCourse = 'Jasmine';
//     expect(component.findCourses()[0].title).toEqual(searchResult[0].title);
//   });

//   it('should return emty array if no matches found', () => {
//     component.searchCourse = 'React';
//     expect(component.findCourses()).toEqual([]);
//   });

//   it('should load more courses if the end was not reached', () => {
//     component.loadMore();
//     expect(component.limit).toBe(10);
//   });

//   it('should not load more courses if the end was reached', () => {
//     component.loadMore();
//     component.loadMore();
//     expect(component.limit).toBe(10);
//   });

//   it('should delete item by its id', () => {
//     const courseId = 5;
//     component.deleteCourse(courseId);
//     const result = component.courses.find(({id}) => id === courseId);
//     expect(result).toBeUndefined();
//   });
// });
