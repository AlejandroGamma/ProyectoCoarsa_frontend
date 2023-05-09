import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import swal from "sweetalert2";

@Component({
  selector: 'app-cambiar-password-normal',
  templateUrl: './cambiar-password-normal.component.html',
  styleUrls: ['./cambiar-password-normal.component.css']
})
export class CambiarPasswordNormalComponent implements OnInit {




  //username que se recibe desde el otro componente
  username!:string;


  public  changePassword = {
    username: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword : ''
  }

  //este objeto se utiliza para validad los datos introducidos en el form
  userFormGroup = new FormGroup({
    currentPassword : new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    newPassword : new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    confirmNewPassword : new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])

  })

  constructor(private userService:UserService, private router:Router,private route:ActivatedRoute, private _snackBar: MatSnackBar) {
  }



  ngOnInit(): void {
    this.username = this.route.snapshot.params['username'];
    console.log(this.username)


    }


  formSubmitPassword() {

    if (!this.userFormGroup.invalid){

      this.changePassword.username = this.username;
      console.log(this.changePassword)
      this.userService.cambiarPasswordUser(this.changePassword).subscribe(
        (data: any) => {
          swal.fire(
            '¡Contraseña Actualizada!',
            'La contraseña se ha actualizado con exito',
            'success'
          )
        }, error => {
          this._snackBar.open(error.error.message, 'Aceptar', {
            verticalPosition: 'top',
            horizontalPosition: 'right',
            //esta clase esta en styles.css
            panelClass: ['error-snackbar'],

          })
        }
      )
      console.log(this.username)

    }
  }
}
