import {ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {TemplateModel} from '../../../core/template/_models/template.model';
import {TemplateService} from '../../../core/template/_services/template.service';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TagModel} from '../../../core/tag/_models/tag.model';
import {HotelTemplateModel} from '../../../core/hotel-template/_models/hotel-template.model';
import {TagService} from '../../../core/tag/_services/tag.service';
import {HotelTemplateService} from '../../../core/hotel-template/_services/hotel-template.service';
import {TableService} from '../../../core/general/_services/table.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['../../../app.component.scss', './template.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TemplateComponent implements OnInit {
  public editor;
  public templateEditor;
  public responseEditor;
  @ViewChild('templateModal') public templateModal: TemplateRef<any>;
  templates: TemplateModel[] = [];
  closeResult = '';
  selectedTemplate: TemplateModel;
  tags: TagModel[] = [];
  hotelTemplateModel: HotelTemplateModel = new HotelTemplateModel();
  template: any;
  templateTypes = [{
    title: 'Welcome Message',
    value: 'WELCOME_MESSAGE'
  }, {
    title: 'Leaving Message',
    value: 'LEAVING_MESSAGE'
  }];
  selectedType: { title: string; value: string };
  selectedResponseTemplate: TemplateModel;


  constructor(private router: Router,
              private templateService: TemplateService,
              private hotelTemplateService: HotelTemplateService,
              private toastr: ToastrService,
              private tableService: TableService,
              private tagService: TagService,
              private modalService: NgbModal,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.loadAllTemplate();
    this.selectedType = this.templateTypes[0];
    this.selectStatus(this.selectedType);
    this.tagService.getTags()
      .subscribe((tags: TagModel[]) => {
        this.tags = tags;
        this.cdr.detectChanges();
      });
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
    this.router.navigateByUrl('/template/add');
  }

  private loadAllTemplate() {
    this.templateService.getTemplates().subscribe((templates: TemplateModel[]) => {
      this.templates = templates;
      if (templates.length > 0) {
        this.selectedResponseTemplate = templates[0];
      }
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

  onEditorCreated(event) {
    this.editor = event;
  }

  onInsertText(textTOInsert: string) {
    if (textTOInsert) {
      const selection = this.editor.getSelection(true);
      this.editor.insertText(selection.index, textTOInsert);
      this.cdr.detectChanges();
    }
  }

  onInsertTemplateText(textTOInsert: string) {
    if (textTOInsert) {
      const selection = this.templateEditor.getSelection(true);
      this.templateEditor.insertText(selection.index, textTOInsert);
      this.cdr.detectChanges();
    }
  }

  onInsertResponseTemplateText(textTOInsert: string) {
    if (textTOInsert) {
      const selection = this.responseEditor.getSelection(true);
      this.responseEditor.insertText(selection.index, textTOInsert);
      this.cdr.detectChanges();
    }
  }

  saveTemplate() {
    this.hotelTemplateModel.templateType = this.selectedType.value;

    if (this.hotelTemplateModel.id == null) {
      this.hotelTemplateService.saveHotelVisit(this.hotelTemplateModel)
        .subscribe((hotelTemplateModel: HotelTemplateModel) => {
          this.hotelTemplateModel = hotelTemplateModel;
          this.cdr.detectChanges();
        });
    } else {
      this.hotelTemplateService.updateHotelVisit(this.hotelTemplateModel.id, this.hotelTemplateModel)
        .subscribe((hotelTemplateModel: HotelTemplateModel) => {
          this.hotelTemplateModel = hotelTemplateModel;
          this.cdr.detectChanges();
        });
    }
  }

  selectStatus(templateType: { title: string; value: string }) {
    this.hotelTemplateModel = new HotelTemplateModel();
    this.selectedType = templateType;
    this.hotelTemplateModel.templateType = this.selectedType.value;
    this.hotelTemplateService.getHotelTemplate(templateType.value)
      .subscribe((hotelTemplateModel: HotelTemplateModel) => {
        this.hotelTemplateModel = hotelTemplateModel;
        this.cdr.detectChanges();
      });
  }

  contentChange($event) {
    this.hotelTemplateModel.content = $event.html;
  }

  onTemplateEditorCreated(event) {
    this.templateEditor = event;
  }

  templateContentChange($event) {
    this.template.content = $event.html;
  }

  selectResponseTemplate(template: TemplateModel) {
    this.selectedResponseTemplate = template;
  }

  onResponseEditorCreated(event) {
    this.responseEditor = event;
  }

  responseContentChange($event) {
    this.selectedResponseTemplate.content = $event.text;
  }

  open(content) {
    this.modalService.open(content, {size: 'xl', ariaLabelledBy: 'modal-basic-title', scrollable: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  cancel() {
    this.modalService.dismissAll();
  }
}
