import { Injectable } from '@angular/core';
// import * as EventEmitter from 'node:events';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  isLoggedin = false;
  login() {
    this.isLoggedin = true;
  }

  logout() {
    this.isLoggedin = false;
  }
}


// export class LoginService{ 
  // @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>(); 
  // // … 
  // loginUser(username: string, password: string) { 
  //   if (correctPassword) { 
  //     this.fireIsLoggedIn.emit(customObject); // you can pass here whatever you want 
  //   } 
  // } 
 
  // getEmitter() { 
  //   return this.fireIsLoggedIn; 
  // } 
// } 