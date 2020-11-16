import {ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {CompetitionService} from '../../../core/competition/_services/competition.service';
import {CompetitionCountRatingModel} from '../../../core/competition/_models/competition-count-rating.model';
import {CategoryGroupModel} from '../../../core/category/_models/category-group.model';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['../../../app.component.scss', './competition.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CompetitionComponent implements OnInit {
  @ViewChild('competitionTable') competitionRef;
  @ViewChild('rankingTable') rankingRef;
  competitionCountRatingList$: Observable<CompetitionCountRatingModel[]>;
  competitionCountRatingList: CompetitionCountRatingModel[];
  competitionCategoryList$: Observable<CategoryGroupModel[]>;
  competitionCategoryList: CategoryGroupModel[];
  competitionCategory$: Observable<CategoryGroupModel[]>;
  competitionCategory: CategoryGroupModel[] = [];
  selectedCategory: CategoryGroupModel;

  constructor(private competitionService: CompetitionService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.competitionCountRatingList$ = this.competitionService.getCompetitionCountRatingList();
    this.competitionCountRatingList$.subscribe((competitionCountRatingList: CompetitionCountRatingModel[]) => {
      this.competitionCountRatingList = competitionCountRatingList;
      this.cdr.detectChanges();
      this.addLabelTag();
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
      this.addLabelTag();
    });
  }

  addLabelTag() {
    if (this.competitionRef != null) {
      const tableCompetition = this.competitionRef.nativeElement;
      this.addLabelTagForTable(tableCompetition);
    }
    if (this.rankingRef != null) {
      const tableRanking = this.rankingRef.nativeElement;
      this.addLabelTagForTable(tableRanking);
    }
  }

  addLabelTagForTable(tableEl) {
    const thEls = tableEl.querySelectorAll('thead th');
    const tdLabels = Array.from(thEls).map((el: any) => el.innerText);
    tableEl.querySelectorAll('tbody tr').forEach(tr => {
      Array.from(tr.children).forEach(
        (td: any, ndx) => td.setAttribute('label', tdLabels[ndx])
      );
    });
  }
}
