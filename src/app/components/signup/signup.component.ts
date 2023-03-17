import {Component, OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import swal from 'sweetalert2'
import {FormBuilder, FormControl, Validators} from "@angular/forms";
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

  //validador del form
  userRegForm  = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required,Validators.minLength(6)]],
    firstName: ['', [Validators.required,Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.email, Validators.minLength(3)]],
    telefono: ['', [Validators.required, Validators.minLength(8)]]
  });


 constructor(private userService: UserService,private snack:MatSnackBar, private fb: FormBuilder ) {
 }
  ngOnInit(): void {

  }

  formSubmit() {
    console.log(this.userRegForm);

    if (!this.userRegForm.invalid){
      this.userService.añadiUsuario(this.userRegForm.value).subscribe(
        (data)=>{
          console.log(data);
          swal.fire('Usuario guardado', 'Usuario guardado con exito en el sistema', 'success' )
          this.userRegForm.reset();
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



}
