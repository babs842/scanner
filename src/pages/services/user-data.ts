import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/map';

import {Events} from 'ionic-angular';


@Injectable()
export class UserData {
	LOGGED_IN = 'loggedIn';

	constructor(public events: Events,
				public http: Http) {}

	login(user) {
		this.setID(user.login.id);
		this.setUsername(user.login.name);
		// this.events.publish('user:login');
	}

	logout() {
		this.events.publish('user:logout');
	}

	setID(id) {
		localStorage.setItem('ma_id', id);
	}

	getId() {
		return localStorage.getItem('ma_id');
	}

	setUsername(username) {
		localStorage.setItem('username', username);
	}

	getUsername() {
		return localStorage.getItem('username');
	}

	rmData() {
		localStorage.removeItem('ma_id');
		localStorage.removeItem('username');
	}

	signup(data) {
		this.setUsername(data.username);
		this.events.publish('user:signup');
	}

	getPicture() {
		console.log("Bild geholt");
		var img = new HTMLImageElement;
		img.setAttribute("src", "../../assets/img/IMG_0464.JPG");
		return document.getElementById("userImg").appendChild(img);
		
	}
}