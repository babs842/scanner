import {Component} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {LoadingController, NavController, ModalController, NavParams, ViewController} from 'ionic-angular';

import {BarcodeService} from '../services/BarcodeService';
//import {OwnCodePage} from '../ownCode/ownCode';
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
				public viewCtrl: ViewController) {
		this.update = params.get('update');
		this.barcodeService.loadCategories().then(data => this.categories = data);
	}


	updateCode(updateForm, update) {
		console.log(update);
		this.submitted = true;
		if(updateForm.valid) {
			var headers = new Headers();
	       	headers.append('Content-Type', 'application/x-www-form-urlencoded');
			this.http.post("/scripte/updateCode.php", update, {
				headers: headers
			})
				.subscribe(data => this.barcodeService.loadCodes())
			this.viewCtrl.dismiss();
		}
	}
}