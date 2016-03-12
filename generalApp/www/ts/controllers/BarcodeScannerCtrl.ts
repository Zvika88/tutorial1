/// <reference path="../app.ts"/>

angular.module('ioneazly').controller('BarcodeScannerCtrl', function($scope, $ionicSideMenuDelegate, $ionicLoading, $cordovaBarcodeScanner, $cordovaDialogs) {

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  // Close the new tutorial modal
  $scope.scanCode = function() {
    $ionicLoading.show({
      template: '<ion-spinner></ion-spinner>'
    });
    console.log("scanCode run");
    if ($scope.currentlyScanning === true) {
      $ionicLoading.hide();
      return;
    } else if (ionic.Platform.platforms.indexOf("browser") !== -1) {
      $ionicLoading.hide();
      $scope.scannedCode = "QR Code scanner not available in development browser.";
      return;
    } else {
      $scope.currentlyScanning = true;
    }
    $cordovaBarcodeScanner
      .scan()
      .then(function(barcodeData) {
        $ionicLoading.hide();
        $scope.currentlyScanning = false;
        $scope.scannedCode = barcodeData.text;
      }, function(error) {
        $ionicLoading.hide();
        $scope.currentlyScanning = false;
        $cordovaDialogs.alert(error, 'barcode Error', 'OK');
      });
  };

});
