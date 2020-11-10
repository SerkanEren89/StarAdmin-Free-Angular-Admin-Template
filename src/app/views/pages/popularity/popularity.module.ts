import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CoreModule} from '../../../core/core.module';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbPaginationModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxDateRangeModule} from 'ngx-daterange';
import {PopularityComponent} from './popularity.component';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PopularityComponent
      }
    ])
  ],
  providers: [],
  declarations: [
    PopularityComponent
  ]
})
export class PopularityModule {

}
