import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {CoreModule} from '../../../core/core.module';
import {CommonModule} from '@angular/common';
import {DashboardDetailComponent} from './detail/dashboard-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbPaginationModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxDateRangeModule} from 'ngx-daterange';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: ':uuid',
        component: DashboardComponent
      },
      {
        path: ':source',
        component: DashboardDetailComponent
      }
    ]),
    FormsModule,
    NgxDateRangeModule,
    ReactiveFormsModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
  ],
  providers: [],
  declarations: [
    DashboardComponent,
    DashboardDetailComponent
  ]
})
export class DashboardModule {

}
