import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-uplift',
  templateUrl: './uplift.component.html',
  styleUrls: ['../../../app.component.scss', './uplift.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UpliftComponent {

  constructor(private router: Router) {
  }

  goToWidgetSettings() {
    this.router.navigateByUrl('uplifts/widget-settings');
  }

  goToReviewAlarmSettings() {
    this.router.navigateByUrl('uplifts/review-alarm-settings');
  }
}
