import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitters';
import { IOffer } from 'src/app/interfaces/ioffer';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-user-offers',
  templateUrl: './user-offers.component.html',
  styleUrls: ['./user-offers.component.css']
})
export class UserOffersComponent implements OnInit {

  message="";
  filteredOffersByUserId:IOffer[];
  userId;

  constructor(private http: HttpClient,private service:SharedService) { }

  ngOnInit(): void {

    this.http.get('http://127.0.0.1:8000/api/user/', {withCredentials: true}).subscribe(

      (res: any) => {
         this.userId = res.id;
         this.message=res.name;
         console.log(this.userId) 
         console.log(this.message)      

       

        this.service.getOfferbyUserId(this.userId).subscribe(data=>{
          this.filteredOffersByUserId=data;
          console.log(this.filteredOffersByUserId)

          Emitters.authEmitter.emit(true);

      },
      err => {
        this.message = "You are not logged in";
        Emitters.authEmitter.emit(false);

      }

    );


   


    });



  }

  // refreshOfferByUserId(){
   
  // }



  

}
