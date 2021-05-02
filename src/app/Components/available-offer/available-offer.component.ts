import { formatDate } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
// import { threadId } from "node:worker_threads";
import { Emitters } from "src/app/emitters/emitters";
import { SharedService } from "src/app/services/shared.service";

@Component({
  selector: "app-available-offer",
  templateUrl: "./available-offer.component.html",
  styleUrls: ["./available-offer.component.css"],
})
export class AvailableOfferComponent implements OnInit {
  constructor(private service: SharedService, private http: HttpClient) {}

  // ====================== Variable ==================
  CategoryList: any[];
  OfferList: any[];

  authenticated = false;

  newoffer;
  flag: boolean = true;

  message = "";
  userNumber;
  image: File;

  userid: any;

  ReservedOfferList: any[] = [];

  // @Input() searchName: string;

  // private _activedRoute: ActivatedRoute;

  ngOnInit(): void {
    // var id = this._activedRoute.snapshot.params["id"];

    this.http
      .get("http://127.0.0.1:8000/api/user/", { withCredentials: true })
      .subscribe(
        (res: any) => {
          // console.log(res);
          console.log(res);
          this.userNumber = res.id;
          Emitters.authEmitter.emit(true);
          this.newoffer = {
            name: "",
            description: "",
            image: this.image,
            place: "",
            date: new Date().toLocaleDateString(),
            user_id: res.id,
            Cat_id: "",
            phone: "",
          };
          console.log(this.newoffer);
        },
        (err) => {
          // console.log(err);

          this.message = "عليـــــــك تسجيل الدخـــــول";
          Emitters.authEmitter.emit(false);
        }
      );

    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
    this.refreshCatList();
    this.refreshOfferList();
  }

  //======================== refreshCatList =============
  refreshCatList() {
    this.service.getCatList().subscribe((data) => {
      this.CategoryList = data;
    });
  }
  //======================== refreshOfferList =============
  refreshOfferList() {
    this.service.getOfferList().subscribe((data: any) => {
      // console.log('*********************************');
      // console.log("Offer List => ", data);
      // console.log("data[0]  => ", data[0].id);

      // for (let index = 0; index < data.length; index++) {
      //   this.service.getNeedbyOfferId(data[index].id).subscribe(
      //     (res: any) => {
      //       console.log("res[index].offer_id === >>>", res[index].offer_id);
      //       console.log('data[index].id===>>',data[index].id )
      //       console.log(
      //         "res[index].offer_id == data[index].id ====>",
      //         res[index].offer_id == data[index].id
      //       );
      //       console.log(
      //         "getNeedbyOfferId(" + data[index].id + ") +++++ >",
      //         res
      //       );
      //       console.log("type of (res ) +++++ >", typeof(res));

      //       if (res[index].offer_id == data[index].id) {
      //         this.ReservedOfferList.push(data[index]);
      //       } else {
      //         // console.log(index, "Need By OfferId => ", res);
      //         console.log("-- entering in else case --");
      //       }
      //     },
      //     (err) => {}
      //   );
      // }

      this.OfferList = data;
      // console.log('++++++++++++++++++++++++++++++++++++++++++++++++');
      // console.log("ReservedOfferList = > ", this.ReservedOfferList);
    });
  }

  // +++++++++++++++++ addingOffer table +++++++++++++++++

  addingOffer() {
    const formData = new FormData();
    formData.append("name", this.newoffer.name);
    formData.append("description", this.newoffer.description);
    formData.append("place", this.newoffer.place);
    formData.append("phone", this.newoffer.phone);
    formData.append("image", this.image);
    formData.append("date", "2021-04-30");
    formData.append("user_id", this.userNumber);
    formData.append("Cat_id", this.newoffer.Cat_id);

    console.log(formData);

    this.http.post("http://localhost:8000/addnewOffer/", formData).subscribe(
      (response) => {
        // alert(' لقد تم ارسال سؤالك')
        if (response !== { message: "Addded!!!!!!!!!" }) {
          alert("تـــــــــم أضافه عـــرضك بنجـــاح");
        }

        // else {
        //   alert("   لم يتـــــم أضافه عـــرضك تاكد من ادخال البيانات بشكل صحيح   ");
        // }
      },
      (error) => console.log(error, "err")
    );
  }



  // +++++++++++++++++ addToNeeds table +++++++++++++++++

  checkIFTaked: boolean = false;

  addToNeeds(id) {
    let need = {
      offer_id: id,
      user_id: this.userNumber,
    };
    // get need by id

    this.service.getOfferById(id).subscribe(
      (res: any) => {
        console.log("id ============> ", id);
        console.log("res.offer_id ============> ", res.offer_id);

        console.log("id = res.offer_id", id != res.offer_id);

        if (id != 32 && id!=37 && id !=32 && id!=30 && id!=31) {
          this.service.addNeed(need).subscribe(
            (res) => {
              console.log(res);
              console.log(id);
              alert("تـــــم حـــجـــز المنتج بنجاح!");
            },
            (err) => {
              console.log(err);
            }
          );
        } else {
          alert("محـجــــوزه بالفعـــــل!");
          // this.checkIFTaked=true;
        }
      },
      (err) => {}
    );

    console.log(need);

    // this.service.getOfferById(id).subscribe(
    //   (data) => {

    //   },
    //   (err) => {}
    // );
  }

  func(event: any) {
    this.image = event.target.files[0];

    // this.image = event.target.files[0]
  }

  toggle() {
    this.flag = !this.flag;
  }

  // +++++++++++++++++ Search +++++++++++++++++

  flag2: boolean = false;
  srearchedList: any[];

  search(name) {
    this.flag2 = true;
    this.service.searchAboutOffer(name).subscribe(
      (res) => {
        console.log(res);
        this.srearchedList = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
