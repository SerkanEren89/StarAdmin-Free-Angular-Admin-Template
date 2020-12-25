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
import {TooltipModule, TooltipOptions} from 'ng2-tooltip-directive';
export const MyDefaultTooltipOptions: TooltipOptions = {
  'show-delay': 200,
  'placement': 'top'
};

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
    TooltipModule.forRoot(MyDefaultTooltipOptions as TooltipOptions)
  ],
  providers: [],
  declarations: [
    DashboardComponent,
    DashboardDetailComponent
  ]
})
export class DashboardModule {

}
