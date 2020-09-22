import {Injectable} from '@angular/core';
import {BrandRating} from '../_models/brand-rating';
import {Observable, of} from 'rxjs';
import {CommentCountModel} from '../../inbox/_models/comment-count.model';
import {HttpClient} from '@angular/common/http';
import {CommentCountRatingModel} from '../_models/comment-count-rating.model';

const API_DASHBOARD_URL = 'dashboard';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) {
  }
  getCommentCountAndRatings(): Observable<CommentCountRatingModel[]> {
    return this.http.get<CommentCountRatingModel[]>(API_DASHBOARD_URL + '/comment-count-ratings');
  }

  getBrandRating(): Observable<BrandRating[]> {
    const brandRatings: BrandRating[] = new Array<BrandRating>();

    const brandRating9: BrandRating  = new BrandRating();
    brandRating9.brand = 'Overall';
    brandRating9.rating = 8.9;
    brandRating9.reviewCount = 455;
    brandRating9.trend = 0.1;

    brandRatings.push(brandRating9);

    const brandRating1: BrandRating  = new BrandRating();
    brandRating1.brand = 'Booking';
    brandRating1.rating = 8.8;
    brandRating1.reviewCount = 145;
    brandRating1.trend = -0.2;

    brandRatings.push(brandRating1);

    const brandRating2: BrandRating  = new BrandRating();
    brandRating2.brand = 'TripAdvisor';
    brandRating2.rating = 8.6;
    brandRating2.reviewCount = 124;
    brandRating2.trend = 0.1;

    brandRatings.push(brandRating2);

    const brandRating3: BrandRating  = new BrandRating();
    brandRating3.brand = 'HotelsCom';
    brandRating3.rating = 8.3;
    brandRating3.reviewCount = 51;
    brandRating3.trend = 0.2;

    brandRatings.push(brandRating3);

    const brandRating4: BrandRating  = new BrandRating();
    brandRating4.brand = 'Google';
    brandRating4.rating = 8.5;
    brandRating4.reviewCount = 44;
    brandRating4.trend = 0.1;

    brandRatings.push(brandRating4);

    const brandRating5: BrandRating  = new BrandRating();
    brandRating5.brand = 'Odamax';
    brandRating5.rating = 9.5;
    brandRating5.reviewCount = 245;
    brandRating5.trend = -0.2;

    brandRatings.push(brandRating5);

    const brandRating6: BrandRating  = new BrandRating();
    brandRating6.brand = 'OtelPuan';
    brandRating6.rating = 9.4;
    brandRating6.reviewCount = 321;
    brandRating6.trend = -0.1;

    brandRatings.push(brandRating6);

    /*
    const brandRating7: BrandRating  = new BrandRating();
    brandRating7.brand = 'Tatil Sepeti';
    brandRating7.rating = 8.8;
    brandRating7.reviewCount = 14;
    brandRating7.trend = -0.2;

    brandRatings.push(brandRating7);
     */

    const brandRating8: BrandRating  = new BrandRating();
    brandRating8.brand = 'Agoda';
    brandRating8.rating = 8.9;
    brandRating8.reviewCount = 32;
    brandRating8.trend = 0.1;

    brandRatings.push(brandRating8);

    return of(brandRatings);
  }
}
