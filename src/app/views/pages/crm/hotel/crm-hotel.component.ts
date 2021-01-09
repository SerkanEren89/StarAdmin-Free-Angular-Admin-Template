import {ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {HotelService} from '../../../../core/hotel/_services/hotel.service';
import {TableService} from '../../../../core/general/_services/table.service';
import {HotelInfoModel} from '../../../../core/hotel/_models/hotel-info.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserLoginService} from '../../../../core/user-login/_services/user-login.service';
import {UserLoginModel} from '../../../../core/user-login/_models/user-login.model';
import {ToastrService} from 'ngx-toastr';
import {HotelContactService} from '../../../../core/hotel/_services/hotel-contact.service';
import {HotelContactModel} from '../../../../core/hotel/_models/hotel-contact.model';
import {HotelInformationService} from '../../../../core/hotel/_services/hotel-information.service';
import {HotelInformationModel} from '../../../../core/hotel/_models/hotel-information.model';
import {CommonService} from '../../../../core/general/_services/common.service';
import {ReportService} from '../../../../core/crm/_services/report.service';
import {WeeklyReportModel} from '../../../../core/crm/_models/weekly-report.model';
import {WeeklyReportItemModel} from '../../../../core/crm/_models/weekly-report-item.model';

@Component({
  selector: 'app-hotel-visit',
  templateUrl: './crm-hotel.component.html',
  styleUrls: ['../../../../app.component.scss', './crm-hotel.component.scss'],
})
export class CrmHotelComponent implements OnInit {
  @ViewChild('hotelsTable') elRef;
  @ViewChild('contactPersonModal') public contactPersonModal: TemplateRef<any>;
  @ViewChild('lastLoginModal') public lastLoginModal: TemplateRef<any>;
  @ViewChild('contactListModal') public contactListModal: TemplateRef<any>;
  @ViewChild('actionModal') public actionModal: TemplateRef<any>;
  @ViewChild('hotelInformationModal') public hotelInformationModal: TemplateRef<any>;
  @ViewChild('hotelStatusModal') public hotelStatusModal: TemplateRef<any>;
  hotels: HotelInfoModel[] = [];
  userLogins: UserLoginModel[];
  hotelContacts: HotelContactModel[];
  hotelInformation: HotelInformationModel;
  selectedHotel: HotelInfoModel;
  hotelToEdit: HotelInfoModel;
  newHotelContact: HotelContactModel = new HotelContactModel();
  selectedHotelContact: HotelContactModel;
  reportItemsToSend: WeeklyReportItemModel[] = [];
  totalElements = 0;
  pageSize = 10;
  page = 1;
  emptyStatus = false;
  selectedStatus: { title: string; value: string };
  selectedReportType: { name: string; value: string };
  hotelStatuses;
  reportTypes;
  actionError: string;

  constructor(private hotelService: HotelService,
              private hotelContactService: HotelContactService,
              private hotelInformationService: HotelInformationService,
              private reportService: ReportService,
              private commonService: CommonService,
              private tableService: TableService,
              private userLoginService: UserLoginService,
              private modalService: NgbModal,
              private toastr: ToastrService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.hotelStatuses = this.commonService.getHotelStatuses();
    this.reportTypes = this.commonService.getReportTypes();
    this.selectedStatus = this.hotelStatuses[0];
    this.selectedReportType = this.reportTypes[0];
    this.getAllHotels();
  }

  loadHotels(page: number) {
    this.page = page;
    this.getAllHotels();
  }

  private getAllHotels() {
    this.hotelService.getHotels(this.page - 1, this.pageSize).subscribe((hotels: HotelInfoModel[]) => {
      this.hotels = hotels['content'];
      for (const hotel of this.hotels) {
        if (hotel.hotelStatus == null) {
          hotel.hotelStatus = this.hotelStatuses[0].title;
        }
      }
      this.totalElements = hotels['totalElements'];
      this.cdr.detectChanges();
      this.tableService.addLabelTag(this.elRef);
    });
  }

  edit(hotel: HotelInfoModel) {
    this.hotelToEdit = hotel;
    this.open(this.contactPersonModal);
  }

  open(content) {
    this.modalService.open(content, {size: 'xl', ariaLabelledBy: 'modal-basic-title', scrollable: true}).result.then((result) => {
    }, (reason) => {
    });
  }

  save(selectedHotel: HotelInfoModel) {
    this.selectedHotel = selectedHotel;
    this.hotelService.patchHotel(this.selectedHotel)
      .subscribe((hotelInfoModel: HotelInfoModel) => {
        this.selectedHotel = hotelInfoModel;
        this.toastr.success('Hotel updated successfully');
        this.cdr.detectChanges();
      });
  }

  showLastLogins(hotel: HotelInfoModel) {
    this.selectedHotel = hotel;
    this.userLoginService.getUserLoginsByUserId(hotel.user.id)
      .subscribe((userLogins: UserLoginModel[]) => {
        this.userLogins = userLogins;
        this.modalService.open(this.lastLoginModal);
        this.cdr.detectChanges();
      });
  }

  showContactList(hotel: HotelInfoModel) {
    this.selectedHotel = hotel;
    this.getContactList(this.selectedHotel.id);
  }

  showHotelInformation(hotel: HotelInfoModel) {
    this.selectedHotel = hotel;
    this.getHotelInformation(this.selectedHotel.id);
  }

  showActionsModal(hotel: HotelInfoModel) {
    this.selectedHotel = hotel;
    this.hotelContactService.getHotelContacts(hotel.id)
      .subscribe((hotelContacts: HotelContactModel[]) => {
        this.hotelContacts = hotelContacts;
        this.hotelContacts.forEach(contact => contact.selected = true);
        this.changeSelectStatus();
        this.modalService.open(this.actionModal, {size: 'xl'});
        this.cdr.detectChanges();
      });
  }

  saveHotelContact() {
    this.newHotelContact.hotelId = this.selectedHotel.id;
    this.hotelContactService.saveHotelContact(this.newHotelContact)
      .subscribe((hotelContactModel: HotelContactModel) => {
        this.toastr.success('New Contact added with success');
        this.hotelContactService.getHotelContacts(this.selectedHotel.id)
          .subscribe((hotelContacts: HotelContactModel[]) => {
            this.hotelContacts = hotelContacts;
            this.newHotelContact = new HotelContactModel();
            this.cdr.detectChanges();
            this.cdr.detectChanges();
          });
      });
  }

  saveHotelInformation() {
    this.hotelInformation.hotelId = this.selectedHotel.id;
    this.hotelInformationService.saveHotelInformation(this.hotelInformation)
      .subscribe((hotelInformationModel: HotelInformationModel) => {
        this.toastr.success('Hotel Information saved with success');
        this.hotelInformation = new HotelInformationModel();
        this.cdr.detectChanges();
        this.modalService.dismissAll();
      });
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
        this.toastr.success('Contact updated with success');
        this.cdr.detectChanges();
      });
  }

  getContactList(id: number) {
    this.hotelContactService.getHotelContacts(id)
      .subscribe((hotelContacts: HotelContactModel[]) => {
        this.hotelContacts = hotelContacts;
        this.modalService.open(this.contactListModal, {size: 'xl'});
        this.cdr.detectChanges();
      });
  }

  getHotelInformation(id: number) {
    this.hotelInformationService.getHotelInformation(id)
      .subscribe((hotelInformation: HotelInformationModel) => {
        if (hotelInformation == null) {
          hotelInformation = new HotelInformationModel();
        }
        this.hotelInformation = hotelInformation;
        this.modalService.open(this.hotelInformationModal, {size: 'xl'});
        this.cdr.detectChanges();
      });
  }

  openHotelStatusModal(hotelInfo: HotelInfoModel) {
    this.emptyStatus = false;
    for (const status of this.hotelStatuses) {
      if (status.value === hotelInfo.hotelStatus) {
        hotelInfo.hotelStatus = status.value;
        this.selectedStatus.title = status.value;
        break;
      }
    }
    if (hotelInfo.hotelStatus === 'Select status') {
      this.selectedStatus.title = hotelInfo.hotelStatus;
    }
    this.hotelToEdit = hotelInfo;
    this.modalService.open(this.hotelStatusModal);
  }

  selectStatus(resultStatus: { title: string; value: string }) {
    this.selectedStatus = resultStatus;
    this.hotelToEdit.hotelStatus = this.selectedStatus.value;
  }

  changeHotelStatus() {
    if (this.hotelToEdit.hotelStatus !== 'Select status') {
      this.hotelService.patchHotel(this.hotelToEdit)
        .subscribe((hotelInfoModel: HotelInfoModel) => {
          this.selectedHotel = hotelInfoModel;
          this.toastr.success('Hotel updated successfully');
          this.cdr.detectChanges();
        });
    } else {
      this.emptyStatus = true;
    }
  }

  handleActions() {
    this.actionError = null;
    if (this.selectedReportType.value === 'Action') {
      this.actionError = 'Select report type to continue';
    }

    if (this.reportItemsToSend.length === 0) {
      this.actionError = 'Select at least one user to continue';
    }
    if (this.actionError === null) {
      const reportToSend = new WeeklyReportModel();
      reportToSend.hotelId = this.selectedHotel.id;
      reportToSend.reportType = this.selectedReportType.name;
      reportToSend.reportItemDtos = this.reportItemsToSend;
      this.reportService.sendWeeklyReport(reportToSend)
        .subscribe(() => {
          this.toastr.success('Report sent successfully');
          this.cdr.detectChanges();
        });
    }
  }

  changeSelectStatus() {
    const sentList = [];
    for (const hotelContact of this.hotelContacts) {
      if (hotelContact.selected) {
        sentList.push(hotelContact);
      }
    }
    this.reportItemsToSend = sentList;
  }

  selectReport(report: any) {
    this.selectedReportType = report;
  }
}
