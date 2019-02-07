import { Component, OnInit } from '@angular/core';

import { Course } from '../course.model';

@Component({
  selector: 'app-course-editor',
  templateUrl: './course-editor.component.html',
  styleUrls: ['./course-editor.component.scss']
})
export class CourseEditorComponent implements OnInit {
  public newCourse: Course;

  constructor() { }

  ngOnInit() {
    this.createNewCourse();
  }

  public get authors(): string {
    return this.newCourse.authors.join(', ');
  }

  public set authors(value: string) {
    this.newCourse.authors = value.split(',').map((item: string) => item.trim());
  }

  public saveCourse(): void {
    console.log('Changes saved successfully.');
    console.log(this.newCourse);
  }

  public resetCourse(event: Event): void {
    event.preventDefault();
    this.createNewCourse();
  }

  public setNewDate(newDate: string): void {
    console.log(newDate);
    this.newCourse.creationDate = newDate;
  }

  public setDuration(newDuration: string): void {
    console.log(newDuration);
    this.newCourse.duration = newDuration;
  }

  private createNewCourse(): void {
    this.newCourse = {
      id: null,
      title: '',
      creationDate: '',
      duration: '',
      description: '',
      authors: [],
      topRated: false
    };
  }
}
