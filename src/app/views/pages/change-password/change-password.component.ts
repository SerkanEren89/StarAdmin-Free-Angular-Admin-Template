import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserModel} from '../../../core/auth/_models/user.model';
import {AuthService} from '../../../core/auth/_service/auth.service';
import {ChangePasswordModel} from '../../../core/auth/_models/change-password.model';
import {TemplateModel} from '../../../core/template/_models/template.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['../../../app.component.scss', './change-password.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChangePasswordComponent implements OnInit {
  currentUser: UserModel;
  changePasswordModel: ChangePasswordModel;
  invalid: boolean;

  constructor(private authService: AuthService,
              private toastr: ToastrService,) {
  }

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    this.changePasswordModel = new ChangePasswordModel();
  }

  changePassword() {
    if (this.changePasswordModel.oldPassword === undefined ||
      this.changePasswordModel.newPasswordRepeat === undefined ||
      this.changePasswordModel.newPassword === undefined ||
      this.changePasswordModel.newPassword !== this.changePasswordModel.newPasswordRepeat) {
      this.invalid = true;
    }
    if (!this.invalid) {
      this.authService.changePassword(this.changePasswordModel)
        .subscribe((user: UserModel) => {
          this.changePasswordModel = new ChangePasswordModel();
          this.toastr.success('Your password saved successfully');
        });
    }
  }
}
