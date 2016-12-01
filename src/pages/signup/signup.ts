import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

import {ToastService} from '../services/ToastService';
import {LoginPage} from '../login/login';
import {Constants} from '../services/constants';
import {UserData} from '../services/user-data';

@Component({
	templateUrl: 'signup.html'
})

export class SignupPage {
	signup: {username?: string, email?: string, password?: any} = {};
	submitted = false;
	url: string;

	constructor(public nav: NavController, 
				public userData: UserData,
				public http: Http,
				public toastService: ToastService,
				public constants: Constants) {
		this.url = constants.root_dir;
	}

	onSignup(form, signup) {
		this.submitted = true;
		if(form.valid) {
			var headers = new Headers();
		    headers.append('Content-Type', 'application/x-www-form-urlencoded');
		    var data = JSON.stringify(signup);
		    this.http.post(this.url + "/scripte/register.php", data, {
		    	headers: headers
		    })
		    .map(res => res.json())
		       .subscribe(data => {this.nav.push(this.toastService.getMessage(data["error_msg"]));
		                if(data["error"] == false){this.nav.setRoot(LoginPage)}});
		}
	}
}