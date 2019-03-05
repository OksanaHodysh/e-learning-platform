import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public userEmail$: Observable<string>;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userEmail$ = this.authService.userEmail;
    this.authService.getUserInfo();
  }

  public logOut(): void {
    this.authService.logout();
  }
}
