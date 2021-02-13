import {AfterViewInit, Component, Renderer2} from '@angular/core';
import {LoaderService} from './core/general/_services/loader.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {TranslationService} from './core/general/_services/translation.service';
import { locale as enLang } from './core/_config/i18n/en';
import { locale as trLang } from './core/_config/i18n/tr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'hotelUplift';

  constructor(private translationService: TranslationService,
              private loaderService: LoaderService,
              private renderer: Renderer2,
              private spinnerService: NgxSpinnerService) {
    this.translationService.loadTranslations(enLang, trLang);
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
