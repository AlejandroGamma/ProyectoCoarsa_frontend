import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import swal from "sweetalert2";
import {UserService} from "../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent {


  private recuperarPassword = {
    username : ''
  }


  constructor(private fb: FormBuilder, private userServe: UserService, private snack:MatSnackBar) {
  }

  usernameForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9) ,Validators.pattern('[0-9]*')]],


  });

  formSubmit(){
    if (!this.usernameForm.invalid) {
      this.recuperarPassword.username = this.usernameForm.value.username!;
      console.log(this.recuperarPassword.username)
      this.userServe.recuperarPassword(this.recuperarPassword).subscribe(
        () =>{
          swal.fire('Recuperación de contraseña', 'La nueva contraseña se ha enviado al correo.', 'success')
          console.log(this.recuperarPassword.username)
          this.usernameForm.reset();
        }, (error) => {
          console.log(error);
          this.snack.open(error.error.message, 'Aceptar', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          })
        }
      )





    }
  }
}
