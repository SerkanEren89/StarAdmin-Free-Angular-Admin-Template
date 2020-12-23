import {NgModule} from '@angular/core';
import {CoreModule} from '../../../core/core.module';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {ChangePasswordComponent} from './change-password.component';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    NgbModule,
    RouterModule.forChild([
      {
        path: '',
        component: ChangePasswordComponent,
      }
    ]),
    FormsModule
  ],
  providers: [],
  declarations: [
    ChangePasswordComponent,
  ]
})
export class ChangePasswordModule {

}
