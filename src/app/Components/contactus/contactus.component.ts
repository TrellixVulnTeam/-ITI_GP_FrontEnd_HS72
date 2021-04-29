import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/interfaces/icontact';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {


  ContactList:IContact[];

  contact;


  constructor(private service:SharedService) { }

  ngOnInit(): void {


    this.contact = {
      name:'',
      email:'',
      phone:'',
      message:'',
      seen:1
    }



  }


  sendContact() {
    this.service.addContact(this.contact).subscribe(
      (response) => {
        if(response == "Added SuccessFully!!"){
          alert(" لقد تم ارسال رسالتك");
        }
        else{
        alert("لم يتم اﻻرســـال");
        }
      },
      (error) => {
        console.log("error", error);
        alert(error);
      }
    );
  }
}
