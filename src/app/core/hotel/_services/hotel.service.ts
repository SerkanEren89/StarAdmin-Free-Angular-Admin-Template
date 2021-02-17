import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HotelModel} from '../_models/hotel.model';
import {HotelInfoModel} from '../_models/hotel-info.model';
import {map} from 'rxjs/operators';
import {TaskFilterModel} from '../../task/_models/task-filter.model';
import {TaskModel} from '../../task/_models/task.model';
import {HotelFilterModel} from '../_models/hotel-filter.model';

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

  getHotelsByFilter(page: number, pageSize: number, filter: HotelFilterModel): Observable<HotelInfoModel[]> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('size', String(pageSize));
    return this.http.post<HotelInfoModel[]>(API_HOTELS_URL + '/filter', filter, {params: params});
  }

  getCompetitors(): Observable<HotelModel[]> {
    return this.http.get<HotelModel[]>(API_HOTELS_URL + '/competitors');
  }

  patchHotel(hotelInfoModel: HotelInfoModel): Observable<HotelInfoModel> {
    return this.http.patch<HotelInfoModel>(API_HOTELS_URL + '/' + hotelInfoModel.id, hotelInfoModel)
      .pipe(map(result => {
        return result;
      }));
  }

  get savedCompetitors(): HotelModel[] {
    return this._competitorList;
  }

  set savedCompetitors(competitiorList: HotelModel[]) {
    this._competitorList = competitiorList;
  }
}
