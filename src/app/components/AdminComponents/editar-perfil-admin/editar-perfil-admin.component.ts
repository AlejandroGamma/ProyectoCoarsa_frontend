import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import swal from "sweetalert2";
import { MatSnackBar } from '@angular/material/snack-bar';
import {FormControl, FormGroup, isFormControl, Validators} from "@angular/forms";
import {Role} from "../../../role";
import {IUser} from "../../../IUser";

@Component({
  selector: 'app-editar-perfil-admin',
  templateUrl: './editar-perfil-admin.component.html',
  styleUrls: ['./editar-perfil-admin.component.css']
})
export class EditarPerfilAdminComponent implements OnInit{


  public user: IUser = {
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    email: '',
    telefono: '',
    role: {id: 0, name:''},
    estado: true
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
    telefono : '',
    role : {id:0, name:''}

  }

  public  ChangePassword = {
    id: '',
    newPassword: '',
    confirmPassword : ''
  }
  id!:number;

  test!:string;
  //este atributo es para el form field desplegable, se instancia en ngonit con role actual del usuario
  selected: string = '';

  //solamente roles que vienen desde el backend, instanciado en ngonit
  roles! : Role [];

  newPassword = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]);
    userFormGroup = new FormGroup({

      email : new FormControl('', [Validators.required, Validators.email]),
      firstName : new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      lastName : new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      username : new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      selected : new FormControl('', [Validators.required])

  })


  constructor(private userService:UserService, private router:Router,private route:ActivatedRoute, private _snackBar: MatSnackBar) {
  }

  ngOnInit(){
    this.id = this.route.snapshot.params['id'];
    this.userService.obtenerUsuario(this.id).subscribe(
      (data:any)=>{
        this.user = data;
        console.log("daatos" + this.user.role)
         this.selected= this.user.role.name;
        //this.user.authorities = data

        //console.log(data.authorities[0].authority)
       // console.log(this.user.authorities[0])
    }, error => console.log(error)
    );

    this.userService.obtenerRoles().subscribe(
      (data:any) =>{
        this.roles = data;
        //console.log( data);
       // console.log( this.roles[0].name)
      }
    )
  }

  changeClient(value:any) {

      this.user.role.name = value;
    this.test = value;
    console.log(this.test );
  }

  formSubmit(){
    console.log(this.userFormGroup);
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
      this.userEnviar.role.name = this.user.role.name;
      console.log(  this.user );
      console.log(  this.userEnviar );
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
