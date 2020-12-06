import {NgModule} from '@angular/core';
import {CoreModule} from '../../../core/core.module';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {EmployeeComponent} from './employee.component';


@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    NgbModule,
    RouterModule.forChild([
      {
        path: '',
        component: EmployeeComponent,
      }
    ]),
    FormsModule
  ],
  providers: [],
  declarations: [
    EmployeeComponent,
  ]
})
export class EmployeeModule {

}
