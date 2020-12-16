import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {ChartsModule} from 'ng2-charts';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {InterceptService} from './core/_base/utils/intercept.service';
import {ThemeModule} from './views/theme/theme.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {CategorizationComponent} from './views/pages/categorization/categorization.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {InboxPoolComponent} from './views/pages/inbox-pool/inbox-pool.component';
import {CoreModule} from './core/core.module';
import {TaskManagementComponent} from './views/pages/task-management/task-management.component';

@NgModule({
  declarations: [
    AppComponent,
    InboxPoolComponent,
    CategorizationComponent,
    TaskManagementComponent,
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
    CoreModule
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
