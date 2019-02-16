import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HeaderComponent } from './header.component';
import { AuthService } from '../../services/auth.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let serviceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('AuthService', [
      'logout',
      'getUserInfo'
    ]);
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent
      ],
      providers: [
        {provide: AuthService, useValue: spy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    serviceSpy = TestBed.get(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout a user', () => {
    const logoutBtn = fixture.debugElement.query(By.css('.log-out'));
    expect(logoutBtn.nativeElement.textContent).toEqual('Log Out');
    logoutBtn.triggerEventHandler('click', null);
    expect(serviceSpy.logout).toHaveBeenCalled();
  });

  it('should display a user login', () => {
    serviceSpy.getUserInfo.and.returnValue('Test User');

    expect(component.getUserLogin()).toBe('Test User');
  });
});
