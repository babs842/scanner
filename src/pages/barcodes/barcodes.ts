import {Component} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {ActionSheetController, AlertController, LoadingController, NavController} from 'ionic-angular';

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

	constructor(public barcodeService: BarcodeService,
				public http: Http,
				private loadingCtrl: LoadingController,
				public nav: NavController,
				public toast: ToastService,
				public actionSheet: ActionSheetController,
				public alert: AlertController) {
		//barcodes that are given to BarcodePage
		this.barcode = "code";
		//creates first categorie "Allgemein"
		this.barcodeService.createFirstCategorie();
	}

/* 	- function which controlls the input in the searchbar
*	- shows results of the input 
*/
	onInput(ev) {
		var val = ev.target.value;
		if(val && val.trim() != '') {
			this.code = this.code.filter((codes) => {
				return (codes.ownText.toString().toLowerCase().indexOf(val.toLowerCase()) > -1);
			});
		} else {
			this.ionViewWillEnter();
		}
	}

/* manually loads the codes from the database */
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
			this.toast.getMessage("Erfolgreich geladen");
		}, 500)
	}

/* gets all saved codes when sites is entered */
	ionViewWillEnter() {
		this.barcodeService.loadCodes().then(data => this.code = data);
	}

/* edit code */
	editCode(code) {
		this.nav.push(UpdateCodePage, {update: code});
	}

/* delete code */
	deleteCode(code) {
		let alert = this.alert.create({
			title: "Barcode löschen",
			message: "Soll der Barcode wirklich gelöscht werden?",
			buttons: [
			{
				text: "Abbrechen"
			},
			{
				text: "Löschen",
				handler: () => {
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
			}]
		});

		alert.present();
	}

/* by click on the add-sign it will show diffenrent options that can be choosen like 
			scan a new code or type one by yourself */
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

/* shows details of a codes that has been choosen by a click on the card */
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