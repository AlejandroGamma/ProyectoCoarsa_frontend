import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {PrestamosService} from "../../../services/prestamos.service";
import {LoginService} from "../../../services/login.service";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort"
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {
  DialogAdminDataDialogPrestamos
} from "../../AdminComponents/prestamos-admin-dash/prestamos-admin-dash.component";

@Component({
  selector: 'app-prestamos-dash',
  templateUrl: './prestamos-dash.component.html',
  styleUrls: ['./prestamos-dash.component.css']
})
export class PrestamosDashComponent implements  OnInit{

  prestamo = {
    monto:''
  }
  fechaInicio : string | undefined;

  solicitudesPrestamos:any  = []
 dataSource: any;

  //tabla
  displayedColumns: string[] = ['Id', 'FechaCreacion', 'Estado', 'Solicitud'];
  tableDataSource1 = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator1!: MatPaginator
  @ViewChild(MatSort) matSort1! : MatSort;





  constructor(private _formBuilder: FormBuilder, private prestamoService:PrestamosService, private snack:MatSnackBar, private loginService:LoginService, private dialog: MatDialog) {

  }

//atributos para la parte de steps para escoger prestamo
  firstFormGroup = this._formBuilder.group({

    firstCtrl: ['', Validators.required],

  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: [''],
  });

  //esto funciona para poder devolverse al crear la solicitud de prestamo
  isEditable = true;

  ngOnInit(): void {

   this.obtenerTodasLasSolicitudesDePrestamosPorUsuario();
  }

  obtenerTodasLasSolicitudesDePrestamosPorUsuario(){
    this.prestamoService.obtenerSolicitudesPorUsuario(this.loginService.getUser().username).subscribe(
      (data:any) =>{

        this.tableDataSource1.data = data;
        this.tableDataSource1.paginator = this.paginator1;
        this.tableDataSource1.sort = this.matSort1;
        console.log(this.tableDataSource1.data);
      }
    )
  }

  //este metodo calcula la fecha de regreso desde el backend
  onClick(){
    //this.prestamo.monto

  }

  //envia el prestamo  y la guarda en el backend
  sendClick(){
    console.log(this.prestamo);
    this.prestamoService.añadirPrestamo(this.prestamo).subscribe(

      (data)=>{
        console.log(data);
        swal.fire('Solicitud de prestamo', 'La solicitud de prestamo ha sido creada correctamente', 'success' )
        this.obtenerTodasLasSolicitudesDePrestamosPorUsuario();
      },(error)=>{
        console.log(error);
        alert('ha ocurrido un error en el sistema, compruebe si se creo la solicitud')
        this.obtenerTodasLasSolicitudesDePrestamosPorUsuario();
      }
    )
  }



//muestra la solicitud de prestamo dentro de la tabla en el boton ver
  onClickVerSolicitud(prestamo:any){


    Swal.fire({
      title: 'Solicitud de Prestamo',
      html: `<table id="table" border="1" padding-left="10">
        <thead>
            <tr>
                <th>ID</th>
                <th>Monto</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>${prestamo.id}</td>
                <td>${prestamo.monto}</td>
            </tr>

</tbody>
</table>`
    })

  }
  openDialog(solicitud:any) {


    this.dialog.open(DialogNormalDataDialogPrestamos, {
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
  selector: 'mostrar-solicitud-normal-prestamos-dialog',
  templateUrl: 'mostrar-solicitud-normal-prestamos-dialog.html',
  styleUrls: ['./prestamos-dash.component.css']
})
export class DialogNormalDataDialogPrestamos {


  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}
}



