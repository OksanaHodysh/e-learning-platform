import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { Course } from '../course.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CourseService } from '../services/course.service';
import { CanComponentDeactivate } from 'src/app/core/guards/can-deactivate.guard';

@Component({
  selector: 'app-course-editor',
  templateUrl: './course-editor.component.html',
  styleUrls: ['./course-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseEditorComponent implements OnInit, CanComponentDeactivate {
  public newCourse: Course;
  public editedCourse: Course;
  public isSaved: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) { }

  ngOnInit() {
    this.editedCourse = null;
    this.isSaved = false;
    this.newCourse = new Course(this.generateCourseId());
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        of(this.courseService.getCourseById(+params.get('id')))))
        .subscribe((course: Course) => {
          if (course) {
            this.editedCourse = course;
            this.newCourse = { ...course };
          }
        });
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
    this.editedCourse ?
      this.courseService.updateCourse(this.editedCourse, this.newCourse) :
      this.courseService.createCourse(this.newCourse);

    this.isSaved = true;

     this.router.navigate(['/courses']);
  }

  public returnToCourses(): void {
    this.router.navigate(['/courses']);
  }

  public setNewDate(newDate: string): void {
    console.log(newDate);
    this.newCourse.creationDate = newDate;
  }

  public setDuration(newDuration: string): void {
    console.log(newDuration);
    this.newCourse.duration = newDuration;
  }

  public canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    const unsavedChanges = !this.isSaved &&
      this.editedCourse &&
      Object.keys(this.editedCourse).some((key: string) => {
        return this.editedCourse[key] !== this.newCourse[key];
    });

    return unsavedChanges ?
      confirm('Do you want to discard the changes?') :
      true;
  }

  private generateCourseId(): number {
    return this.courseService.getCourses().length + 1;
  }
}
