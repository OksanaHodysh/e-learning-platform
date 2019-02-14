import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  public courseTitle: string;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.courseTitle = '';
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      if (this.route.children.length) {
        this.route.children.forEach((child) => {
          const { data } = child.snapshot;

          this.courseTitle = data.course ? data.course.title : '';
        });
      }
    });
  }
}
