import { OrderByPipe } from './order-by.pipe';
import { Course } from '../course.model';

describe('OrderByPipe', () => {
  let pipe: OrderByPipe;
  let courses: Array<Course>;

  beforeEach(() => {
    pipe = new OrderByPipe();
    courses = [
      {
        id: 1,
        title: 'Test3',
        creationDate: '2019-01-01',
        duration: '1688',
        topRated: true,
        authors: ['Unknown Author'],
        description: 'Test1'
      },
      {
        id: 2,
        title: 'Test1',
        creationDate: '2018-11-01',
        duration: '1773',
        topRated: true,
        authors: ['Unknown Author'],
        description: 'Test2'
      },
      {
        id: 3,
        title: 'Test2',
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

  it('should return array sorted by date if fieldName is creationDate', () => {
    expect(pipe.transform(courses, 'creationDate')).toEqual([
      {
        id: 2,
        title: 'Test1',
        creationDate: '2018-11-01',
        duration: '1773',
        topRated: true,
        authors: ['Unknown Author'],
        description: 'Test2'
      },
      {
        id: 3,
        title: 'Test2',
        creationDate: '2018-12-22',
        duration: '620',
        topRated: false,
        authors: ['Unknown Author'],
        description: 'Test3'
      },
      {
        id: 1,
        title: 'Test3',
        creationDate: '2019-01-01',
        duration: '1688',
        topRated: true,
        authors: ['Unknown Author'],
        description: 'Test1'
      }
    ]);
  });

  it('should return array sorted by value if fieldName is other than creationDate', () => {
    const result = pipe.transform(courses, 'title');

    expect(result[0].id).toBe(2);
    expect(result[1].id).toBe(3);
    expect(result[2].id).toBe(1);
  });
});
