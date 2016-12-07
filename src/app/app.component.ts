import { Component, ViewChild } from '@angular/core';
import { MenuController, Nav, Platform } from 'ionic-angular';
import { Splashscreen, StatusBar } from 'ionic-native';

import {LoginPage} from '../pages/login/login';
import {AccountPage} from '../pages/account/account';
import {ScanBarcodePage} from '../pages/scanCode/scanCode';
import {BarcodePage} from '../pages/barcodes/barcodes';
import {CategoriePage} from '../pages/categories/categorie';
import {OwnCodePage} from '../pages/ownCode/ownCode';
import {InventuryPage} from '../pages/inventury/inventury';

import {UserData} from '../pages/services/user-data';



@Component({
  templateUrl: 'app.html'
})
export class InventurApp {

	rootPage: any;
	appPages: Array<{title: string, component: any}>;
  
  @ViewChild(Nav) nav: Nav;

  constructor(public platform: Platform,
              public menuCtrl: MenuController,
              public userData: UserData) {
    //this.rootPage = LoginPage;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      //this.rootPage = LoginPage;
      //this.listenToLoginEvents();

      if (this.userData.getUsername() !== null) {
          this.rootPage = InventuryPage;
      } else {
        this.rootPage = LoginPage;
      }
    });

    this.appPages = [
      { title: 'Inventur', component: InventuryPage},
      //{ title: 'Barcodes', component: BarcodePage },
      { title: 'Kategorien', component: CategoriePage },
     // { title: 'Scannen', component: ScanBarcodePage },
      //{ title: 'Eigenen Code erstellen', component: OwnCodePage},
      { title: 'Account', component: AccountPage},
      { title: 'Logout', component: LoginPage}
    ];
  }

  openPage(page: any) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component).then(() => {
      // wait for the root page to be completely loaded
      // then close the menu
      this.menuCtrl.close();
    });

    if(page.title == 'Logout') {
      this.userData.rmData();
    }
  }
}
