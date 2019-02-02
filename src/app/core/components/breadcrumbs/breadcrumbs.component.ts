import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  public isAuthenticated(): boolean {
    return this.auth.isAuthenticated();
  }

}
