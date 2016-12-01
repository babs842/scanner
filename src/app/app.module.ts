import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BarcodeScannerApp } from './app.component';

import {UserData} from '../pages/services/user-data';
import {ToastService} from '../pages/services/ToastService';
import {BarcodeService} from '../pages/services/BarcodeService';
import {Constants} from '../pages/services/constants';

import {BarcodeScanner} from 'ionic-native';

import { BarcodePage } from '../pages/barcodes/barcodes';
import { UpdateCodePage } from '../pages/barcodes/updateCode';
import {SignupPage} from '../pages/signup/signup';
import {ScanPopover} from '../pages/scanCode/scanCode';
import {CodeInCategorie} from '../pages/barcodes/categorie';
import {LoginPage} from '../pages/login/login';
import {AccountPage} from '../pages/account/account';
import {ScanBarcodePage} from '../pages/scanCode/scanCode';
import {OwnCodePage} from '../pages/ownCode/ownCode';
import {CategoriePage} from '../pages/barcodes/categorie';

@NgModule({
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
    Constants,
    { provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
