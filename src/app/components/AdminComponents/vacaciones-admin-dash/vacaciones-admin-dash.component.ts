import {Component, OnInit, SimpleChange, ViewChild} from '@angular/core';
import {VacacionesService} from "../../../services/vacaciones.service";
import Swal from "sweetalert2";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from "@angular/material/sort";
import {UserService} from "../../../services/user.service";
import {LoginService} from "../../../services/login.service";

@Component({
  selector: 'app-vacaciones-admin-dash',
  templateUrl: './vacaciones-admin-dash.component.html',
  styleUrls: ['./vacaciones-admin-dash.component.css']
})
export class VacacionesAdminDashComponent implements  OnInit{
  //solicitudesVacaciones:any  = []

  //atributos para las tablas, paginator y sort
  displayedColumns1: string[] = ['Id','Solicitante', 'FechaCreacion', 'Estado', 'Solicitud', 'Acciones'];
  tableDataSource1 = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator1!: MatPaginator
  @ViewChild(MatSort) matSort1! : MatSort;

  @ViewChild('paginatorEnEspera') paginatorEnEspera!: MatPaginator;
  @ViewChild('paginatorHistorial') paginatorHistorial!: MatPaginator;

  displayedColumns2: string[] = ['Id','Solicitante', 'FechaCreacion', 'Estado', 'Solicitud', 'Acciones'];
  tableDataSource2 = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator2!: MatPaginator
  @ViewChild(MatSort) matSort2! : MatSort;

  constructor(private vacacionesService:VacacionesService, private login:LoginService) {
  }



  ngOnInit(): void {

    this.obtenerLasSolicitudesDeVacacionEspera();
    this.obtenerTodasLasSolicitudesDeVacaciones();
  }


  obtenerLasSolicitudesDeVacacionEspera(){
    this.vacacionesService.obtenerTodasLasSolicitudesDeVacacionEspera().subscribe(
      (data:any) =>{
        this.tableDataSource1.data = data;
        this.tableDataSource1.paginator = this.paginatorEnEspera;
        this.tableDataSource1.sort = this.matSort1;

        console.log(this.tableDataSource1.data);
      },
      (error)=>{


      }
    );
  }


  obtenerTodasLasSolicitudesDeVacaciones(){
    this.vacacionesService.obtenerTodasLasSolicitudes().subscribe(
      (data:any) =>{
        this.tableDataSource2.data = data;
        this.tableDataSource2.paginator = this.paginatorHistorial;
        this.tableDataSource2.sort = this.matSort2;
        console.log(this.tableDataSource2.data);
      }
    )
  }
  //filtrro para la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource2.filter = filterValue.trim().toLowerCase();

    if (this.tableDataSource2.paginator) {
      this.tableDataSource2.paginator.firstPage();
    }
  }

  onClickVerSolicitud(vacacion:any){


    Swal.fire({
      title: 'Solicitud de Vacaciones',
      html: `<table id="table" border=1>
        <thead>
            <tr>

                <th>Cant de dias</th>
                <th>Fecha de inico</th>
                <th>fecha de Regreso</th>

            </tr>
        </thead>
        <tbody>
            <tr>

                <td>${vacacion.numDias}</td>
                <td>${vacacion.fechaInicio}</td>
                <td>${vacacion.fechaFinal}</td>
            </tr>

</tbody>
</table>`
    })

  }

  onClickAceptarSolicitud(id:any) {

    Swal.fire({
      title: '¿Está seguro de aceptar la solicitud?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Aceptar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.vacacionesService.aceptarSolicitudDeVacaciones(id).subscribe(
          (data:any) =>{


            console.log(data);
            Swal.fire(
              'Aceptada',
              'La solicitud ha sido aceptada.',
              'success'
            )
            this.obtenerLasSolicitudesDeVacacionEspera();
            this.obtenerTodasLasSolicitudesDeVacaciones();
          }
        )


      }
    })



  }


  onClickRechazarSolicitud(id:any) {

    Swal.fire({
      title: '¿Está seguro de rechazar la solicitud?',

      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si,rechazar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.vacacionesService.rechazarSolicitudDeVacaciones(id).subscribe(
          (data:any) =>{
            this.vacacionesService.obtenerTodasLasSolicitudesDeVacacionEspera().subscribe(
              (data:any) =>{
                this.tableDataSource1.data = data;


              }
            )
            this.vacacionesService.obtenerTodasLasSolicitudes().subscribe(
              (data:any) =>{

               // this.solicitudesVacaciones = data;
                this.tableDataSource2 = data;

                //console.log(this.solicitudesVacaciones);
              }
            )

            console.log(data);
            Swal.fire(
              'Aceptada!',
              'La solicitud ha sido Rechazada.',
              'success'
            )
          }
        )


      }
    })



  }

}
