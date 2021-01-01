import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {CompetitionCountRatingModel} from '../_models/competition-count-rating.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CompetitionModel} from '../_models/competition.model';
import {CategoryGroupModel} from '../../category/_models/category-group.model';
import {MonthlyRatingsModel} from '../../dashboard/_models/monthly-ratings.model';

const API_COMPETIONS_URL = 'competitions';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  constructor(private http: HttpClient) {
  }

  getCompetitionCountRatingList(): Observable<CompetitionCountRatingModel[]> {
    return this.http.get<CompetitionCountRatingModel[]>(API_COMPETIONS_URL + '/ratings-counts');
  }

  getCompetitionCategoryList(): Observable<CategoryGroupModel[]> {
    return this.http.get<CategoryGroupModel[]>(API_COMPETIONS_URL + '/category');
  }

  getCompetitionCategoryListByCategory(category: string): Observable<CategoryGroupModel[]> {
    let params = new HttpParams();
    params = params.append('category', category);
    return this.http.get<CategoryGroupModel[]>(API_COMPETIONS_URL + '/category', {params: params});
  }

  getAverageMonthlyRating(): Observable<MonthlyRatingsModel> {
    return this.http.get<MonthlyRatingsModel>(API_COMPETIONS_URL + '/average-monthly');
  }

  getCompetitionCountRatingListMock(): Observable<CompetitionCountRatingModel[]> {
    const competitions: CompetitionCountRatingModel[] = new Array<CompetitionCountRatingModel>();
    const competition1: CompetitionCountRatingModel = new CompetitionCountRatingModel();
    competition1.id = 1;
    competition1.hotelName = 'Barcelo İstanbul';
    competition1.todaysCount = 3;
    competition1.lastMonthCount = 83;
    competition1.last3MonthsCount = 283;
    competition1.bookingRating = 9.2;
    competition1.hotelsComRating = 9.1;
    competition1.tripAdvisorRating = 8.8;
    competitions.push(competition1);

    const competition2: CompetitionCountRatingModel = new CompetitionCountRatingModel();
    competition2.id = 1;
    competition2.hotelName = 'Rixos Pera Istanbul';
    competition2.todaysCount = 2;
    competition2.lastMonthCount = 98;
    competition2.last3MonthsCount = 355;
    competition2.bookingRating = 8.8;
    competition2.hotelsComRating = 8.6;
    competition2.tripAdvisorRating = 9.0;
    competitions.push(competition2);

    const competition3: CompetitionCountRatingModel = new CompetitionCountRatingModel();
    competition3.id = 3;
    competition3.hotelName = 'CVK Park Bosphorus Hotel Istanbul';
    competition3.todaysCount = 1;
    competition3.lastMonthCount = 83;
    competition3.last3MonthsCount = 283;
    competition3.bookingRating = 8.6;
    competition3.hotelsComRating = 8.6;
    competition3.tripAdvisorRating = 9;
    competitions.push(competition3);

    const competition4: CompetitionCountRatingModel = new CompetitionCountRatingModel();
    competition4.id = 4;
    competition4.hotelName = 'The Marmara Taksim';
    competition4.todaysCount = 4;
    competition4.lastMonthCount = 98;
    competition4.last3MonthsCount = 352;
    competition4.bookingRating = 8.3;
    competition4.hotelsComRating = 8.4;
    competition4.tripAdvisorRating = 9;
    competitions.push(competition4);

    const competition5: CompetitionCountRatingModel = new CompetitionCountRatingModel();
    competition5.id = 5;
    competition5.hotelName = 'InterContinental Istanbul';
    competition5.todaysCount = 1;
    competition5.lastMonthCount = 96;
    competition5.last3MonthsCount = 96;
    competition5.bookingRating = 8.6;
    competition5.hotelsComRating = 8.8;
    competition5.tripAdvisorRating = 9.0;
    competitions.push(competition5);
    return of(competitions);
  }

  getCompetitionList(): Observable<CompetitionModel[]> {
    const competitions: CompetitionModel[] = new Array<CompetitionModel>();
    const competition1: CompetitionModel = new CompetitionModel();
    competition1.id = 1;
    competition1.name = 'Barcelo İstanbul';
    competition1.rating = 8.8;
    competition1.positiveCount = 1300;
    competition1.negativeCount = 220;
    competition1.neutralCount = 250;
    competition1.reviewCount = 1770;
    competitions.push(competition1);

    const competition2: CompetitionModel = new CompetitionModel();
    competition2.id = 2;
    competition2.name = 'Rixos Pera Istanbul';
    competition2.rating = 8.9;
    competition2.positiveCount = 1500;
    competition2.negativeCount = 240;
    competition2.neutralCount = 250;
    competition2.reviewCount = 1880;
    competitions.push(competition2);

    const competition3: CompetitionModel = new CompetitionModel();
    competition3.id = 3;
    competition3.name = 'Pera Palace Hotel';
    competition3.rating = 8.6;
    competition3.positiveCount = 1600;
    competition3.negativeCount = 440;
    competition3.neutralCount = 160;
    competition3.reviewCount = 2200;
    competitions.push(competition3);

    const competition4: CompetitionModel = new CompetitionModel();
    competition4.id = 4;
    competition4.name = 'The Marmara Taksim';
    competition4.rating = 8.6;
    competition4.positiveCount = 1600;
    competition4.negativeCount = 440;
    competition4.neutralCount = 160;
    competition4.reviewCount = 2200;
    competitions.push(competition4);

    return of(competitions);
  }
}
