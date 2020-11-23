import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {InboxComponent} from './views/pages/inbox/inbox.component';
import {ChartsModule} from 'ng2-charts';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {InterceptService} from './core/_base/utils/intercept.service';
import {ThemeModule} from './views/theme/theme.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {CategorizationComponent} from './views/pages/categorization/categorization.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {NgxDaterangepickerMd} from 'ngx-daterangepicker-material';
import {NgxSliderModule} from '@angular-slider/ngx-slider';
import {InboxPoolComponent} from './views/pages/inbox-pool/inbox-pool.component';

@NgModule({
  declarations: [
    AppComponent,
    InboxComponent,
    InboxPoolComponent,
    CategorizationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ChartsModule,
    ThemeModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    NgxDaterangepickerMd.forRoot(),
    NgxSliderModule
  ],
  providers: [
    InterceptService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
