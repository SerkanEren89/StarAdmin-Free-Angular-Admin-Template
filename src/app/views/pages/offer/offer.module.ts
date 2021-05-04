import {NgModule} from '@angular/core';
import {CoreModule} from '../../../core/core.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgbDropdownModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TooltipModule} from 'ng2-tooltip-directive';
import {NgxStripeModule} from 'ngx-stripe';
import {environment} from '../../../../environments/environment';
import {OfferComponent} from './offer.component';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    RouterModule.forChild([
      {path: '', component: OfferComponent}
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
    OfferComponent
  ]
})
export class OfferModule {
}
