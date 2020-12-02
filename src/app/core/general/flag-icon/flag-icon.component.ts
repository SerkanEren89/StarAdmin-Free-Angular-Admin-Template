import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-flag-icon',
  templateUrl: './flag-icon.component.html'
})
export class FlagIconComponent {
  @Input() language;
}
