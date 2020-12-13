import {NgModule} from '@angular/core';
import {CoreModule} from '../../../core/core.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgbPaginationModule, NgbRatingModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {CategoryListComponent} from './list/category-list.component';
import {CategoryDetailComponent} from './detail/category-detail.component';
import {CategoryComponent} from './category-component';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CoreModule,
        CommonModule,
        RouterModule.forChild([
            {path: '', component: CategoryListComponent},
            {path: ':type', component: CategoryDetailComponent},
        ]),
        NgbTypeaheadModule,
        NgbPaginationModule,
        NgbRatingModule,
        FormsModule,
    ],
  providers: [],
  declarations: [
    CategoryComponent,
    CategoryListComponent,
    CategoryDetailComponent
  ]
})
export class CategoryModule {
}
