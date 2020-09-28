import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../../core/auth/_service/auth.service';
import {CompetitionService} from '../../../core/competition/_services/competition.service';
import {UserModel} from '../../../core/auth/_models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavbarComponent implements OnInit {

  currentUser: UserModel;
  public sidebarOpened = false;

  toggleOffcanvas() {
    this.sidebarOpened = !this.sidebarOpened;
    if (this.sidebarOpened) {
      document.querySelector('.sidebar-offcanvas').classList.add('active');
    } else {
      document.querySelector('.sidebar-offcanvas').classList.remove('active');
    }
  }

  constructor(private authService: AuthService,
              config: NgbDropdownConfig) {
    config.placement = 'bottom-right';
  }

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
  }

  signOut() {
    this.authService.logout();
  }
}
