import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitters';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-available-offer',
  templateUrl: './available-offer.component.html',
  styleUrls: ['./available-offer.component.css']
})
export class AvailableOfferComponent implements OnInit {

  constructor(private service: SharedService, private http:HttpClient) { }

  CategoryList:any[];
  OfferList:any[];

  authenticated=false;

  newoffer;
  flag:boolean=true;

  message = "";


  ngOnInit(): void {
    this.http.get('http://127.0.0.1:8000/api/user/', {withCredentials: true}).subscribe(

      (res: any) => {
        // console.log(res);
      console.log(res)
        Emitters.authEmitter.emit(true);
        this.newoffer = {
          name:"",
          description:"",
          image:null,
          place:"",
          date: Date.now().toLocaleString,
          user_id: res.id,
          Cat_id: 2
        }
       console.log(this.newoffer)

      },
      err => {
        // console.log(err);

        this.message = "عليـــــــك تسجيل الدخـــــول";
        Emitters.authEmitter.emit(false);

      }

    );

    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth;
      }
    );
    this.refreshCatList();
    this.refreshOfferList();
    


  


  }


  refreshCatList(){
    this.service.getCatList().subscribe(data=>{
      this.CategoryList=data;
    });
  }

//========================
refreshOfferList(){
  this.service.getOfferList().subscribe(data=>{
    this.OfferList=data;
  });
}



  Add() {
    this.service.addOffer(this.newoffer).subscribe(
      response => {
        // alert(' لقد تم ارسال سؤالك')
      },
      error => console.log('error', error)
      );
  }


  toggle(){
    this.flag=!this.flag
  }


}
