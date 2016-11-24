import {Injectable} from '@angular/core';
//import {} from 'ionic-native';
import {Platform, ToastController} from 'ionic-angular';

declare var window: any;

@Injectable()
export class ToastService {

	constructor(private platform: Platform,
				public toast: ToastController) {}

	getMessage(res) {
		/*this.platform.ready().then(() => {
			window.plugins.toast.show(res,'1000','center');
				//.subscribe(toast => console.log(toast))
		})*/
		let toast = this.toast.create({
			message: res,
			duration: 1000,
			position: 'bottom'
		});
		toast.present();
	}
}