import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {CompetitionModel} from '../_models/competition.model';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  getCompetitionList() : Observable<CompetitionModel[]> {
    let competitions: CompetitionModel[] = new Array<CompetitionModel>();
    let competition1 : CompetitionModel = new CompetitionModel();
    competition1.id = 1;
    competition1.name = 'Barcelo İstanbul';
    competition1.rating = 8.8;
    competition1.positiveCount = 1300;
    competition1.negativeCount = 220;
    competition1.neutralCount = 250;
    competition1.reviewCount = 1770;
    competitions.push(competition1);

    let competition2 : CompetitionModel = new CompetitionModel();
    competition2.id = 2;
    competition2.name = 'Rixos Pera Istanbul';
    competition2.rating = 8.9;
    competition2.positiveCount = 1500;
    competition2.negativeCount = 240;
    competition2.neutralCount = 250;
    competition2.reviewCount = 1880;
    competitions.push(competition2);

    let competition3 : CompetitionModel = new CompetitionModel();
    competition3.id = 3;
    competition3.name = 'Pera Palace Hotel';
    competition3.rating = 8.6;
    competition3.positiveCount = 1600;
    competition3.negativeCount = 440;
    competition3.neutralCount = 160;
    competition3.reviewCount = 2200;
    competitions.push(competition3);

    let competition4 : CompetitionModel = new CompetitionModel();
    competition4.id = 4;
    competition4.name = 'The Marmara Taksim';
    competition4.rating = 8.6;
    competition4.positiveCount = 1600;
    competition4.negativeCount = 440;
    competition4.neutralCount = 160;
    competition4.reviewCount = 2200;
    competitions.push(competition4);

    let competition5 : CompetitionModel = new CompetitionModel();
    competition5.id = 5;
    competition5.name = 'InterContinental Istanbul';
    competition5.rating = 8.9;
    competition5.positiveCount = 1800;
    competition5.negativeCount = 440;
    competition5.neutralCount = 200;
    competition5.reviewCount = 2440;
    competitions.push(competition5);

    let competition6 : CompetitionModel = new CompetitionModel();
    competition6.id = 6;
    competition6.name = 'CVK Park Bosphorus Hotel Istanbul';
    competition6.rating = 8.9;
    competition6.positiveCount = 1800;
    competition6.negativeCount = 440;
    competition6.neutralCount = 200;
    competition6.reviewCount = 2440;
    competitions.push(competition6);

    let competition7 : CompetitionModel = new CompetitionModel();
    competition7.id = 7;
    competition7.name = 'Sheraton Istanbul City Center';
    competition7.rating = 9.0;
    competition7.positiveCount = 1800;
    competition7.negativeCount = 440;
    competition7.neutralCount = 200;
    competition7.reviewCount = 2440;
    competitions.push(competition7);

    let competition8 : CompetitionModel = new CompetitionModel();
    competition8.id = 8;
    competition8.name = 'Radisson Blu Hotel, Istanbul Pera';
    competition8.rating = 8.3;
    competition8.positiveCount = 800;
    competition8.negativeCount = 540;
    competition8.neutralCount = 200;
    competition8.reviewCount = 100;
    competitions.push(competition8);

    let competition9 : CompetitionModel = new CompetitionModel();
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
