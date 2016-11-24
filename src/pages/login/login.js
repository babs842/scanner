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
import { NavController } from 'ionic-angular';
import { UserData } from '../services/user-data';
import { ToastService } from '../services/ToastService';
import { BarcodePage } from '../barcodes/barcodes';
import { SignupPage } from '../signup/signup';
export var LoginPage = (function () {
    function LoginPage(nav, userData, toastService, http) {
        this.nav = nav;
        this.userData = userData;
        this.toastService = toastService;
        this.http = http;
        this.login = {};
        //username: any;
        this.submitted = false;
    }
    LoginPage.prototype.onLogin = function (form, login) {
        var _this = this;
        this.submitted = true;
        if (form.valid) {
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            var data = JSON.stringify(login);
            this.http.post("/scripte/checkLogin.php", data, {
                headers: headers
            })
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.toastService.getMessage(data["error_msg"]);
                if (data.error == false)
                    _this.nav.setRoot(BarcodePage);
                _this.userData.login(data);
            });
        }
    };
    LoginPage.prototype.onSignup = function () {
        this.nav.push(SignupPage);
    };
    LoginPage = __decorate([
        Component({
            templateUrl: 'login.html'
        }), 
        __metadata('design:paramtypes', [NavController, UserData, ToastService, Http])
    ], LoginPage);
    return LoginPage;
}());
//# sourceMappingURL=login.js.map