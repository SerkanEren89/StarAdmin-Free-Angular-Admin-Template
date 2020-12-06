import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TemplateModel} from '../_models/template.model';
import {map} from 'rxjs/operators';

const API_TEMPLATE_URL = 'templates';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  constructor(private http: HttpClient) {
  }

  getTemplates(): Observable<TemplateModel[]> {
    return this.http.get<TemplateModel[]>(API_TEMPLATE_URL);
  }

  saveTemplates(template: TemplateModel): Observable<TemplateModel> {
    return this.http.post<TemplateModel>(API_TEMPLATE_URL, template)
      .pipe(map(result => {
        return result;
      }));
  }

  deleteTemplate(templateModel: TemplateModel): Observable<boolean> {
    return this.http.delete<boolean>(API_TEMPLATE_URL + '/' + templateModel.id);
  }
}
