import { Component } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {NavParams, NavController, Toast} from 'ionic-angular';
//import 'rxjs/add/operator/map';
//import './rxjs-operators';

import {UserData} from '../services/user-data';
import {ToastService} from '../services/ToastService';
import {Constants} from '../services/constants';
import {BarcodePage} from '../barcodes/barcodes';
import {SignupPage} from '../signup/signup';


@Component({
  templateUrl: 'login.html'
})
export class LoginPage {
  login: {email?: any, password?: any} = {};
  //username: any;
  submitted = false;
  url: string;

  constructor(public nav: NavController,
              public userData: UserData,
              public toastService: ToastService,
              public http: Http,
              public constants: Constants) {
    this.url = constants.root_dir;
  }

  onLogin(form, login) {
    this.submitted = true;
    if(form.valid) {
       var headers = new Headers();
       headers.append('Content-Type', 'application/x-www-form-urlencoded');
       var data = JSON.stringify(login);
       this.http.post(this.url + "/scripte/checkLoginNew.php", data, {
         headers: headers
        })
         .map(res => res.json())
           .subscribe(data => 
                     {this.toastService.getMessage(data["error_msg"]);if(data.error == false) this.nav.setRoot(BarcodePage);
                       this.userData.login(data)});
     }
  
  }

  onSignup() {
    this.nav.push(SignupPage);
  }
}
