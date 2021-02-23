import {ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {HotelInfoModel} from '../../../../core/hotel/_models/hotel-info.model';
import {HotelService} from '../../../../core/hotel/_services/hotel.service';
import {CommonService} from '../../../../core/general/_services/common.service';
import {TableService} from '../../../../core/general/_services/table.service';
import {UserLoginService} from '../../../../core/user-login/_services/user-login.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {HotelVisitService} from '../../../../core/hotel/_services/hotel-visit.service';
import {HotelVisitModel} from '../../../../core/hotel/_models/hotel-visit.model';
import {HotelFilterModel} from '../../../../core/hotel/_models/hotel-filter.model';
import {Observable} from 'rxjs';
import {AuthService} from '../../../../core/auth/_service/auth.service';

@Component({
  selector: 'app-crm-visit',
  templateUrl: './crm-visit.component.html',
  styleUrls: ['../../../../app.component.scss', './crm-visit.component.scss'],
})
export class CrmVisitComponent implements OnInit {
  @ViewChild('hotelsTable') elRef;
  @ViewChild('visitModal') public visitModal: TemplateRef<any>;
  @ViewChild('hotelStatusModal') public hotelStatusModal: TemplateRef<any>;
  @ViewChild('filterModal') public hotelFilterModal: TemplateRef<any>;
  hotels$: Observable<HotelInfoModel[]>;
  hotels: HotelInfoModel[] = [];
  hotelVisits: HotelVisitModel[];
  newVisit: HotelVisitModel = new HotelVisitModel();
  selectedHotel: HotelInfoModel;
  hotelToEdit: HotelInfoModel;
  filterHotel: HotelFilterModel = new HotelFilterModel();
  totalElements = 0;
  pageSize = 10;
  page = 1;
  columnName = 'name';
  direction = 'ASC';
  isAdmin: boolean;
  statuses;
  hotelStatuses;
  filteredStatus = [];
  selectedStatus: { title: string; value: string };
  emptyStatus = false;
  selectedVisitType: { name: string; value: string };
  visitTypes;
  actionError: string;

  constructor(private hotelService: HotelService,
              private hotelVisitService: HotelVisitService,
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
    this.visitTypes = this.commonService.getVisitTypes();
    this.selectedVisitType = this.visitTypes[0];
    this.selectedStatus = this.hotelStatuses[0];
    this.isAdmin = this.authService.isAdmin();
    this.newVisit.visitDate = new Date();
    this.getAllHotels();
  }

  loadHotels(page?: number) {
    this.page = page ? page : 1;
    if (this.shouldFilterResult()) {
      this.getFilteredHotels();
    } else {
      this.getUnFilteredHotels();
    }
  }

  private getUnFilteredHotels() {
    this.hotels$ = this.hotelService.getHotelsForVisit(this.page - 1, this.pageSize,
      this.columnName, this.direction);
    this.processHotel();
    this.modalService.dismissAll();
  }

  public getFilteredHotels() {
    this.hotels$ = this.hotelService.getHotelsByFilterForVisit(this.page - 1, this.pageSize,
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
      (this.filterHotel.statusList != null && this.filterHotel.statusList.length > 0);
  }

  showVisitModal(hotel: HotelInfoModel) {
    this.selectedHotel = hotel;
    this.hotelVisitService.getHotelVisits(hotel.id)
      .subscribe((hotelVisits: HotelVisitModel[]) => {
        this.hotelVisits = hotelVisits;
        this.modalService.open(this.visitModal, {size: 'xl'});
        this.cdr.detectChanges();
      });
  }

  private getAllHotels() {
    this.hotelService.getHotelsForVisit(this.page - 1, this.pageSize, this.columnName, this.direction)
      .subscribe((hotels: HotelInfoModel[]) => {
      this.hotels = hotels['content'];
      for (const hotel of this.hotels) {
        if (hotel.hotelStatus == null) {
          hotel.hotelStatus = 'Not selected';
        }
      }
      this.totalElements = hotels['totalElements'];
      this.cdr.detectChanges();
      this.tableService.addLabelTag(this.elRef);
    });
  }

  saveHotelVisit() {
    if (this.selectedVisitType.value === 'Action') {
      this.actionError = 'Select visit type to continue';
    }
    if (this.actionError == null) {
      this.newVisit.hotelId = this.selectedHotel.id;
      this.newVisit.visitType = this.selectedVisitType.name;
      this.hotelVisitService.saveHotelVisit(this.newVisit)
        .subscribe((hotelVisit: HotelVisitModel) => {
          this.toastr.success('New visit added with success');
          this.hotelVisitService.getHotelVisits(this.selectedHotel.id)
            .subscribe((hotelVisits: HotelVisitModel[]) => {
              this.hotelVisits = hotelVisits;
              this.selectedVisitType = this.visitTypes[0];
              this.newVisit = new HotelVisitModel();
              this.cdr.detectChanges();
            });
        });
    }
  }

  selectVisitType(visitType: any) {
    this.selectedVisitType = visitType;
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

  selectStatus(resultStatus: { title: string; value: string }) {
    this.selectedStatus = resultStatus;
    this.hotelToEdit.hotelStatus = this.selectedStatus.value;
  }

  openFilterModal() {
    this.modalService.open(this.hotelFilterModal, {size: 'xl'});
  }

  clearFilter() {
    this.filterHotel = new HotelFilterModel();
    this.filterHotel.statusList = [];
    this.filteredStatus = [];
    this.statuses.forEach(status => status.checked = false);
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
}
