import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Course } from '../course.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CourseService } from '../services/course.service';
import { CanComponentDeactivate } from 'src/app/core/guards/can-deactivate.guard';
import { AppState } from '../../store/app.reducers';
import { Create, Update } from '../store/courses.actions';
import { SelectedAuthor } from '../authors-select/authors-select.component';

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
  public authors$: Observable<Array<SelectedAuthor>>;

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
    this.authors$ = this.courseService.getAuthors();
  }

  public createForm(): FormGroup {
    return this.formBuilder.group({
      title: [this.newCourse.title, [Validators.required, Validators.maxLength(50)]],
      description: [this.newCourse.description, [Validators.required, Validators.maxLength(500)]],
      date: [this.newCourse.date.slice(0, 10)],
      duration: [this.newCourse.duration],
      authors: this.formBuilder.array(this.newCourse.authors.map((author) => this.formBuilder.control(author)))
    });
  }
  public get title(): FormControl {
    return <FormControl>this.courseForm.get('title');
  }

  public get description(): FormControl {
    return <FormControl>this.courseForm.get('description');
  }

  public get authors(): string {
    return this.newCourse.authors
      .map(({firstName, lastName}) => lastName ?
        `${firstName} ${lastName}` :
        firstName)
      .join(', ');
  }

  public set authors(value: string) {
    this.newCourse.authors = value.split(',')
      .map((author: string) => {
        const [firstName = '', lastName = ''] = author.trim().split(' ').map((item) => item && item.trim());

        return {
          id: Math.floor(Math.random() * Date.now()),
          firstName,
          lastName
        };
      });
  }

  public saveCourse(): void {
    console.log('Changes saved successfully.');
    console.log(this.newCourse);
    this.editedCourse ?
      this.courseService.updateCourse(this.editedCourse, this.newCourse) :
      this.courseService.createCourse(this.newCourse);

    this.editedCourse ?
      this.store.dispatch(new Update(this.newCourse)) :
      this.store.dispatch(new Create(this.newCourse));

    this.store.select('courses').subscribe((state) => console.log(state));

    this.isSaved = true;

    this.router.navigate(['/courses']);
  }

  public save(): void {
    console.log(this.courseForm.value);
    console.log(this.courseForm);
  }

  public returnToCourses(): void {
    this.router.navigate(['/courses']);
  }

  public setNewDate(newDate: string): void {
    console.log(newDate);
    this.newCourse.date = newDate;
  }

  public setDuration(newDuration: number): void {
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
    return Math.trunc(Math.random() * Date.now());
  }
}
