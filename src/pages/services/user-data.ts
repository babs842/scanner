import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/map';

import {Events} from 'ionic-angular';
import {Constants} from '../services/constants';


@Injectable()
export class UserData {
	LOGGED_IN = 'loggedIn';
	url: string;

	constructor(public events: Events,
				public http: Http,
				public constants: Constants) {
		this.url = constants.root_dir;
	}

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
	}

	changeUsername(username) {
		var user = {
			id: localStorage.getItem('ma_id'),
			name: localStorage.getItem('username')
		}

		this.http.post(this.url + '/scripte/updateUsername.php', user)
				.toPromise()
				.then(data => {console.log(data.json().userUpdate)})
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
		this.http.post(this.url + '/scripte/updateUserPassword.php', user)
				.toPromise()
				.then(data => console.log(data.json()))
	}
}