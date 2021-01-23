import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TagModel} from '../_models/tag.model';

const API_TAG_URL = 'tags';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  constructor(private http: HttpClient) {
  }

  getTags(): Observable<TagModel[]> {
    return this.http.get<TagModel[]>(API_TAG_URL);
  }
}
