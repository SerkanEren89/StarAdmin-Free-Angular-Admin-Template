import {TooltipModule, TooltipOptions} from 'ng2-tooltip-directive';
import {NgModule} from '@angular/core';
import {CoreModule} from '../../../core/core.module';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxDaterangepickerMd} from 'ngx-daterangepicker-material';
import {GuestComponent} from './guest.component';

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
        component: GuestComponent,
      }
    ]),
    FormsModule,
    NgxDaterangepickerMd.forRoot(),
    CoreModule,
    TooltipModule.forRoot(MyDefaultTooltipOptions as TooltipOptions),
    ReactiveFormsModule
  ],
  providers: [],
  declarations: [
    GuestComponent
  ]
})
export class GuestModule {

}
