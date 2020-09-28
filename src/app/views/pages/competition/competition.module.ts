import {NgModule} from '@angular/core';
import {CoreModule} from '../../../core/core.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CompetitionComponent} from './competition.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    NgbModule,
    RouterModule.forChild([
      {
        path: '',
        component: CompetitionComponent
      }
    ]),
  ],
  providers: [],
  declarations: [
    CompetitionComponent,
  ]
})
export class CompetitionModule {

}
