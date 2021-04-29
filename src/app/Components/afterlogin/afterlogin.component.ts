import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitters';

@Component({
  selector: 'app-afterlogin',
  templateUrl: './afterlogin.component.html',
  styleUrls: ['./afterlogin.component.css']
})
export class AfterloginComponent implements OnInit {

  message = "";
  flag:boolean=false;
  flag1:boolean=false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.http.get('http://127.0.0.1:8000/api/user/', {withCredentials: true}).subscribe(

      (res: any) => {
        // console.log(res);

        this.message = res.name;
        Emitters.authEmitter.emit(true);

      },
      err => {
        // console.log(err);

        this.message = "You are not logged in";
        Emitters.authEmitter.emit(false);

      }

    );

  }
toggle(){
  this.flag = !this.flag
}



toggle2(){
  this.flag1 = !this.flag1
}



}
