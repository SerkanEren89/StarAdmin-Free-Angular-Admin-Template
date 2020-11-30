import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {TemplateModel} from '../../../core/template/_models/template.model';
import {TemplateService} from '../../../core/template/_services/template.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['../../../app.component.scss', './template.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TemplateComponent implements OnInit {
  templates$: Observable<TemplateModel[]>;
  templates: TemplateModel[] = [];
  selectedItem: TemplateModel;


  constructor(private templateService: TemplateService,
              private toastr: ToastrService,
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
      this.cdr.detectChanges();
    });
  }

  selectTemplate(template: TemplateModel) {
    this.selectedItem = template;
  }

  save(template: TemplateModel) {
    this.templateService.saveTemplates(template)
      .subscribe((templateModel: TemplateModel) => {
        this.toastr.success('Your template saved successfully');
      });
  }

  addNew() {
    this.selectedItem = new TemplateModel();
  }
}
