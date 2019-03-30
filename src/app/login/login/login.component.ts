import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/store/app.reducers';
import { Login } from '../store/login.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  public get login(): FormControl {
    return <FormControl>(this.loginForm && this.loginForm.get('login'));
  }

  public get password(): FormControl {
    return <FormControl>(this.loginForm && this.loginForm.get('password'));
  }

  public logIn(): void {
    const {login, password} = this.loginForm.value;

    this.store.dispatch(new Login(login, password));
  }

}
