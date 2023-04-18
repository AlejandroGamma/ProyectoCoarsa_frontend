import {Component, OnInit, SimpleChange, ViewChild} from '@angular/core';
import {VacacionesService} from "../../../services/vacaciones.service";
import Swal from "sweetalert2";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from "@angular/material/sort";
import {UserService} from "../../../services/user.service";
import {LoginService} from "../../../services/login.service";
import {TableEmptyFilter} from "../../../tableEmptyFilter";
import {Solicitud} from "../../../solicitud";
import {IUser} from "../../../IUser";

@Component({
  selector: 'app-vacaciones-admin-dash',
  templateUrl: './vacaciones-admin-dash.component.html',
  styleUrls: ['./vacaciones-admin-dash.component.css']
})
export class VacacionesAdminDashComponent implements  OnInit{
  //solicitudesVacaciones:any  = []

  //informacion para armar el filtro de las tablas (tabla 1 en espera)

  SolicitudsData1!: Solicitud[];


  //informacion para armar el filtro de las tablas (tabla 2 todas las solicitudes)

  SolicitudsData2!: Solicitud[];


  //atributos para las tablas, paginator y sort
  displayedColumns1: string[] = ['Id','Solicitante', 'FechaCreacion', 'Estado', 'Solicitud', 'Acciones'];
  tableDataSource1 = new MatTableDataSource(this.SolicitudsData1);
  @ViewChild(MatPaginator) paginator1!: MatPaginator
  @ViewChild(MatSort) matSort1! : MatSort;

  @ViewChild('paginatorEnEspera') paginatorEnEspera!: MatPaginator;
  @ViewChild('paginatorHistorial') paginatorHistorial!: MatPaginator;

  displayedColumns2: string[] = ['Id','Solicitante', 'FechaCreacion', 'Estado', 'Solicitud', 'Acciones'];
  tableDataSource2 = new MatTableDataSource(this.SolicitudsData2);
  @ViewChild(MatPaginator) paginator2!: MatPaginator
  @ViewChild(MatSort) matSort2! : MatSort;

  constructor(private vacacionesService:VacacionesService, private login:LoginService) {
  }



  ngOnInit(): void {

    this.obtenerLasSolicitudesDeVacacionEspera();
    this.obtenerTodasLasSolicitudesDeVacaciones();
    //esta fila de abajo tambien se necesita para poder utilizar el filter, en este caso
    //la tabla de vaca en espera y aqui se filtra por atributo de la interfaz Solicitud
    this.tableDataSource1.filterPredicate = function(solicitud, filter: string): boolean {
      const strId = String(solicitud.id);
      const nameSecondName = solicitud.usuario.firstName +' '+ solicitud.usuario.lastName; //variable para unir name y apellido
      return solicitud.usuario.firstName.toLowerCase().includes(filter) ||  solicitud.usuario.lastName.toLowerCase().includes(filter) || solicitud.estado.toLowerCase().includes(filter)
        || solicitud.fechaCreacion.toLowerCase().includes(filter) || strId.includes(filter) ||  nameSecondName.toLowerCase().includes(filter);
    };
    //esta fila de abajo tambien se necesita para poder utilizar el filter, en este caso
    //la tabla de todas las vacaciones
    this.tableDataSource2.filterPredicate = function(solicitud, filter: string): boolean {
      const strId = String(solicitud.id);
      const nameSecondName = solicitud.usuario.firstName +' '+ solicitud.usuario.lastName;
      return solicitud.usuario.firstName.toLowerCase().includes(filter) ||  solicitud.usuario.lastName.toLowerCase().includes(filter) || solicitud.estado.toLowerCase().includes(filter)
        || solicitud.fechaCreacion.toLowerCase().includes(filter) || strId.includes(filter) ||  nameSecondName.toLowerCase().includes(filter);
    };
  }


  obtenerLasSolicitudesDeVacacionEspera(){
    this.vacacionesService.obtenerTodasLasSolicitudesDeVacacionEspera().subscribe(
      (data:any) =>{
        this.tableDataSource1.data = data;
        this.tableDataSource1.paginator = this.paginatorEnEspera;
        this.tableDataSource1.sort = this.matSort1;

         this.SolicitudsData1 = data;

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
        this.SolicitudsData2 = data;
      }
    )
  }
  //filtrro para la tabla
  filtroPrimeraTabla(value: string) {

    this.tableDataSource1.filter = value.trim().toLocaleLowerCase();

  }

  filtroSegundaTabla(value: string) {
    this.tableDataSource2.filter = value.trim().toLocaleLowerCase();

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
