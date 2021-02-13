import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CoreModule} from '../../../core/core.module';
import {CommonModule} from '@angular/common';
import {PopularityComponent} from './popularity.component';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PopularityComponent
      }
    ])
  ],
  providers: [],
  declarations: [
    PopularityComponent
  ]
})
export class PopularityModule {

}
