var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { LoginPage } from '../pages/login/login';
import { AccountPage } from '../pages/account/account';
import { BarcodePage } from '../pages/barcodes/barcodes';
import { CategoriePage } from '../pages/categories/categorie';
import { UserData } from '../pages/services/user-data';


export var BarcodeScannerApp = (function () {
    function BarcodeScannerApp(platform, menuCtrl, userData) {
        var _this = this;
        this.platform = platform;
        this.menuCtrl = menuCtrl;
        this.userData = userData;
        //this.rootPage = LoginPage;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            _this.rootPage = LoginPage;
        });
        this.appPages = [
            { title: 'Barcodes', component: BarcodePage },
            { title: 'Kategorien', component: CategoriePage },
            // { title: 'Scannen', component: ScanBarcodePage },
            //{ title: 'Eigenen Code erstellen', component: OwnCodePage},
            { title: 'Account', component: AccountPage },
            { title: 'Logout', component: LoginPage }
        ];
    }
    BarcodeScannerApp.prototype.openPage = function (page) {
        var _this = this;
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component).then(function () {
            // wait for the root page to be completely loaded
            // then close the menu
            _this.menuCtrl.close();
        });
        if (page.title == 'Logout') {
            this.userData.rmData();
        }
    };
    __decorate([
        ViewChild(Nav), 
        __metadata('design:type', Nav)
    ], BarcodeScannerApp.prototype, "nav", void 0);
    BarcodeScannerApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }), 
        __metadata('design:paramtypes', [Platform, MenuController, UserData])
    ], BarcodeScannerApp);
    return BarcodeScannerApp;
}());
//# sourceMappingURL=app.component.js.map