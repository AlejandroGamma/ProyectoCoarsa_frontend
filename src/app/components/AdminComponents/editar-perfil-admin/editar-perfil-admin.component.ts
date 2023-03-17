import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import swal from "sweetalert2";
import { MatSnackBar } from '@angular/material/snack-bar';
import {FormControl, FormGroup, isFormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-editar-perfil-admin',
  templateUrl: './editar-perfil-admin.component.html',
  styleUrls: ['./editar-perfil-admin.component.css']
})
export class EditarPerfilAdminComponent implements OnInit{


  public user = {
  //  id: '',
    username : '',
    //password : '',
    firstName : '',
    lastName : '',
    email : '',
    telefono : ''
   // authorities: [

  //  ]

  }

  //este otro objeto solamente envia estos atrributos y no devuelve un user con authorities y otros atributos que cuesta
  //serializar
  public userEnviar = {
    //  id: '',
    username : '',
    //password : '',
    firstName : '',
    lastName : '',
    email : '',
    telefono : ''
    // authorities: [

    //  ]

  }

  public  ChangePassword = {
    id: '',
    newPassword: '',
    confirmPassword : ''
  }
  id!:number;

  newPassword = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]);
    userFormGroup = new FormGroup({

      email : new FormControl('', [Validators.required, Validators.email]),
      firstName : new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      lastName : new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      username : new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)])
  })


  constructor(private userService:UserService, private router:Router,private route:ActivatedRoute, private _snackBar: MatSnackBar) {
  }

  ngOnInit(){
    this.id = this.route.snapshot.params['id'];
    this.userService.obtenerUsuario(this.id).subscribe(
      (data:any)=>{
        this.user = data;
        console.log(this.user)
    }, error => console.log(error)
    );
  }


  formSubmit(){
    if (this.userFormGroup.invalid) {
      this._snackBar.open('Problema con los datos introducidos.', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    } else{
      this.userEnviar.username = this.user.username;
      this.userEnviar.firstName = this.user.firstName;
      this.userEnviar.lastName = this.user.lastName;
      this.userEnviar.email = this.user.email;

      this.userService.actulizarUsuario(this.userEnviar).subscribe(

        (data:any) => {
          swal.fire(
            'Empleado Actualizado',
            'El empleado ha sido actualizado con exito',
            'success'
          )
          this.router.navigate(["/admin/usuarios"]);


        },error => console.log(error));
    }

  }

  formSubmitPassword() {

    if (this.userFormGroup.errors) {
      this._snackBar.open('Problema con los datos introducidos.', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    } else{

      this.ChangePassword.id = this.id.toString();
      console.log("xx" + this.ChangePassword.id)
      this.userService.cambiarPasswordAdmin(this.ChangePassword).subscribe(
        (data: any) => {
          swal.fire(
            'Empleado Actualizado',
            'La clave se ha actualizado con exito',
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
    }
  }





  getErrorMessagePasswordForm() {

    if (this.newPassword.hasError('required')) {
      return 'Debe de colocar una clave';
    } else if (this.newPassword.hasError('minlength')){
      return 'La clave debe de contener como minimo 6 caracteres';
    } else if(this.newPassword.hasError('maxlength')){
      return 'La clave debe de contener como maximo 20 caracteres' ;
    }

    return 'Problema con los datos introducidos';

  }
}
