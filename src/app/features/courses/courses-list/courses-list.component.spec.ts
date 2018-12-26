import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { CoursesListComponent } from './courses-list.component';
import { CoursesListItemComponent } from '../courses-list-item/courses-list-item.component';
import { Course } from '../course.model';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { DurationPipe } from '../pipes/duration.pipe';
import { FilterPipe } from '../pipes/filter.pipe';

// Approach 2: Stand-alone testing
describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;
  let pipe: FilterPipe;
  let searchResult: Array<Course>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesListComponent,
        CoursesListItemComponent,
        OrderByPipe,
        DurationPipe
      ],
      imports: [
        FormsModule
      ],
      providers: [FilterPipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.debugElement.componentInstance;
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
    component.ngOnInit();
    fixture.detectChanges();
  });

  function getNewDate(numOfDays: number): string {
    const today = new Date();
    const tomorrow = new Date();
    return new Date(tomorrow.setDate(today.getDate() + numOfDays)).toString();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize data properly', () => {
    expect(component.limit).toBe(5);
    expect(component.step).toBe(5);
    expect(component.searchCourse).toBe('');
    expect(component.searchedCourses[0].id).toBe(7);
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

  it('should define proper background color for upgoing course', () => {
    const result = component.defineBorderColor(getNewDate(1));
    expect(result).toBe('blue');
  });

  it('should define proper background color for fresh course', () => {
    const result = component.defineBorderColor(getNewDate(-3));
    expect(result).toBe('green');
  });

  it('should define proper background color for old course', () => {
    const result = component.defineBorderColor(getNewDate(-15));
    expect(result).toBe('transparent');
  });
});
