import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Emitters } from "src/app/emitters/emitters";
import { IOffer } from "src/app/interfaces/ioffer";
import { SharedService } from "src/app/services/shared.service";

@Component({
  selector: "app-user-needs",
  templateUrl: "./user-needs.component.html",
  styleUrls: ["./user-needs.component.css"],
})
export class UserNeedsComponent implements OnInit {
  message = "";
  private _activedRoute: ActivatedRoute;
  filteredOffersByofferId: IOffer[];
  array: [];
  userid;

  constructor(private http: HttpClient, private service: SharedService) {}

  ngOnInit(): void {
    this.http
      .get("http://127.0.0.1:8000/api/user/", { withCredentials: true })
      .subscribe(
        (res: any) => {
          console.log("Useeeeeeeeer Data : ");
          console.log(res);
          console.log("/////end Useeeeeeeeer Data : ");
          this.userid = res.id;
          // console.log('****** userid ***********');
          // console.log(this.userid = res.id);
          // console.log('*********** ///end  userid ******* ');

          this.message = res.name;
          Emitters.authEmitter.emit(true);

          // ************ getNeedbyUserId *********
          // to return each user needs
          this.service.getNeedbyUserId(this.userid).subscribe(
            (data: any) => {
              // for (let index = 0; index < data.length; index++) {
              //      this.service.getOffersByOfferId(data.offer_id)
              // }
              console.log("****** userid ***********");
              console.log(this.userid);
              console.log("*********** ///end  userid ******* ");
              console.log("dataaaaaaaaaaa", data);
              // this.filteredOffersByofferId = data;

              for (let index = 0; index < data.length; index++) {
                this.service.getOffersByOfferId(data[index].offer_id).subscribe(
                  (result) => {
                    console.log(result[0]);
                    this.filteredOffersByofferId = result;
                    // this.array.push(result[0])
                  },
                  (err) => {
                    console.log(err);
                  }
                );
              }
            },
            (err) => {}
          );

          // *****************************
        },
        (err) => {
          // console.log(err);

          this.message = " عليـــــك تسجـــيل الدخـــــول!";
          Emitters.authEmitter.emit(false);
        }
      );

    // ************************************
  }

  // here we need to send id dynamically not static , but static is working fine
  // we need to get need_id related to offer_id that clicked by user
  need_id ;
  returnOffer(id) {
    this.service.getNeedbyOfferId(id).subscribe(
      (res:any) => {
        console.log("result Id:-------",id);
        this.need_id = res[0].id;
        
        console.log("this.need_id" , this.need_id)

        console.log("need result:-------",res);
      },
      (err) => {}
    );

    this.service.deleteNeed(this.need_id).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
    // alert('تــــم الغاء الحجـــز بنجــاح')
  }



}
