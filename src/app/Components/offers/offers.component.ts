import { Component, Input, OnChanges, OnInit } from '@angular/core';
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


constructor(private service:SharedService) { }

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
