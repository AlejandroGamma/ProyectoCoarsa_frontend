import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import { Router } from '@angular/router';
import {LoginService} from "../../services/login.service";
import {SpinnerService} from "../../services/spinner.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

loginData = {
  "username" : '',
  "password" : ''
}

  hide = true;


constructor(private snack:MatSnackBar, private   loginService:LoginService,private router:Router, private spinerService:SpinnerService) {
}

  ngOnInit(): void {

  }


formSubmit(){

  if (this.loginData.username.trim() == '' || this.loginData.username.trim() == null){
    this.snack.open('El nombre de usuario es requerido', "Aceptar", {
      duration: 3000
    })
    return;
  }

  if (this.loginData.password.trim() == '' || this.loginData.password.trim() == null){
    this.snack.open('La contrrasenna es requerida', 'Aceptar', {
      duration: 3000
    })
  }
    this.loginService.generateToken(this.loginData).subscribe(
      (data:any) => {
        console.log(data);
        console.log(this.loginData);
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe((user:any) => {
          this.loginService.setUser(user);
          console.log(user);
          if(this.loginService.getUserRole() == "ADMIN"){
            //dashboard admin

            this.router.navigate(['/admin/inicio-admin'])
            this.loginService.loginStatusSubject.next(true);

          }
          else if (this.loginService.getUserRole() == 'USUARIO'){
            //user dashboard
            this.router.navigate(['/user-dashboard/inicio'])

            this.loginService.loginStatusSubject.next(true);

          } else{
            this.loginService.logout();
          }
        })
      },(error)=>{
        console.log(error);
        if (error.status === 401){
          this.snack.open('ERROR! El usuario no existe o está suspendido', 'Aceptar', {
            verticalPosition: 'top',
            horizontalPosition: 'right',
            duration: 3000,
            panelClass: ['error-snackbar'],
          })
        }else {
          this.snack.open(error.error.message, 'Aceptar', {
            verticalPosition: 'top',
            horizontalPosition: 'right',
            duration: 3000,
            panelClass: ['error-snackbar'],
          })
        }

      }
    )
}


}
