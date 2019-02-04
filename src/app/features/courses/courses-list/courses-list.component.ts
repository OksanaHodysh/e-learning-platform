import { Component, OnInit } from '@angular/core';

import { Course } from '../course.model';
import { FilterPipe } from '../pipes/filter.pipe';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  public courses: Array<Course> = [];
  public searchedCourses: Array<Course> = [];
  public searchCourse: string;
  public limit: number;
  public step: number;

  constructor(
    private filterPipe: FilterPipe,
    private courseService: CourseService
  ) { }

  ngOnInit() {
    this.courses = this.courseService.getCourses() || [];
    this.searchedCourses = this.courses;
    this.searchCourse = '';
    this.limit = 5;
    this.step = this.limit;
  }

  public findCourses(): void {
    console.log(this.searchCourse);
    this.searchedCourses = this.filterPipe.transform(this.courses, this.searchCourse);
  }

  public addCourse(): void {
    this.courseService.createCourse();
  }

  public deleteCourse(courseId: number): void {
    const deletionConfirmed = confirm('Do you really want to delete this course?');
    if (deletionConfirmed) {
      this.courseService.removeCourse(courseId);
      this.findCourses();
    }
  }

  public editCourse(courseId: number): void {
    this.courseService.updateCourse(courseId);
  }

  public loadMore(): void {
    if (this.limit < this.courses.length) {
      this.limit += this.step;
    }
  }
}
