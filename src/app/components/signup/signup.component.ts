import {Component, OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import swal from 'sweetalert2'
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {IUser} from "../../IUser";
import {Role} from "../../role";
import {Router} from "@angular/router";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent implements  OnInit {

  private user: IUser = {
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    email: '',
    telefono: '',
    role: { id: 0, name: 'USUARIO'} ,
    username: '',
    estado: true
  }

  role = {id: 17, name: 'USUARIO'};



  //validador del form
  userRegForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15),Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]],
    lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15),Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]],
    email: ['', [Validators.required, Validators.email, Validators.minLength(3)]],
    telefono: ['', [Validators.required, Validators.minLength(8)]],

    usuarioRoles: []

  });


 constructor(private userService: UserService,private snack:MatSnackBar, private fb: FormBuilder, private router:Router) {
 }
  ngOnInit(): void {

  }

  formSubmit() {
    console.log(this.userRegForm);

    if (!this.userRegForm.invalid) {

      this.user.firstName = this.userRegForm.value.firstName!;
      this.user.username = this.userRegForm.value.username!;
            this.user.lastName = this.userRegForm.value.lastName!;
            this.user.email = this.userRegForm.value.email!;
            this.user.password = this.userRegForm.value.password!;
            this.user.confirmPassword = this.userRegForm.value.confirmPassword!;
            this.user.telefono = this.userRegForm.value.telefono!;
             //this.user.role = this.role;
      console.log(this.user);
      this.userService.añadiUsuario(this.user).subscribe(
        (data) => {
          console.log(data);
          swal.fire('Usuario guardado', 'Usuario guardado con exito en el sistema', 'success')
          this.userRegForm.reset();
          this.router.navigate(['/login'])
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



