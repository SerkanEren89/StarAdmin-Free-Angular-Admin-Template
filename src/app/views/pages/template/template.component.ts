import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
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
  templates$: Observable<TemplateModel[]>;
  templates: TemplateModel[] = [];
  newTemplate: TemplateModel;
  selectedItem: TemplateModel;
  closeResult = '';


  constructor(private templateService: TemplateService,
              private toastr: ToastrService,
              private modalService: NgbModal,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.templates$ = this.templateService.getTemplates();
    this.templates$.subscribe((templates: TemplateModel[]) => {
      this.templates = templates;
      if (templates.length > 0) {
        this.selectedItem = templates[0];
      } else {
        this.selectedItem = new TemplateModel();
      }
      this.newTemplate = new TemplateModel();
      this.cdr.detectChanges();
    });
  }

  selectTemplate(template: TemplateModel) {
    this.selectedItem = template;
  }

  save(template: TemplateModel) {
    this.templateService.saveTemplates(template)
      .subscribe((templateModel: TemplateModel) => {
        this.selectedItem = templateModel;
        this.modalService.dismissAll();
        this.toastr.success('Your template saved successfully');
      });
  }

  addNew() {
    this.selectedItem = new TemplateModel();
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', scrollable: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
}
