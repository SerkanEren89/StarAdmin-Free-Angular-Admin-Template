import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DemoService {
  private showedDemoModal = false;

  setShowedDemoModal(showedDemoModal: boolean) {
    this.showedDemoModal = showedDemoModal;
  }

  alreadyShowedDemoModal() {
    return this.showedDemoModal;
  }
}
