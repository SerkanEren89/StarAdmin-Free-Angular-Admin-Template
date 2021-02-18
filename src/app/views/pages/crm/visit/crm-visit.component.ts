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

@Component({
  selector: 'app-crm-visit',
  templateUrl: './crm-visit.component.html',
  styleUrls: ['../../../../app.component.scss', './crm-visit.component.scss'],
})
export class CrmVisitComponent implements OnInit {
  @ViewChild('hotelsTable') elRef;
  @ViewChild('visitModal') public visitModal: TemplateRef<any>;
  hotels: HotelInfoModel[] = [];
  hotelVisits: HotelVisitModel[];
  newVisit: HotelVisitModel = new HotelVisitModel();
  selectedHotel: HotelInfoModel;
  totalElements = 0;
  pageSize = 10;
  page = 1;
  columnName = 'name';
  direction = 'ASC';
  emptyStatus = false;
  selectedVisitType: { name: string; value: string };
  visitTypes;
  actionError: string;

  constructor(private hotelService: HotelService,
              private hotelVisitService: HotelVisitService,
              private commonService: CommonService,
              private tableService: TableService,
              private userLoginService: UserLoginService,
              private modalService: NgbModal,
              private toastr: ToastrService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.visitTypes = this.commonService.getVisitTypes();
    this.selectedVisitType = this.visitTypes[0];
    this.newVisit.visitDate = new Date();
    this.getAllHotels();
  }

  loadHotels(page: number) {
    this.page = page;
    this.getAllHotels();
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
    this.hotelService.getHotels(this.page - 1, this.pageSize, this.columnName, this.direction)
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
}
