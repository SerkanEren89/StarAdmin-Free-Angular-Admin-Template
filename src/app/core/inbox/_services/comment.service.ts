import {BehaviorSubject, Observable} from 'rxjs';
import {CommentModel} from '../_models/comment.model';
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CommentCountModel} from '../_models/comment-count.model';
import {map} from 'rxjs/operators';
import {CommentCountLanguageModel} from '../_models/comment-count-language.model';
import {CommentCountTraveledWithModel} from '../_models/comment-count-traveled-with.model';
import {UserModel} from '../../auth/_models/user.model';

const API_COMMENTS_URL = 'comments';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private commentsAfterLastLoginSubject: BehaviorSubject<CommentModel[]>;
  public commentsAfterLastLogin: Observable<CommentModel[]>;

  constructor(private http: HttpClient) {
    this.commentsAfterLastLoginSubject = new BehaviorSubject<CommentModel[]>(JSON.parse(localStorage.getItem('lastComments')));
    this.commentsAfterLastLogin = this.commentsAfterLastLoginSubject.asObservable();
  }
  public get commentsAfterLastLoginValue(): CommentModel[] {
    return this.commentsAfterLastLoginSubject.value;
  }
  getComments(page: number, pageSize: number): Observable<CommentModel[]> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('size', String(pageSize));
    return this.http.get<CommentModel[]>(API_COMMENTS_URL, {params: params});
  }
  getLatestComments(): Observable<CommentModel[]> {
    return this.http.get<CommentModel[]>(API_COMMENTS_URL + '/latest');
  }
  getLatestCommentsBySource(source: string): Observable<CommentModel[]> {
    let params = new HttpParams();
    params = params.append('source', source);
    return this.http.get<CommentModel[]>(API_COMMENTS_URL + '/latest', {params: params});
  }
  getCommentsAfterLastLogin(lastLogin) {
    return this.http.get<CommentModel[]>(API_COMMENTS_URL + '/last-login')
      .pipe(map(commentList => {
        this.commentsAfterLastLoginSubject.next(commentList);
        return commentList;
      }));
  }
  getCommentsByCount(): Observable<CommentCountModel[]> {
    return this.http.get<CommentCountModel[]>(API_COMMENTS_URL + '/count');
  }
  getCommentsByCountByLanguage(): Observable<CommentCountLanguageModel[]> {
    return this.http.get<CommentCountLanguageModel[]>(API_COMMENTS_URL + '/count-by-language');
  }
  getCommentsByCountByLanguageAndSource(source: string): Observable<CommentCountLanguageModel[]> {
    let params = new HttpParams();
    params = params.append('source', source);
    return this.http.get<CommentCountLanguageModel[]>(API_COMMENTS_URL + '/count-by-language', {params: params});
  }
  getCommentsByCountByTraveledWith(): Observable<CommentCountTraveledWithModel[]> {
    return this.http.get<CommentCountTraveledWithModel[]>(API_COMMENTS_URL + '/count-by-traveled-with');
  }
  getCommentsByCountByTraveledWithAndSource(source: string): Observable<CommentCountTraveledWithModel[]> {
    let params = new HttpParams();
    params = params.append('source', source);
    return this.http.get<CommentCountTraveledWithModel[]>(API_COMMENTS_URL + '/count-by-traveled-with', {params: params});
  }
  getTranslatedComment(id: number): Observable<CommentModel> {
    return this.http.get<CommentModel>(API_COMMENTS_URL + '/translate' + '/' + id);
  }
  updateComment(id: number, comment: CommentModel): Observable<CommentModel> {
    return this.http.put<CommentModel>(API_COMMENTS_URL + '/' + id, comment)
      .pipe(map(coverLetterModel => {
        return coverLetterModel;
      }));
  }
}
