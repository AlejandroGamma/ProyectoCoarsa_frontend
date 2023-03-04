import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import baserUSL from "./helper";

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  constructor(private  httpClient: HttpClient ) { }
//se guarda  un nuevo correo
  public añadiCorreo(correo:any){
    return this.httpClient.post(`${baserUSL}/configuracion/correos`,correo)
  }

  //se obtiene todos los correos de admin desde el backend
  public obtenerTodosLosCorreos(){
    return this.httpClient.get(`${baserUSL}/configuracion/correos`)
  }

  public eliminarCorreo(correoString:any){
    return this.httpClient.delete(`${baserUSL}/configuracion/correos/${correoString}`)

  }

}
