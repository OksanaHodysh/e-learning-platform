import { Course } from '../course.model';
import { CoursesAction, CoursesActionsEnum } from './courses.actions';

export interface CoursesState {
    courses: Array<Course>;
    editedCourse: Course;
    isEditingMode: boolean;
    loading: boolean;
    loaded: boolean;
}

export const initialState: CoursesState = {
    courses: [
        {
            id: 8693,
            title: 'duis mollit reprehenderit ad',
            description: `Est minim ea aute sunt laborum minim eu excepteur.
              Culpa sint exercitation mollit enim ad culpa aliquip laborum cillum.
              Dolor officia culpa labore ex eiusmod ut est ea voluptate ea nostrud.`,
            isTopRated: false,
            date: '2017-09-28T04:39:24+00:00',
            authors: [
              {
                id: 1370,
                firstName: 'Polly',
                lastName: 'Sosa'
              }
            ],
            duration: 157
        },
        {
            id: 4980,
            title: 'magna excepteur aute deserunt',
            description: `Sunt culpa officia minim commodo eiusmod irure sunt nostrud.
              Mollit aliquip id occaecat officia proident anim dolor officia qui voluptate consectetur laborum.
              Duis incididunt culpa aliqua mollit do fugiat ea dolor mollit irure Lorem tempor.`,
            isTopRated: false,
            date: '2016-05-31T02:02:36+00:00',
            authors: [
              {
                id: 8413,
                firstName: 'Greta',
                lastName: 'Richardson'
              },
              {
                id: 7458,
                firstName: 'Deana',
                lastName: 'Bruce'
              },
              {
                id: 5508,
                firstName: 'Patsy',
                lastName: 'Bright'
              }
            ],
            duration: 207
          }
    ],
    editedCourse: null,
    isEditingMode: false,
    loading: false,
    loaded: false
};

export function coursesReducer(
    state = initialState,
    action: CoursesAction
): CoursesState {
    switch (action.type) {

        case CoursesActionsEnum.Load: {
            return {
                ...state,
                loading: true
            };
        }

        case CoursesActionsEnum.LoadSuccess: {
            return {
                ...state,
                loading: false,
                loaded: true,
                courses: [...action.courses]
            };
        }

        case CoursesActionsEnum.LoadFail: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case CoursesActionsEnum.Create: {
            return {
                ...state,
                courses: [
                    ...state.courses,
                    action.course
                ]
            };
        }

        case CoursesActionsEnum.Update: {
            const index = state.courses.indexOf(state.courses.find(({id}) => id === action.course.id));
            state.courses[index] = action.course;
            return {
                ...state,
                courses: [
                    ...state.courses
                ]
            };
        }

        case CoursesActionsEnum.Delete: {
            return {
                ...state,
                courses: state.courses.filter(({id}) => id !== action.course.id)
            };
        }

        case CoursesActionsEnum.SetEditing: {
            return {
                ...state,
                isEditingMode: action.isEditingMode
            };
        }

        default: {
            return state;
        }
    }
}
