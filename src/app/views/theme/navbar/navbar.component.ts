import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../../core/auth/_service/auth.service';
import {CompetitionService} from '../../../core/competition/_services/competition.service';
import {UserModel} from '../../../core/auth/_models/user.model';
import {CommentModel} from '../../../core/inbox/_models/comment.model';
import {CommentService} from '../../../core/inbox/_services/comment.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavbarComponent implements OnInit {

  currentUser: UserModel;
  commentsAfterLastLogin: CommentModel[];
  public sidebarOpened = false;
  isAdmin = false;
  isSeller = false;

  toggleOffcanvas() {
    this.sidebarOpened = !this.sidebarOpened;
    if (this.sidebarOpened) {
      document.querySelector('.sidebar-offcanvas').classList.add('active');
    } else {
      document.querySelector('.sidebar-offcanvas').classList.remove('active');
    }
  }

  constructor(private authService: AuthService,
              private commentService: CommentService,
              config: NgbDropdownConfig) {
    config.placement = 'bottom-right';
  }

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    this.isAdmin = this.authService.isAdmin();
    this.isSeller = this.authService.isSeller();
    this.commentsAfterLastLogin = this.commentService.commentsAfterLastLoginValue;
  }

  signOut() {
    this.authService.logout();
  }
}
