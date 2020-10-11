import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CategorizationModel} from '../_models/categorization.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CategorySentimentModel} from '../_models/category-sentiment.model';

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
}
