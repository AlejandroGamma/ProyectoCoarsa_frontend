import { Component } from '@angular/core';
import {LoginService} from "../../../services/login.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private  loginService:LoginService) {
  }

  logout() {

    this.loginService.logout();
  }

}
