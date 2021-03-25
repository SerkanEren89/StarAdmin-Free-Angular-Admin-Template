import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HotelContactModel} from '../_models/hotel-contact.model';

const API_HOTEL_CONTACTS_URL = 'hotel-contacts';

@Injectable({
  providedIn: 'root'
})
export class HotelContactService {
  constructor(private http: HttpClient) {
  }

  getHotelContacts(): Observable<HotelContactModel[]> {
    return this.http.get<HotelContactModel[]>(API_HOTEL_CONTACTS_URL);
  }

  getHotelContactsByHotelId(hotelId: number): Observable<HotelContactModel[]> {
    return this.http.get<HotelContactModel[]>(API_HOTEL_CONTACTS_URL + '/' + hotelId + '/hotel');
  }

  saveHotelContact(hotelContact: HotelContactModel): Observable<HotelContactModel> {
    return this.http.post<HotelContactModel>(API_HOTEL_CONTACTS_URL, hotelContact);
  }

  updateHotelContact(id: number, hotelContact: HotelContactModel): Observable<HotelContactModel> {
    return this.http.put<HotelContactModel>(API_HOTEL_CONTACTS_URL + '/' + id, hotelContact);
  }
}
