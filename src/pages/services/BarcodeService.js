var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { ToastService } from '../services/ToastService';
import { UserData } from '../services/user-data';
export var BarcodeService = (function () {
    function BarcodeService(http, toast, userData) {
        this.http = http;
        this.toast = toast;
        this.userData = userData;
        this.http = http;
    }
    BarcodeService.prototype.getDateData = function (data) {
        var date = new Date();
        var timeAdd = date.getFullYear() + "-";
        timeAdd += (date.getMonth() + 1) + "-";
        timeAdd += date.getDate() + " ";
        timeAdd += date.getHours() + ":";
        timeAdd += date.getMinutes() + ":";
        timeAdd += date.getSeconds();
        // var ma_id = this.userData.getId();
        var barcode = {
            ma: this.userData.getUsername(),
            categorie: data.categorie,
            text: data.text,
            anzahl: data.anzahl,
            ownText: data.ownText,
            timeAdd: timeAdd
        };
        return barcode;
    };
    BarcodeService.prototype.loadCodes = function () {
        return this.http.get('/scripte/selectCode.php')
            .toPromise()
            .then(function (data) { return data.json().codes; });
    };
    BarcodeService.prototype.saveCode = function (data) {
        var _this = this;
        console.log("data in saveCode");
        console.log(data);
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post("/scripte/saveCode.php", data, {
            headers: headers
        })
            .toPromise()
            .then(function (data) { console.log(data.json()); _this.toast.getMessage(data.json()["error_msg"]); });
    };
    // 
    BarcodeService.prototype.loadCategories = function () {
        return this.http.get("/scripte/getCategories.php")
            .toPromise()
            .then(function (data) { return data = data.json().categorie; });
    };
    BarcodeService.prototype.createFirstCategorie = function () {
        return this.http.get("/scripte/createTableCategorie.php")
            .toPromise()
            .then(function (data) { return data.json().categorie; });
    };
    BarcodeService.prototype.createCategorie = function (categorie) {
        return this.http.get("/scripte/createCategorie.php?categorie=" + categorie)
            .toPromise()
            .then(function (data) { return data.json(); });
    };
    BarcodeService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Http, ToastService, UserData])
    ], BarcodeService);
    return BarcodeService;
}());
//# sourceMappingURL=BarcodeService.js.map