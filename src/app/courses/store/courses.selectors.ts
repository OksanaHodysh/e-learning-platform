import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CoursesState, selectAll } from './courses.reducer';

export const selectCoursesState = createFeatureSelector<CoursesState>('courses');

export const selectCourseById = (courseId: number) => createSelector(
  selectCoursesState,
  ({entities}) => entities[courseId]
);

export const selectCourses = createSelector(
  selectCoursesState,
  selectAll
);

export const allCoursesLoaded = createSelector(
  selectCoursesState,
  (({coursesLoaded}) => coursesLoaded)
);

export const selectSearchedCourses = ((searchTerm: string) => createSelector(
  selectCourses,
  (courses) => courses.filter((course) => (
    course.title.concat(course.description).toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0)
  )
));
