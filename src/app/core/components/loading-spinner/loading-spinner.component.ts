import { Component, OnInit, OnDestroy } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit, OnDestroy {

  constructor(private loaderService: LoaderService) { }
  public isLoading: boolean;
  public loaderSubscription: Subscription;

  ngOnInit() {
    this.loaderSubscription = this.loaderService.isLoading.subscribe((data) => {
      console.log('Loading: ', data);
      this.isLoading = data;
    });
  }

  ngOnDestroy() {
    this.loaderSubscription.unsubscribe();
  }

}
