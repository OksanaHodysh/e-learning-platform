import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { LoginState } from 'src/app/login/store/login.reducer';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public userEmail$: Observable<string>;
  public isAuthenticated$: Observable<LoginState>;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.userEmail$ = this.authService.userEmail;
    this.authService.getUserInfo();
    this.isAuthenticated$ = this.store.select('login');
    this.isAuthenticated$.subscribe((state) => console.log(state));
  }

  public logOut(): void {
    this.authService.logout();
  }
}
