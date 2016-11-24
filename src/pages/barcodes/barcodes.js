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
import { Http, Headers } from '@angular/http';
import { ActionSheetController, LoadingController, NavController, ModalController } from 'ionic-angular';
import { BarcodeService } from '../services/BarcodeService';
import { OwnCodePage } from '../ownCode/ownCode';
import { ToastService } from '../services/ToastService';
import { UpdateCodePage } from '../barcodes/updateCode';
import { ScanBarcodePage } from '../scanCode/scanCode';
export var BarcodePage = (function () {
    function BarcodePage(barcodeService, http, loadingCtrl, nav, modal, toast, actionSheet) {
        this.barcodeService = barcodeService;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.nav = nav;
        this.modal = modal;
        this.toast = toast;
        this.actionSheet = actionSheet;
        this.barcode = "code";
    }
    BarcodePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.barcodeService.loadCodes().then(function (data) { return _this.code = data; });
        this.barcodeService.createFirstCategorie();
    };
    BarcodePage.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.barcodeService.loadCodes().then(function (data) { return _this.code = data; });
        setTimeout(function () {
            refresher.complete();
        }, 1000);
    };
    BarcodePage.prototype.editCode = function (code) {
        this.nav.push(UpdateCodePage, { update: code });
    };
    BarcodePage.prototype.deleteCode = function (code) {
        var _this = this;
        console.log(code);
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post("/scripte/deleteCode.php", code, {
            headers: headers
        })
            .subscribe(function (data) {
            console.log(data);
            _this.toast.getMessage(data.json()["error_msg"]);
            _this.barcodeService.loadCodes().then(function (data) { return _this.code = data; });
        });
    };
    BarcodePage.prototype.showOptions = function () {
        var _this = this;
        var choice = this.actionSheet.create({
            buttons: [
                {
                    text: "Scannen",
                    handler: function () {
                        _this.nav.push(ScanBarcodePage);
                    }
                },
                {
                    text: "Eigenen Code erstellen",
                    handler: function () {
                        _this.nav.push(OwnCodePage);
                    }
                },
                {
                    text: "Abbruch",
                    role: "cancel"
                }
            ]
        });
        choice.present();
    };
    BarcodePage = __decorate([
        Component({
            templateUrl: 'barcodes.html'
        }), 
        __metadata('design:paramtypes', [BarcodeService, Http, LoadingController, NavController, ModalController, ToastService, ActionSheetController])
    ], BarcodePage);
    return BarcodePage;
}());
//# sourceMappingURL=barcodes.js.map