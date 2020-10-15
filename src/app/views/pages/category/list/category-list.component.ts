import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {CategoryGroupModel} from '../../../../core/category/_models/category-group.model';
import {CommentCategoryService} from '../../../../core/category/_services/comment-category.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['../../../../app.component.scss', './category-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryListComponent implements OnInit {
  categoryGroupList$: Observable<CategoryGroupModel[]>;
  categoryGroupList: CategoryGroupModel[];

  constructor(private commentCategoryService: CommentCategoryService,
              private router: Router,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.categoryGroupList$ = this.commentCategoryService.getCategorySentimentCount();
    this.categoryGroupList$.subscribe((categoryGroupList: CategoryGroupModel[]) => {
      this.categoryGroupList = categoryGroupList;
      this.cdr.detectChanges();
    });
  }
  goToCategoryDetail(type: string) {
    this.router.navigateByUrl('category/' + type);
  }
}
