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
import { NavParams, ViewController } from 'ionic-angular';
import { BarcodeService } from '../services/BarcodeService';
import { UserData } from '../services/user-data';
export var UpdateCodePage = (function () {
    function UpdateCodePage(params, http, barcodeService, userData, viewCtrl) {
        var _this = this;
        this.params = params;
        this.http = http;
        this.barcodeService = barcodeService;
        this.userData = userData;
        this.viewCtrl = viewCtrl;
        this.submitted = false;
        this.update = params.get('update');
        this.barcodeService.loadCategories().then(function (data) { return _this.categories = data; });
    }
    UpdateCodePage.prototype.updateCode = function (updateForm, update) {
        var _this = this;
        var newCode = {
            id: update.id,
            ma: this.userData.getUsername(),
            categorie: update.categorie,
            text: update.text,
            anzahl: update.anzahl,
            ownText: update.ownText,
            timeAdd: update.timeAdd
        };
        console.log(newCode);
        this.submitted = true;
        if (updateForm.valid) {
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            this.http.post("/scripte/updateCode.php", newCode, {
                headers: headers
            })
                .subscribe(function (data) { console.log(data.json()); _this.barcodeService.loadCodes(); });
            this.viewCtrl.dismiss();
        }
    };
    UpdateCodePage = __decorate([
        Component({
            templateUrl: 'updateCode.html'
        }), 
        __metadata('design:paramtypes', [NavParams, Http, BarcodeService, UserData, ViewController])
    ], UpdateCodePage);
    return UpdateCodePage;
}());
//# sourceMappingURL=updateCode.js.map