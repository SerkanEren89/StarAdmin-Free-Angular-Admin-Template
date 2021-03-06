import {NgModule} from '@angular/core';
import {CoreModule} from '../../../core/core.module';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {TaskComponent} from './task.component';
import {FormsModule} from '@angular/forms';
import {NgxDaterangepickerMd} from 'ngx-daterangepicker-material';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    NgbModule,
    RouterModule.forChild([
      {
        path: '',
        component: TaskComponent
      }
    ]),
    FormsModule,
    NgxDaterangepickerMd.forRoot(),
  ],
  providers: [],
  declarations: [
    TaskComponent,
  ]
})
export class TaskModule {

}
