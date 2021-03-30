import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {WidgetSettingsModel} from '../../../core/uplift/_models/widget-settings.model';
import {WidgetSettingsService} from '../../../core/uplift/_services/widget-settings.service';
import {ReviewAlarmSettingsModel} from '../../../core/uplift/_models/review-alarm-settings.model';
import {ReviewAlarmSettingsService} from '../../../core/uplift/_services/review-alarm-settings.service';

@Component({
  selector: 'app-uplift',
  templateUrl: './uplift.component.html',
  styleUrls: ['../../../app.component.scss', './uplift.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UpliftComponent implements OnInit {
  isActiveWidget: boolean;
  isActiveReviewAlarm: boolean;

  constructor(private router: Router,
              private widgetSettingsService: WidgetSettingsService,
              private reviewAlarmSettingsService: ReviewAlarmSettingsService) {
  }

  ngOnInit() {
    this.widgetSettingsService.getWidgetSettings()
      .subscribe((widgetSettings: WidgetSettingsModel) => {
        if (widgetSettings == null) {
          this.isActiveWidget = false;
        } else {
          this.isActiveWidget = widgetSettings.active;
        }
      });
    this.reviewAlarmSettingsService.getReviewAlarmSettings()
      .subscribe((reviewAlarmSettingsModel: ReviewAlarmSettingsModel) => {
        if (reviewAlarmSettingsModel == null) {
          this.isActiveReviewAlarm = false;
        } else {
          this.isActiveReviewAlarm = reviewAlarmSettingsModel.active;
        }
      });
  }

  goToWidgetSettings() {
    this.router.navigateByUrl('uplifts/widget-settings');
  }

  goToReviewAlarmSettings() {
    this.router.navigateByUrl('uplifts/review-alarm-settings');
  }
}
