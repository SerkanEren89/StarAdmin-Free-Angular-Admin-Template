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
  hotels: HotelInfoModel[] = [];
  userLogins: UserLoginModel[];
  hotelContacts: HotelContactModel[];
  selectedHotel: HotelInfoModel;
  hotelToEdit: HotelInfoModel;
  newHotelContact: HotelContactModel = new HotelContactModel();
  selectedHotelContact: HotelContactModel;
  totalElements = 0;
  pageSize = 10;
  page = 1;

  constructor(private hotelService: HotelService,
              private hotelContactService: HotelContactService,
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

  saveHotelContact() {
    this.newHotelContact.hotelId = this.selectedHotel.id;
    this.hotelContactService.saveHotelContact(this.newHotelContact)
      .subscribe((hotelContactModel: HotelContactModel) => {
        this.toastr.success('New Contact added with success');
        this.getContactList(this.selectedHotel.id);
        this.newHotelContact = new HotelContactModel();
        this.cdr.detectChanges();
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
}
