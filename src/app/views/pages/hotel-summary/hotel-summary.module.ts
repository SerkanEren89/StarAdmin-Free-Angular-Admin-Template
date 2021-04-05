import {NgModule} from '@angular/core';
import {CoreModule} from '../../../core/core.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxDateRangeModule} from 'ngx-daterange';
import {NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {ClipboardModule} from 'ngx-clipboard';
import {HotelSummaryComponent} from './hotel-summary.component';
import {ThemeModule} from '../../theme/theme.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: ':id/:name',
        component: HotelSummaryComponent
      }
    ]),
    FormsModule,
    NgxDateRangeModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    ClipboardModule,
    NgbModule,
    ThemeModule,
    InfiniteScrollModule,
  ],
  providers: [],
  declarations: [
    HotelSummaryComponent
  ]
})
export class HotelSummaryModule {

}
