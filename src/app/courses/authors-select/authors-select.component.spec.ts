import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsSelectComponent } from './authors-select.component';

describe('AuthorsSelectComponent', () => {
  let component: AuthorsSelectComponent;
  let fixture: ComponentFixture<AuthorsSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorsSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
