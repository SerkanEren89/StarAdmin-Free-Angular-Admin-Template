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
import {HotelFilterModel} from '../../../../core/hotel/_models/hotel-filter.model';
import {Observable} from 'rxjs';
import {PersonalService} from '../../../../core/personal/_services/personal.service';
import {PersonalModel} from '../../../../core/personal/_models/personal.model';
import {AuthService} from '../../../../core/auth/_service/auth.service';
import {HotelModel} from '../../../../core/hotel/_models/hotel.model';
import {HotelAssignmentCountModel} from '../../../../core/hotel/_models/hotel-assignment-count.model';

@Component({
  selector: 'app-hotel-visit',
  templateUrl: './crm-hotel.component.html',
  styleUrls: ['../../../../app.component.scss', './crm-hotel.component.scss'],
})
export class CrmHotelComponent implements OnInit {
  @ViewChild('hotelsTable') elRef;
  @ViewChild('lastLoginModal') public lastLoginModal: TemplateRef<any>;
  @ViewChild('contactListModal') public contactListModal: TemplateRef<any>;
  @ViewChild('actionModal') public actionModal: TemplateRef<any>;
  @ViewChild('hotelInformationModal') public hotelInformationModal: TemplateRef<any>;
  @ViewChild('hotelStatusModal') public hotelStatusModal: TemplateRef<any>;
  @ViewChild('assignPersonalModal') public assignPersonalModal: TemplateRef<any>;
  @ViewChild('filterModal') public hotelFilterModal: TemplateRef<any>;
  @ViewChild('calculatorModal') public calculatorModal: TemplateRef<any>;
  @ViewChild('newHotelModal') public newHotelModal: TemplateRef<any>;
  hotels: HotelInfoModel[] = [];
  hotels$: Observable<HotelInfoModel[]>;
  userLogins: UserLoginModel[];
  hotelContacts: HotelContactModel[];
  hotelInformation: HotelInformationModel;
  selectedHotel: HotelInfoModel;
  hotelToEdit: HotelInfoModel;
  newHotelContact: HotelContactModel = new HotelContactModel();
  selectedHotelContact: HotelContactModel;
  personals: PersonalModel[] = [];
  selectedPersonal: PersonalModel;
  selectedFilterPersonal: PersonalModel;
  emptyPerson: PersonalModel;
  filterHotel: HotelFilterModel = new HotelFilterModel();
  reportItemsToSend: WeeklyReportItemModel[] = [];
  hotelAssignmentCounts: HotelAssignmentCountModel[];
  newHotel: HotelModel = new HotelModel();
  totalElements = 0;
  pageSize = 10;
  page = 1;
  roomPrice = 0;
  roomNumber = 0;
  hotelUpliftPrice = 0;
  hotelIncome = 0;
  emptyStatus = false;
  emptyPersonal = false;
  isAdmin: boolean;
  isSeller: boolean;
  columnName = 'name';
  direction = 'ASC';
  statuses;
  filteredStatus = [];
  selectedStatus: { title: string; value: string };
  selectedReportType: { name: string; value: string };
  hotelStatuses;
  reportTypes;
  actionError: string;

  constructor(private hotelService: HotelService,
              private hotelContactService: HotelContactService,
              private hotelInformationService: HotelInformationService,
              private personalService: PersonalService,
              private reportService: ReportService,
              private commonService: CommonService,
              private tableService: TableService,
              private userLoginService: UserLoginService,
              private authService: AuthService,
              private modalService: NgbModal,
              private toastr: ToastrService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.statuses = this.commonService.getHotelStatuses().slice(1);
    this.hotelStatuses = this.commonService.getHotelStatuses();
    this.reportTypes = this.commonService.getReportTypes();
    this.emptyPerson = this.commonService.getEmptyPersonal();
    this.selectedStatus = this.hotelStatuses[0];
    this.selectedReportType = this.reportTypes[0];
    this.isAdmin = this.authService.isAdmin();
    this.isSeller = this.authService.isSeller();
    this.personalService.getPersonals()
      .subscribe((personalModels: PersonalModel[]) => {
        this.personals = personalModels;
        this.personals = [this.emptyPerson, ...this.personals];
        this.selectedPersonal = this.emptyPerson;
        this.selectedFilterPersonal = this.emptyPerson;
        this.cdr.detectChanges();
      });

    this.hotelService.getAssignmentCounts()
      .subscribe((hotelAssignmentCountModels: HotelAssignmentCountModel[]) => {
        this.hotelAssignmentCounts = hotelAssignmentCountModels;
        this.cdr.detectChanges();
      });
    this.getUnFilteredHotels();
  }

