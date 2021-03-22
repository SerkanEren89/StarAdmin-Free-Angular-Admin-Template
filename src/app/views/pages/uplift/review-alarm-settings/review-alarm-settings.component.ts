import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Options} from '@angular-slider/ngx-slider';
import {ReviewAlarmSettingsModel} from '../../../../core/uplift/_models/review-alarm-settings.model';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../../../core/auth/_service/auth.service';
import {CommonService} from '../../../../core/general/_services/common.service';
import {TranslateService} from '@ngx-translate/core';
import {ReviewAlarmSettingsService} from '../../../../core/uplift/_services/review-alarm-settings.service';

@Component({
  selector: 'app-review-alarm-settings',
  templateUrl: './review-alarm-settings.component.html',
  styleUrls: ['../../../../app.component.scss', './review-alarm-settings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReviewAlarmSettingsComponent implements OnInit {
  reviewAlarmSettings: ReviewAlarmSettingsModel;
  commentSources;
  filteredChannel = [];
  options: Options = {
    floor: 0,
    ceil: 10
  };

  constructor(private toastr: ToastrService,
              private reviewAlarmSettingsService: ReviewAlarmSettingsService,
              private authService: AuthService,
              private commonService: CommonService,
              private translateService: TranslateService) {
  }

  ngOnInit() {
    this.reviewAlarmSettings = new ReviewAlarmSettingsModel();
    this.commentSources = this.commonService.getChannelFilter();
    this.commentSources.forEach(item => {
      item.checked = false;
    });
    this.reviewAlarmSettingsService.getReviewAlarmSettings()
      .subscribe((reviewAlarmSettingsModel: ReviewAlarmSettingsModel) => {
        if (reviewAlarmSettingsModel == null) {
          this.initSettings();
        } else {
          this.reviewAlarmSettings = reviewAlarmSettingsModel;
          this.reviewAlarmSettings.channelList.forEach(channel => {
            this.commentSources.forEach(item => {
              if (item.name === channel) {
                item.checked = true;
              }
            });
          });
        }
      });
  }

  changeFilteredChannel(i: number) {
    this.filteredChannel = [];
    if (this.commentSources) {
      this.commentSources[i].checked = !this.commentSources[i].checked;
      this.commentSources.forEach(item => {
        if (item.checked) {
          this.filteredChannel.push(item.name);
        }
      });
    }
    this.reviewAlarmSettings.channelList = this.filteredChannel;
  }

  private initSettings() {
    this.filteredChannel = [];
    this.commentSources.forEach(source => source.checked = true);
    this.reviewAlarmSettings.minRating = 0;
    this.reviewAlarmSettings.maxRating = 6;
  }

  save() {
    this.reviewAlarmSettingsService.saveReviewAlarmSettings(this.reviewAlarmSettings)
      .subscribe((reviewAlarmSettingsModel: ReviewAlarmSettingsModel) => {
        this.toastr.success('Your review alarm settings saved successfully');
      });
  }
}
