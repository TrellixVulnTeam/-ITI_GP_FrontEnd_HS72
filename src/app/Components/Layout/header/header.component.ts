import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitters';
import { IOffer } from 'src/app/interfaces/ioffer';
import { LoginService } from 'src/app/services/login.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  authenticated = false;
  message="";
  // userId=0;
  // filteredOffersByUserId:IOffer[];

  constructor(private http: HttpClient,private loginservice: LoginService,private service:SharedService) { }

  ngOnInit(): void {
    this.http.get('http://127.0.0.1:8000/api/user/', {withCredentials: true}).subscribe(

      (res: any) => {       
         

        this.message = res.name;
        // this.userId=res.id;
        Emitters.authEmitter.emit(true);

      },
      err => {
       
        this.message = "You are not logged in";
        Emitters.authEmitter.emit(false);

      }

    );



    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth;
      }
    );


    // this.refreshOfferByUserId()
  }

  

  handleLogin() {
    this.loginservice.login();
  }

  // handleLogout() {
  //   this.loginservice.logout();
  // }


  logout(): void {
    this.http.post('http://127.0.0.1:8000/api/logout/', {}, {withCredentials: true}).subscribe(() => this.authenticated = false);
    this.loginservice.logout();
  }

}
