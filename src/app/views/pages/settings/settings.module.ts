import {NgModule} from '@angular/core';
import {CoreModule} from '../../../core/core.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SettingsComponent} from './settings.component';
import {FormsModule} from '@angular/forms';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SettingsComponent
      }
    ]),
    FormsModule,
    NgbDropdownModule
  ],
  providers: [],
  declarations: [
    SettingsComponent
  ]
})
export class SettingsModule {

}
