import {ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {CompetitionService} from '../../../core/competition/_services/competition.service';
import {CompetitionCountRatingModel} from '../../../core/competition/_models/competition-count-rating.model';
import {CategoryGroupModel} from '../../../core/category/_models/category-group.model';
import {TableService} from '../../../core/general/_services/table.service';

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
  competitionCountRatingList$: Observable<CompetitionCountRatingModel[]>;
  competitionCountRatingList: CompetitionCountRatingModel[];
  competitionCategoryList$: Observable<CategoryGroupModel[]>;
  competitionCategoryList: CategoryGroupModel[];
  competitionCategory$: Observable<CategoryGroupModel[]>;
  competitionCategory: CategoryGroupModel[] = [];
  selectedCategory: CategoryGroupModel;

  constructor(private competitionService: CompetitionService,
              private tableService: TableService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.competitionCountRatingList$ = this.competitionService.getCompetitionCountRatingList();
    this.competitionCountRatingList$.subscribe((competitionCountRatingList: CompetitionCountRatingModel[]) => {
      this.competitionCountRatingList = competitionCountRatingList;
      this.cdr.detectChanges();
      this.tableService.addLabelTag(this.competitionRef);
      this.tableService.addLabelTag(this.rankingRef);
      this.tableService.addLabelTag(this.pricingRef);
    });
    this.competitionCategoryList$ = this.competitionService.getCompetitionCategoryList();
    this.competitionCategoryList$.subscribe((competitionCategoryList: CategoryGroupModel[]) => {
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
    });
  }
}
