import {TooltipModule, TooltipOptions} from 'ng2-tooltip-directive';
import {NgModule} from '@angular/core';
import {CoreModule} from '../../../core/core.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgbModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {HotelTemplateComponent} from './hotel-template.component';
import {FormsModule} from '@angular/forms';
import {QuillModule} from 'ngx-quill';

export const MyDefaultTooltipOptions: TooltipOptions = {
  'show-delay': 200,
  'placement': 'top'
};

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HotelTemplateComponent
      }
    ]),
    NgbTypeaheadModule,
    NgbModule,
    TooltipModule.forRoot(MyDefaultTooltipOptions as TooltipOptions),
    QuillModule.forRoot({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline'],
          [{'list': 'ordered'}, {'list': 'bullet'}],
          [{'indent': '-1'}, {'indent': '+1'}],
          [{ 'size': ['small', false, 'large', 'huge'] }],
        ]
      }
    }),
    FormsModule
  ],
  providers: [],
  declarations: [
    HotelTemplateComponent
  ]
})
export class HotelTemplateModule {

}
