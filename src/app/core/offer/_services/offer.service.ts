import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OfferModel} from '../_models/offer.model';

const API_OFFERS_URL = 'offers';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  constructor(private http: HttpClient) {
  }

  getOffer(uuid: string): Observable<OfferModel> {
    return this.http.get<OfferModel>(API_OFFERS_URL + '/public/' + uuid);
  }

  saveOffer(offerModel: OfferModel): Observable<OfferModel> {
    return this.http.post<OfferModel>(API_OFFERS_URL, offerModel);
  }
}
