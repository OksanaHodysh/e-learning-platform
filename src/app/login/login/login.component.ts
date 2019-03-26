import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthService } from 'src/app/core/services/auth.service';
import { AppState } from 'src/app/store/app.reducers';
import { Login } from '../store/login.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public userLogin: string;
  public userPassword: string;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.userLogin = '';
    this.userPassword = '';
  }

  public logIn(): void {
    if (this.userLogin && this.userPassword) {
      console.log('Logged In Successfully');
      this.authService.login(this.userLogin, this.userPassword);
      this.store.dispatch(new Login(this.userLogin, this.userPassword));
      this.store.select('login').subscribe((state) => console.log(state));
    }
  }

}
