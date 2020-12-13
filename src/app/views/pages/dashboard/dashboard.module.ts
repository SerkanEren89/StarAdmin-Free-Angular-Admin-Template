import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {CoreModule} from '../../../core/core.module';
import {CommonModule} from '@angular/common';
import {DashboardDetailComponent} from './detail/dashboard-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule, NgbPaginationModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxDateRangeModule} from 'ngx-daterange';
import {ClipboardModule} from 'ngx-clipboard';

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
        path: 'detail/:source',
        component: DashboardDetailComponent
      },
      {
        path: ':uuid',
        component: DashboardComponent
      }
    ]),
    FormsModule,
    NgxDateRangeModule,
    ReactiveFormsModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    ClipboardModule,
    NgbModule,
  ],
  providers: [],
  declarations: [
    DashboardComponent,
    DashboardDetailComponent
  ]
})
export class DashboardModule {

}
