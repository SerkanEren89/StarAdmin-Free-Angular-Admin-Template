import {NgModule} from '@angular/core';
import {CoreModule} from '../../../core/core.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgbDropdownModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TooltipModule} from 'ng2-tooltip-directive';
import {PricingComponent} from './pricing.component';
import {PricingOfferComponent} from './offer/pricing-offer.component';
import {PricingPremiumComponent} from './premium/pricing-premium.component';
import {PricingPaymentComponent} from './payment/pricing-payment.component';
import {NgxStripeModule} from 'ngx-stripe';
import {environment} from '../../../../environments/environment';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    RouterModule.forChild([
      {path: '', component: PricingOfferComponent},
      {path: 'premium', component: PricingPremiumComponent},
      {path: 'payment', component: PricingPaymentComponent},
    ]),
    NgbPaginationModule,
    FormsModule,
    NgbDropdownModule,
    TooltipModule,
    NgxStripeModule.forRoot(environment.stripeKey),
    ReactiveFormsModule,
  ],
  providers: [],
  declarations: [
    PricingComponent,
    PricingOfferComponent,
    PricingPremiumComponent,
    PricingPaymentComponent
  ]
})
export class PricingModule {
}
