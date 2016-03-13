/// <reference path="../../../typings/main.d.ts"/>
var BarcodeScannerCtrl = (function () {
    BarcodeScannerCtrl.$inject = ['$ionicSideMenuDelegate', '$ionicLoading', '$cordovaBarcodeScanner', '$cordovaDialogs'];
    function BarcodeScannerCtrl($ionicSideMenuDelegate, $ionicLoading, $cordovaBarcodeScanner, $cordovaDialogs) {
        this.$ionicSideMenuDelegate = $ionicSideMenuDelegate;
        this.$ionicLoading = $ionicLoading;
        this.$cordovaBarcodeScanner = $cordovaBarcodeScanner;
        this.$cordovaDialogs = $cordovaDialogs;
        this.scannedCode = "";
        this.currentlyScanning = false;
        // Toggle left menu sidebar
        this.toggleLeft = function () {
            this.$ionicSideMenuDelegate.toggleLeft();
        };
        // Close the new tutorial modal
        this.scanCode = function () {
            this.$ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });
            if (this.currentlyScanning === true) {
                this.$ionicLoading.hide();
                return;
            }
            else if (ionic.Platform.platforms.indexOf("browser") !== -1) {
                this.$ionicLoading.hide();
                this.scannedCode = "QR Code scanner not available in development browser.";
                return;
            }
            else {
                this.currentlyScanning = true;
            }
            this.$cordovaBarcodeScanner
                .scan()
                .then(function (barcodeData) {
                this.$ionicLoading.hide();
                this.currentlyScanning = false;
                this.scannedCode = barcodeData.text;
            }, function (error) {
                this.$ionicLoading.hide();
                this.currentlyScanning = false;
                this.$cordovaDialogs.alert(error, 'barcode Error', 'OK');
            });
        };
    }
    return BarcodeScannerCtrl;
}());
angular.module('ioneazly').controller("BarcodeScannerCtrl", BarcodeScannerCtrl);
