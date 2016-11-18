import { Component } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {NavParams, NavController, Toast} from 'ionic-angular';
//import 'rxjs/add/operator/map';
//import './rxjs-operators';

import {UserData} from '../services/user-data';
import {ToastService} from '../services/ToastService';

import {BarcodePage} from '../barcodes/barcodes';
import {SignupPage} from '../signup/signup';


@Component({
  templateUrl: 'login.html'
})
export class LoginPage {
  login: {username?: string, password?: any} = {};
  //username: any;
  submitted = false;

  constructor(public nav: NavController,
              public userData: UserData,
              public toastService: ToastService,
              public http: Http) {}

  onLogin(form, login) {
    this.submitted = true;
    if(form.valid) {
       var headers = new Headers();
       headers.append('Content-Type', 'application/x-www-form-urlencoded');
       var data = JSON.stringify(login);
       this.http.post("/scripte/checkLogin.php", data, {
         headers: headers
        })
         .map(res => res.json())
           .subscribe(data => 
                     {this.nav.push(this.toastService.getMessage(data["error_msg"]));if(data.error == false) this.nav.setRoot(BarcodePage);
                       this.userData.login(data)});
     }
  
  }

  onSignup() {
    this.nav.push(SignupPage);
  }
}