  loadHotels(page?: number) {
    this.page = page ? page : 1;
    if (this.shouldFilterResult()) {
      this.getFilteredHotels();
    } else {
      this.getUnFilteredHotels();
    }
  }

  sortHotels(column: string) {
    if (column === this.columnName) {
      if (this.direction === 'ASC') {
        this.direction = 'DESC';
      } else {
        this.direction = 'ASC';
      }
    } else {
      this.direction = 'ASC';
    }
    this.columnName = column;
    this.loadHotels();
  }

  private getUnFilteredHotels() {
    this.hotels$ = this.hotelService.getHotels(this.page - 1, this.pageSize,
      this.columnName, this.direction);
    this.processHotel();
    this.modalService.dismissAll();
  }

  public getFilteredHotels() {
    this.filterHotel.name = this.filterHotel.name.toLowerCase();
    this.hotels$ = this.hotelService.getHotelsByFilter(this.page - 1, this.pageSize,
      this.columnName, this.direction, this.filterHotel);
    this.processHotel();
    this.modalService.dismissAll();
  }

  private processHotel() {
    this.hotels$.subscribe((hotels: HotelInfoModel[]) => {
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

  private shouldFilterResult() {
    return (this.filterHotel.name != null && this.filterHotel.name !== '') ||
      (this.filterHotel.statusList != null && this.filterHotel.statusList.length > 0) ||
      (this.filterHotel.personal != null && this.filterHotel.personal.id != null);
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
    this.userLoginService.getUserLoginsByHotelId(hotel.id)
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
    this.hotelContactService.getHotelContactsByHotelId(hotel.id)
      .subscribe((hotelContacts: HotelContactModel[]) => {
        this.hotelContacts = hotelContacts;
        this.hotelContacts.forEach(contact => contact.selected = true);
        this.setReportsToSent();
        this.modalService.open(this.actionModal, {size: 'xl'});
        this.cdr.detectChanges();
      });
  }

  saveHotelContact() {
    this.newHotelContact.hotelId = this.selectedHotel.id;
    this.hotelContactService.saveHotelContact(this.newHotelContact)
      .subscribe((hotelContactModel: HotelContactModel) => {
        this.toastr.success('New Contact added with success');
        this.hotelContactService.getHotelContactsByHotelId(this.selectedHotel.id)
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

  updateNewReviewStatus(hotelContact: HotelContactModel) {
    hotelContact.sentNewReviewMail = !hotelContact.sentNewReviewMail;
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
    this.hotelContactService.getHotelContactsByHotelId(id)
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
        this.roomNumber = this.hotelInformation.numberOfRoom;
        this.roomPrice = this.hotelInformation.price;
        this.calculatePrice();
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

  openAssignPersonalModal(hotel: HotelInfoModel) {
    this.emptyPersonal = false;
    if (hotel.personal != null) {
      for (const personal of this.personals) {
        if (personal.id === hotel.personal.id) {
          this.selectedPersonal = personal;
          break;
        }
      }
    }
    if ((hotel.personal != null && hotel.personal.firstName === 'Select'
      && hotel.personal.lastName === 'Personal') || hotel.personal == null) {
      this.selectedPersonal = this.emptyPerson;
    }
    this.hotelToEdit = hotel;
    this.modalService.open(this.assignPersonalModal);
  }

  openFilterModal() {
    this.modalService.open(this.hotelFilterModal, {size: 'xl'});
  }

  openCalculatorModal() {
    this.hotelInformation = new HotelInformationModel();
    this.modalService.open(this.calculatorModal, {size: 'xl'});
  }

  saveHotelModal() {
    this.modalService.open(this.newHotelModal);
  }

  saveHotel() {
    this.hotelService.saveHotel(this.newHotel)
      .subscribe((hotelModel: HotelModel) => {
        this.toastr.success('Hotel saved with success');
        const hotelInfoModel = new HotelInfoModel();
        hotelInfoModel.id = hotelModel.id;
        hotelInfoModel.uuid = hotelModel.uuid;
        hotelInfoModel.name = hotelModel.name;
        hotelInfoModel.hotelStatus = this.hotelStatuses[0].title;
        this.newHotel = new HotelModel();
        this.hotels = [hotelInfoModel, ...this.hotels];
        this.cdr.detectChanges();
        this.modalService.dismissAll();
      });
  }

  selectStatus(resultStatus: { title: string; value: string }) {
    this.selectedStatus = resultStatus;
    this.hotelToEdit.hotelStatus = this.selectedStatus.value;
  }

  selectPersonal(personal: PersonalModel) {
    this.selectedPersonal = personal;
    this.hotelToEdit.personal = personal;
  }

  selectFilterPersonal(personal: PersonalModel) {
    this.filterHotel.personal = personal;
    this.selectedFilterPersonal = personal;
  }

  changeHotelStatus() {
    if (this.hotelToEdit.hotelStatus !== 'Select status') {
      this.hotelService.patchHotel(this.hotelToEdit)
        .subscribe((hotelInfoModel: HotelInfoModel) => {
          this.selectedHotel = hotelInfoModel;
          this.toastr.success('Hotel updated successfully');
          this.modalService.dismissAll();
          this.cdr.detectChanges();
        });
    } else {
      this.emptyStatus = true;
    }
  }

  assignPersonal() {
    if (this.hotelToEdit.personal.firstName !== 'Select' &&
      this.hotelToEdit.personal.lastName !== 'Personal') {
      this.hotelToEdit.hotelStatus = null;
      this.hotelService.patchHotel(this.hotelToEdit)
        .subscribe((hotelInfoModel: HotelInfoModel) => {
          this.selectedHotel = hotelInfoModel;
          this.toastr.success('Hotel assigned to personal successfully');
          this.modalService.dismissAll();
          this.cdr.detectChanges();
        });
    } else {
      this.emptyPersonal = true;
    }
  }

  handleActions() {
    this.setReportsToSent();
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

  setReportsToSent() {
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

  clearFilter() {
    this.filterHotel = new HotelFilterModel();
    this.filterHotel.statusList = [];
    this.filteredStatus = [];
    this.statuses.forEach(status => status.checked = false);
    this.selectedFilterPersonal = this.emptyPerson;
    this.filterHotel = new HotelFilterModel();
    this.page = 1;
  }

  changeFilteredStatus(i: number) {
    if (this.statuses) {
      this.statuses[i].checked = !this.statuses[i].checked;
      if (this.statuses[i].checked) {
        this.filteredStatus.push(this.statuses[i].value);
      } else {
        this.filteredStatus.splice(this.filteredStatus.indexOf(this.statuses[i].value), 1);
      }
    }
    this.filterHotel.statusList = this.filteredStatus;
  }

  roomValueChange(newValue) {
    this.roomNumber = newValue;
    this.calculatePrice();
  }

  calculatePrice() {
    if (this.roomNumber <= 20) {
      this.hotelUpliftPrice = 39;
    } else if (this.roomNumber > 20 && this.roomNumber <= 30) {
      this.hotelUpliftPrice = 44;
    } else if (this.roomNumber > 30 && this.roomNumber <= 40) {
      this.hotelUpliftPrice = 49;
    } else if (this.roomNumber > 40 && this.roomNumber <= 60) {
      this.hotelUpliftPrice = 59;
    } else if (this.roomNumber > 60 && this.roomNumber <= 80) {
      this.hotelUpliftPrice = 69;
    } else if (this.roomNumber > 80 && this.roomNumber <= 100) {
      this.hotelUpliftPrice = 79;
    } else if (this.roomNumber > 100 && this.roomNumber <= 200) {
      this.hotelUpliftPrice = 99;
    } else if (this.roomNumber > 200) {
      this.hotelUpliftPrice = 129;
    }
  }
}
