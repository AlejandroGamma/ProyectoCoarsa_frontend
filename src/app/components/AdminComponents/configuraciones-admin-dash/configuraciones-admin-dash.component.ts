import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ConfiguracionService} from "../../../services/configuracion.service";
import Swal from "sweetalert2";
@Component({
  selector: 'app-configuraciones-admin-dash',
  templateUrl: './configuraciones-admin-dash.component.html',
  styleUrls: ['./configuraciones-admin-dash.component.css']
})
export class ConfiguracionesAdminDashComponent implements  OnInit{
  email = new FormControl('', [Validators.required, Validators.email]);
  panelOpenState = false;

    correo = {
    "correoElectronico" : '',
    "tipoDeCorreo": ''
  }


  dataSource = [];
  //atributos para las tablas, paginator y sort
  displayedColumns1: string[] = ['Correo','Acciones'];
  tableDataSource1 = new MatTableDataSource();


  constructor(private configuracionService:ConfiguracionService ) {
  }

  ngOnInit(): void {
    this.obtenerTodosLosCorreos();

    }

  obtenerTodosLosCorreos(){
    this.configuracionService.obtenerTodosLosCorreos().subscribe(
      (data:any)=>{

        this.tableDataSource1 = data;
        this.dataSource = data;
        console.log( this.dataSource);
      }

    )
  }
  clickAgregarEmail(){

    if (this.email.status === "VALID"){

      this.correo.tipoDeCorreo = "administrador";
      console.log(this.correo);
      this.configuracionService.añadiCorreo(this.correo).subscribe(
        (data:any)=>{
          this.obtenerTodosLosCorreos();
            Swal.fire(
              'Guaraddo!',
              'El correo ha sido guardado.',
              'success'
            )

          console.log(this.correo.correoElectronico);
        }

      )

    }


  }

  clickEliminarEmail(correo:any) {
      console.log(correo);
    Swal.fire({
      title: '¿Está seguro de eliminar  el correo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
      this.configuracionService.eliminarCorreo(correo).subscribe(
        (data:any) =>{
          this.obtenerTodosLosCorreos();
          Swal.fire(
            'Elimiado!',
            'El correo ha sido eliminado.',
            'success'
          )
        }

      )

      }
    })


  }



    getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debe de colocar un correo';
    } else if (this.email.hasError('email')){
      return this.email.hasError('email') ? 'No es un correo valido' : '';
    }
      return 'Debe de colocar un correo';

  }

}
