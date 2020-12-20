import {ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {HotelService} from '../../../../core/hotel/_services/hotel.service';
import {TableService} from '../../../../core/general/_services/table.service';
import {HotelInfoModel} from '../../../../core/hotel/_models/hotel-info.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserLoginService} from '../../../../core/user-login/_services/user-login.service';
import {HotelModel} from '../../../../core/hotel/_models/hotel.model';
import {UserLoginModel} from '../../../../core/user-login/_models/user-login.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-hotel-visit',
  templateUrl: './crm-hotel.component.html',
  styleUrls: ['../../../../app.component.scss', './crm-hotel.component.scss'],
})
export class CrmHotelComponent implements OnInit {
  @ViewChild('hotelsTable') elRef;
  @ViewChild('editModal') public editModal: TemplateRef<any>;
  @ViewChild('lastLoginModal') public lastLoginModal: TemplateRef<any>;
  hotels: HotelInfoModel[] = [];
  userLogins: UserLoginModel[];
  selectedHotel: HotelInfoModel;
  hotelToEdit: HotelInfoModel;
  totalElements = 0;
  pageSize = 10;
  page = 1;

  constructor(private hotelService: HotelService,
              private tableService: TableService,
              private userLoginService: UserLoginService,
              private modalService: NgbModal,
              private toastr: ToastrService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.getAllHotels();
  }

  loadHotels(page: number) {
    this.page = page;
    this.getAllHotels();
  }

  private getAllHotels() {
    this.hotelService.getHotels(this.page - 1, this.pageSize).subscribe((hotels: HotelInfoModel[]) => {
      this.hotels = hotels['content'];
      this.totalElements = hotels['totalElements'];
      this.cdr.detectChanges();
      this.tableService.addLabelTag(this.elRef);
    });
  }

  edit(hotel: HotelInfoModel) {
    this.hotelToEdit = hotel;
    this.open(this.editModal);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', scrollable: true}).result.then((result) => {
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
}
