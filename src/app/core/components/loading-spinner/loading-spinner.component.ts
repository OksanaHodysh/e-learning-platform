import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {

  constructor(private loaderService: LoaderService) { }
  public isLoading: boolean;

  ngOnInit() {
    this.loaderService.isLoading.subscribe((data) => {
      console.log('Loading: ', data);
      this.isLoading = data;
    });
  }

}
