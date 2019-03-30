import { FilterPipe } from './filter.pipe';
import { Course } from '../models/course.model';

describe('FilterPipe', () => {
  let pipe: FilterPipe;
  let courses: Array<Course>;

  beforeEach(() => {
    pipe = new FilterPipe();
    courses = [
      {
        id: 1,
        title: 'Angular',
        date: '2019-01-01',
        duration: 1688,
        isTopRated: true,
        authors: [
          {
            id: 1,
            firstName: 'John',
            lastName: 'Doe'
          }
        ],
        description: 'Test1'
      },
      {
        id: 2,
        title: 'AngularJS',
        date: '2018-11-01',
        duration: 1773,
        isTopRated: true,
        authors: [
          {
            id: 1,
            firstName: 'John',
            lastName: 'Doe'
          }
        ],
        description: 'Test2'
      },
      {
        id: 3,
        title: 'VueJS',
        date: '2018-12-22',
        duration: 620,
        isTopRated: false,
        authors: [
          {
            id: 1,
            firstName: 'John',
            lastName: 'Doe'
          }
        ],
        description: 'Test3'
      }
    ];
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return unmodified array if array is empty', () => {
    const value = [];
    expect(pipe.transform(value, 'test')).toBe(value);
  });

  it('should return unmodified array if no field specified', () => {
    expect(pipe.transform(courses, '')).toBe(courses);
  });

  it('should return filtered array by search word', () => {
    expect(pipe.transform(courses, 'angular')).toEqual([
      {
        id: 1,
        title: 'Angular',
        date: '2019-01-01',
        duration: 1688,
        isTopRated: true,
        authors: [
          {
            id: 1,
            firstName: 'John',
            lastName: 'Doe'
          }
        ],
        description: 'Test1'
      },
      {
        id: 2,
        title: 'AngularJS',
        date: '2018-11-01',
        duration: 1773,
        isTopRated: true,
        authors: [
          {
            id: 1,
            firstName: 'John',
            lastName: 'Doe'
          }
        ],
        description: 'Test2'
      }
    ]);
  });
});
