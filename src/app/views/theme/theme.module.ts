import {NgModule} from '@angular/core';
import {CoreModule} from '../../core/core.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {FooterComponent} from './footer/footer.component';
import {BaseComponent} from './base/base.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    RouterModule,
    NgbModule,
  ],
  providers: [],
  declarations: [
    BaseComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
  ],
  exports: [
    BaseComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
  ]
})
export class ThemeModule {
}
