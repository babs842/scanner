import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {LoadingController, AlertController, NavController, ModalController, NavParams} from 'ionic-angular';

import {BarcodeService} from '../services/BarcodeService';
import {ToastService} from '../services/ToastService';

@Component({
	templateUrl: 'categorie.html'
})

export class CategoriePage {
	categories: any;
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
		this.barcodeService.loadCategories().then(data => this.categories = data)
	}

	loadCategories() {
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

	onInput(ev) {
		var val = ev.target.value;
		if(val && val.trim() != '') {
			this.categories = this.categories.filter((categorie) => {
				return (categorie.categorie.toString().toLowerCase().indexOf(val.toLowerCase()) > -1);
			});
		} else {
			this.loadCategories();
		}
	}

	showCodeCategorie(categorie) {
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
		let alert = this.alertCtrl.create({
			title: "Kategorie löschen",
			message: "Soll die Kategorie wirklich gelöscht werden?",
			buttons: [
			{
				text: "Abbrechen"
			},
			{
				text: "Löschen",
				handler: () => {
					this.http.get("/scripte/deleteCategorie.php?categorie=" + categorie)
			.subscribe(data => this.barcodeService.loadCategories().then(data => this.categories = data))
				}
			}]
		});

		alert.present();
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
				<ion-card *ngFor="let codeCategorie of codeCategories">
				<ion-row>
				<ion-col>
				<ion-item>
					Beschreibung: {{codeCategorie.text}}<br>
				</ion-item>
				    <ion-card-content>
				      
				      Menge: {{codeCategorie.anzahl}}<br>
				      Kategorie: {{codeCategorie.categorie}}<br>			          
			          Eigener Text: {{codeCategorie.ownText}}<br>
			          Erstellt: {{codeCategorie.timeAdd}}
				    </ion-card-content>
				    </ion-col>

				    <ion-col>
				    <ion-buttons end>
				            <button ion-button icon-left clear small (click)="editCode(codes)">
				              <ion-icon name="create"></ion-icon>
				                <div>Bearbeiten</div>
				            </button>
				        <hr>
				            <button ion-button icon-left clear small color="danger" (click)="deleteCode(codes)">
				              <ion-icon name="trash"></ion-icon>
				                <div>Delete</div>
				            </button>
				      
				       </ion-buttons>
				        </ion-col>
				    </ion-row>

				</ion-card>  
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

/*
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
*/