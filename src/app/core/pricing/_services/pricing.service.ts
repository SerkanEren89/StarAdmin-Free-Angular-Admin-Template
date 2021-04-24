import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {PlanModel} from '../_models/plan.model';

const API_PRICING_URL = 'pricings';

@Injectable({
  providedIn: 'root'
})
export class PricingService {

  constructor(private http: HttpClient) {
  }

  contactUs(): Observable<boolean> {
    return this.http.post<boolean>(API_PRICING_URL + '/contact-us', {})
      .pipe(map(result => {
        return result;
      }));
  }

  getPlans(): Observable<PlanModel[]> {
    return this.http.get<PlanModel[]>(API_PRICING_URL + '/plans');
  }
}
