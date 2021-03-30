import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {CommonService} from '../../../../core/general/_services/common.service';
import {Options} from '@angular-slider/ngx-slider';
import {AuthService} from '../../../../core/auth/_service/auth.service';
import {WidgetSettingsModel} from '../../../../core/uplift/_models/widget-settings.model';
import {WidgetSettingsService} from '../../../../core/uplift/_services/widget-settings.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-widget-settings',
  templateUrl: './widget-settings.component.html',
  styleUrls: ['../../../../app.component.scss', './widget-settings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WidgetSettingsComponent implements OnInit {

  widgetSettings: WidgetSettingsModel;
  commentSources;
  filteredChannel = [];
  options: Options = {
    floor: 0,
    ceil: 10
  };
  code;
  horizontalPositions;
  verticalPositions;
  selectedVertical;
  selectedHorizontal;
  warningText: string;

  constructor(private toastr: ToastrService,
              private widgetSettingsService: WidgetSettingsService,
              private authService: AuthService,
              private commonService: CommonService,
              private translateService: TranslateService) {
  }

  ngOnInit() {
    this.commentSources = this.commonService.getChannelFilter();
    this.horizontalPositions = this.commonService.getHorizontalPositions();
    this.verticalPositions = this.commonService.getVerticalPositions();
    this.widgetSettingsService.getWidgetSettings()
      .subscribe((widgetSettings: WidgetSettingsModel) => {
        if (widgetSettings == null) {
          this.clearSettings();
          this.generateCode();
        } else {
          this.initSettings(widgetSettings);
        }
        this.widgetSettings = widgetSettings;
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
    this.widgetSettings.channelList = this.filteredChannel;
  }

  selectHorizontalPosition(position: string) {
    this.selectedHorizontal = this.horizontalPositions.find(pos => pos.value === position);
    this.widgetSettings.alignLeft = position === 'left';
    this.generateCode();
  }

  selectVerticalPosition(position: string) {
    this.selectedVertical = this.verticalPositions.find(pos => pos.value === position);
    this.widgetSettings.alignTop = position === 'top';
    this.generateCode();
  }

  changeDarkMode() {
    this.widgetSettings.darkMode = !this.widgetSettings.darkMode;
    this.generateCode();
  }

  generateCode() {
    const hotelId = this.authService.currentUserValue.hotelId;
    this.code = '<script>\n' +
      '                      (function (w, d, s, o, f, js, fjs) {\n' +
      '                        w[o] = w[o] || function () { (w[o].q = w[o].q || []).push(arguments) };\n' +
      '                        js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];\n' +
      '                        js.id = o; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs);\n' +
      '                      }(window, document, \'script\', \'_hw\', \'http://d2rdarlx4hvo6u.cloudfront.net/widget.js\'));\n' +
      '                      _hw(\'init\', { minimized: true , disableDarkMode:' + this.widgetSettings.darkMode + ', hotelId: ' + hotelId +
      '                      , alignLeft: ' + this.widgetSettings.alignLeft + ', alignTop:' + this.widgetSettings.alignTop + '});\n' +
      '                    </script>';
  }

  save() {
    if (this.widgetSettings.itemCount > 20) {
      this.translateService.get('WIDGET.WARNING_COUNT')
        .subscribe(text => {
          this.warningText = text;
        });
    } else {
      this.widgetSettingsService.saveWidgetSettings(this.widgetSettings)
        .subscribe((widgetSettings: WidgetSettingsModel) => {
          this.toastr.success('Your widget settings saved successfully');
        });
    }
  }

  private initSettings(widgetSettingsModel: WidgetSettingsModel) {
    this.commentSources.forEach(item => {
      item.checked = false;
    });
    this.widgetSettings = widgetSettingsModel;
    if (this.widgetSettings.alignTop) {
      this.selectVerticalPosition('top');
    } else {
      this.selectVerticalPosition('bottom');
    }
    if (this.widgetSettings.alignLeft) {
      this.selectHorizontalPosition('left');
    } else {
      this.selectHorizontalPosition('right');
    }
    this.widgetSettings.channelList.forEach(channel => {
      this.commentSources.forEach(item => {
        if (item.name === channel) {
          item.checked = true;
        }
      });
    });
  }

  private clearSettings() {
    this.filteredChannel = [];
    this.commentSources.forEach(source => source.checked = true);
    this.widgetSettings = new WidgetSettingsModel();
    this.widgetSettings.minRating = 8;
    this.widgetSettings.maxRating = 10;
    this.widgetSettings.darkMode = false;
    this.selectVerticalPosition('bottom');
    this.selectHorizontalPosition('right');
  }

  itemCountChange($event: any) {
    if (this.widgetSettings.itemCount > 20) {
      this.translateService.get('WIDGET.WARNING_COUNT')
        .subscribe(text => {
          this.warningText = text;
        });
    } else {
      this.warningText = null;
    }
  }

  toggleActiveStatus(widgetSettings: WidgetSettingsModel) {
    widgetSettings.active = !widgetSettings.active;
    this.widgetSettingsService.saveWidgetSettings(widgetSettings)
      .subscribe((widgetSettingsModel: WidgetSettingsModel) => {
        this.toastr.success('Your widget settings saved successfully');
      });
  }
}
