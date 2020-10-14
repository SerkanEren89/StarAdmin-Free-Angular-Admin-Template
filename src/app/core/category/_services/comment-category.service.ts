import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CategorizationModel} from '../_models/categorization.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CategorySentimentModel} from '../_models/category-sentiment.model';
import {CategoryGroupModel} from '../_models/category-group.model';
import {CommentModel} from '../../inbox/_models/comment.model';
import {CommentCategoryModel} from '../_models/comment-category.model';

const API_COMMENT_CATEGORY_URL = 'comment-categories';

@Injectable({
  providedIn: 'root'
})
export class CommentCategoryService {
  constructor(private http: HttpClient) {
  }

  saveCategorization(categorization: CategorizationModel): Observable<CategorizationModel> {
    return this.http.post<CategorizationModel>(API_COMMENT_CATEGORY_URL, categorization)
      .pipe(map(coverLetterModel => {
        return coverLetterModel;
      }));
  }

  getCategories(commentId: number): Observable<CategorySentimentModel[]> {
    return this.http.get<CategorySentimentModel[]>(API_COMMENT_CATEGORY_URL + '/' + commentId + '/comment');
  }

  getCategorySentimentCount(): Observable<CategoryGroupModel[]> {
    return this.http.get<CategoryGroupModel[]>(API_COMMENT_CATEGORY_URL + '/category-sentiment-count');
  }
  getCategorySentimentCountByCategoryName(category): Observable<CategoryGroupModel> {
    return this.http.get<CategoryGroupModel>(API_COMMENT_CATEGORY_URL + '/category-sentiment-count' + '/' + category + '/category');
  }
  getCommentCategoriesByCategoryName(categoryName: string, page: number, pageSize: number): Observable<CommentCategoryModel[]> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('size', String(pageSize));
    return this.http.get<CommentCategoryModel[]>(API_COMMENT_CATEGORY_URL + '/' + categoryName + '/category', {params: params});
  }
}
