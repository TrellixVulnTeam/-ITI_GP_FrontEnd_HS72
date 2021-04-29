import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
// import  {OktaAuthService}  from '@okta/okta-angular'
// import * as OktaSignIn from '@okta/okta-signin-widget'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder:FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      email:'',
      password:''
    });

  }


  submit(): void {

    this.http.post('http://127.0.0.1:8000/api/login/', this.form.getRawValue(), {withCredentials: true}).subscribe(res =>{
      // console.log(res)

      this.router.navigate(['/afterlogin'])

    });

  }


}
