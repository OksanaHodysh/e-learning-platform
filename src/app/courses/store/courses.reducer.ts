import { Course } from '../models/course.model';
import { CoursesAction, CoursesActionsEnum } from './courses.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface FeatureState {
    courses: CoursesState;
}

export interface CoursesState extends EntityState<Course> {
    coursesLoaded: boolean;
}

export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>();

export const initialState: CoursesState = adapter.getInitialState({
    coursesLoaded: false
});

export function coursesReducer(
    state = initialState,
    action: CoursesAction
): CoursesState {
    switch (action.type) {

        case CoursesActionsEnum.LoadCoursesSuccess: {
            return adapter.addAll(
              action.courses,
              {...state, coursesLoaded: true}
            );
        }

        case CoursesActionsEnum.LoadCourseSuccess: {
            return adapter.addOne(action.course, state);
        }

        case CoursesActionsEnum.UpdateCourse: {
            return adapter.upsertOne(action.course, state);
        }

        case CoursesActionsEnum.DeleteCourseSuccess: {
            return adapter.removeOne(action.courseId, state);
        }

        default: {
            return state;
        }
    }
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
