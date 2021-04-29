import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IOffer } from "src/app/interfaces/ioffer";
import { SharedService } from "src/app/services/shared.service";
import { Emitters } from "src/app/emitters/emitters";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-offer-detail",
  templateUrl: "./offer-detail.component.html",
  styleUrls: ["./offer-detail.component.css"],
})
export class OfferDetailComponent implements OnInit {
  offer: IOffer;
  message = "";
  constructor(
    private service: SharedService,
    private _activedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    let id = this._activedRoute.snapshot.params["id"];
    this.service.getOfferById(id).subscribe((res) => {
      this.getCatName(res.Cat_id);
      this.offer = res;
      this.getUsername(res.user_id); 

      console.log("this.offer", this.offer);



      // we need to retrive user which user_id in offer class = userid in user class
      // --------------------------------------------------------------------------
      this.http
        .get("http://127.0.0.1:8000/api/user/", { withCredentials: true })
        .subscribe(
          (res: any) => {
            // console.log("gggggggggggggggggggg",res);

            this.message = `  صاحب العرض : ${res.name}`;
            Emitters.authEmitter.emit(true);
          },
          (err) => {
            // console.log(err);

            this.message = "عليــــك تســجيل الدخول !";
            Emitters.authEmitter.emit(false);
          }
        );
    });
  }
  catName;
  username;
  getCatName(id) {
    this.service.getCatById(id).subscribe(
      (res: any) => {
        console.log("resssssssssssssssssssss", res);
        this.catName = res.name;
        console.log(" this.catName", this.catName);
      },
      (err) => {
        console.log("ErrOOOoooooooooooooooooooooor");
      }
    );
  }
  getUsername(id) {
    this.service.getUserById(id).subscribe(
      (res:any) => {
        console.log("&&&&&&&&&&&&&&&&&&" , res)
        this.username = res.name;
      },
      (err) => {}
    );
  }
}
