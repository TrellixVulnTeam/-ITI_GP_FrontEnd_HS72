

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitters';
import { IOffer } from 'src/app/interfaces/ioffer';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-user-needs',
  templateUrl: './user-needs.component.html',
  styleUrls: ['./user-needs.component.css']
})
export class UserNeedsComponent implements OnInit {

  message="";
  private _activedRoute: ActivatedRoute;
  filteredOffersByofferId:IOffer[];
  userid=1;

  constructor(private http: HttpClient,private service:SharedService) { }

  ngOnInit(): void {


    this.http.get('http://127.0.0.1:8000/api/user/', {withCredentials: true}).subscribe(

      (res: any) => {
         console.log(res);
        this.userid = res.id;

        this.message = res.name;
        Emitters.authEmitter.emit(true);

      },
      err => {
        // console.log(err);

        this.message = "You are not logged in";
        Emitters.authEmitter.emit(false);

      }

    );



    // ************************************
        this.service.getNeedbyUserId(this.userid).subscribe(data=>{

            // for (let index = 0; index < data.length; index++) {
            //      this.service.getOffersByOfferId(data.offer_id)
            // }
            console.log("dataaaaaaaaaaa", data);
            this.filteredOffersByofferId = data;

        },
        (err)=>{


        }
        )



    // *****************************

  }

}