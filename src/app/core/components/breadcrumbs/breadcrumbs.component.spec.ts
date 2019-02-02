import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbsComponent } from './breadcrumbs.component';
import { AuthService } from '../../services/auth.service';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;
  let serviceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    TestBed.configureTestingModule({
      declarations: [
        BreadcrumbsComponent
      ],
      providers: [
        {provide: AuthService, useValue: spy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    serviceSpy = TestBed.get(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should verify if user is authenticated', () => {
    component.isAuthenticated();
    expect(serviceSpy.isAuthenticated).toHaveBeenCalled();
  });
});
