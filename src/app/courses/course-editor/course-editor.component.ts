import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { Course } from '../models/course.model';
import { CanComponentDeactivate } from 'src/app/core/guards/can-deactivate.guard';
import { AppState } from '../../store/app.reducers';
import { CancelEditCourse, CreateCourse, UpdateCourse } from '../store/courses.actions';
import { Author } from '../models/author.model';
import { LoadAuthors } from '../store/authors.actions';
import { selectAuthors } from '../store/authors.selectors';

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
  public courseForm: FormGroup;
  public authors$: Observable<Array<Author>>;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.editedCourse = null;
    this.isSaved = false;
    this.newCourse = new Course(this.generateCourseId());
    this.route.data.subscribe(
      ({course}) => {
        if (course) {
          this.editedCourse = course;
          this.newCourse = { ...course };
        }
    });
    this.courseForm = this.createForm();

    this.store.dispatch(new LoadAuthors());

    this.authors$ = this.store.pipe(
      select(selectAuthors)
    );
  }

  public createForm(): FormGroup {
    return this.formBuilder.group({
      title: [this.newCourse.title, [Validators.required, Validators.maxLength(50)]],
      description: [this.newCourse.description, [Validators.required, Validators.maxLength(500)]],
      date: [this.newCourse.date.slice(0, 10)],
      duration: [this.newCourse.duration],
      authors: [this.newCourse.authors]
    });
  }
  public get title(): FormControl {
    return <FormControl>this.courseForm.get('title');
  }

  public get description(): FormControl {
    return <FormControl>this.courseForm.get('description');
  }

  public get authors(): FormControl {
    return <FormControl>this.courseForm.get('authors');
  }

  public saveCourse(): void {
    const newCourse = {...this.newCourse, ...this.courseForm.value};
    console.log(newCourse);
    this.editedCourse ?
      this.store.dispatch(new UpdateCourse(newCourse)) :
      this.store.dispatch(new CreateCourse(newCourse));

    this.isSaved = true;
  }

  public returnToCourses(): void {
    this.store.dispatch(new CancelEditCourse());
  }

  public canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    const unsavedChanges = !this.isSaved &&
      this.editedCourse &&
      Object.keys(this.courseForm.value).some((key: string) => {
        return this.courseForm.value[key] !== this.newCourse[key];
    });

    return unsavedChanges ?
      confirm('Do you want to discard the changes?') :
      true;
  }

  private generateCourseId(): number {
    return Math.trunc(Math.random() * Date.now());
  }
}
