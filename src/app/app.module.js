var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BarcodeScannerApp } from './app.component';
import { UserData } from '../pages/services/user-data';
import { ToastService } from '../pages/services/ToastService';
import { BarcodeService } from '../pages/services/BarcodeService';
import { BarcodePage } from '../pages/barcodes/barcodes';
import { UpdateCodePage } from '../pages/barcodes/updateCode';
import { SignupPage } from '../pages/signup/signup';
import { ScanPopover } from '../pages/scanCode/scanCode';
import { CodeInCategorie } from '../pages/barcodes/categorie';
import { LoginPage } from '../pages/login/login';
import { AccountPage } from '../pages/account/account';
import { ScanBarcodePage } from '../pages/scanCode/scanCode';
import { OwnCodePage } from '../pages/ownCode/ownCode';
import { CategoriePage } from '../pages/barcodes/categorie';
export var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                BarcodeScannerApp,
                BarcodePage,
                LoginPage,
                AccountPage,
                ScanBarcodePage,
                OwnCodePage,
                CategoriePage,
                UpdateCodePage,
                SignupPage,
                ScanPopover,
                CodeInCategorie
            ],
            imports: [
                IonicModule.forRoot(BarcodeScannerApp)
            ],
            bootstrap: [IonicApp],
            entryComponents: [
                BarcodeScannerApp,
                BarcodePage,
                LoginPage,
                AccountPage,
                ScanBarcodePage,
                OwnCodePage,
                CategoriePage,
                UpdateCodePage,
                SignupPage,
                ScanPopover,
                CodeInCategorie
            ],
            providers: [
                UserData,
                BarcodeService,
                ToastService,
                { provide: ErrorHandler, useClass: IonicErrorHandler }
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=app.module.js.map