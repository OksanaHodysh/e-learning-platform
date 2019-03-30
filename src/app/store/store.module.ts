import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { metaReducers } from './app.reducers';
import { environment } from '../../environments/environment';
import { reducers } from './app.reducers';
import { CustomSerializer } from './custom-serializer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      serializer: CustomSerializer
    }),
    !environment.production ?
      StoreDevtoolsModule.instrument({
        name: 'E-learning'
      }) :
      []
  ]
})
export class AppStoreModule { }
