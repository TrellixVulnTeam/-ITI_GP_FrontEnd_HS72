import { Injectable } from '@angular/core';
import { IOffer } from '../interfaces/ioffer';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { ICateogries } from '../interfaces/icateogries';
import { INeed } from '../interfaces/ineed';
import { IQuestion } from '../interfaces/iquestion';
import { IContact } from '../interfaces/icontact';

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  readonly APIUrl = "http://127.0.0.1:8000/";

offers:IOffer[];


  constructor(private http:HttpClient) { }

  //  ********** getAllOffers ********
getAllOffers():IOffer[]{
  return this.offers;
}

  // ********** getOfferByCatId ********
// getOfferByCatId(catID:number):IOffer[]{
//   return this.offers.filter((offer)=>{
//     return offer.Cat_id==catID;
//   } )
// }

// ********** getOfferByID ********
getOfferByID(offerId):IOffer{
  return this.offers.find((offer)=>{
    return offer.id ==offerId
  })
}


//************************** Category API ************** */ */

// Get Category
getCatList():Observable<ICateogries[]>{
  return this.http.get<ICateogries[]>(this.APIUrl + 'category/');
}

// Post Category
addCategory(val:any){
  return this.http.post(this.APIUrl + 'category/', val);
}

// Put Category
updateCategory(val:any){
return this.http.put(this.APIUrl + 'category/', val);
}

// Delete Category
deleteCategory(val:any){
return this.http.delete(this.APIUrl + 'category/'+val);
}


getAllCategoryNames():Observable<any[]>{
  return this.http.get<any[]>(this.APIUrl+'category');
}



//************************** Offer API ************** */ */

// Get Offer
getOfferList():Observable<IOffer[]>{
  return this.http.get<IOffer[]>(this.APIUrl + 'offer/');
}

getOfferbycatId(catID:number):Observable<IOffer[]>{
  return this.http.get<IOffer[]>(this.APIUrl + 'offerd/'+catID);
}


getOfferbyUserId(userId:number):Observable<IOffer[]>{
  return this.http.get<IOffer[]>(this.APIUrl + 'offerByuserId/'+userId);
}

getOfferById(offerid:number):Observable<IOffer>{
  return this.http.get<IOffer>(this.APIUrl + 'offerid/'+offerid);
}

getOffersByOfferId(offerid:number):Observable<IOffer[]>{
  return this.http.get<IOffer[]>(this.APIUrl + 'offerByOfferId/'+offerid);
}


// Post Offer
addOffer(val:any){
  return this.http.post(this.APIUrl + 'offer/', val);
}

// Put Offer
updateOffer(val:any){
return this.http.put(this.APIUrl + 'offer/', val);
}

// Delete Offer
deleteOffer(val:any){
return this.http.delete(this.APIUrl + 'offer/'+val);
}


getAllOfferNames():Observable<any[]>{
  return this.http.get<any[]>(this.APIUrl+'offer');
}


//************************** Needs API ************** */ */

// Get Need
getNeedList():Observable<INeed[]>{
  return this.http.get<INeed[]>(this.APIUrl + 'need/');
}

// Post Need
addNeed(val:any){
  return this.http.post(this.APIUrl + 'need/', val);
}

// Put Need
updateNeed(val:any){
return this.http.put(this.APIUrl + 'need/', val);
}

// Delete Need
deleteNeed(val:any){
return this.http.delete(this.APIUrl + 'need/'+val);
}


getAllNeedNames():Observable<any[]>{
  return this.http.get<any[]>(this.APIUrl+'need');
}

getNeedbyUserId(userId:number):Observable<IOffer[]>{
  return this.http.get<IOffer[]>(this.APIUrl + 'needByUserId/'+userId);
}

//************************** Questions API ************** */ */

// Get Question
getQuestionList():Observable<IQuestion[]>{
  return this.http.get<IQuestion[]>(this.APIUrl + 'question/');
}


// Post Question
addQuestion(val:any){
  return this.http.post(this.APIUrl + 'question/', val);
}

// Put Question
updateQuestion(val:any){
return this.http.put(this.APIUrl + 'question/', val);
}

// Delete Question
deleteQuestion(val:any){
return this.http.delete(this.APIUrl + 'question/'+val);
}


getAllQuestionNames():Observable<any[]>{
  return this.http.get<any[]>(this.APIUrl+'question');
}



//************************** Contacts API ************** */ */

// Get Contact
getContactList():Observable<IContact[]>{
  return this.http.get<IContact[]>(this.APIUrl + 'contactus/');
}


// Post Contact
addContact(val:any){
  return this.http.post(this.APIUrl + 'contactus/', val);
}

// Put Contact
updateContact(val:any){
return this.http.put(this.APIUrl + 'contactus/', val);
}

// Delete Contact
deleteContact(val:any){
return this.http.delete(this.APIUrl + 'contactus/'+val);
}


getAllContactNames():Observable<any[]>{
  return this.http.get<any[]>(this.APIUrl+'contactus');
}


  }
