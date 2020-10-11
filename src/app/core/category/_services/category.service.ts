import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CategoryModel} from '../_models/category.model';
import {HttpClient} from '@angular/common/http';

const API_CATEGORY_URL = 'categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) {
  }
  getCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(API_CATEGORY_URL);
  }

}
