import {NgModule} from '@angular/core';
import {CoreModule} from '../../../core/core.module';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {TemplateComponent} from './template.component';
import {FormsModule} from '@angular/forms';
import {QuillModule} from 'ngx-quill';
import {TemplateAddComponent} from './add/template-add.component';


@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    NgbModule,
    RouterModule.forChild([
      {
        path: '',
        component: TemplateComponent
      },
      {
        path: 'add',
        component: TemplateAddComponent
      }
    ]),
    FormsModule,
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
  ],
  providers: [],
  declarations: [
    TemplateComponent,
    TemplateAddComponent
  ]
})
export class TemplateModule {

}
