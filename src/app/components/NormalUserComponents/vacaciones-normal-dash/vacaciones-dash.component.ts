import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatCalendarCellClassFunction} from '@angular/material/datepicker';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {VacacionesService} from "../../../services/vacaciones.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import swal from "sweetalert2";
import {UserService} from "../../../services/user.service";
import {LoginService} from "../../../services/login.service";
import Swal from "sweetalert2";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ThemePalette} from "@angular/material/core";


@Component({
  selector: 'app-vacaciones-dash',
  templateUrl: './vacaciones-dash.component.html',
  styleUrls: ['./vacaciones-dash.component.css']
})
export class VacacionesDashComponent implements  OnInit{

  vacacion = {
    "fechaInicio" : '',
    "numDias" : '',
    "fechaFinal":''
  }
  fechaInicio : string | undefined;

  solicitudesVacaciones:any  = []
 dataSource: any;

  //tabla
  displayedColumns: string[] = ['Id', 'FechaCreacion', 'Estado', 'Solicitud'];
  tableDataSource1 = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator1!: MatPaginator
  @ViewChild(MatSort) matSort1! : MatSort;




  constructor(private _formBuilder: FormBuilder, private vacacionesService:VacacionesService, private snack:MatSnackBar, private loginService:LoginService) {

  }

//atributos para la parte de steps para escoger vacaciones
  firstFormGroup = this._formBuilder.group({

    firstCtrl: ['', Validators.required],

  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: [''],
  });

  //esto funciona para poder devolverse al crear la solicitud de vacaciones
  isEditable = true;

  //Fecha de hoy, este metodo se llama en el html y se pone como minimo para blquear los dias anteriores a hoy
  //ademas del filtro ya agregado llamado
  todayDate:Date = new Date();


  ngOnInit(): void {

   this.obtenerTodasLasSolicitudesDeVacacionesPorUsuario();
  }

  obtenerTodasLasSolicitudesDeVacacionesPorUsuario(){
    this.vacacionesService.obtenerSolicitudesPorUsuario(this.loginService.getUser().username).subscribe(
      (data:any) =>{

        this.tableDataSource1.data = data;
        this.tableDataSource1.paginator = this.paginator1;
        this.tableDataSource1.sort = this.matSort1;
        console.log(this.tableDataSource1.data);
      }
    )
  }

  //filtro para el calenario, bloquea los fines de semana
  myFilter = (d: Date | null): boolean => {

    const day = (d || new Date()).getDay();
    // bloquea sabados y domingos
    return day !== 0 && day !== 6;
  };

  //este metodo recoge la fecha desde el html y saca solamente la fecha  yyy-dd-mm
  updateDOB(dateObject:any) {
    console.log(dateObject);

    const stringified = JSON.stringify(dateObject.value);
    const dob = stringified.substring(1, 11);
    console.log(dob);
    this.vacacion.fechaInicio = dob;
    this.obtenerTodasLasSolicitudesDeVacacionesPorUsuario();
  }

  //le da un valor al atributo de vacaciones
  updateCantDias(dias:any) {
    console.log(dias);

    this.vacacion.numDias = dias;
  }

  // selectionChange(event: FormBuilder) {
  //   console.log(event.selectedStep.label);
  //   let stepLabel = event.selectedStep.label;
  //   if (stepLabel == "Step 2") {
  //     console.log("CLICKED STEP 2");
  //   }
  // }

  //este metodo calcula la fecha de regreso desde el backend
  onClick(){

    this.vacacionesService.calcularFechaRegreso(this.vacacion).subscribe(
      (data:any) => {
        console.log(data);
              this.vacacion.fechaFinal = data.fechaFinal;
        console.log(this.vacacion);
    },(error)=>{
        console.log(error);
        this.snack.open(error.error.message, 'Aceptar', {
          duration: 3000
        })
      })

    console.log(this.vacacion)
  }

  //envia la vacacion  y la guarda en el backend
  sendClick(){
    console.log(this.vacacion);
    this.vacacionesService.añadirVacacion(this.vacacion).subscribe(

      (data)=>{
        console.log(data);
        swal.fire('Solicitud de vacaciones', 'La solicitud de vacaciones ha sido creada correctamente', 'success' )
        this.obtenerTodasLasSolicitudesDeVacacionesPorUsuario();
      },(error)=>{
        console.log(error);
        alert('ha ocurrido un error en el sistema, compruebe si se creo la solicitud')
        this.obtenerTodasLasSolicitudesDeVacacionesPorUsuario();
      }
    )
  }



//muestra la solicitud de vacacion dentro de la tabla en el boton ver
  onClickVerSolicitud(vacacion:any){


    Swal.fire({
      title: 'Solicitud de Vacaciones',
      html: `<table id="table" border=1>
        <thead>
            <tr>
                <th>ID</th>
                <th>Cant de dias</th>
                <th>Fecha de inico</th>
                <th>fecha de Regreso</th>

            </tr>
        </thead>
        <tbody>
            <tr>
                <td>${vacacion.id}</td>
                <td>${vacacion.numDias}</td>
                <td>${vacacion.fechaInicio}</td>
                <td>${vacacion.fechaFinal}</td>
            </tr>

</tbody>
</table>`
    })

  }


}




