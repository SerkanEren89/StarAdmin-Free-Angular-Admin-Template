import {NgModule} from '@angular/core';
import {CoreModule} from '../../../core/core.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgbDropdownModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TooltipModule} from 'ng2-tooltip-directive';
import {NgxStripeModule} from 'ngx-stripe';
import {environment} from '../../../../environments/environment';
import {PaymentComponent} from './payment.component';
import {ThemeModule} from '../../theme/theme.module';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    RouterModule.forChild([
      {path: ':uuid', component: PaymentComponent}
    ]),
    NgbPaginationModule,
    FormsModule,
    NgbDropdownModule,
    TooltipModule,
    NgxStripeModule.forRoot(environment.stripeKey),
    ReactiveFormsModule,
    ThemeModule,
  ],
  providers: [],
  declarations: [
    PaymentComponent
  ]
})
export class PaymentModule {
}
