import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  public numOfRequestsInProgress = 0;

  constructor(private loaderService: LoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.numOfRequestsInProgress) {
      this.loaderService.isLoading.next(true);
    }

    this.numOfRequestsInProgress++;

    return next.handle(req).pipe(
      finalize(() => {
        this.numOfRequestsInProgress--;

        if (!this.numOfRequestsInProgress) {
          this.loaderService.isLoading.next(false);
        }
      })
    );
  }
}
