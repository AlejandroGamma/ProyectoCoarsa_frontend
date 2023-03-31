import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import swal from "sweetalert2";

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent {


  username = ''

  constructor(private fb: FormBuilder) {
  }

  usernameForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9) ,Validators.pattern('[0-9]*')]],


  });

  formSubmit(){
    if (!this.usernameForm.invalid) {

     this.username = this.usernameForm.value.username!;
      console.log(this.username)
      swal.fire('Recuperación de contraseña', 'Esto sigue en desarrollo :)', 'success')
      this.usernameForm.reset();
    }
  }
}
