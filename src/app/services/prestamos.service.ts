import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import baserUSL from "./helper";

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {

  constructor(private  httpClient: HttpClient ) {

  }

  public obtenerTodasLasSolicitudes(){
    return this.httpClient.get(`${baserUSL}/prestamos/`)
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
