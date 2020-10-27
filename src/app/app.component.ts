import {AfterViewInit, Component, Renderer2} from '@angular/core';
import {LoaderService} from './core/general/_services/loader.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'hotelUplift';

  constructor(private loaderService: LoaderService,
              private renderer: Renderer2,
              private spinnerService: NgxSpinnerService) {

  }

  ngAfterViewInit() {
    this.loaderService.httpProgress().subscribe((status: boolean) => {
      if (status) {
        this.spinnerService.show();
      } else {
        this.spinnerService.hide();
      }
    });
  }
}
