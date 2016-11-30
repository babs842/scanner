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
		var user = {
			id: localStorage.getItem('ma_id'),
			name: localStorage.getItem('username')
		}

		this.http.post('/scripte/updateUsername.php', user)
				.toPromise()
				.then(data => console.log(data.json()))
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

	changePW(password) {
		var user = {
			id: localStorage.getItem('ma_id'),
			name: localStorage.getItem('username'),
			password: password
		}
		this.http.post('/scripte/updateUserPassword.php', user)
				.toPromise()
				.then(data => console.log(data.json()))
	}
}