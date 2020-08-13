import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from "@angular/core";
import {CommentService} from "../../core/inbox/_services/comment.service";
import {Observable} from "rxjs";
import {CommentModel} from "../../core/inbox/_models/comment.model";
import {ImprovementService} from "../../core/improvement/_services/improvement.service";
import {ImprovementModel} from "../../core/improvement/_models/improvement.model";

@Component({
  selector: 'app-improvement',
  templateUrl: './improvement.component.html',
  styleUrls: ['../../app.component.scss', './improvement.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ImprovementComponent implements OnInit {
  improvementList$: Observable<ImprovementModel[]>;
  improvementList: ImprovementModel[];

  constructor(private improvementService: ImprovementService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.improvementList$ = this.improvementService.getAllImprovementList();
    this.improvementList$.subscribe((improvementList: ImprovementModel[]) => {
      this.improvementList = improvementList;
      this.cdr.detectChanges();
    });
  }
}
