import {NgModule} from '@angular/core';
import {CoreModule} from '../../../core/core.module';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {UpliftComponent} from './uplift.component';
import {WidgetSettingsComponent} from './widget-settings/widget-settings.component';
import {NgxSliderModule} from '@angular-slider/ngx-slider';
import {ReviewAlarmSettingsComponent} from './review-alarm-settings/review-alarm-settings.component';
import {FremiumGuard} from '../../../core/auth/_guards/fremium.guard';
import {TooltipModule} from 'ng2-tooltip-directive';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    NgbModule,
    RouterModule.forChild([
      {
        path: '',
        component: UpliftComponent,
      },
      {
        path: 'widget-settings',
        component: WidgetSettingsComponent,
        canActivate: [FremiumGuard]
      },
      {
        path: 'review-alarm-settings',
        component: ReviewAlarmSettingsComponent,
        canActivate: [FremiumGuard]
      }
    ]),
    FormsModule,
    NgxSliderModule,
    TooltipModule,
    TooltipModule,
  ],
  providers: [],
  declarations: [
    UpliftComponent,
    WidgetSettingsComponent,
    ReviewAlarmSettingsComponent
  ]
})
export class UpliftModule {

}
