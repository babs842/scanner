import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {NavController, NavParams, ViewController, ModalController} from 'ionic-angular';

import {BarcodeScanner} from 'ionic-native';
import {OwnCodePage} from '../ownCode/ownCode';
import {ToastService} from '../services/ToastService';
import {BarcodeService} from '../services/BarcodeService';

@Component({
	template: ''
})

export class ScanBarcodePage {
	constructor(public nav: NavController,
				public modal: ModalController) {

	}

	ionViewWillEnter() {
		this.scanCode();
	}
	

	scanCode() {
		BarcodeScanner.scan().then((barcodeData) => {
			this.nav.pop();
			this.nav.push(ScanPopover, {newcode: barcodeData});
		})
	}
}

@Component({
	templateUrl: 'scanPopover.html' 
})

export class ScanPopover {
	newcode: any;
	categories: any;
	submitted = false;

	constructor(public params: NavParams,
				public http: Http,
				public viewCtrl: ViewController,
				public nav: NavController,
				public barcodeService: BarcodeService,
				public toast: ToastService) {
		this.newcode = params.get('newcode');
		this.barcodeService.loadCategories().then(data => this.categories = data);
	}

	saveCode(form, newcode) {
		console.log(newcode);
		if(form.valid) {
			var code = this.barcodeService.getDateData(newcode);
			this.barcodeService.saveCode(code);
			this.viewCtrl.dismiss();
		}
	}
}