var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';
export var UserData = (function () {
    function UserData(events, http) {
        this.events = events;
        this.http = http;
        this.LOGGED_IN = 'loggedIn';
    }
    UserData.prototype.login = function (user) {
        this.setID(user.login.id);
        this.setUsername(user.login.name);
        // this.events.publish('user:login');
    };
    UserData.prototype.logout = function () {
        this.events.publish('user:logout');
    };
    UserData.prototype.setID = function (id) {
        localStorage.setItem('ma_id', id);
    };
    UserData.prototype.getId = function () {
        return localStorage.getItem('ma_id');
    };
    UserData.prototype.setUsername = function (username) {
        localStorage.setItem('username', username);
    };
    UserData.prototype.getUsername = function () {
        return localStorage.getItem('username');
    };
    UserData.prototype.rmData = function () {
        localStorage.removeItem('ma_id');
        localStorage.removeItem('username');
    };
    UserData.prototype.signup = function (data) {
        this.setUsername(data.username);
        this.events.publish('user:signup');
    };
    UserData = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Events, Http])
    ], UserData);
    return UserData;
}());
//# sourceMappingURL=user-data.js.map