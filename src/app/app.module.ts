import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/Layout/header/header.component';
import { FooterComponent } from './Components/Layout/footer/footer.component';
import { ContentComponent } from './Components/Layout/content/content.component';
import { HomeComponent } from './Components/home/home.component';
import { ContactusComponent } from './Components/contactus/contactus.component';
import { QuestionsComponent } from './Components/questions/questions.component';
import { ReviewsComponent } from './Components/reviews/reviews.component';
import { AboutusComponent } from './Components/aboutus/aboutus.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { NewfeedsComponent } from './Components/newfeeds/newfeeds.component';
import { OffersComponent } from './Components/offers/offers.component';

import {SharedService} from './services/shared.service';

import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OfferDetailComponent } from './Components/offers/offer-detail/offer-detail.component';
import { AfterloginComponent } from './Components/afterlogin/afterlogin.component';
import { AvailableOfferComponent } from './Components/available-offer/available-offer.component';
import { UserOffersComponent } from './Components/user-offers/user-offers.component';
import { UserNeedsComponent } from './Components/user-needs/user-needs.component'; // <-- NgModel lives here

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    HomeComponent,
    ContactusComponent,
    QuestionsComponent,
    ReviewsComponent,
    AboutusComponent,
    LoginComponent,
    RegisterComponent,
    NewfeedsComponent,
    OffersComponent,
    OfferDetailComponent,
    AfterloginComponent,
    AvailableOfferComponent,
    UserOffersComponent,
    UserNeedsComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
