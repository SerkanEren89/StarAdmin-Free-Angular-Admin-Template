import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GuestModel} from '../_models/guest.model';

const API_GUEST_URL = 'guests';

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  constructor(private http: HttpClient) {
  }

  getGuests(page: number, pageSize: number): Observable<GuestModel[]> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('size', String(pageSize));
    return this.http.get<GuestModel[]>(API_GUEST_URL, {params: params});
  }
  getGuest(id: string): Observable<GuestModel> {
    return this.http.get<GuestModel>(API_GUEST_URL + '/' + id);
  }

  saveGuest(guestModel: GuestModel): Observable<GuestModel> {
    return this.http.post<GuestModel>(API_GUEST_URL, guestModel);
  }

  updateGuest(guestId: string, guestModel: GuestModel): Observable<GuestModel> {
    return this.http.put<GuestModel>(API_GUEST_URL + '/' + guestId, guestModel);
  }

  deleteGuest(guestModel: GuestModel): Observable<boolean> {
    return this.http.delete<boolean>(API_GUEST_URL + '/' + guestModel.id);
  }
}
