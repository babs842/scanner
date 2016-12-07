var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { LoadingController, AlertController, NavController, ModalController, NavParams } from 'ionic-angular';
import { BarcodeService } from '../services/BarcodeService';
import { ToastService } from '../services/ToastService';
export var CategoriePage = (function () {
    function CategoriePage(barcodeService, http, loadingCtrl, nav, modal, toast, alertCtrl) {
        this.barcodeService = barcodeService;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.nav = nav;
        this.modal = modal;
        this.toast = toast;
        this.alertCtrl = alertCtrl;
        this.barcodeService.createFirstCategorie();
    }
    CategoriePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.barcodeService.loadCategories().then(function (data) { return _this.categories = data; });
    };
    CategoriePage.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.barcodeService.loadCategories().then(function (data) { return _this.categories = data; });
        setTimeout(function () {
            refresher.complete();
        }, 1000);
    };
    CategoriePage.prototype.showCodeCategorie = function (categorie) {
        /*this.http.get("../scripte/showCodeInCategorie.php?categorie=" + categorie)
            .subscribe(data => {console.log(data.json().codeInCategorie);this.codeCategories = data.json().codeInCategorie;
                            this.nav.push(CodeInCategorie, this.codeCategories)})*/
        this.nav.push(CodeInCategorie, { categories: categorie });
    };
    CategoriePage.prototype.createCategorie = function () {
        var _this = this;
        //this.nav.push(CreateCategorie);
        var alert = this.alertCtrl.create({
            title: 'Kategorie hinzufügen',
            inputs: [{
                    name: 'categorie',
                    placeholder: 'Kategorie eingeben'
                }],
            buttons: [{
                    text: 'Abbrechen',
                    handler: function (data) {
                        console.log("Abgebrochen");
                    }
                }, {
                    text: 'Speichern',
                    handler: function (data) {
                        console.log(data.categorie);
                        /*this.http.get("../scripte/createCategorie.php?categorie=" + data.categorie)
                            .subscribe(res => {console.log(res.json())})*/
                        _this.barcodeService.createCategorie(data.categorie);
                    }
                }]
        });
        alert.present();
    };
    CategoriePage.prototype.deleteCategorie = function (categorie) {
        var _this = this;
        this.http.get("/scripte/deleteCategorie.php?categorie=" + categorie)
            .subscribe(function (data) { return _this.barcodeService.loadCategories().then(function (data) { return _this.categories = data; }); });
    };
    CategoriePage = __decorate([
        Component({
            templateUrl: 'categorie.html'
        }), 
        __metadata('design:paramtypes', [BarcodeService, Http, LoadingController, NavController, ModalController, ToastService, AlertController])
    ], CategoriePage);
    return CategoriePage;
}());
export var CodeInCategorie = (function () {
    function CodeInCategorie(params, http) {
        this.params = params;
        this.http = http;
        this.categorie = params.get('categories');
    }
    CodeInCategorie.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.http.get("/scripte/showCodeInCategorie.php?categorie=" + this.categorie)
            .subscribe(function (data) { _this.codeCategories = data.json().codeInCategorie; });
    };
    CodeInCategorie = __decorate([
        Component({
            template: "<ion-header>\n\t\t\t\t<ion-navbar>\n\t\t\t\t  <button menuToggle>\n\t\t\t\t    <ion-icon name=\"menu\"></ion-icon>        \n\t\t\t\t  </button>\n\n\t\t\t\t  <ion-title>Alle Codes</ion-title>\n\n\t\t\t\t</ion-navbar>\n\t\t\t\t</ion-header>\n\n\t\t\t\t<ion-content>\n\t\t<ion-list *ngFor=\"let codeCategorie of codeCategories\">\n        <ion-item>\n          Kategorie: {{codeCategorie.categorie}}<br>\n          Code: {{codeCategorie.text}}<br>\n          Menge: {{codeCategorie.anzahl}}<br>\n          Eigener Text: {{codeCategorie.ownText}}<br>\n          Erstellt: {{codeCategorie.timeAdd}}\n        </ion-item>\n        </ion-list>\n        </ion-content>\n\t"
        }), 
        __metadata('design:paramtypes', [NavParams, Http])
    ], CodeInCategorie);
    return CodeInCategorie;
}());
//# sourceMappingURL=categorie.js.map