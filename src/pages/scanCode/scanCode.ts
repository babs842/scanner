import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {Alert, NavController, NavParams, ViewController, ModalController} from 'ionic-angular';

import {BarcodeScanner} from 'ionic-native';
import {OwnCodePage} from '../ownCode/ownCode';
//import {BarcodePage} from '../barcodes/barcodes';
import {ToastService} from '../services/ToastService';
import {BarcodeService} from '../services/BarcodeService';

@Component({
	template: /*`<ion-header>
				<ion-navbar>
				  <button ion-button menuToggle>
				    <ion-icon name="menu"></ion-icon>        
				  </button>

				  <ion-title>Barcode scannen</ion-title>

				</ion-navbar>
				</ion-header>

				<ion-content>
				<ion-card>

			  <ion-card-header>
			    Barcode einscannen
			  </ion-card-header>

			  <ion-card-content>
			  <h2>Folgende Typen werden unterstützt</h2>
			  <ion-list>
			  	<ion-item>QR_CODE</ion-item>
			  	<ion-item>DATA_MATRIX</ion-item>
			  	<ion-item>UPC_E</ion-item>
			  	<ion-item>UPC_A</ion-item>
			  	<ion-item>EAN_8</ion-item>
			  	<ion-item>EAN_13</ion-item>
			  	<ion-item>CODE_128</ion-item>
			  	<ion-item>CODE_39</ion-item>  
			  	<ion-item>CODE_93</ion-item>
			  	<ion-item>CODABAR</ion-item>
			  	<ion-item>ITF</ion-item> 
			  	<ion-item>RSS14</ion-item>
			  	<ion-item>RSS_EXPANDED</ion-item>
			  </ion-list>
			    <button (click)="scanCode()">Jetzt scannen</button>
			  </ion-card-content>

			</ion-card>
			</ion-content>`*/
			''
			
})

export class ScanBarcodePage {
	constructor(public nav: NavController,
				public modal: ModalController) {

	}

	ionViewWillEnter() {
		this.scanCode();
	}
	

	scanCode() {
		/*BarcodeScanner.scan().then((barcodeData) => {
			let modal = this.modal.create(ScanPopover, {newcode: barcodeData});
			modal.present();

			//this.nav.push(ScanPopover, {newcode: barcodeData})
		}, (err) => {
			console.log(err);
		})
		this.nav.pop();*/

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

	/*ionViewWillEnter() {
		this.http.get("/scripte/getCategories.php")
			//.map(res => res.json())
			.subscribe(data => {console.log(data);this.categories = data.json()})
		//this.barcodeService.loadCategories().then(data => this.categories = data.categorie);
	}*/

	saveCode(form, newcode) {
		console.log(newcode);
		if(form.valid) {
			var code = this.barcodeService.getDateData(newcode);
			this.barcodeService.saveCode(code);
			this.viewCtrl.dismiss();
			//this.nav.push(BarcodePage);
		}
	}
}