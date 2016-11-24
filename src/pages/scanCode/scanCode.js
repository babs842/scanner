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
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { ToastService } from '../services/ToastService';
import { BarcodeService } from '../services/BarcodeService';
export var ScanBarcodePage = (function () {
    function ScanBarcodePage(nav, modal) {
        this.nav = nav;
        this.modal = modal;
    }
    ScanBarcodePage.prototype.ionViewWillEnter = function () {
        this.scanCode();
    };
    ScanBarcodePage.prototype.scanCode = function () {
        /*BarcodeScanner.scan().then((barcodeData) => {
            let modal = this.modal.create(ScanPopover, {newcode: barcodeData});
            modal.present();
            //this.nav.push(ScanPopover, {newcode: barcodeData})
        }, (err) => {
            console.log(err);
        })*/
    };
    ScanBarcodePage = __decorate([
        Component({
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
                    </ion-content>`*/ ''
        }), 
        __metadata('design:paramtypes', [NavController, ModalController])
    ], ScanBarcodePage);
    return ScanBarcodePage;
}());
export var ScanPopover = (function () {
    function ScanPopover(params, http, viewCtrl, nav, barcodeService, toast) {
        var _this = this;
        this.params = params;
        this.http = http;
        this.viewCtrl = viewCtrl;
        this.nav = nav;
        this.barcodeService = barcodeService;
        this.toast = toast;
        this.submitted = false;
        this.newcode = params.get('newcode');
        this.barcodeService.loadCategories().then(function (data) { return _this.categories = data.categorie; });
    }
    /*ionViewWillEnter() {
        this.http.get("../scripte/getCategories.php")
            //.map(res => res.json())
            .subscribe(data => {console.log(data);this.categories = data.json()})
    }*/
    ScanPopover.prototype.saveCode = function (form, newcode) {
        console.log(newcode);
        if (form.valid) {
            var code = this.barcodeService.getDateData(newcode);
            this.barcodeService.saveCode(code);
            this.viewCtrl.dismiss();
        }
    };
    ScanPopover = __decorate([
        Component({
            templateUrl: 'scanPopover.html'
        }), 
        __metadata('design:paramtypes', [NavParams, Http, ViewController, NavController, BarcodeService, ToastService])
    ], ScanPopover);
    return ScanPopover;
}());
//# sourceMappingURL=scanCode.js.map