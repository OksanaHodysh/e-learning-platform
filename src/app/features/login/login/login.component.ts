import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public userEmail: string;
  public userPassword: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userEmail = '';
    this.userPassword = '';
  }

  public logIn(): void {
    if (this.userEmail && this.userPassword) {
      console.log('Logged In Successfully');
      this.authService.login(this.userEmail, this.userPassword);
    }
  }

}
