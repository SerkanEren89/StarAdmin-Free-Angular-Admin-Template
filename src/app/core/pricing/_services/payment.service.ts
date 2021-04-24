import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StripeSubscriptionModel} from '../_models/stripe-subscription.model';

const API_PAYMENT_URL = 'payments';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) {
  }

  createSubscription(stripeSubscriptionModel: StripeSubscriptionModel): Observable<StripeSubscriptionModel> {
    return this.http.post<StripeSubscriptionModel>(API_PAYMENT_URL + '/subscriptions', stripeSubscriptionModel);
  }

}
