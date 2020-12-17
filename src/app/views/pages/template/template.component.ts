import {ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {TemplateModel} from '../../../core/template/_models/template.model';
import {TemplateService} from '../../../core/template/_services/template.service';
import {ToastrService} from 'ngx-toastr';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['../../../app.component.scss', './template.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TemplateComponent implements OnInit {
  @ViewChild('templateModal') public templateModal: TemplateRef<any>;
  templates$: Observable<TemplateModel[]>;
  templates: TemplateModel[] = [];
  newTemplate: TemplateModel;
  closeResult = '';
  selectedTemplate: TemplateModel;


  constructor(private templateService: TemplateService,
              private toastr: ToastrService,
              private modalService: NgbModal,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.newTemplate = new TemplateModel();
    this.loadAllTemplate();
  }

  save(template: TemplateModel) {
    this.templateService.saveTemplates(template)
      .subscribe((templateModel: TemplateModel) => {
        this.modalService.dismissAll();
        this.loadAllTemplate();
        this.toastr.success('Your template saved successfully');
      });
  }

  addNew() {
    this.newTemplate = new TemplateModel();
    this.open(this.templateModal);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', scrollable: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  edit(template: TemplateModel) {
    this.newTemplate = template;
    this.open(this.templateModal);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  private loadAllTemplate() {
    this.templateService.getTemplates().subscribe((templates: TemplateModel[]) => {
      this.templates = templates;
      this.newTemplate = new TemplateModel();
      this.cdr.detectChanges();
    });
  }

  openDeletePopup(deleteModal: TemplateRef<any>, template: TemplateModel) {
    this.selectedTemplate = template;
    this.modalService.open(deleteModal, {ariaLabelledBy: 'modal-basic-title', scrollable: true}).result.then((result) => {
    }, (reason) => {
    });
  }

  deleteTemplate() {
    this.templateService.deleteTemplate(this.selectedTemplate).subscribe(() => {
      this.toastr.success('Template deleted successfully');
      this.modalService.dismissAll();
      this.loadAllTemplate();
    });
  }

  cancel() {
    this.modalService.dismissAll();
  }
}
