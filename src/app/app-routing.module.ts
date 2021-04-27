import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AboutusComponent } from './Components/aboutus/aboutus.component';//AboutusComponent
import { AfterloginComponent } from './Components/afterlogin/afterlogin.component';
import { AvailableOfferComponent } from './Components/available-offer/available-offer.component';
import { ContactusComponent } from './Components/contactus/contactus.component';//ContactusComponent
import { HomeComponent } from './Components/home/home.component'; //HomeComponent
import { LoginComponent } from './Components/login/login.component';//LoginComponent
import { OfferDetailComponent } from './Components/offers/offer-detail/offer-detail.component';
import { QuestionsComponent } from './Components/questions/questions.component';//QuestionsComponent
import { RegisterComponent } from './Components/register/register.component';
import { ReviewsComponent } from './Components/reviews/reviews.component';//ReviewsComponent
import { UserNeedsComponent } from './Components/user-needs/user-needs.component';
import { UserOffersComponent } from './Components/user-offers/user-offers.component';

const routes: Routes = [
  { path:'home' , component:HomeComponent},
  { path:'contactus' , component:ContactusComponent},
  { path:'questions' , component:QuestionsComponent},
  {path:'reviews'    , component:ReviewsComponent},
  {path:'aboutus'    , component:AboutusComponent},
  {path:'login' ,  component:LoginComponent},
  {path:'register'  , component:RegisterComponent},
  {path:'offerdetails/:id'  , component:OfferDetailComponent},
  {path:'afterlogin'  , component:AfterloginComponent, canActivate: [AuthGuard]},
  {path:'availableoffer'  , component:AvailableOfferComponent},
  {path:'useroffer'  , component:UserOffersComponent},
  {path:'userneed'  , component: UserNeedsComponent},

  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'**',redirectTo:'/home',pathMatch:'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
