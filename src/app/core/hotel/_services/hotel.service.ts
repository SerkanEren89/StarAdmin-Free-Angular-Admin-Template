import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HotelModel} from '../_models/hotel.model';
import {HotelInfoModel} from '../_models/hotel-info.model';
import {map} from 'rxjs/operators';
import {HotelFilterModel} from '../_models/hotel-filter.model';
import {HotelAssignmentCountModel} from '../_models/hotel-assignment-count.model';

const API_HOTELS_URL = 'hotels';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private http: HttpClient) {
  }

  get savedCompetitors(): HotelModel[] {
    return this._competitorList;
  }

  set savedCompetitors(competitiorList: HotelModel[]) {
    this._competitorList = competitiorList;
  }
  private _competitorList: HotelModel[];

  static pageAndSearch(page: number, pageSize: number, sort: string, direction: string) {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('size', String(pageSize));
    params = params.append('sort', sort);
    return params.append('direction', direction);
  }

  saveHotel(hotelModel: HotelModel): Observable<HotelModel> {
    return this.http.post<HotelModel>(API_HOTELS_URL, hotelModel)
      .pipe(map(result => {
        return result;
      }));
  }

  getHotels(page: number, pageSize: number,
            sort: string, direction: string): Observable<HotelInfoModel[]> {
    const params = HotelService.pageAndSearch(page, pageSize, sort, direction);
    return this.http.get<HotelInfoModel[]>(API_HOTELS_URL, {params: params});
  }

  getHotelsForVisit(page: number, pageSize: number,
                    sort: string, direction: string): Observable<HotelInfoModel[]> {
    const params = HotelService.pageAndSearch(page, pageSize, sort, direction);
    return this.http.get<HotelInfoModel[]>(API_HOTELS_URL + '/visits', {params: params});
  }

  getHotelsByFilter(page: number, pageSize: number, sort: string, direction: string,
                    filter: HotelFilterModel): Observable<HotelInfoModel[]> {
    const params = HotelService.pageAndSearch(page, pageSize, sort, direction);
    return this.http.post<HotelInfoModel[]>(API_HOTELS_URL + '/filter', filter, {params: params});
  }

  getHotelsByFilterForVisit(page: number, pageSize: number, sort: string, direction: string,
                            filter: HotelFilterModel): Observable<HotelInfoModel[]> {
    const params = HotelService.pageAndSearch(page, pageSize, sort, direction);
    return this.http.post<HotelInfoModel[]>(API_HOTELS_URL + '/filter/visits', filter, {params: params});
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

  approveStatusChange(id: number): Observable<HotelInfoModel> {
    return this.http.get<HotelInfoModel>(API_HOTELS_URL + '/' + id + '/approve')
      .pipe(map(result => {
        return result;
      }));
  }

  getAssignmentCounts(): Observable<HotelAssignmentCountModel[]> {
    return this.http.get<HotelAssignmentCountModel[]>(API_HOTELS_URL + '/assignment-count')
      .pipe(map(result => {
        return result;
      }));
  }
}
