import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoadingSpinnerComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoadingSpinnerComponent,
    AppRoutingModule
  ]
})
export class CoreModule { }
