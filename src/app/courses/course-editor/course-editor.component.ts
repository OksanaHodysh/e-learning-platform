import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Course } from '../models/course.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CourseService } from '../services/course.service';
import { CanComponentDeactivate } from 'src/app/core/guards/can-deactivate.guard';
import { AppState } from '../../store/app.reducers';
import { CreateCourse, UpdateCourse } from '../store/courses.actions';
import { Author } from '../models/author.model';

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
    private router: Router,
    private courseService: CourseService,
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
    console.log(this.courseForm);
    this.authors$ = this.courseService.getAuthors();
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
    console.log('Changes saved successfully.');
    console.log(this.newCourse);
    this.editedCourse ?
      this.courseService.updateCourse(this.editedCourse, this.newCourse) :
      this.courseService.createCourse(this.newCourse);

    this.editedCourse ?
      this.store.dispatch(new UpdateCourse(this.newCourse)) :
      this.store.dispatch(new CreateCourse(this.newCourse));

    this.isSaved = true;

    this.router.navigate(['/courses']);
  }

  public save(): void {
    console.log(this.courseForm.value);
    console.log(this.courseForm);
    this.store.select('courses').subscribe((state) => console.log(state));
  }

  public returnToCourses(): void {
    this.router.navigate(['/courses']);
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
    return Math.trunc(Math.random() * Date.now());
  }
}
