/// <reference path="../../../typings/main.d.ts"/>

class BarcodeScannerCtrl {

  public scannedCode = "";
  private currentlyScanning = false;

  constructor(public $ionicSideMenuDelegate:any,
              public $ionicLoading:any,
              public $cordovaBarcodeScanner:any,
              public $cordovaDialogs:any) {
  }

  // Toggle left menu sidebar
  public toggleLeft = function () {
    this.$ionicSideMenuDelegate.toggleLeft();
  }

  // Close the new tutorial modal
  public scanCode = function () {

    this.$ionicLoading.show({
      template: '<ion-spinner></ion-spinner>'
    });

    if (this.currentlyScanning === true) {
      this.$ionicLoading.hide();
      return;
    } else if (ionic.Platform.platforms.indexOf("browser") !== -1) {
      this.$ionicLoading.hide();
      this.scannedCode = "QR Code scanner not available in development browser.";
      return;
    } else {
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
  }
}

angular.module('ioneazly').controller("BarcodeScannerCtrl", BarcodeScannerCtrl);
