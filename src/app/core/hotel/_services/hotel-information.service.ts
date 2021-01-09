import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HotelInformationModel} from '../_models/hotel-information.model';

const API_HOTEL_INFORMATION_URL = 'hotel-informations';

@Injectable({
  providedIn: 'root'
})
export class HotelInformationService {
  constructor(private http: HttpClient) {
  }

  getHotelInformation(hotelId: number): Observable<HotelInformationModel> {
    return this.http.get<HotelInformationModel>(API_HOTEL_INFORMATION_URL + '/' + hotelId + '/hotel');
  }

  saveHotelInformation(hotelInformation: HotelInformationModel): Observable<HotelInformationModel> {
    return this.http.post<HotelInformationModel>(API_HOTEL_INFORMATION_URL, hotelInformation);
  }
}
