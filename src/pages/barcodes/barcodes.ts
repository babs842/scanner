import {Component} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {LoadingController, NavController, ModalController, NavParams, ViewController} from 'ionic-angular';

import {BarcodeService} from '../services/BarcodeService';
//import {OwnCodePage} from '../ownCode/ownCode';
import {ToastService} from '../services/ToastService';
import {UpdateCodePage} from '../barcodes/updateCode';

@Component({
	templateUrl: 'barcodes.html'
})

export class BarcodePage {
	code: any;
	update: any;
	categories: any;
	codeCategories: any;
	barcode: any;

	constructor(public barcodeService: BarcodeService,
				public http: Http,
				private loadingCtrl: LoadingController,
				public nav: NavController,
				public modal: ModalController,
				public toast: ToastService) {
		this.barcode = "code";
	}

	ionViewWillEnter() {
		this.barcodeService.loadCodes().then(data => this.code = data);
		this.barcodeService.createFirstCategorie();
	}

	doRefresh(refresher) {
		this.barcodeService.loadCodes().then(data => this.code = data);

		setTimeout(() => {
			refresher.complete();
		}, 1000);
	}

	editCode(code) {
		this.nav.push(UpdateCodePage, {update: code});
	}

	deleteCode(code) {
		console.log(code);
		var headers = new Headers();
       	headers.append('Content-Type', 'application/x-www-form-urlencoded');
		this.http.post("/scripte/deleteCode.php", code, {
			headers: headers
		})
			.subscribe(data => {console.log(data);
						this.toast.getMessage(data.json()["error_msg"]);
						this.barcodeService.loadCodes().then(data => this.code = data)
					})
	}
}