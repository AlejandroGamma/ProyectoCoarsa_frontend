import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../../services/login.service";

@Component({
  selector: 'app-perfile-normal-user',
  templateUrl: './perfile-normal-user.component.html',
  styleUrls: ['./perfile-normal-user.component.css']
})
export class PerfileNormalUserComponent implements OnInit {


  user: any = null;

  constructor(private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
  }
}
