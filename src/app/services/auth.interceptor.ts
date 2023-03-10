import {
  HTTP_INTERCEPTORS, HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {LoginService} from "./login.service";
import {finalize, Observable, tap} from "rxjs";
import {Router} from "@angular/router";
import {SpinnerService} from "./spinner.service";
import {MatSnackBar} from "@angular/material/snack-bar";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private loginService:LoginService, private router:Router, private spinnerService:SpinnerService, private snack:MatSnackBar) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.llamarSpinner();
    let authReq = req;
    const token = this.loginService.getToken();
    if (token != null){
      authReq = authReq.clone({
        setHeaders : {Authorization: `Bearer ${token}`}
      })
    }
    return next.handle(authReq).pipe( finalize(() => this.spinnerService.esconderSpinner()), tap(()=>{},
      (error:any) =>{
      if (error instanceof HttpErrorResponse){
        if (error.status !== 401){
          console.log(error);
          return
        }
        this.router.navigate(['login'])
        this.snack.open('La sesión ha expirado, vuelva a iniciar sesión.','Aceptar', {
          duration: 6000,
          panelClass: ['error-snackbar'],
        })
      }
      }
      ));
  }

}

export const authInterceptorProviders = [
{
  provide : HTTP_INTERCEPTORS,
  useClass : AuthInterceptor,
  multi: true
}
]
