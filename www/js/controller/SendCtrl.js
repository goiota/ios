goiotaAppCtrl.controller('SendCtrl', function (
  $rootScope,
  $scope,
  $http,
  $state,
  $window,
  $ionicPopup,
  IotaService,
  ToastMsgService,
  LoadingService
) {



  $scope.$on('$ionicView.enter', function() {

    //LoadingService.show();

    $scope.sendData = {};
    $scope.sendData.amount = 0.00;
    $scope.sendData.unit = "i";

    $window.initHeaderAnimation("particles-send");

  });

  $scope.$on('sendTransfer:notEnoughBalance', function(event,data) {
    LoadingService.hide();
    ToastMsgService.error("ERROR.NOT_ENOUGH_BALANCE");
  });

  $scope.$on('sendTransfer:done', function(event,data) {
      LoadingService.hide();
      ToastMsgService.success("INFO.SUCCESS_TRANSACTION");
  });

  $scope.$on('sendTransfer:error', function(event,data) {
      LoadingService.hide();
      ToastMsgService.error("ERROR.GENERAL.ERROR");
  });

  $scope.$on('sendTransfer:addressNotValid', function(event,data) {
    LoadingService.hide();
    ToastMsgService.error("ERROR.ADDRESS_NOT_VALID");
  });


  $scope.transferPayment = function () {



      if(this.sendMoneyForm.$valid) {

            if($scope.isAddress($scope.sendData.address)) {

              if($scope.sendData.amount > 0) {

                  LoadingService.show();

                  IotaService.sendTransfer($scope.sendData);

                } else {
                  ToastMsgService.error("ERROR.ENTER_SEND_AMOUNT");
                }

            } else {
              ToastMsgService.error("ERROR.ADDRESS_NOT_VALID");
            }

      }



  }

  $scope.showConfirmTransactionModal = function() {

    if(this.sendMoneyForm.$valid) {

          if($scope.isAddress($scope.sendData.address)) {

              if($scope.sendData.amount > 0) {

                $scope.changeUnit();

                var confirmPopup = $ionicPopup.confirm({
                  title: 'Confirm Transaction',
                  template: 'Do you really wont to transfer ' +  $scope.sendData.amount + ' ' +  $scope.sendData.unit + ' ?'
                });

                confirmPopup.then(function(res) {
                  if(res) {
                    $scope.transferPayment();
                  } else {

                  }
                });

              } else {
                ToastMsgService.error("ERROR.ENTER_SEND_AMOUNT");
              }

          } else {
            ToastMsgService.error("ERROR.ADDRESS_NOT_VALID");
          }

    }

  };

  $scope.scanQRCode = function () {

    cordova.plugins.barcodeScanner.scan(
       function (result) {

         var aAddress = JSON.parse(result.text).address;

         if($scope.isAddress(aAddress)) {

           $scope.$apply(function () {

            $scope.sendData.address = aAddress;

           });

         } else {
            ToastMsgService.error("ERROR.ADDRESS_NOT_VALID");
         }


       },
       function (error) {

       },
       {
           preferFrontCamera : false,
           showFlipCameraButton : false,
           showTorchButton : true,
           torchOn: true,
           prompt : "Place a barcode inside the scan area",
           resultDisplayDuration: 500,
           formats : "QR_CODE,PDF_417",
           orientation : "landscape",
           disableAnimations : true
       }
    );

  }

  $scope.changeUnit = function () {

    if($scope.sendData.unit == "i") {

      $scope.sendData.amount = parseFloat($scope.sendData.amount);

    }

  }

  $scope.isAddress = function (aAddress) {
    return IotaService.isAddress(aAddress);
  }

  $scope.goToDashboard = function() {
    $state.go('dashboard');
  };



});
