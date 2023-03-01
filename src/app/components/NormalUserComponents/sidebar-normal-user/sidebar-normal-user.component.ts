import { Component } from '@angular/core';
import {LoginService} from "../../../services/login.service";

@Component({
  selector: 'app-sidebar-normal-user',
  templateUrl: './sidebar-normal-user.component.html',
  styleUrls: ['./sidebar-normal-user.component.css']
})
export class SidebarNormalUserComponent {


  constructor(private  loginService:LoginService) {
  }

  logout() {

    this.loginService.logout();
  }
}
