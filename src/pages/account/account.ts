import { Component } from '@angular/core';

import { AlertController, NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { UserData } from '../services/user-data';


@Component({
  templateUrl: 'account.html',
})
export class AccountPage {
  username: any;

  constructor(public alertCtrl: AlertController, 
              public nav: NavController,
              public userData: UserData) {
  }

  ngAfterViewInit() {
    this.getUsername();
  }

  changeUsername() {
    let alert = this.alertCtrl.create({
      title: 'Username ändern',
      buttons: [
        'Abbruch'
      ]
    });
    alert.addInput({
      name: 'username',
      value: this.username,
      placeholder: 'username'
    });
    alert.addButton({
      text: 'Ändern',
      handler: data => {
        this.userData.setUsername(data.username);
        this.userData.changeUsername(data.username);
        this.getUsername();
      }
    });

    alert.present();
  }

  getUsername() {
    var user = this.userData.getUsername();
    this.username = user;
  }

  changePassword() {
    let alert = this.alertCtrl.create({
      title: 'Passwort ändern',
      buttons: [
        'Abbruch'
      ]
    });
    alert.addInput({
      name: 'password',
      placeholder: 'password'
    });
    alert.addButton({
      text: 'Ändern',
      handler: data => {
        this.userData.changePW(data.password);
      }
    });

    alert.present();
  }

  logout() {
    this.userData.rmData();
    this.nav.setRoot(LoginPage);
  }
}
