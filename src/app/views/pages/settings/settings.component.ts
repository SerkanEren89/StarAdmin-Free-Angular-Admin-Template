import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonService} from '../../../core/general/_services/common.service';
import {TranslationService} from '../../../core/general/_services/translation.service';
import {UserService} from '../../../core/auth/_service/user.service';
import {UserModel} from '../../../core/auth/_models/user.model';
import {HotelInfoModel} from '../../../core/hotel/_models/hotel-info.model';
import {ToastrService} from 'ngx-toastr';
import {UserOptionService} from '../../../core/user-option/_services/user-option.service';
import {OptionModel} from '../../../core/user-option/_models/option.model';
import {UserOptionModel} from '../../../core/user-option/_models/user-option.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['../../../app.component.scss', './settings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SettingsComponent implements OnInit {
  languages;
  selectedLanguage: any;
  options: OptionModel[];

  constructor(private userService: UserService,
              private userOptionService: UserOptionService,
              private commonService: CommonService,
              private toastr: ToastrService,
              private translationService: TranslationService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    const initialLanguage = this.translationService.getSelectedLanguage();
    this.languages = this.commonService.getLanguages();
    this.selectedLanguage = this.languages.find(language => language.name === initialLanguage);

    this.userOptionService.getOptions()
      .subscribe((options: OptionModel[]) => {
        this.options = options;
        this.cdr.detectChanges();
      });
  }

  selectLanguage(language: any) {
    this.selectedLanguage = language;
    const user = new UserModel();
    user.preferredLanguage = this.selectedLanguage.name;
    this.userService.patchUser(user)
      .subscribe((userModel: UserModel) => {
        this.toastr.success('Preferred language changed successfully');
        this.translationService.setLanguage(user.preferredLanguage);
      });
  }

  changeOption(option: OptionModel) {
    option.defaultValue = !option.defaultValue;
    console.log(option.defaultValue);
    const userOption = new UserOptionModel();
    userOption.option = option;
    userOption.userValue = option.defaultValue;
    this.userOptionService.saveUserOption(userOption)
      .subscribe((optionModel: OptionModel) => {
        this.toastr.success('Preferred language changed successfully');
      });
  }
}
