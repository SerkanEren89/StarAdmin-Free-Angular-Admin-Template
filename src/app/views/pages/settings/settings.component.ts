import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonService} from '../../../core/general/_services/common.service';
import {TranslationService} from '../../../core/general/_services/translation.service';
import {UserService} from '../../../core/auth/_service/user.service';
import {UserModel} from '../../../core/auth/_models/user.model';
import {HotelInfoModel} from '../../../core/hotel/_models/hotel-info.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['../../../app.component.scss', './settings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SettingsComponent implements OnInit {
  languages;
  selectedLanguage: any;

  constructor(private userService: UserService,
              private commonService: CommonService,
              private toastr: ToastrService,
              private translationService: TranslationService) {
  }

  ngOnInit(): void {
    const initialLanguage = this.translationService.getSelectedLanguage();
    this.languages = this.commonService.getLanguages();
    this.selectedLanguage = this.languages.find(language => language.name === initialLanguage);
  }

  selectLanguage(language: any) {
    this.selectedLanguage = language;
    const user = new UserModel();
    user.preferredLanguage = this.selectedLanguage.name;
    this.userService.patchUser(user)
      .subscribe((hotelInfoModel: HotelInfoModel) => {
        this.toastr.success('Preferred language changed successfully');
        this.translationService.setLanguage(user.preferredLanguage);
      });
  }
}
