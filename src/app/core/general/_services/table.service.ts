import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  addLabelTag(elref) {
    if (elref != null) {
      const tableEl = elref.nativeElement;
      const thEls = tableEl.querySelectorAll('thead th');
      const tdLabels = Array.from(thEls).map((el: any) => el.innerText);
      tableEl.querySelectorAll('tbody tr').forEach(tr => {
        Array.from(tr.children).forEach(
          (td: any, ndx) => td.setAttribute('label', tdLabels[ndx])
        );
      });
    }
  }
}
