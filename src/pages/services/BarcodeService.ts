import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
//import {BarcodePage} from '../barcodes/barcodes';
//import {OwnCodePage} from '../ownCode/ownCode';
//import {NavController} from 'ionic-angular';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {ToastService} from '../services/ToastService';
import {UserData} from '../services/user-data';
@Injectable()
export class BarcodeService {
	code: any;
	categories: any;

	constructor(public http: Http,
				public toast: ToastService,
				public userData: UserData) {
		this.http = http;
	}

	getDateData(data){
		var date = new Date();
		var timeAdd = date.getFullYear() + "-";
		timeAdd += (date.getMonth() + 1) + "-";
		timeAdd += date.getDate() + " ";
		timeAdd += date.getHours() + ":";
		timeAdd += date.getMinutes() + ":";
		timeAdd += date.getSeconds();

		// var ma_id = this.userData.getId();

		var barcode = {
			ma: this.userData.getUsername(),
			categorie: data.categorie,
			text: data.text,
			anzahl: data.anzahl,
			ownText: data.ownText,
			timeAdd: timeAdd
		}

		return barcode;
	}

	loadCodes() {
		return this.http.get('/scripte/selectCode.php')
				.toPromise()
				.then(data => data.json().codes)
	}
	
	saveCode(data) {
		console.log(data);
		var headers = new Headers();
       	headers.append('Content-Type', 'application/x-www-form-urlencoded');
		return this.http.post("/scripte/saveCode.php", data, {
			headers: headers
		})
				.toPromise()
				.then(data => {console.log(data.json());this.toast.getMessage(data.json()["error_msg"])})
	}
	// 

	loadCategories() {
		return this.http.get("/scripte/getCategories.php")
			.toPromise()
			.then(data => data = data.json().categorie)
	}

	createFirstCategorie() {
		return this.http.get("/scripte/createTableCategorie.php")
			.toPromise()
			.then(data => data.json().categorie)
	}

	createCategorie(categorie) {
		return this.http.get("/scripte/createCategorie.php?categorie=" + categorie)
			.toPromise()
			.then(data => data.json())
	}
}