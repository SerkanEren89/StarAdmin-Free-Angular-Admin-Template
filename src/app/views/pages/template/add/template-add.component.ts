import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TemplateModel} from '../../../../core/template/_models/template.model';
import {TagModel} from '../../../../core/tag/_models/tag.model';
import {HotelTemplateModel} from '../../../../core/hotel-template/_models/hotel-template.model';
import {TemplateService} from '../../../../core/template/_services/template.service';
import {HotelTemplateService} from '../../../../core/hotel-template/_services/hotel-template.service';
import {ToastrService} from 'ngx-toastr';
import {TableService} from '../../../../core/general/_services/table.service';
import {TagService} from '../../../../core/tag/_services/tag.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

@Component({
  selector: 'app-template-add',
  templateUrl: './template-add.component.html',
  styleUrls: ['../../../../app.component.scss', './../template.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TemplateAddComponent implements OnInit {
  public responseEditor;
  templates: TemplateModel[] = [];
  newTemplate: TemplateModel;
  closeResult = '';
  selectedTemplate: TemplateModel;
  tags: TagModel[] = [];
  hotelTemplateModel: HotelTemplateModel = new HotelTemplateModel();
  template: any;


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
    this.newTemplate = new TemplateModel();
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
        this.router.navigateByUrl('/template');
        this.toastr.success('Your template saved successfully');
      });
  }

  onInsertResponseTemplateText(textTOInsert: string) {
    if (textTOInsert) {
      const selection = this.responseEditor.getSelection(true);
      this.responseEditor.insertText(selection.index, textTOInsert);
      this.cdr.detectChanges();
    }
  }

  onResponseEditorCreated(event) {
    this.responseEditor = event;
  }

  responseContentChange($event) {
    this.newTemplate.content = $event.text;
  }
}
