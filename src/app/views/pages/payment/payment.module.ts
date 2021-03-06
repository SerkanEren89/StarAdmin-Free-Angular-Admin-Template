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
import {PaymentSuccessComponent} from './success/payment-success.component';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    RouterModule.forChild([
      {path: ':uuid', component: PaymentComponent},
      {path: ':uuid/success', component: PaymentSuccessComponent}
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
    PaymentComponent,
    PaymentSuccessComponent
  ]
})
export class PaymentModule {
}
