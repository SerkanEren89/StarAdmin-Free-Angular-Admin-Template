import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StripeCardNumberComponent, StripeService} from 'ngx-stripe';
import {StripeCardElementOptions} from '@stripe/stripe-js';
import {ToastrService} from 'ngx-toastr';
import {StripeChargeModel} from '../../../../core/pricing/_models/stripe-charge.model';
import {PricingService} from '../../../../core/pricing/_services/pricing.service';
import {CommonService} from '../../../../core/general/_services/common.service';
import {PlanModel} from '../../../../core/pricing/_models/plan.model';
import {PaymentService} from '../../../../core/pricing/_services/payment.service';
import {StripeSubscriptionModel} from '../../../../core/pricing/_models/stripe-subscription.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-payment',
  styleUrls: ['../../../../app.component.scss', './pricing-payment.component.scss'],
  templateUrl: './pricing-payment.component.html'
})
export class PricingPaymentComponent implements OnInit {

  @ViewChild(StripeCardNumberComponent) card: StripeCardNumberComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#000000',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };
  stripeTest: FormGroup;
  stripeCharge: StripeChargeModel;
  billingTypes;
  plans: PlanModel[];
  selectedPlan: PlanModel;
  subscription: StripeSubscriptionModel = new StripeSubscriptionModel();

  constructor(private router: Router,
              private fb: FormBuilder,
              private stripeService: StripeService,
              private pricingService: PricingService,
              private paymentService: PaymentService,
              private commonService: CommonService,
              private toastr: ToastrService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
    this.pricingService.getPlans()
      .subscribe((plans: PlanModel[]) => {
        this.plans = plans;
        this.selectedPlan = this.plans[0];
      });
  }

  createCharge(): void {
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card.element, {name})
      .subscribe((result) => {
        if (result.token) {
          this.subscription.token = result.token.id;
          this.subscription.plan = this.selectedPlan.priceId;
          this.paymentService.createSubscription(this.subscription)
            .subscribe((stripeSubscriptionModel: StripeSubscriptionModel) => {
              if (result) {
                this.toastr.success('We received your subscription. ' +
                  'We will get in touch with you as soon as possible');
                this.router.navigateByUrl('dashboard');
                this.cdr.detectChanges();
              }
            });
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }
  selectPlan(selectedPlan) {
    this.plans.forEach(plan => plan.selected = false);
    selectedPlan.selected = true;
    this.selectedPlan = selectedPlan;
    this.cdr.detectChanges();
  }
}
