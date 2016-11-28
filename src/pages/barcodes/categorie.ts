import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {LoadingController, AlertController, NavController, ModalController, NavParams} from 'ionic-angular';

import {BarcodeService} from '../services/BarcodeService';
//import {OwnCodePage} from '../ownCode/ownCode';
import {ToastService} from '../services/ToastService';

@Component({
	templateUrl: 'categorie.html'
})

export class CategoriePage {
	categories: string[];
	codeCategories: string[];
	barcode: any;

	constructor(public barcodeService: BarcodeService,
				public http: Http,
				private loadingCtrl: LoadingController,
				public nav: NavController,
				public modal: ModalController,
				public toast: ToastService,
				public alertCtrl: AlertController) {
		this.barcodeService.createFirstCategorie();
	}

	ionViewWillEnter() {
		this.barcodeService.loadCategories().then(data => this.categories = data);
	}

	doRefresh(refresher) {
		this.barcodeService.loadCategories().then(data => this.categories = data);

		let loading = this.loadingCtrl.create({
			content: "Lade Kategorien...",
			duration: 2000,
			dismissOnPageChange: true
		});
		loading.present();

		setTimeout(() => {
			refresher.complete();
		}, 500)
	}

	showCodeCategorie(categorie) {
		/*this.http.get("../scripte/showCodeInCategorie.php?categorie=" + categorie)
			.subscribe(data => {console.log(data.json().codeInCategorie);this.codeCategories = data.json().codeInCategorie;
							this.nav.push(CodeInCategorie, this.codeCategories)})*/
		this.nav.push(CodeInCategorie, {categories: categorie});
	}

	createCategorie() {
		//this.nav.push(CreateCategorie);
		let alert = this.alertCtrl.create({
			title: 'Kategorie hinzufügen',
			inputs: [{
				name: 'categorie',
				placeholder: 'Kategorie eingeben'
			}],
			buttons: [{
				text: 'Abbrechen',
				handler: data => {
					console.log("Abgebrochen");
				}
			}, {
				text: 'Speichern',
				handler: data => {
					console.log(data.categorie);
					/*this.http.get("../scripte/createCategorie.php?categorie=" + data.categorie)
						.subscribe(res => {console.log(res.json())})*/
					this.barcodeService.createCategorie(data.categorie);
				}
			}]
		})
		alert.present();
	}

	deleteCategorie(categorie) {
		this.http.get("/scripte/deleteCategorie.php?categorie=" + categorie)
			.subscribe(data => this.barcodeService.loadCategories().then(data => this.categories = data))
	}
}

@Component({
	template: `<ion-header>
				<ion-navbar>
				  <button menuToggle>
				    <ion-icon name="menu"></ion-icon>        
				  </button>

				  <ion-title>Alle Codes</ion-title>

				</ion-navbar>
				</ion-header>

				<ion-content>
		<ion-list *ngFor="let codeCategorie of codeCategories">
        <ion-item>
          Kategorie: {{codeCategorie.categorie}}<br>
          Code: {{codeCategorie.text}}<br>
          Menge: {{codeCategorie.anzahl}}<br>
          Eigener Text: {{codeCategorie.ownText}}<br>
          Erstellt: {{codeCategorie.timeAdd}}
        </ion-item>
        </ion-list>
        </ion-content>
	`
})

export class CodeInCategorie{
	categorie: string[];
	codeCategories: any[];

	constructor(public params: NavParams,
				public http: Http){
		this.categorie = params.get('categories');
	}

	ionViewWillEnter() {
		this.http.get("/scripte/showCodeInCategorie.php?categorie=" + this.categorie)
			.subscribe(data => {this.codeCategories = data.json().codeInCategorie})
	}
}