import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-category-icon',
  templateUrl: './category-icon.component.html',
  styleUrls: ['./category-icon.component.scss']
})
export class CategoryIconComponent {
  @Input() category;

  @Input()
  public set fontSize(fontSize: number) {
    document.documentElement.style.setProperty('--fontSize', fontSize + 'px');
  }

  @Input()
  public set maxWidth(maxWidth: number) {
    document.documentElement.style.setProperty('--maxWidth', maxWidth + 'px');
  }
}
