import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HotelModel} from '../_models/hotel.model';

const API_HOTELS_URL = 'hotels';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private _competitorList: HotelModel[];

  constructor(private http: HttpClient) {
  }

  getCompetitors(): Observable<HotelModel[]> {
    return this.http.get<HotelModel[]>(API_HOTELS_URL + '/competitors');
  }

  get savedCompetitors(): HotelModel[] {
    return this._competitorList;
  }

  set savedCompetitors(competitiorList: HotelModel[]) {
    this._competitorList = competitiorList;
  }
}
