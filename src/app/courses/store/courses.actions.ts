import { Action } from '@ngrx/store';

import { Course } from '../models/course.model';

export enum CoursesActionsEnum {
    LoadCourses = '[Courses] Load Courses',
    LoadCoursesSuccess = '[Courses] Load Courses Success',
    LoadCourse = '[Courses] Load Course',
    LoadCourseSuccess = '[Courses] Load Course Success',
    CreateCourse = '[Courses] Create Course',
    CreateCourseSuccess = '[Courses] Create Course Success',
    UpdateCourse = '[Courses] Update Course',
    UpdateCourseSuccess = '[Courses] Update Course Success',
    DeleteCourse = '[Courses] Delete Course',
    DeleteCourseSuccess = '[Courses] Delete Course Success',
    EditCourse = '[Courses] Edit Course',
    ActionFail = '[Courses] Action Fail'
}

export class LoadCourses implements Action {
    public readonly type = CoursesActionsEnum.LoadCourses;
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

export class CreateCourse implements Action {
    public readonly type = CoursesActionsEnum.CreateCourse;

    public constructor(public course: Course) {}
}

export class CreateCourseSuccess implements Action {
    public readonly type = CoursesActionsEnum.CreateCourseSuccess;

    public constructor(public course: Course) {}
}

export class UpdateCourse implements Action {
    public readonly type = CoursesActionsEnum.UpdateCourse;

    public constructor(public course: Course) {}
}

export class UpdateCourseSuccess implements Action {
    public readonly type = CoursesActionsEnum.UpdateCourseSuccess;

    public constructor(public course: Course) {}
}

export class DeleteCourse implements Action {
    public readonly type = CoursesActionsEnum.DeleteCourse;

    public constructor(public courseId: number) {}
}

export class DeleteCourseSuccess implements Action {
    public readonly type = CoursesActionsEnum.DeleteCourseSuccess;

    public constructor(public courseId: number) {}
}

export class EditCourse implements Action {
    public readonly type = CoursesActionsEnum.EditCourse;

    public constructor(public courseId: number) {}
}

export class ActionFail implements Action {
    public readonly type = CoursesActionsEnum.ActionFail;

    public constructor(public message: string) {}
}

export type CoursesAction = LoadCourses |
  LoadCoursesSuccess |
  LoadCourse |
  LoadCourseSuccess |
  CreateCourse |
  CreateCourseSuccess |
  UpdateCourse |
  UpdateCourseSuccess |
  DeleteCourse |
  DeleteCourseSuccess |
  EditCourse |
  ActionFail;
