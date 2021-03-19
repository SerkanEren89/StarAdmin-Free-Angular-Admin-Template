import {NgModule} from '@angular/core';
import {CoreModule} from '../../../core/core.module';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {WidgetSettingsComponent} from './widget-settings.component';
import {NgxSliderModule} from '@angular-slider/ngx-slider';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    NgbModule,
    RouterModule.forChild([
      {
        path: '',
        component: WidgetSettingsComponent,
      }
    ]),
    FormsModule,
    NgxSliderModule,
  ],
  providers: [],
  declarations: [
    WidgetSettingsComponent,
  ]
})
export class WidgetSettingsModule {

}
