import {ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PersonalModel} from '../../../core/personal/_models/personal.model';
import {PersonalService} from '../../../core/personal/_services/personal.service';
import {TableService} from '../../../core/general/_services/table.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['../../../app.component.scss', './personal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PersonalComponent implements OnInit {
  @ViewChild('personalTable') elRef;
  @ViewChild('personalModal') public personalModal: TemplateRef<any>;
  newPersonal: PersonalModel;
  personals: PersonalModel[] = [];
  selectedPersonal: PersonalModel;
  totalElements = 0;
  pageSize = 10;
  page = 1;

  constructor(private personalService: PersonalService,
              private toastr: ToastrService,
              private modalService: NgbModal,
              private tableService: TableService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.newPersonal = new PersonalModel();
    this.getAllPersonals();
  }

  save(newPersonal: PersonalModel) {
    this.personalService.savePersonal(newPersonal)
      .subscribe((personalModel: PersonalModel) => {
        this.modalService.dismissAll();
        this.toastr.success('Personal saved successfully');
        this.getAllPersonals();
      });
  }

  edit(personal: PersonalModel) {
    this.newPersonal = personal;
    this.open(this.personalModal);
  }

  loadPersonal(page: number) {
    this.page = page;
    this.getAllPersonals();
  }

  private getAllPersonals() {
    this.personalService.getPagedPersonals(this.page - 1, this.pageSize)
      .subscribe((personals: PersonalModel[]) => {
      this.personals = personals['content'];
      this.totalElements = personals['totalElements'];
      this.cdr.detectChanges();
      this.tableService.addLabelTag(this.elRef);
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', scrollable: true}).result.then((result) => {
    }, (reason) => {
    });
  }

  addNew() {
    this.newPersonal = new PersonalModel();
    this.open(this.personalModal);
  }

  openDeletePopup(deleteModal: TemplateRef<any>, personal: PersonalModel) {
    this.selectedPersonal = personal;
    this.modalService.open(deleteModal, {ariaLabelledBy: 'modal-basic-title', scrollable: true}).result.then((result) => {
    }, (reason) => {
    });
  }

  deletePersonal() {
    this.personalService.deletePersonal(this.selectedPersonal).subscribe(() => {
      this.toastr.success('Personal deleted successfully');
      this.modalService.dismissAll();
      this.getAllPersonals();
    });
  }

  cancel() {
    this.modalService.dismissAll();
  }
}
