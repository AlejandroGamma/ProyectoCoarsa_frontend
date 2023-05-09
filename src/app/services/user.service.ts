import { Injectable } from '@angular/core';

import baserUSL from './helper';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private  httpClient: HttpClient ) { }
//se crea  un nuevo usuaerio
  public addUsuario(user:any){
    return this.httpClient.post(`${baserUSL}/usuarios/`,user)
  }

  //
  public obtenerTodosLosUsuarios(){
    return this.httpClient.get(`${baserUSL}/usuarios/`)
  }

  //
  public actulizarUsuario(user:any){

    return this.httpClient.put(`${baserUSL}/usuarios/`,user)
  }

  public eliminarUsuario(userId:any){
    return this.httpClient.delete(`${baserUSL}/usuarios/${userId}`)
  }

  public  activarUsuario(username:any){
    return this.httpClient.get(`${baserUSL}/usuarios/activar/${username}`)
  }

  public  desactivarUsuario(username:any){
    return this.httpClient.get(`${baserUSL}/usuarios/desactivar/${username}`)
  }

  public obtenerUsuario(userId:any){
    return this.httpClient.get(`${baserUSL}/usuarios/obtener/${userId}`)
  }
  public obtenerUsuarioUsername(username:any){
    return this.httpClient.get(`${baserUSL}/usuarios/${username}`)
  }

  public cambiarPasswordAdmin(passForm:any){
    return this.httpClient.put(`${baserUSL}/usuarios/actualizar/`, passForm)
  }
  public cambiarPasswordUser(passForm:any){
    return this.httpClient.put(`${baserUSL}/usuarios/actualizar-password/`, passForm)
  }
  public obtenerRoles(){
    return this.httpClient.get(`${baserUSL}/usuarios/roles/`)
  }

  public recuperarPassword(recoPassDTO:any){

    return this.httpClient.put(`${baserUSL}/usuarios/recuperar`, recoPassDTO)
  }


}
