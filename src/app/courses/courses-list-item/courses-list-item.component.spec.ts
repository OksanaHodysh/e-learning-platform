import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CoursesListItemComponent } from './courses-list-item.component';
import { Course } from '../models/course.model';
import { DurationPipe } from '../pipes/duration.pipe';

// Approach 2: Test host testing
@Component({
  template: `
  <app-courses-list-item
    class="list-item"
    [course]=course
    (updateCourse)="editCourse($event)"
    (removeCourse)="deleteCourse($event)">
  </app-courses-list-item>`
})
class TestHostComponent {
  course: Course = {
    id: 6,
    title: 'Test Course',
    date: '1970-01-01',
    duration: 132,
    isTopRated: false,
    authors: [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe'
      }
    ],
    description: `Test`
  };
  courses: Array<Course> = [this.course];
  editCourseId: number;
  deleteCourse(courseId: number) {
    return this.courses.splice(this.courses.indexOf(this.courses.find((item) => item.id === courseId)), 1);
  }
  editCourse(courseId: number): void {
    this.editCourseId = courseId;
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

  it('should raise the edition event', () => {
    const editBtn = fixture.debugElement.query(By.css('.edit-btn'));
    expect(editBtn.nativeElement.textContent).toEqual('Edit');
    editBtn.triggerEventHandler('click', null);
    expect(testHost.editCourseId).toEqual(6);
  });
});
