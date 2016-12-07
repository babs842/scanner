import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { InventurApp } from './app.component';

import {UserData} from '../pages/services/user-data';
import {ToastService} from '../pages/services/ToastService';
import {BarcodeService} from '../pages/services/BarcodeService';
import {Constants} from '../pages/services/constants';

import {BarcodeScanner} from 'ionic-native';

import { BarcodePage } from '../pages/barcodes/barcodes';
import { UpdateCodePage } from '../pages/barcodes/updateCode';
import {SignupPage} from '../pages/signup/signup';
import {ScanPopover} from '../pages/scanCode/scanCode';
import {CodeInCategorie} from '../pages/categories/categorie';
import {LoginPage} from '../pages/login/login';
import {AccountPage} from '../pages/account/account';
import {ScanBarcodePage} from '../pages/scanCode/scanCode';
import {OwnCodePage} from '../pages/ownCode/ownCode';
import {CategoriePage} from '../pages/categories/categorie';
import {InventuryPage} from '../pages/inventury/inventury';

@NgModule({
  declarations: [
    InventurApp,
    BarcodePage,
    LoginPage,
    AccountPage,
    ScanBarcodePage,
    OwnCodePage,
    CategoriePage,
    UpdateCodePage,
    SignupPage,
    ScanPopover,
    CodeInCategorie,
    InventuryPage
  ],
  imports: [
    IonicModule.forRoot(InventurApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    InventurApp,
    BarcodePage,
    LoginPage,
    AccountPage,
    ScanBarcodePage,
    OwnCodePage,
    CategoriePage,
    UpdateCodePage,
    SignupPage,
    ScanPopover,
    CodeInCategorie,
    InventuryPage
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
