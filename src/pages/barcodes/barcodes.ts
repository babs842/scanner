import {Component} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {ActionSheetController, AlertController, LoadingController, NavController, ModalController, NavParams, ViewController} from 'ionic-angular';

import {BarcodeService} from '../services/BarcodeService';
import {OwnCodePage} from '../ownCode/ownCode';
import {ToastService} from '../services/ToastService';
import {UpdateCodePage} from '../barcodes/updateCode';
import {ScanBarcodePage} from '../scanCode/scanCode';

@Component({
	templateUrl: 'barcodes.html'
})

export class BarcodePage {
	code: any;
	update: any;
	categories: any;
	codeCategories: any;
	barcode: any;
	showList = false;

	items: any;

	constructor(public barcodeService: BarcodeService,
				public http: Http,
				private loadingCtrl: LoadingController,
				public nav: NavController,
				public modal: ModalController,
				public toast: ToastService,
				public actionSheet: ActionSheetController,
				public alert: AlertController) {
		this.barcode = "code";
		this.barcodeService.createFirstCategorie();
		this.initializeItems();
	}

	initializeItems() {
		this.http.get("/scripte/selectCode.php")
					.subscribe(data => {console.log(data);
						this.items = data.json().codes;
						console.log(this.items.text)});
		
	}

	onInput(ev) {
		this.showList = true;
		this.initializeItems();
		var val = ev.target.value;

		/*for(var i = 0; i < this.code.length; i++) {
			if(val == this.code) {
				this.code = (this.code).filter((code) => {
					return code;
				});
			}
		}*/

		if(val && val.trim() != '') {
			//if(val.value == this.code.value) {
				this.items = this.items.filter((item) => {
					return (item.toString().toLowerCase().indexOf(val.toLowerCase()) > -1);
					//return item;
				});
			//}
		} else {
			this.showList = false;
		}
	}
 
	loading(refresher) {
		this.barcodeService.loadCodes().then(data => this.code = data);

		let loading = this.loadingCtrl.create({
			content: "Lade Barcodes...",
			duration: 2000,
			dismissOnPageChange: true
		});
		loading.present();

		setTimeout(() => {
			refresher.complete();
		}, 500)
	}

	ionViewWillEnter() {
		this.barcodeService.loadCodes().then(data => this.code = data);
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

	showOptions() {
		let choice = this.actionSheet.create({
			title: "Hinzufügen",
			enableBackdropDismiss: true,
			buttons: [
			{ 
				text: "Scannen",
				icon: "md-qr-scanner",
				handler: () => {
					this.nav.push(ScanBarcodePage);
				}
			},
			{
				text: "Eigenen Code erstellen",
				icon: "md-create",
				handler: () => {
					this.nav.push(OwnCodePage);
				}
			},
			{
				text: "Abbruch",
				icon: "md-close",
				role: "cancel"
			}
			]
		});
		choice.present();
	}

	showCode(codes) {
		let details = this.alert.create({
			title: "Details",
			message: "<b>Text: </b>" + codes.ownText + 
						"<br><b>Erstellt: </b>" + codes.timeAdd + 
						"<br><b>Mitarbeiter: </b>" + codes.ma,
			buttons: ["Ok"]
		});
		details.present();
	} 
}