import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public userLogin = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUserInfo()
      .subscribe((data) => {
        if (data) {
          this.userLogin = data;
        }
      });
  }

  public logOut(): void {
    this.userLogin = '';
    this.authService.logout();
  }
}
