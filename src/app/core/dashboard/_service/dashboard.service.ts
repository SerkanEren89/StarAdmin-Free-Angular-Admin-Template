import {Injectable} from "@angular/core";
import {BrandRating} from "../_models/brand-rating";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  getBrandRating(): Observable<BrandRating[]> {
    let brandRatings: BrandRating[] = new Array<BrandRating>();
    let brandRating1: BrandRating  = new BrandRating();
    brandRating1.brand = 'Booking';
    brandRating1.rating = 8.8;
    brandRating1.reviewCount = 145;
    brandRating1.trend = -0.2;

    brandRatings.push(brandRating1);

    let brandRating2: BrandRating  = new BrandRating();
    brandRating2.brand = 'TripAdvisor';
    brandRating2.rating = 8.6;
    brandRating2.reviewCount = 124;
    brandRating2.trend = 0.1;

    brandRatings.push(brandRating2);

    let brandRating3: BrandRating  = new BrandRating();
    brandRating3.brand = 'Hotels.com';
    brandRating3.rating = 8.3;
    brandRating3.reviewCount = 51;
    brandRating3.trend = 0.2;

    brandRatings.push(brandRating3);

    let brandRating4: BrandRating  = new BrandRating();
    brandRating4.brand = 'Google';
    brandRating4.rating = 8.5;
    brandRating4.reviewCount = 44;
    brandRating4.trend = 0.1;

    brandRatings.push(brandRating4);

    let brandRating5: BrandRating  = new BrandRating();
    brandRating5.brand = 'Odamax';
    brandRating5.rating = 9.5;
    brandRating5.reviewCount = 245;
    brandRating5.trend = -0.2;

    brandRatings.push(brandRating5);

    let brandRating6: BrandRating  = new BrandRating();
    brandRating6.brand = 'Otel Puan';
    brandRating6.rating = 9.4;
    brandRating6.reviewCount = 321;
    brandRating6.trend = -0.1;

    brandRatings.push(brandRating6);

    let brandRating7: BrandRating  = new BrandRating();
    brandRating7.brand = 'Tatil Sepeti';
    brandRating7.rating = 8.8;
    brandRating7.reviewCount = 14;
    brandRating7.trend = -0.2;

    brandRatings.push(brandRating7);

    let brandRating8: BrandRating  = new BrandRating();
    brandRating8.brand = 'Hotel Check';
    brandRating8.rating = 8.9;
    brandRating8.reviewCount = 32;
    brandRating8.trend = 0.1;

    brandRatings.push(brandRating8);

    return of(brandRatings);
  }
}
