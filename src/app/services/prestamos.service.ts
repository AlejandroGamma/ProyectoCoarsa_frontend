import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import baserUSL from "./helper";

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {

  constructor(private  httpClient: HttpClient ) {

  }

  public añadirPrestamo(prestamo:any){
    return this.httpClient.post(`${baserUSL}/prestamos/`,prestamo)
  }

  public obtenerTodasLasSolicitudes(){
    return this.httpClient.get(`${baserUSL}/prestamos/`)
  }

  public obtenerSolicitudesPorUsuario(username:any){
    return this.httpClient.get(`${baserUSL}/prestamos/solicitudesPrestamo/${username}`)
  }

  rechazarSolicitudDePrestamos(id: any) {

    return this.httpClient.get(`${baserUSL}/prestamos/rechazar/${id}`)
  }

  obtenerTodasLasSolicitudesDePrestamosEspera() {
    return this.httpClient.get(`${baserUSL}/prestamos/`)
  }

  aceptarSolicitudDePrestamos(id: any) {
    return this.httpClient.get(`${baserUSL}/prestamos/aceptar/${id}`)
  }
}
