import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from "@angular/core";
import {CommentService} from "../../core/inbox/_services/comment.service";
import {CommentModel} from "../../core/inbox/_models/comment.model";
import {CompetitionService} from "../../core/competition/_services/competition.service";
import {Observable} from "rxjs";
import {CompetitionModel} from "../../core/competition/_models/competition.model";

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['../../app.component.scss','./competition.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CompetitionComponent implements OnInit {

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
