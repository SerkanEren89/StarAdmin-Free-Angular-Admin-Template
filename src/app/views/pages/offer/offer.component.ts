import {ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {OfferModel} from '../../../core/offer/_models/offer.model';
import {OfferService} from '../../../core/offer/_services/offer.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PlanModel} from '../../../core/pricing/_models/plan.model';
import {StripeSubscriptionModel} from '../../../core/pricing/_models/stripe-subscription.model';
import {StripeCardNumberComponent, StripeService} from 'ngx-stripe';
import {PaymentService} from '../../../core/pricing/_services/payment.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['../../../app.component.scss', './offer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OfferComponent implements OnInit {
  @ViewChild(StripeCardNumberComponent) card: StripeCardNumberComponent;
  offer: OfferModel;
  roomPrice: any;
  roomNumber: any;
  hotelUpliftPrice: number;
  numberOfRoom: any;
  price: any;
  generatedUrl: string;
  uuid: string;
  offerForm: FormGroup;
  plans: PlanModel[] = [];
  tempPlan: PlanModel;
  selectedPlan: PlanModel;
  submitted = false;

  constructor(private router: Router,
              private offerService: OfferService,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private stripeService: StripeService,
              private paymentService: PaymentService,
              private route: ActivatedRoute,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.offer = new OfferModel();
    this.offerForm = this.fb.group({
      hotelName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      monthlyPrice: ['', Validators.required],
      yearlyPrice: ['', Validators.required],
    });
  }

  get f() { return this.offerForm.controls; }

  saveOffer() {
    this.submitted = true;
    if (this.offerForm.invalid) {
      return;
    }
    this.offerService.saveOffer(this.offer)
      .subscribe((offerModel: OfferModel) => {
        console.log(offerModel.uuid);
        this.generatedUrl = 'https://app.hoteluplift.com/payment/' + offerModel.uuid;
        this.toastr.success('Offer created with success');
        this.submitted = false;
      });
  }

  roomPriceChange(newValue) {
    this.roomPrice = newValue;
    this.calculatePrice();
  }

  roomValueChange(newValue) {
    this.roomNumber = newValue;
    this.calculatePrice();
  }

  calculatePrice() {
    const basicPrice = 20;
    let multiplier = 0;
    if (this.roomNumber <= 20) {
      multiplier += 1;
    } else if (this.roomNumber > 20 && this.roomNumber <= 30) {
      multiplier += 1.2;
    } else if (this.roomNumber > 30 && this.roomNumber <= 40) {
      multiplier += 1.5;
    } else if (this.roomNumber > 40 && this.roomNumber <= 60) {
      multiplier += 2;
    } else if (this.roomNumber > 60 && this.roomNumber <= 80) {
      multiplier += 2.5;
    } else if (this.roomNumber > 80 && this.roomNumber <= 100) {
      multiplier += 3;
    } else if (this.roomNumber > 100) {
      multiplier += 3.5;
    }

    if (this.roomPrice <= 20) {
      multiplier += 1;
    } else if (this.roomPrice > 20 && this.roomPrice <= 40) {
      multiplier += 1.2;
    } else if (this.roomPrice > 40 && this.roomPrice <= 60) {
      multiplier += 1.5;
    } else if (this.roomPrice > 60 && this.roomPrice <= 80) {
      multiplier += 2;
    } else if (this.roomPrice > 80 && this.roomPrice <= 100) {
      multiplier += 2.5;
    } else if (this.roomPrice > 100) {
      multiplier += 3;
    }

    this.hotelUpliftPrice = basicPrice * multiplier;
    this.offer.monthlyPrice = this.hotelUpliftPrice;
    this.offer.yearlyPrice = this.hotelUpliftPrice * 0.9 * 12;
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

  copyMessage() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.generatedUrl;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}