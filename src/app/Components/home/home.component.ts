import { Component, OnInit } from '@angular/core';
import { ICateogries } from 'src/app/interfaces/icateogries';
import {SharedService} from 'src/app/services/shared.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories:ICateogries[];
  catID:number;

  constructor(private service:SharedService) { }

   CategoryList:any=[];

  ngOnInit(): void {

this.refreshCatList();

  }

  refreshCatList(){
    this.service.getCatList().subscribe(data=>{
      this.CategoryList=data;
    });
  }



}
