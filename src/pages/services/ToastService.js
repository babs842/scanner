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
import { Platform, ToastController } from 'ionic-angular';
export var ToastService = (function () {
    function ToastService(platform, toast) {
        this.platform = platform;
        this.toast = toast;
    }
    ToastService.prototype.getMessage = function (res) {
        /*this.platform.ready().then(() => {
            window.plugins.toast.show(res,'1000','center');
                //.subscribe(toast => console.log(toast))
        })*/
        var toast = this.toast.create({
            message: res,
            duration: 1000,
            position: 'bottom'
        });
        toast.present();
    };
    ToastService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Platform, ToastController])
    ], ToastService);
    return ToastService;
}());
//# sourceMappingURL=ToastService.js.map