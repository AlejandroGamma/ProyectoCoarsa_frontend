import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import baserURL from "./helper";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {



  constructor(private  http:HttpClient) { }

  public loginStatusSubject = new Subject<boolean>();

  //generamos o traemos el token
  public generateToken(loginData:any){
    return this.http.post(`${baserURL}/generate-token`, loginData)
  }

  //iniciamos sesion y guardamos el token en el local storage
  public  loginUser(token:any){
    localStorage.setItem('token', token);
  }

  public  isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;

    } else {
      return true;
    }
  }

  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //obtener token
  public getToken(){
    return localStorage.getItem('token');
  }

  public setUser(user:any){
    localStorage.setItem('user', JSON.stringify(user))
  }

  public getUser(){
    let userStr = localStorage.getItem('user');
    if (userStr != null){
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

    public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
    }

    public  getCurrentUser(){
      return this.http.get(`${baserURL}/actual-usuario`);
    }
}
