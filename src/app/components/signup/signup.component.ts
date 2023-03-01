import {Component, OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import swal from 'sweetalert2'
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent implements  OnInit{

  public user = {
    username : '',
    password : '',
    confirmPassword: '',
    firstName : '',
    lastName : '',
    email : '',
    telefono : ''
  }
  userReg  = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(2)]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    telefono: ['', Validators.required]
  });


 constructor(private userService: UserService,private snack:MatSnackBar, private fb: FormBuilder ) {
 }
  ngOnInit(): void {
/*    this.userReg = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required]
    });*/
  }

  formSubmit() {
    console.log(this.userReg);
/*    if (this.userReg.username == '' || this.user.username == null) {
      this.snack.open('El nombre de usuario es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }*/
    this.userService.añadiUsuario(this.userReg.value).subscribe(
      (data)=>{
        console.log(data);
        swal.fire('Usuario guardado', 'Usuario guardado con exito en el sistema', 'success' )
        this.userReg.reset();
      },(error)=>{
        console.log(error);
        this.snack.open(error.error.message, 'Aceptar', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        })
      }
    )
  }

}
