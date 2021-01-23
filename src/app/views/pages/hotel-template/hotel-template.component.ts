import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TagService} from '../../../core/tag/_services/tag.service';
import {TagModel} from '../../../core/tag/_models/tag.model';
import {HotelTemplateModel} from '../../../core/hotel-template/_models/hotel-template.model';
import {HotelTemplateService} from '../../../core/hotel-template/_services/hotel-template.service';

@Component({
  selector: 'app-hotel-template',
  templateUrl: './hotel-template.component.html',
  styleUrls: ['../../../app.component.scss', './hotel-template.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HotelTemplateComponent implements OnInit {
  public editor;
  tags: TagModel[];
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

  constructor(private hotelTemplateService: HotelTemplateService,
              private tagService: TagService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.selectedType = this.templateTypes[0];
    this.selectStatus(this.selectedType);
    this.tagService.getTags()
      .subscribe((tags: TagModel[]) => {
        this.tags = tags;
        this.cdr.detectChanges();
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
}
