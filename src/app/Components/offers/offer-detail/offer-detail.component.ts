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
      this.offer = res;
      console.log(this.offer);


      // we need to retrive user which user_id in offer class = userid in user class
      // --------------------------------------------------------------------------
      this.http
        .get("http://127.0.0.1:8000/api/user/", { withCredentials: true })
        .subscribe(
          (res: any) => {
            // console.log(res);

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
}
