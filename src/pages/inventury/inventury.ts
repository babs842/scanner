import {Component} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {ActionSheetController, AlertController, LoadingController, NavController} from 'ionic-angular';

import {BarcodeService} from '../services/BarcodeService';
import {OwnCodePage} from '../ownCode/ownCode';
import {ToastService} from '../services/ToastService';
import {Constants} from '../services/constants';
import {UpdateCodePage} from '../barcodes/updateCode';
import {ScanBarcodePage} from '../scanCode/scanCode';
import {BarcodePage} from '../barcodes/barcodes';
 
@Component({
  templateUrl: 'inventury.html'
})

export class InventuryPage {
  inventury: any;
  url: string;
  inventury_date;

  constructor(public actionSheet: ActionSheetController,
              public nav: NavController,
              public http: Http,
              public barcodeService: BarcodeService,
              public con: Constants) {
    this.url = con.root_dir;
    this.inventury_date = this.barcodeService.getToday();
  }

  ionViewWillEnter() {
    this.http.get(this.url + '/inventury.php')
        .subscribe(data => {this.inventury = data.json().inventury})
  }

  onInput(ev) {
    var val = ev.target.value;
    if(val && val.trim() != '') {
      this.inventury = this.inventury.filter((inventury) => {
        return (inventury.timeAdd.toString().toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    } else {
      this.ionViewWillEnter();
    }
  }

  startInventury() {
    this.http.get(this.url + '/createInventury.php')
      .subscribe(data => this.nav.push(BarcodePage, {barcode: this.inventury_date}));
  }

  showInventury(timeAdd) {
    this.nav.push(BarcodePage, {barcode: timeAdd});
  }
}