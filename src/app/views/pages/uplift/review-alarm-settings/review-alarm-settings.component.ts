import {ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {Options} from '@angular-slider/ngx-slider';
import {ReviewAlarmSettingsModel} from '../../../../core/uplift/_models/review-alarm-settings.model';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../../../core/auth/_service/auth.service';
import {CommonService} from '../../../../core/general/_services/common.service';
import {ReviewAlarmSettingsService} from '../../../../core/uplift/_services/review-alarm-settings.service';
import {HotelContactModel} from '../../../../core/hotel/_models/hotel-contact.model';
import {HotelContactService} from '../../../../core/hotel/_services/hotel-contact.service';
import {UserModel} from '../../../../core/auth/_models/user.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-review-alarm-settings',
  templateUrl: './review-alarm-settings.component.html',
  styleUrls: ['../../../../app.component.scss', './review-alarm-settings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReviewAlarmSettingsComponent implements OnInit {
  @ViewChild('contactListModal') public contactListModal: TemplateRef<any>;
  reviewAlarmSettings: ReviewAlarmSettingsModel;
  hotelContacts: HotelContactModel[];
  newHotelContact: HotelContactModel = new HotelContactModel();
  commentSources;
  filteredChannel = [];
  options: Options = {
    floor: 0,
    ceil: 10
  };
  currentUser: UserModel;
  submitted: boolean;

  constructor(private toastr: ToastrService,
              private reviewAlarmSettingsService: ReviewAlarmSettingsService,
              private hotelContactService: HotelContactService,
              private authService: AuthService,
              private commonService: CommonService,
              private modalService: NgbModal,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
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
    this.hotelContactService.getHotelContacts()
      .subscribe((hotelContacts: HotelContactModel[]) => {
        this.hotelContacts = hotelContacts;
        this.hotelContacts.forEach(contact => contact.selected = true);
        this.cdr.detectChanges();
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

  deleteHotelContact(hotelContact: HotelContactModel) {
    hotelContact.deleted = true;
    this.updateHotelContact(hotelContact);
  }

  activateHotelContact(hotelContact: HotelContactModel) {
    hotelContact.active = true;
    this.updateHotelContact(hotelContact);
  }

  deactivateHotelContact(hotelContact: HotelContactModel) {
    hotelContact.active = false;
    this.updateHotelContact(hotelContact);
  }

  updateHotelContact(hotelContact: HotelContactModel) {
    this.hotelContactService.updateHotelContact(hotelContact.id, hotelContact)
      .subscribe((hotelContactModel: HotelContactModel) => {
        this.hotelContactService.getHotelContacts()
          .subscribe((hotelContacts: HotelContactModel[]) => {
            this.hotelContacts = hotelContacts;
            this.hotelContacts.forEach(contact => contact.selected = true);
            this.cdr.detectChanges();
          });
      });
  }

  openAddContactModal() {
    this.submitted = false;
    this.modalService.open(this.contactListModal, {size: 'xl'});
  }

  save() {
    if (this.reviewAlarmSettings.channelList.length > 0 &&
      (!this.reviewAlarmSettings.sendSms && !this.reviewAlarmSettings.sendMail)) {
      this.reviewAlarmSettingsService.saveReviewAlarmSettings(this.reviewAlarmSettings)
        .subscribe((reviewAlarmSettingsModel: ReviewAlarmSettingsModel) => {
          this.toastr.success('Your review alarm settings saved successfully');
        });
    }
  }

  saveHotelContact() {
    this.submitted = true;
    if (this.newHotelContact.phoneNumber != null || this.newHotelContact.mail != null) {
      this.newHotelContact.hotelId = this.currentUser.hotelId;
      this.hotelContactService.saveHotelContact(this.newHotelContact)
        .subscribe((hotelContactModel: HotelContactModel) => {
          this.toastr.success('New Contact added with success');
          this.hotelContactService.getHotelContactsByHotelId(this.newHotelContact.hotelId)
            .subscribe((hotelContacts: HotelContactModel[]) => {
              this.hotelContacts = hotelContacts;
              this.newHotelContact = new HotelContactModel();
              this.modalService.dismissAll();
              this.cdr.detectChanges();
            });
        });
    }
  }

  editHotelContact(hotelContact: HotelContactModel) {
    this.newHotelContact = hotelContact;
    this.openAddContactModal();
  }
}
