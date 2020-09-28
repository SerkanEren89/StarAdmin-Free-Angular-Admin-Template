import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {InboxComponent} from './views/theme/inbox/inbox.component';
import {ImprovementComponent} from './views/pages/improvement/improvement.component';
import {ChartsModule} from 'ng2-charts';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {InterceptService} from './core/_base/utils/intercept.service';
import {ThemeModule} from './views/theme/theme.module';

@NgModule({
  declarations: [
    AppComponent,
    InboxComponent,
    ImprovementComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ChartsModule,
    ThemeModule
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
