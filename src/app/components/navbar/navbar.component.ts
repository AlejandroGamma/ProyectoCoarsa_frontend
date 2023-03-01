import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isLoggedIn = false;
  @Input() user:any;
  constructor(public loginService:LoginService, private router:Router) {

  }

  ngOnChanges(user: SimpleChanges) {
    this.user = user;
  }
  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();
     this.user = this.loginService.getUser();
    console.log( this.user);
    console.log( this.isLoggedIn);
    this.loginService.loginStatusSubject.asObservable().subscribe(
      data => {
        this.isLoggedIn = this.loginService.isLoggedIn();
        this.user = this.loginService.getUser();
        console.log(  data);
      }
    )
  }
  public logout(){
    this.loginService.logout();
    window.location.reload();


  }

  onClickPerfilButton(){
    if (this.loginService.getUserRole()==='ADMIN'){
      this.router.navigate(['/admin/perfile-normal'])
    } else {
      this.router.navigate(['/user-dashboard/perfil'])
    }

  }
}
