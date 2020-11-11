import {ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {ChartDataSets} from 'chart.js';
import {Label} from 'ng2-charts';
import {CompetitionService} from '../../../core/competition/_services/competition.service';
import {CompetitionCountRatingModel} from '../../../core/competition/_models/competition-count-rating.model';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['../../../app.component.scss', './competition.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CompetitionComponent implements OnInit {
  @ViewChild('competitionTable') elRef;
  lineChartData: ChartDataSets[] = [
    { data: [72, 75, 77, 77, 80, 84], label: 'Barcelo İstanbul' },
    { data: [72, 74, 78, 79, 79, 79], label: 'The Marmara Taksim' },
    { data: [70, 73, 75, 79, 80, 83], label: 'InterContinental Istanbul' },
    { data: [72, 72, 72, 72, 73, 73], label: 'Radisson Blu Hotel, Istanbul Pera' },
    { data: [74, 74, 75, 75, 75, 76], label: 'Sheraton Istanbul City Center' },
  ];
  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  competitionCountRatingList$: Observable<CompetitionCountRatingModel[]>;
  competitionCountRatingList: CompetitionCountRatingModel[];
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
  }

  addLabelTag() {
    const tableEl = this.elRef.nativeElement;
    const thEls = tableEl.querySelectorAll('thead th');
    const tdLabels = Array.from(thEls).map( (el:any) => el.innerText);
    tableEl.querySelectorAll('tbody tr').forEach( tr => {
      Array.from(tr.children).forEach(
        (td: any, ndx) =>  td.setAttribute('label', tdLabels[ndx])
      );
    });
  }
}
