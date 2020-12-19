import {NgModule} from '@angular/core';
import {CoreModule} from '../../../core/core.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {CrmComponent} from './crm.component';
import {CrmVisitComponent} from './visit/crm-visit.component';
import {CrmHotelComponent} from './hotel/crm-hotel.component';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    RouterModule.forChild([
      {path: '', component: CrmHotelComponent},
      {path: 'visit', component: CrmVisitComponent},
    ]),
    NgbPaginationModule,
    FormsModule,
  ],
  providers: [],
  declarations: [
    CrmComponent,
    CrmHotelComponent,
    CrmVisitComponent
  ]
})
export class CrmModule {
}
