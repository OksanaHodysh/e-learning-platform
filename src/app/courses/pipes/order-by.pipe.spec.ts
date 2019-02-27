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
        title: 'Test1',
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
        title: 'Test2',
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

  it('should return array sorted by date if fieldName is date', () => {
    expect(pipe.transform(courses, 'date')).toEqual([
      {
        id: 2,
        title: 'Test1',
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
        title: 'Test2',
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
      },
      {
        id: 1,
        title: 'Test3',
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
      }
    ]);
  });

  it('should return array sorted by value if fieldName is other than date', () => {
    const result = pipe.transform(courses, 'title');

    expect(result[0].id).toBe(2);
    expect(result[1].id).toBe(3);
    expect(result[2].id).toBe(1);
  });
});
