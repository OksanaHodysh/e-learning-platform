import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { LoginComponent } from './login.component';
import { AuthService } from '../../core/services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let serviceSpy: jasmine.SpyObj<AuthService>;
  let email: string;
  let password: string;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('AuthService', ['login']);
    email = 'test@test.com';
    password = 'test777';

    TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      imports: [
        FormsModule
      ],
      providers: [
        {provide: AuthService, useValue: spy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    serviceSpy = TestBed.get(AuthService);
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('user should log in by submitting a login form', () => {
    const submitBtn = fixture.debugElement.query(By.css('.submit-btn'));
    expect(submitBtn.nativeElement.textContent).toEqual('Login');
    submitBtn.triggerEventHandler('click', null);
    expect(serviceSpy.login).not.toHaveBeenCalled();
  });

  it('user should log in by submitting a login form', () => {
    component.userEmail = email;
    component.userPassword = password;
    const submitBtn = fixture.debugElement.query(By.css('.submit-btn'));
    submitBtn.triggerEventHandler('click', null);
    expect(serviceSpy.login).toHaveBeenCalledWith(email, password);
  });
});
