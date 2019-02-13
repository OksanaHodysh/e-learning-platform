import { FilterPipe } from './filter.pipe';
import { Course } from '../course.model';

describe('FilterPipe', () => {
  let pipe: FilterPipe;
  let courses: Array<Course>;

  beforeEach(() => {
    pipe = new FilterPipe();
    courses = [
      {
        id: 1,
        title: 'Angular',
        creationDate: '2019-01-01',
        duration: '1688',
        topRated: true,
        authors: ['Unknown Author'],
        description: 'Test1'
      },
      {
        id: 2,
        title: 'AngularJS',
        creationDate: '2018-11-01',
        duration: '1773',
        topRated: true,
        authors: ['Unknown Author'],
        description: 'Test2'
      },
      {
        id: 3,
        title: 'VueJS',
        creationDate: '2018-12-22',
        duration: '620',
        topRated: false,
        authors: ['Unknown Author'],
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
        creationDate: '2019-01-01',
        duration: '1688',
        topRated: true,
        authors: ['Unknown Author'],
        description: 'Test1'
      },
      {
        id: 2,
        title: 'AngularJS',
        creationDate: '2018-11-01',
        duration: '1773',
        topRated: true,
        authors: ['Unknown Author'],
        description: 'Test2'
      }
    ]);
  });
});
