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
import { NavController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastService } from '../services/ToastService';
import { LoginPage } from '../login/login';
import { UserData } from '../services/user-data';
export var SignupPage = (function () {
    function SignupPage(nav, userData, http, toastService) {
        this.nav = nav;
        this.userData = userData;
        this.http = http;
        this.toastService = toastService;
        this.signup = {};
        this.submitted = false;
    }
    SignupPage.prototype.onSignup = function (form, signup) {
        var _this = this;
        this.submitted = true;
        if (form.valid) {
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            var data = JSON.stringify(signup);
            this.http.post("/scripte/register.php", data, {
                headers: headers
            })
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.nav.push(_this.toastService.getMessage(data["error_msg"]));
                if (data["error"] == false) {
                    _this.nav.setRoot(LoginPage);
                }
            });
        }
    };
    SignupPage = __decorate([
        Component({
            templateUrl: 'signup.html'
        }), 
        __metadata('design:paramtypes', [NavController, UserData, Http, ToastService])
    ], SignupPage);
    return SignupPage;
}());
//# sourceMappingURL=signup.js.map