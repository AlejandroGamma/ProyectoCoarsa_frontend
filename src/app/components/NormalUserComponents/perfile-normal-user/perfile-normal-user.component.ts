import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../../services/login.service";
import {IUser} from "../../../IUser";
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-perfile-normal-user',
  templateUrl: './perfile-normal-user.component.html',
  styleUrls: ['./perfile-normal-user.component.css']
})
export class PerfileNormalUserComponent implements OnInit {


  user: any;



  constructor(private loginService: LoginService, private userService:UserService,private router:Router,private route:ActivatedRoute, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.userService.obtenerUsuarioUsername(this.loginService.getUser().username).subscribe((user:any)=>{
      this.user = user;

    })

  }


  cambiarPassword(username:string){
    console.log('aaa '+username);
    this.router.navigate(['/user-dashboard/cambiar-password', username]);
  }


}
