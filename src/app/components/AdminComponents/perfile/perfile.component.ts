import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../../services/login.service";

@Component({
  selector: 'app-perfile',
  templateUrl: './perfile.component.html',
  styleUrls: ['./perfile.component.css']
})
export class PerfileComponent implements OnInit{


  user!:any;
  constructor(private loginService:LoginService) {
  }

  ngOnInit(): void {

    this.user = this.loginService.getUser();
    console.log(this.user)
  }


}
