import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../course.model';

@Component({
  selector: 'app-courses-list-item',
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.scss']
})
export class CoursesListItemComponent implements OnInit {
  @Input() course: Course;
  @Output() removeCourse = new EventEmitter<number>();
  @Output() updateCourse = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  public deleteCourse(): void {
    this.removeCourse.emit(this.course.id);
  }

  public editCourse(): void {
    this.updateCourse.emit(this.course.id);
  }

}
