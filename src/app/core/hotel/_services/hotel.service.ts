import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HotelModel} from '../_models/hotel.model';
import {TaskModel} from '../../task/_models/task.model';
import {HotelInfoModel} from '../_models/hotel-info.model';

const API_HOTELS_URL = 'hotels';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private _competitorList: HotelModel[];

  constructor(private http: HttpClient) {
  }

  getHotels(page: number, pageSize: number): Observable<HotelInfoModel[]> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('size', String(pageSize));
    return this.http.get<HotelInfoModel[]>(API_HOTELS_URL, {params: params});
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
