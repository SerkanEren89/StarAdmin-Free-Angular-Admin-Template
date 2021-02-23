import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../core/auth/_service/auth.service';
import {UserModel} from '../../../core/auth/_models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  currentUser: UserModel;
  isAdmin = false;
  isSeller = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    this.isAdmin = this.authService.isAdmin();
    this.isSeller = this.authService.isSeller();
  }

}
