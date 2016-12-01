import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
//import {BarcodePage} from '../barcodes/barcodes';
//import {OwnCodePage} from '../ownCode/ownCode';
//import {NavController} from 'ionic-angular';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {ToastService} from '../services/ToastService';
import {UserData} from '../services/user-data';
import {Constants} from '../services/constants';

@Injectable()
export class BarcodeService {
	code: any;
	categories: any;
	url: string;

	constructor(public http: Http,
				public toast: ToastService,
				public userData: UserData,
				public constants: Constants) {
		this.url = constants.root_dir;
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

		var barcode = {
			staff: this.userData.getUsername(),
			categorie: data.categorie,
			barcode: data.barcode,
			quantity: data.quantity,
			description: data.description,
			timeAdd: timeAdd
		}

		return barcode;
	}

	loadCodes() {
		return this.http.get(this.url + '/scripte/selectCode.php')
				.toPromise()
				.then(data => data.json().codes)
	}
	
	saveCode(data) {
		console.log("data in saveCode");
		console.log(data);
		var headers = new Headers();
       	headers.append('Content-Type', 'application/x-www-form-urlencoded');
		return this.http.post(this.url + "/scripte/saveCode.php", data, {
			headers: headers
		})
				.toPromise()
				.then(data => {console.log(data.json());this.toast.getMessage(data.json()["error_msg"])})
	}

	loadCategories() {
		return this.http.get(this.url + "/scripte/getCategories.php")
			.toPromise()
			.then(data => data = data.json().categorie)
	}

	createFirstCategorie() {
		return this.http.get(this.url + "/scripte/createTableCategorie.php")
			.toPromise()
			.then(data => data.json().categorie)
	}

	createCategorie(categorie) {
		return this.http.get(this.url + "/scripte/createCategorie.php?categorie=" + categorie)
			.toPromise()
			.then(data => data.json())
	}
}