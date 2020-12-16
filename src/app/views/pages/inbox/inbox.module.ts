import {NgModule} from '@angular/core';
import {CoreModule} from '../../../core/core.module';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {InboxComponent} from './inbox.component';
import {OverlayModule} from '@angular/cdk/overlay';
import { ShareButtonsPopupModule} from 'ngx-sharebuttons/popup';
import {NgxDaterangepickerMd} from 'ngx-daterangepicker-material';
import {NgxSliderModule} from '@angular-slider/ngx-slider';
import {ClipboardModule} from 'ngx-clipboard';


@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    NgbModule,
    RouterModule.forChild([
      {
        path: '',
        component: InboxComponent,
      }
    ]),
    FormsModule,
    NgxDaterangepickerMd.forRoot(),
    NgxSliderModule,
    ClipboardModule,
    CoreModule
  ],
  providers: [],
  declarations: [
    InboxComponent
  ]
})
export class InboxModule {

}
