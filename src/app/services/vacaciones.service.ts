import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import baserUSL from "./helper";

@Injectable({
  providedIn: 'root'
})
export class VacacionesService {

  constructor(private  httpClient: HttpClient ) { }

//se crea  un nuevo usuaerio
  public añadirVacacion(vacacion:any){
    return this.httpClient.post(`${baserUSL}/vacaciones/`,vacacion)
  }

  //se obtienen todas laas solicitudes desde la base de datos
  public obtenerTodasLasSolicitudes(){
    return this.httpClient.get(`${baserUSL}/vacaciones/`)
  }

//se  envia un objeto de tipo vacacion y se devuvelve el objto con la fecha calculada
  public calcularFechaRegreso(vacacion:any){
    return this.httpClient.put(`${baserUSL}/vacaciones/calcular`,vacacion)
  }

  public obtenerSolicitudesPorUsuario(username:any){
    return this.httpClient.get(`${baserUSL}/vacaciones/solicitudes/${username}`)
  }

  public aceptarSolicitudDeVacaciones(solicitudId:any){
    return this.httpClient.get(`${baserUSL}/vacaciones/aceptar/${solicitudId}`)
  }

  public rechazarSolicitudDeVacaciones(solicitudId:any){
    return this.httpClient.get(`${baserUSL}/vacaciones/rechazar/${solicitudId}`)
  }

  public eliminarSolicitudDeVacaciones(solicitudId:any){
    return this.httpClient.get(`${baserUSL}/vacaciones/${solicitudId}`)
  }

public obtenerTodasLasSolicitudesDeVacacionEspera(){
  return this.httpClient.get(`${baserUSL}/vacaciones/espera`)
}
}
