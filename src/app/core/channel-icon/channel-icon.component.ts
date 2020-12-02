import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-channel-icon',
  templateUrl: './channel-icon.component.html',
  styleUrls: ['./channel-icon.component.scss']
})
export class ChannelIconComponent {
  @Input() source;
}
