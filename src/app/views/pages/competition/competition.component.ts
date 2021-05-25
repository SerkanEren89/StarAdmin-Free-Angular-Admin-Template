import {ChangeDetectorRef, Component, HostListener, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {CompetitionService} from '../../../core/competition/_services/competition.service';
import {CompetitionCountRatingModel} from '../../../core/competition/_models/competition-count-rating.model';
import {CategoryGroupModel} from '../../../core/category/_models/category-group.model';
import {TableService} from '../../../core/general/_services/table.service';
import {HotelModel} from '../../../core/hotel/_models/hotel.model';
import {HotelService} from '../../../core/hotel/_services/hotel.service';
import {ChartDataSets} from 'chart.js';
import {Label} from 'ng2-charts';
import {MonthlyRatingsModel} from '../../../core/dashboard/_models/monthly-ratings.model';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/auth/_service/auth.service';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['../../../app.component.scss', './competition.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CompetitionComponent implements OnInit {
  @ViewChild('competitionTable') competitionRef;
  @ViewChild('rankingTable') rankingRef;
  @ViewChild('pricingTable') pricingRef;
  competitionCountRatingList: CompetitionCountRatingModel[];
  competitionCategoryList: CategoryGroupModel[];
  competitionCategory$: Observable<CategoryGroupModel[]>;
  competitionCategory: CategoryGroupModel[] = [];
  competitionList: HotelModel[];
  selectedCategory: CategoryGroupModel;
  height = 350;
  screenWidth: number;
  active = 1;
  lineChartData: ChartDataSets[] = [];
  lineChartLabels: Label[] = [];
  lineChartOptionsData = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            steps: 1,
            stepValue: 1,
            max: 10,
            min: 5
          }
        }
      ]
    }
  };
  fremium: boolean;

  constructor(private competitionService: CompetitionService,
              private authService: AuthService,
              private hotelService: HotelService,
              private tableService: TableService,
              private router: Router,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.fremium = this.authService.isFremium();
    this.hotelService.getCompetitors()
      .subscribe((competitionList: HotelModel[]) => {
        this.competitionList = competitionList;
      });
    this.competitionService.getAverageMonthlyRating()
      .subscribe((monthlyRating: MonthlyRatingsModel) => {
        this.lineChartLabels = monthlyRating.months;
        this.lineChartData = monthlyRating.item;
        this.cdr.detectChanges();
      });
    this.competitionService.getCompetitionCountRatingList()
      .subscribe((competitionCountRatingList: CompetitionCountRatingModel[]) => {
        this.competitionCountRatingList = competitionCountRatingList;
        this.cdr.detectChanges();
        this.tableService.addLabelTag(this.competitionRef);
        this.tableService.addLabelTag(this.rankingRef);
        this.tableService.addLabelTag(this.pricingRef);
      });
    this.competitionService.getCompetitionCategoryList()
      .subscribe((competitionCategoryList: CategoryGroupModel[]) => {
        this.competitionCategoryList = competitionCategoryList;
        this.cdr.detectChanges();
      });
  }

  getHotelListByCategory(category) {
    this.selectedCategory = category;
    this.competitionCategory$ = this.competitionService.getCompetitionCategoryListByCategory(category.category.name);
    this.competitionCategory$.subscribe((competitionCategory: CategoryGroupModel[]) => {
      this.competitionCategory = competitionCategory;
      this.cdr.detectChanges();
      this.tableService.addLabelTag(this.competitionRef);
      this.tableService.addLabelTag(this.rankingRef);
      const toScroll = document.getElementById('competitionCategory');
      toScroll.scrollIntoView({behavior: 'smooth', block: 'center'});
    });
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 800) {
      this.height = 400;
    } else {
      this.height = 350;
    }
  }

  goToCompetitorDashboard(uuid: string) {
    this.router.navigateByUrl('dashboard/' + uuid);
  }
}
