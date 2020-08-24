import {ChangeDetectorRef, Component, ViewEncapsulation} from "@angular/core";
import {Observable} from "rxjs";
import {ImprovementModel} from "../../../core/improvement/_models/improvement.model";
import {ImprovementService} from "../../../core/improvement/_services/improvement.service";
import {ChartDataSets} from "chart.js";
import {Label} from "ng2-charts";

@Component({
  selector: 'app-dashboard-detail',
  templateUrl: './dashboard-detail.component.html',
  styleUrls: ['./dashboard-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardDetailComponent {
  assessmentByCategory$: Observable<ImprovementModel[]>;
  assessmentByCategory: ImprovementModel[];
  assessmentByLanguage$: Observable<ImprovementModel[]>;
  assessmentByLanguage: ImprovementModel[];
  assessmentByTravelType$: Observable<ImprovementModel[]>;
  assessmentByTravelType: ImprovementModel[];

  lineChartData: ChartDataSets[] = [
    { data: [72, 75, 77, 77, 80, 84], label: 'Bar' },
    { data: [72, 74, 78, 79, 79, 79], label: 'Reception' },
    { data: [70, 73, 75, 79, 80, 83], label: 'Rooms' },
    { data: [72, 72, 72, 72, 73, 73], label: 'Cleanliness' },
    { data: [74, 74, 75, 75, 75, 76], label: 'Pool' },
  ];
  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  constructor(private improvementService: ImprovementService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.assessmentByCategory$ = this.improvementService.getAllImprovementList();
    this.assessmentByCategory$.subscribe((assessmentByCategory: ImprovementModel[]) => {
      this.assessmentByCategory = assessmentByCategory;
      this.cdr.detectChanges();
    });

    this.assessmentByLanguage$ = this.improvementService.assessmentByLanguage();
    this.assessmentByLanguage$.subscribe((assessmentByLanguage: ImprovementModel[]) => {
      this.assessmentByLanguage = assessmentByLanguage;
      this.cdr.detectChanges();
    });

    this.assessmentByTravelType$ = this.improvementService.assessmentByTravelType();
    this.assessmentByTravelType$.subscribe((assessmentByTravelType: ImprovementModel[]) => {
      this.assessmentByTravelType = assessmentByTravelType;
      this.cdr.detectChanges();
    });
  }

}
