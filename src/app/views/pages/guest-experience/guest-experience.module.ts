import {TooltipModule, TooltipOptions} from 'ng2-tooltip-directive';
import {NgModule} from '@angular/core';
import {CoreModule} from '../../../core/core.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgbModule, NgbRatingModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {GuestExperienceComponent} from './guest-experience.component';
import {FormsModule} from '@angular/forms';

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
        path: ':id',
        component: GuestExperienceComponent
      }
    ]),
    NgbTypeaheadModule,
    NgbModule,
    NgbRatingModule,
    TooltipModule.forRoot(MyDefaultTooltipOptions as TooltipOptions),
    FormsModule
  ],
  providers: [],
  declarations: [
    GuestExperienceComponent
  ]
})
export class GuestExperienceModule {

}
