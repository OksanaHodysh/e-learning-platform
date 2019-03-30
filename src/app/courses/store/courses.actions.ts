import { Action } from '@ngrx/store';

import { Course } from '../models/course.model';

export enum CoursesActionsEnum {
    LoadCourses = '[Courses] Load Courses',
    LoadCoursesFail = '[Courses] Load Courses Fail',
    LoadCoursesSuccess = '[Courses] Load Courses Success',
    LoadCourse = '[Courses] Load Course',
    LoadCourseFail = '[Courses] Load Course Fail',
    LoadCourseSuccess = '[Courses] Load Course Success',
    CreateCourse = '[Courses] Create Course',
    UpdateCourse = '[Courses] Update Course',
    DeleteCourse = '[Courses] Delete Course'
}

export class LoadCourses implements Action {
    public readonly type = CoursesActionsEnum.LoadCourses;
}

export class LoadCoursesFail implements Action {
    public readonly type = CoursesActionsEnum.LoadCoursesFail;

    public constructor(public message: string) {}
}

export class LoadCoursesSuccess implements Action {
    public readonly type = CoursesActionsEnum.LoadCoursesSuccess;

    public constructor(public courses: Array<Course>) {}
}

export class LoadCourse implements Action {
    public readonly type = CoursesActionsEnum.LoadCourse;

    public constructor(public courseId: number) {}
}

export class LoadCourseSuccess implements Action {
    public readonly type = CoursesActionsEnum.LoadCourseSuccess;

    public constructor(public course: Course) {}
}

export class LoadCourseFail implements Action {
    public readonly type = CoursesActionsEnum.LoadCourseFail;

    public constructor(public message: string) {}
}

export class CreateCourse implements Action {
    public readonly type = CoursesActionsEnum.CreateCourse;

    public constructor(public course: Course) {}
}

export class UpdateCourse implements Action {
    public readonly type = CoursesActionsEnum.UpdateCourse;

    public constructor(public course: Course) {}
}

export class DeleteCourse implements Action {
    public readonly type = CoursesActionsEnum.DeleteCourse;

    public constructor(public course: Course) {}
}

export type CoursesAction = LoadCourses |
  LoadCoursesFail |
  LoadCoursesSuccess |
  LoadCoursesFail |
  LoadCourse |
  LoadCourseSuccess |
  LoadCourseFail |
  CreateCourse |
  UpdateCourse |
  DeleteCourse;
