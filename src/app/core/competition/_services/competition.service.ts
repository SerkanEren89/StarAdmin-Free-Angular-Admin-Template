import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {CompetitionModel} from '../_models/competition.model';
import {CompetitionCountRatingModel} from '../_models/competition-count-rating.model';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  getCompetitionCountRatingList(): Observable<CompetitionCountRatingModel[]> {
    const competitions: CompetitionCountRatingModel[] = new Array<CompetitionCountRatingModel>();
    const competition1: CompetitionCountRatingModel = new CompetitionCountRatingModel();
    competition1.id = 1;
    competition1.name = 'Barcelo İstanbul';
    competition1.todaysCount = 3;
    competition1.lastMonthsCount = 83;
    competition1.last6MonthsCount = 283;
    competition1.bookingRating = 9.2;
    competition1.hotelsComRating = 9.1;
    competition1.tripAdvisorRating = 8.8;
    competitions.push(competition1);

    const competition2: CompetitionCountRatingModel = new CompetitionCountRatingModel();
    competition2.id = 1;
    competition2.name = 'Rixos Pera Istanbul';
    competition2.todaysCount = 2;
    competition2.lastMonthsCount = 98;
    competition2.last6MonthsCount = 355;
    competition2.bookingRating = 8.8;
    competition2.hotelsComRating = 8.6;
    competition2.tripAdvisorRating = 9.0;
    competitions.push(competition2);

    const competition3: CompetitionCountRatingModel = new CompetitionCountRatingModel();
    competition3.id = 3;
    competition3.name = 'CVK Park Bosphorus Hotel Istanbul';
    competition3.todaysCount = 1;
    competition3.lastMonthsCount = 83;
    competition3.last6MonthsCount = 283;
    competition3.bookingRating = 8.6;
    competition3.hotelsComRating = 8.6;
    competition3.tripAdvisorRating = 9;
    competitions.push(competition3);

    const competition4: CompetitionCountRatingModel = new CompetitionCountRatingModel();
    competition4.id = 4;
    competition4.name = 'The Marmara Taksim';
    competition4.todaysCount = 4;
    competition4.lastMonthsCount = 98;
    competition4.last6MonthsCount = 352;
    competition4.bookingRating = 8.3;
    competition4.hotelsComRating = 8.4;
    competition4.tripAdvisorRating = 9;
    competitions.push(competition4);

    const competition5: CompetitionCountRatingModel = new CompetitionCountRatingModel();
    competition5.id = 5;
    competition5.name = 'InterContinental Istanbul';
    competition5.todaysCount = 1;
    competition5.lastMonthsCount = 96;
    competition5.last6MonthsCount = 96;
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

    const competition5: CompetitionModel = new CompetitionModel();
    competition5.id = 5;
    competition5.name = 'InterContinental Istanbul';
    competition5.rating = 8.9;
    competition5.positiveCount = 1800;
    competition5.negativeCount = 440;
    competition5.neutralCount = 200;
    competition5.reviewCount = 2440;
    competitions.push(competition5);

    const competition6: CompetitionModel = new CompetitionModel();
    competition6.id = 6;
    competition6.name = 'CVK Park Bosphorus Hotel Istanbul';
    competition6.rating = 8.9;
    competition6.positiveCount = 1800;
    competition6.negativeCount = 440;
    competition6.neutralCount = 200;
    competition6.reviewCount = 2440;
    competitions.push(competition6);

    const competition7: CompetitionModel = new CompetitionModel();
    competition7.id = 7;
    competition7.name = 'Sheraton Istanbul City Center';
    competition7.rating = 9.0;
    competition7.positiveCount = 1800;
    competition7.negativeCount = 440;
    competition7.neutralCount = 200;
    competition7.reviewCount = 2440;
    competitions.push(competition7);

    const competition8: CompetitionModel = new CompetitionModel();
    competition8.id = 8;
    competition8.name = 'Radisson Blu Hotel, Istanbul Pera';
    competition8.rating = 8.3;
    competition8.positiveCount = 800;
    competition8.negativeCount = 540;
    competition8.neutralCount = 200;
    competition8.reviewCount = 100;
    competitions.push(competition8);

    const competition9: CompetitionModel = new CompetitionModel();
    competition9.id = 9;
    competition9.name = 'Sofitel İstanbul Taksim';
    competition9.rating = 9.2;
    competition9.positiveCount = 120;
    competition9.negativeCount = 100;
    competition9.neutralCount = 10;
    competition9.reviewCount = 10;
    competitions.push(competition9);

    return of(competitions);
  }
}
