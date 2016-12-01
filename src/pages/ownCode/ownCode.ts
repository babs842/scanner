import {Component} from '@angular/core';
import {Http, Headers} from '@angular/http';

import {NavController, NavParams, ViewController} from 'ionic-angular';

/*import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';*/

import {BarcodeService} from '../services/BarcodeService';
import {ToastService} from '../services/ToastService';

import {BarcodePage} from '../barcodes/barcodes';

@Component({
	templateUrl: 'ownCode.html'
})

export class OwnCodePage {
	owncode: {categorie?: string, barcode?: string, quantity?: number, description?: string, timeAdd?: any} = {};
	submitted = false;
	categories: any;
	barcode: any;

	constructor(public barcodeService: BarcodeService,
				public http: Http,
				public nav: NavController,
				public toastService: ToastService,
				public params: NavParams,
				public viewCtrl: ViewController) {
		this.barcodeService.createFirstCategorie();
	}

	ionViewWillEnter() {
		this.barcodeService.loadCategories().then(data => this.categories = data);		
	}

	createOwnCode(form, owncode) {
		this.submitted = true;
		if(form.valid) {
			var code = this.barcodeService.getDateData(owncode);
			this.barcodeService.saveCode(code);
			this.nav.setRoot(BarcodePage);
		}
	}
}