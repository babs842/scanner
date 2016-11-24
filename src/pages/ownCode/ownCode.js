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
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { BarcodeService } from '../services/BarcodeService';
import { ToastService } from '../services/ToastService';
import { BarcodePage } from '../barcodes/barcodes';
export var OwnCodePage = (function () {
    function OwnCodePage(barcodeService, http, nav, toastService, params, viewCtrl) {
        this.barcodeService = barcodeService;
        this.http = http;
        this.nav = nav;
        this.toastService = toastService;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.owncode = {};
        this.submitted = false;
        this.barcodeService.createFirstCategorie();
    }
    OwnCodePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.barcodeService.loadCategories().then(function (data) { return _this.categories = data; });
    };
    OwnCodePage.prototype.createOwnCode = function (form, owncode) {
        this.submitted = true;
        if (form.valid) {
            var code = this.barcodeService.getDateData(owncode);
            this.barcodeService.saveCode(code);
            this.nav.setRoot(BarcodePage);
        }
    };
    OwnCodePage = __decorate([
        Component({
            templateUrl: 'ownCode.html'
        }), 
        __metadata('design:paramtypes', [BarcodeService, Http, NavController, ToastService, NavParams, ViewController])
    ], OwnCodePage);
    return OwnCodePage;
}());
//# sourceMappingURL=ownCode.js.map