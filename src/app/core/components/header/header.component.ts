import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from 'src/app/store/app.reducers';
import { Logout } from '../../../login/store/login.actions';
import { userLogin } from '../../../login/store/login.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public userEmail$: Observable<string>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.userEmail$ = this.store.pipe(
      select(userLogin)
    );
  }

  public logOut(): void {
    this.store.dispatch(new Logout());
  }
}
