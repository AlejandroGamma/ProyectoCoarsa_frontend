import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import Swal from "sweetalert2";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";

@Component({
  selector: 'app-usuarios-admin-dash',
  templateUrl: './usuarios-admin-dash.component.html',
  styleUrls: ['./usuarios-admin-dash.component.css']
})
export class UsuariosAdminDashComponent implements OnInit{

  usuarios:any = [];
  displayedColumns: string[] = ['Id','Username', 'Nombre', 'Apellido', 'Estado', 'Acciones'];
  tableDataSource1 = new MatTableDataSource();
  constructor(private userService:UserService, private  router:Router) {
  }

  ngOnInit(){
    this.obtenerTodosLosUsuarios();
  }

  actualizarUsuario(id:number){
    console.log(id);
    this.router.navigate(['/admin/editar-perfil-admin', id]);
  }

  obtenerTodosLosUsuarios(){
    this.userService.obtenerTodosLosUsuarios().subscribe(
      (data:any) =>{
        this.tableDataSource1.data = data;
        console.log(data);
      }
    )
  }

  onClickActivarUsuario(nombreUsuario:any){
    Swal.fire({
      title: '¿Está seguro de habilitar  el usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Activar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.activarUsuario(nombreUsuario).subscribe(
          (data:any)=>{
            this.obtenerTodosLosUsuarios();
            Swal.fire(
              'Habilitado!',
              'El usuario ha sido habilitado.',
              'success'
            )
          }

        )


      }
    })

    console.log(nombreUsuario);

  }

  onClickDesactivarUsuario(nombreUsuario:any){
    Swal.fire({
      title: '¿Está seguro de deshabilitar  el usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Deshabilitar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.desactivarUsuario(nombreUsuario).subscribe(
          (data:any)=>{
            this.obtenerTodosLosUsuarios();
            Swal.fire(
              'Deshabilitado!',
              'El usuario ha sido deshabilitado.',
              'success'
            )
          }
        )

      }
    })
    console.log(nombreUsuario);

  }

  onClickEliminarUsuario(userId:any){
    Swal.fire({
      title: '¿Está seguro de eliminar  al usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.eliminarUsuario(userId).subscribe(
          (data:any)=>{
            this.obtenerTodosLosUsuarios();
            Swal.fire(
              'Eliminado!',
              'El usuario ha sido eliminado.',
              'success'
            )
          }
        )

      }
    })



  }


}
