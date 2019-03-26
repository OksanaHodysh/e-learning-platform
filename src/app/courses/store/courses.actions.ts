import { Action } from '@ngrx/store';

import { Course } from '../course.model';

export enum CoursesActionsEnum {
    Load = '[Courses] Load',
    LoadFail = '[Courses] Load Fail',
    LoadSuccess = '[Courses] Load Success',
    Create = '[Courses] Create',
    Update = '[Courses] Update',
    Delete = '[Courses] Delete',
    SetEditing = '[Courses] Set Editing'
}

export class Load implements Action {
    public readonly type = CoursesActionsEnum.Load;
}

export class LoadFail implements Action {
    public readonly type = CoursesActionsEnum.LoadFail;

    public constructor(public message: string) {}
}

export class LoadSuccess implements Action {
    public readonly type = CoursesActionsEnum.LoadSuccess;

    public constructor(public courses: Array<Course>) {}
}

export class Create implements Action {
    public readonly type = CoursesActionsEnum.Create;

    public constructor(public course: Course) {}
}

export class Update implements Action {
    public readonly type = CoursesActionsEnum.Update;

    public constructor(public course: Course) {}
}

export class Delete implements Action {
    public readonly type = CoursesActionsEnum.Delete;

    public constructor(public course: Course) {}
}

export class SetEditing implements Action {
    public readonly type = CoursesActionsEnum.SetEditing;

    public constructor(public isEditingMode: boolean) {}
}

export type CoursesAction = Load | LoadFail | LoadSuccess | Create | Update | Delete | SetEditing;
