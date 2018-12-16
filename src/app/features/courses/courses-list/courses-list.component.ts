import { Component, OnInit } from '@angular/core';
import { Course } from '../course.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  public courses: Array<Course> = [];
  public searchCourse: string;
  public limit: number;
  public step: number;

  constructor() { }

  ngOnInit() {
    this.courses = [
      {
        id: 1,
        title: 'Angular 7 - The Complete Guide',
        creationDate: '01.11.2018',
        duration: '28h 8min',
        description: `This course starts from scratch, you neither need to know Angular 1 nor Angular 2!
        From Setup to Deployment, this course covers it all! You'll learn all about Components, Directives,
        Services, Forms, Http Access, Authentication, Optimizing an Angular App with Modules and Offline
        Compilation and much more - and in the end: You'll learn how to deploy an application!`
      },
      {
        id: 2,
        title: 'The Complete Angular Course: Beginner to Advanced',
        creationDate: '04.01.2018',
        duration: '29h 33min',
        description: `Right from the beginning, you'll jump in and build your first Angular app within minutes.
        Say goodbye to boring tutorials and courses with rambling instructors and useless theories! You'll learn
        how to apply best practices, refactor your code and produce high quality code like a professional developer.`
      },
      {
        id: 3,
        title: 'Angular Crash Course for Busy Developers',
        creationDate: '04.01.2018',
        duration: '10h 20min',
        description: `In  just 10 hours, you can learn all the essential Angular concepts! You can simply dedicate
        a weekend to this course and by the end of the weekend you'll have a good understanding of Angular and you'll
        be able to build real client apps with Angular.`
      },
      {
        id: 4,
        title: 'Angular & NodeJS - The MEAN Stack Guide',
        creationDate: '02.01.2018',
        duration: '12h 39min',
        description: `Create modern, scalable and high-speed Web Applications with Angular and NodeJS + Express + MongoDB.
        Angular 1 and NodeJS, together with ExpressJS (a NodeJS Framework) and MongoDB formed the very popular MEAN stack.
        Now is the time to dive into MEAN 2.0 and replace Angular 1 with Angular 2+.`
      },
      {
        id: 5,
        title: 'Angular Front To Back',
        creationDate: '08.01.2018',
        duration: '11h 25min',
        description: `This course was crafted to benefit absolutely any level of developer. We will start from scratch and
        learn how to create a development environment for Angular 5+, Setup Angular CLI and learn all of the fundamentals.
        We start by building a sandbox application to look at all of the main Angular concepts as well as building a logging
        application, then move to a much more advanced client management system with authentication and data storing.`
      },
      {
        id: 6,
        title: 'Testing Angular 4 Apps with Jasmine',
        creationDate: '03.05.2018',
        duration: '2h 12min',
        description: `In this course, author of several best selling courses on Udemy takes you from the ground and gives you a
        solid foundation to write automated tests for your Angular apps. Whether you're an absolute beginner or have some familiarity
        with automated testing, this course will give you all the necessary skills to write automated tests for your Angular apps. `
      },
      {
        id: 7,
        title: 'Learn Angular 2 from Beginner to Advanced',
        creationDate: '09.08.2018',
        duration: '10h 06min',
        description: `If you are looking to advance your skills with Angular 2, then look no further because this course is just right
        for you! Become an advanced programmer in Angular 2 in no time using this course which will continue to educate and motivate you
        along the way.`
      }
    ];
    this.searchCourse = '';
    this.limit = 5;
    this.step = this.limit;
  }

  public findCourses(): Array<Course> {
    console.log(this.searchCourse);
    return this.courses.filter((course) => course.title.indexOf(this.searchCourse) >= 0);
  }

  public deleteCourse(courseId: number): Array<Course> {
    console.log(courseId);
    return this.courses.splice(this.courses.indexOf(this.courses.find((item) => item.id === courseId)), 1);
  }

  public loadMore(): void {
    if (this.limit < this.courses.length) {
      this.limit += this.step;
    }
  }

}
