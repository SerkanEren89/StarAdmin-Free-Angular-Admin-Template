import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {HotelResponseModel} from '../_models/hotel-response.model';
import {map} from 'rxjs/operators';
import {CommentModel} from '../../inbox/_models/comment.model';

const API_HOTEL_RESPONSE_URL = 'hotel-responses';

@Injectable({
  providedIn: 'root'
})
export class HotelResponseService {
  private hotelResponseSubject: BehaviorSubject<HotelResponseModel>;

  constructor(private http: HttpClient) {
    this.hotelResponseSubject = new BehaviorSubject<HotelResponseModel>(JSON.parse(localStorage.getItem('hotelResponses')));
  }

  public get hotelResponseList(): HotelResponseModel {
    return this.hotelResponseSubject.value;
  }

  getHotelResponse(): Observable<HotelResponseModel> {
    return this.http.get<HotelResponseModel>(API_HOTEL_RESPONSE_URL)
      .pipe(map(hotelResponseModel => {
        this.hotelResponseSubject.next(hotelResponseModel);
        return hotelResponseModel;
      }));
  }

  goToReply(comment: CommentModel) {
    if (this.hotelResponseList != null) {
      if (comment.source.toLowerCase().includes('booking')) {
        window.open(this.hotelResponseList.bookingPath, '_blank');
      } else if (comment.source.toLowerCase().includes('hotelscom')) {
        window.open(this.hotelResponseList.expediaPath, '_blank');
      } else if (comment.source.toLowerCase().includes('tripadvisor')) {
        window.open(this.hotelResponseList.tripAdvisorPath, '_blank');
      } else if (comment.source.toLowerCase().includes('google')) {
        window.open(this.hotelResponseList.tripAdvisorPath, '_blank');
      } else if (comment.source.toLowerCase().includes('holidaycheck')) {
        window.open(this.hotelResponseList.holidayCheckPath, '_blank');
      } else if (comment.source.toLowerCase().includes('otelpuan')) {
        window.open(this.hotelResponseList.otelPuanPath, '_blank');
      } else {
        window.open(comment.url, '_blank');
      }
    } else {
      window.open(comment.url, '_blank');
    }
  }
}
