import {NgModule} from '@angular/core';
import {CoreModule} from '../../../core/core.module';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {TemplateComponent} from './template.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    NgbModule,
    RouterModule.forChild([
      {
        path: '',
        component: TemplateComponent
      }
    ]),
    FormsModule
  ],
  providers: [],
  declarations: [
    TemplateComponent,
  ]
})
export class TemplateModule {

}
