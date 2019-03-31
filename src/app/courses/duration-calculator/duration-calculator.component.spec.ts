import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { DurationCalculatorComponent } from './duration-calculator.component';
import { DurationPipe } from '../pipes/duration.pipe';
import { Course } from '../models/course.model';

@Component({
  template: `
  <app-duration-calculator
    [duration]="newCourse.duration"
    (changeDuration)="setDuration($event)">
  </app-duration-calculator>`
})
class TestHostComponent {
  newCourse: Course = {
    id: 6,
    title: 'Test Course',
    date: '1970-01-01',
    duration: 620,
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

  public setDuration(newDuration: number): void {
    this.newCourse.duration = newDuration;
  }
}

describe('DurationCalculatorComponent', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestHostComponent,
        DurationCalculatorComponent,
        DurationPipe
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

  it('should raise a duration change event', async(() => {
    fixture.whenStable().then(() => {
      const input = fixture.debugElement.query(By.css('#duration')).nativeElement;
      expect(input.value).toBe(620);
      input.value = 777;
      input.dispatchEvent(new Event('change'));
      expect(testHost.newCourse.duration).toBe(777);
    });
  }));
});
