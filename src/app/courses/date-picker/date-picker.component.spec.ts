import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { DatePickerComponent } from './date-picker.component';
import { Course } from '../course.model';

@Component({
  template: `
  <app-date-picker
    [date]="newCourse.creationDate"
    (changeDate)="setNewDate($event)">
  </app-date-picker>`
})
class TestHostComponent {
  newCourse: Course = {
    id: 6,
    title: 'Test Course',
    creationDate: '1970-01-01',
    duration: '2h 12min',
    topRated: false,
    authors: ['Unknown Author'],
    description: `Test`
  };

  public setNewDate(newDate: string): void {
    this.newCourse.creationDate = newDate;
  }
}

describe('DatePickerComponent', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestHostComponent,
        DatePickerComponent
      ],
      imports: [
        FormsModule
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

  it('should raise a date change event', async(() => {
    fixture.whenStable().then(() => {
      const input = fixture.debugElement.query(By.css('#date')).nativeElement;
      expect(input.value).toBe('1970-01-01');
      input.value = '1970-02-02';
      input.dispatchEvent(new Event('change'));
      expect(testHost.newCourse.creationDate).toBe('1970-02-02');
    });
  }));
});
