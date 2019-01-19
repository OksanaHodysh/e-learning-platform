import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CoursesListItemComponent } from './courses-list-item.component';
import { Course } from '../course.model';
import { DurationPipe } from '../pipes/duration.pipe';

// Approach 2: Test host testing
@Component({
  template: `
  <app-courses-list-item
    class="list-item"
    [course]=course
    (removeCourse)="deleteCourse($event)">
  </app-courses-list-item>`
})
class TestHostComponent {
  course: Course = {
    id: 6,
    title: 'Test Course',
    creationDate: '01.01.1970',
    duration: '2h 12min',
    topRated: false,
    description: `Test`
  };
  courses: Array<Course> = [this.course];
  deleteCourse(courseId: number) {
    return this.courses.splice(this.courses.indexOf(this.courses.find((item) => item.id === courseId)), 1);
  }
}

describe('CoursesListItemComponent', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesListItemComponent,
        TestHostComponent,
        DurationPipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(testHost).toBeTruthy();
  });

  it('should raise the deletion event', () => {
    const deleteBtn = fixture.debugElement.query(By.css('.remove-btn'));
    expect(deleteBtn.nativeElement.textContent).toEqual('Delete');
    deleteBtn.triggerEventHandler('click', null);
    expect(testHost.courses).toEqual([]);
  });
});
