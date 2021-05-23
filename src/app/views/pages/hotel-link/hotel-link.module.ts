import {NgModule} from '@angular/core';
import {CoreModule} from '../../../core/core.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ThemeModule} from '../../theme/theme.module';
import {HotelLinkComponent} from './hotel-link.component';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HotelLinkComponent
      }
    ]),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ThemeModule
  ],
  providers: [],
  declarations: [
    HotelLinkComponent
  ]
})
export class HotelLinkModule {

}
