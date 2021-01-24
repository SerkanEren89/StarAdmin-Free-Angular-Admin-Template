import {ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TableService} from '../../../core/general/_services/table.service';
import {GuestService} from '../../../core/guest/_services/guest.service';
import {GuestModel} from '../../../core/guest/_models/guest.model';

@Component({
  selector: 'app-guest',
  styleUrls: ['../../../app.component.scss', './guest.component.scss'],
  templateUrl: './guest.component.html'
})
export class GuestComponent implements OnInit {
  @ViewChild('guestTable') elRef;
  guests: GuestModel[] = [];
  newGuest: GuestModel;
  selectedGuest: GuestModel;
  totalElements = 0;
  pageSize = 10;
  page = 1;

  constructor(private guestService: GuestService,
              private toastr: ToastrService,
              private modalService: NgbModal,
              private tableService: TableService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.newGuest = new GuestModel();
    this.getAllGuest();
  }

  private getAllGuest() {
    this.guestService.getGuests(this.page - 1, this.pageSize).subscribe((guests: GuestModel[]) => {
      this.guests = guests['content'];
      this.totalElements = guests['totalElements'];
      this.cdr.detectChanges();
      this.tableService.addLabelTag(this.elRef);
    });
  }

  loadGuests(page: number) {
    this.page = page;
    this.getAllGuest();
  }

  openNewGuestModal(newGuestModal: any, isEdit: boolean) {
    if (!isEdit) {
      this.newGuest = new GuestModel();
    }
    this.modalService.open(newGuestModal, {size: 'xl', ariaLabelledBy: 'modal-basic-title', scrollable: true}).result.then((result) => {
    }, (reason) => {
    });
  }

  addNewGuest() {
    if (this.newGuest.id != null) {
      this.guestService.updateGuest(this.newGuest.uuid, this.newGuest)
        .subscribe((guestModel: GuestModel) => {
          this.modalService.dismissAll();
          this.toastr.success('Guest saved successfully');
          this.getAllGuest();
        });
    } else {
      this.guestService.saveGuest(this.newGuest)
        .subscribe((guestModel: GuestModel) => {
          this.modalService.dismissAll();
          this.toastr.success('Guest saved successfully');
          this.getAllGuest();
        });
    }
  }

  openDeletePopup(deleteModal: TemplateRef<any>, guest: GuestModel) {
    this.selectedGuest = guest;
    this.modalService.open(deleteModal, {ariaLabelledBy: 'modal-basic-title', scrollable: true}).result.then((result) => {
    }, (reason) => {
    });
  }

  openGuestNote(guestNote: TemplateRef<any>, guest: GuestModel) {
    this.selectedGuest = guest;
    this.modalService.open(guestNote, {ariaLabelledBy: 'modal-basic-title', scrollable: true}).result.then((result) => {
    }, (reason) => {
    });
  }

  edit(newGuestModal: TemplateRef<any>, guest: GuestModel) {
    this.newGuest = guest;
    this.openNewGuestModal(newGuestModal, true);
  }

  cancel() {
    this.modalService.dismissAll();
  }

  deleteGuest() {
    this.guestService.deleteGuest(this.selectedGuest).subscribe(() => {
      this.toastr.success('Guest deleted successfully');
      this.modalService.dismissAll();
      this.getAllGuest();
    });
  }

  showGuestNote() {

  }
}
