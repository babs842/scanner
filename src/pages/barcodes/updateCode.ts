import {Component} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {LoadingController, NavController, ModalController, NavParams, ViewController} from 'ionic-angular';

import {BarcodeService} from '../services/BarcodeService';
import {UserData} from '../services/user-data';
import {ToastService} from '../services/ToastService';

@Component({
	templateUrl: 'updateCode.html'
})

export class UpdateCodePage {
	categories: any;
	update: any;
	code: any;
	submitted = false;

	constructor(public params: NavParams,
				public http: Http,
				public barcodeService: BarcodeService,
				public userData: UserData,
				public viewCtrl: ViewController) {
		this.update = params.get('update');
		this.barcodeService.loadCategories().then(data => this.categories = data);
	}


	updateCode(updateForm, update) {
		var newCode = {
			id: update.id,
			staff: this.userData.getUsername(),
			categorie: update.categorie,
			barcode: update.barcode,
			quantity: update.quantity,
			description: update.description,
			timeAdd: update.timeAdd
		}

		console.log(newCode);

		this.submitted = true;
		if(updateForm.valid) {
			var headers = new Headers();
	       	headers.append('Content-Type', 'application/x-www-form-urlencoded');
			this.http.post("/scripte/updateCode.php", newCode, {
				headers: headers
			})
				.subscribe(data => {console.log(data.json());this.barcodeService.loadCodes()})
			this.viewCtrl.dismiss();
		}
	}
}