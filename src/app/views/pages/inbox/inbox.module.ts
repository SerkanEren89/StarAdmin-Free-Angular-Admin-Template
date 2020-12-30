import {NgModule} from '@angular/core';
import {CoreModule} from '../../../core/core.module';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {InboxComponent} from './inbox.component';
import {NgxDaterangepickerMd} from 'ngx-daterangepicker-material';
import {NgxSliderModule} from '@angular-slider/ngx-slider';
import {ClipboardModule} from 'ngx-clipboard';
import {TooltipModule, TooltipOptions} from 'ng2-tooltip-directive';
export const MyDefaultTooltipOptions: TooltipOptions = {
  'show-delay': 200,
  'placement': 'top'
};

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
    CoreModule,
    TooltipModule.forRoot(MyDefaultTooltipOptions as TooltipOptions)
  ],
  providers: [],
  declarations: [
    InboxComponent
  ]
})
export class InboxModule {

}
