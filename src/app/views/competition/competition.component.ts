import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from "@angular/core";
import {CommentService} from "../../core/inbox/_services/comment.service";
import {CommentModel} from "../../core/inbox/_models/comment.model";
import {CompetitionService} from "../../core/competition/_services/competition.service";
import {Observable} from "rxjs";
import {CompetitionModel} from "../../core/competition/_models/competition.model";
import {ChartDataSets} from "chart.js";
import {Label} from "ng2-charts";

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['../../app.component.scss','./competition.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CompetitionComponent implements OnInit {

  lineChartData: ChartDataSets[] = [
    { data: [72, 75, 77, 77, 80, 84], label: 'Barcelo İstanbul' },
    { data: [72, 74, 78, 79, 79, 79], label: 'The Marmara Taksim' },
    { data: [70, 73, 75, 79, 80, 83], label: 'InterContinental Istanbul' },
    { data: [72, 72, 72, 72, 73, 73], label: 'Radisson Blu Hotel, Istanbul Pera' },
    { data: [74, 74, 75, 75, 75, 76], label: 'Sheraton Istanbul City Center' },
  ];
  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  competitionList$: Observable<CompetitionModel[]>;
  competitionList: CompetitionModel[];
  constructor(private competitionService: CompetitionService,
              private cdr: ChangeDetectorRef,) {
  }

  ngOnInit() {
    this.competitionList$ = this.competitionService.getCompetitionList();
    this.competitionList$.subscribe((competitionList: CompetitionModel[]) => {
      this.competitionList = competitionList;
      this.cdr.detectChanges();
    });
  }
}
