import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {PrestamosService} from "../../../services/prestamos.service";
import {LoginService} from "../../../services/login.service";
import Swal from "sweetalert2";
import {FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {DialogAdminDataDialog} from "../vacaciones-admin-dash/vacaciones-admin-dash.component";

@Component({
  selector: 'app-prestamos-admin-dash',
  templateUrl: './prestamos-admin-dash.component.html',
  styleUrls: ['./prestamos-admin-dash.component.css']
})
export class PrestamosAdminDashComponent implements OnInit{

  //atributos para las tablas, paginator y sort(primera tabla)
  displayedColumns1: string[] = ['Id','Solicitante', 'FechaCreacion', 'Estado', 'Solicitud', 'Acciones'];
  tableDataSource1 = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator1!: MatPaginator
  @ViewChild(MatSort) matSort1! : MatSort;
  @ViewChild('paginatorEnEspera') paginatorEnEspera!: MatPaginator;

  //pagitator para la segunda tabla

  @ViewChild('paginatorHistorial') paginatorHistorial!: MatPaginator;

  displayedColumns2: string[] = ['Id','Solicitante', 'FechaCreacion', 'Estado', 'Solicitud', 'Acciones'];
  tableDataSource2 = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator2!: MatPaginator
  @ViewChild(MatSort) matSort2! : MatSort;



constructor( private  prestamosService: PrestamosService, private login:LoginService, private dialog: MatDialog) {
}

//este metodo es implentado de la clse Oninit y apenas carga la pagina llama estos metodos.
  ngOnInit(){
  this.obtenerTodasLasSolicitudesDePrestamos();
  this.obtenerLasSolicitudesDePrestamosEspera();
  }

  //filtro para la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource2.filter = filterValue.trim().toLowerCase();

    if (this.tableDataSource2.paginator) {
      this.tableDataSource2.paginator.firstPage();
    }
  }

  obtenerTodasLasSolicitudesDePrestamos(){
    this.prestamosService.obtenerTodasLasSolicitudes().subscribe(
      (data:any) =>{
        this.tableDataSource2.data = data;
        this.tableDataSource2.paginator = this.paginatorHistorial;
        this.tableDataSource2.sort = this.matSort2;
        console.log('xx'+data);
      }
    )
  }

  onClickVerSolicitud(prestamo:any){


    Swal.fire({
      title: 'Solicitud de Prestamo',
      html: `<table id="table" border=1 padding: "60%">
        <thead>
            <tr>

                <th>Cantidad de dinero</th>

            </tr>
        </thead>
        <tbody>
            <tr>

                <td>${prestamo.monto}</td>
            </tr>

</tbody>
</table>`
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
        this.prestamosService.rechazarSolicitudDePrestamos(id).subscribe(
          (data:any) =>{
            this.prestamosService.obtenerTodasLasSolicitudesDePrestamosEspera().subscribe(
              (data:any) =>{
                this.tableDataSource1.data = data;


              }
            )


            console.log(data);
            Swal.fire(
              'Aceptada!',
              'La solicitud ha sido Rechazada.',
              'success'
            )
            this.obtenerTodasLasSolicitudesDePrestamos();
            this.obtenerLasSolicitudesDePrestamosEspera();
          }
        )


      }
    })



  }

  obtenerLasSolicitudesDePrestamosEspera(){
    this.prestamosService.obtenerTodasLasSolicitudesDePrestamosEspera().subscribe(
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
        this.prestamosService.aceptarSolicitudDePrestamos(id).subscribe(
          (data:any) =>{


            console.log(data);
            Swal.fire(
              'Aceptada',
              'La solicitud ha sido aceptada.',
              'success'
            )
            this.obtenerTodasLasSolicitudesDePrestamos();
            this.obtenerLasSolicitudesDePrestamosEspera();

          }
        )


      }
    })
  }

  openDialog(solicitud:any) {
    console.log(solicitud.usuario.email);

    this.dialog.open(DialogAdminDataDialogPrestamos, {
      data: {

        id: solicitud.id,
        monto : solicitud.prestamo.monto,
        fechaCreacion:  solicitud.fechaCreacion,
        estado: solicitud.estado,
        //datos del usuario para mostrar
        username: solicitud.usuario.username,
        firstName: solicitud.usuario.firstName,
        lastName: solicitud.usuario.lastName,
        email: solicitud.usuario.email,

      },
    });
  }

}
//otra clase para mostrar los datos de los prestamos
@Component({
  selector: 'mostrar-solicitud-admin-prestamos-dialog',
  templateUrl: 'mostrar-solicitud-admin-prestamos-dialog.html',
  styleUrls: ['./prestamos-admin-dash.component.css']
})
export class DialogAdminDataDialogPrestamos {


  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}
}
