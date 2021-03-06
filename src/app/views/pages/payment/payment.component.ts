import {ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {StripeCardNumberComponent, StripeService} from 'ngx-stripe';
import {OfferModel} from '../../../core/offer/_models/offer.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PlanModel} from '../../../core/pricing/_models/plan.model';
import {StripeSubscriptionModel} from '../../../core/pricing/_models/stripe-subscription.model';
import {ActivatedRoute, Router} from '@angular/router';
import {OfferService} from '../../../core/offer/_services/offer.service';
import {ToastrService} from 'ngx-toastr';
import {PaymentService} from '../../../core/pricing/_services/payment.service';
import {StripeCardElementOptions} from '@stripe/stripe-js';
import {AuthService} from '../../../core/auth/_service/auth.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['../../../app.component.scss',
    '../../theme/navbar/navbar.component.scss', './payment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentComponent implements OnInit {
  @ViewChild(StripeCardNumberComponent) card: StripeCardNumberComponent;
  offer: OfferModel;
  roomPrice: any;
  price: any;
  uuid: string;
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
  stripeForm: FormGroup;
  plans: PlanModel[] = [];
  tempPlan: PlanModel;
  selectedPlan: PlanModel;
  subscription: StripeSubscriptionModel = new StripeSubscriptionModel();
  canEdit: boolean;

  constructor(private router: Router,
              private offerService: OfferService,
              private authService: AuthService,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private stripeService: StripeService,
              private paymentService: PaymentService,
              private route: ActivatedRoute,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.canEdit = this.authService.isAdmin() || this.authService.isSeller();
    this.uuid = this.route.snapshot.paramMap.get('uuid');
    if (this.uuid != null) {
      this.stripeForm = this.fb.group({
        name: ['', [Validators.required]]
      });
      this.offerService.getOffer(this.uuid)
        .subscribe((offerModel: OfferModel) => {
          this.offer = offerModel;
          this.createPlanFromOffer();
          this.subscription.email = offerModel.email;
        });
    }
  }

  createPlanFromOffer() {
    if (this.offer != null) {
      this.tempPlan = new PlanModel();
      this.tempPlan.priceId = this.offer.monthlyStripeId;
      this.tempPlan.yearly = false;
      this.tempPlan.totalValue = this.offer.monthlyPrice;
      this.tempPlan.currency = 'EUR';
      this.tempPlan.name = '€' + this.tempPlan.totalValue + '/mon for yearly';
      this.tempPlan.selected = true;
      this.plans.push(this.tempPlan);

      this.tempPlan = new PlanModel();
      this.tempPlan.priceId = this.offer.yearlyStripeId;
      this.tempPlan.yearly = true;
      this.tempPlan.totalValue = this.offer.yearlyPrice;
      this.tempPlan.currency = 'EUR';
      this.tempPlan.name = '€' + this.tempPlan.totalValue + '/mon for monthly';
      this.plans.push(this.tempPlan);
      this.selectedPlan = this.plans[0];
    }
  }

  selectPlan(selectedPlan) {
    this.plans.forEach(plan => plan.selected = false);
    selectedPlan.selected = true;
    this.selectedPlan = selectedPlan;
    this.cdr.detectChanges();
  }

  createSubscription(): void {
    if (this.stripeForm.valid) {
      const name = this.stripeForm.get('name').value;
      this.stripeService
        .createToken(this.card.element, {name})
        .subscribe((result) => {
          if (result.token) {
            this.subscription.offerId = this.uuid;
            this.subscription.token = result.token.id;
            this.subscription.plan = this.selectedPlan;
            this.paymentService.createSubscription(this.subscription)
              .subscribe((stripeSubscriptionModel: StripeSubscriptionModel) => {
                if (result) {
                  this.router.navigateByUrl(this.router.url + '/success');
                }
              });
          } else if (result.error) {
            // Error creating the token
            console.log(result.error.message);
            this.toastr.error('Please check your card information');
          }
        });
    }
  }
}
