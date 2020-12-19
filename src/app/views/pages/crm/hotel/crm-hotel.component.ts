import {ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {HotelService} from '../../../../core/hotel/_services/hotel.service';
import {TableService} from '../../../../core/general/_services/table.service';
import {HotelInfoModel} from '../../../../core/hotel/_models/hotel-info.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-hotel-visit',
  templateUrl: './crm-hotel.component.html',
  styleUrls: ['../../../../app.component.scss', './crm-hotel.component.scss'],
})
export class CrmHotelComponent implements OnInit {
  @ViewChild('hotelsTable') elRef;
  @ViewChild('editModal') public editModal: TemplateRef<any>;
  hotels: HotelInfoModel[] = [];
  newHotel: HotelInfoModel;
  totalElements = 0;
  pageSize = 10;
  page = 1;

  constructor(private hotelService: HotelService,
              private tableService: TableService,
              private modalService: NgbModal,
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
    this.newHotel = hotel;
    this.open(this.editModal);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', scrollable: true}).result.then((result) => {
    }, (reason) => {
    });
  }

  save(newHotel: HotelInfoModel) {
    
  }
}
