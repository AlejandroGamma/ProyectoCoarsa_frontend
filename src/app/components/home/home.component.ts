import { Component } from '@angular/core';
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  constructor( private loginService:LoginService, private router:Router) {

  }

  onClickInicioButton(){
    if (this.loginService.getUserRole()==='ADMIN'){
      this.router.navigate(['/admin/inicio-admin'])
    } else {
      this.router.navigate(['/user-dashboard/inicio'])
    }

  }

}
