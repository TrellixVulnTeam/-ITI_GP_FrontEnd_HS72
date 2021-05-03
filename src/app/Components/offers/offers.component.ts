import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitters';
import { INeed } from 'src/app/interfaces/ineed';
import { IOffer } from 'src/app/interfaces/ioffer';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit ,OnChanges{

@Input() SelectedCatID:number;
offers:IOffer[];
filteredOffers:IOffer[];

OfferList:any=[];

NeedList:INeed[];

message:"";

authenticated = false;



constructor(private service:SharedService , private http: HttpClient) { }

ngOnChanges():void{
  // this.filteredOffers = this.service.getOfferbycatId(this.SelectedCatID);
  console.log("testeeeeeee")
  this.refreshOfferId();
}


  ngOnInit(): void {
    // this.filteredOffers = this._shared.getAllOffers(this.SelectedCatID);
    console.log("test")
    this.offers = this.service.getAllOffers();
    this.refreshOfferList();
    this.refreshNeedList();


    // *************** Loged in User *********************
    this.http
    .get("http://127.0.0.1:8000/api/user/", { withCredentials: true })
    .subscribe(
      (res: any) => {
        // console.log(res);
        console.log(res);
        Emitters.authEmitter.emit(true);

       
      },
      (err) => {
        // console.log(err);

        // this.message = "عليـــــــك تسجيل الدخـــــول";
        Emitters.authEmitter.emit(false);
      }
    );

    // *************************************************

  }

//========================
  refreshOfferList(){
    this.service.getOfferList().subscribe(data=>{
      this.OfferList=data;
    });
  }


  refreshOfferId(){
    this.service.getOfferbycatId(this.SelectedCatID).subscribe(data=>{
      this.filteredOffers=data;
    });
  }

//========================
  refreshNeedList(){
    this.service.getNeedList().subscribe(data=>{
      this.NeedList=data;
    });
  }



}
