import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public userLogin: string;
  public userPassword: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userLogin = '';
    this.userPassword = '';
  }

  public logIn(): void {
    if (this.userLogin && this.userPassword) {
      console.log('Logged In Successfully');
      this.authService.login(this.userLogin, this.userPassword);
    }
  }

}
