goiotaAppCtrl.controller('LoginCtrl', function (
  $rootScope,
  $scope,
  $state,
  $window,
  $ionicSlideBoxDelegate,
  IotaService,
  ToastMsgService,
  AuthService,
  SecureStorageService
) {


  $scope.loginData = {};


  $scope.$on('$ionicView.enter', function() {

    $scope.isIphoneX = window.device.model.indexOf("10,") != -1;

    $window.initHeaderAnimation("particles-login");

  });

  $scope.$on('getAccountData:done', function(event,data) {

    $state.go('dashboard');

  });


  $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
    $scope.introSlider = data.slider;
  });

  $scope.$on("$ionicSlides.slideChangeStart", function(event, data){
    console.log('Slide change is beginning');
  });



  $scope.login = function () {



      if(this.loginForm.$valid) {

          $scope.goToNextLoginStep(1);

      } else {
        ToastMsgService.error("ERROR.SEED_NOT_VALID");
      }



  }

  $scope.validatePin = function () {



      if(this.loginPinForm.$valid && $scope.loginData.pin.length == 4) {

          $scope.goToNextLoginStep(3);

          if($scope.loginData.useFingerprint) {

            AuthService.activateFingerPrint(true);

            window.plugins.uniqueDeviceID.get(function success(uuid) {

                SecureStorageService.setSeed(uuid,$scope.loginData.seed,true);

              },function error(error){}
            );


          } else {

            AuthService.activateFingerPrint(false);

          }


          SecureStorageService.setSeed($scope.loginData.pin,$scope.loginData.seed,false);

          IotaService.initIota($scope.loginData.seed);
          IotaService.initAccountData();

      }



  }

  $scope.scanQRCode = function () {

    cordova.plugins.barcodeScanner.scan(
       function (result) {

           $scope.$apply(function () {

            $scope.loginData.seed = result.text;

           });


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


  $scope.lockLoginSlide = function () {
    $ionicSlideBoxDelegate.$getByHandle('login-slide').enableSlide(false);
    $ionicSlideBoxDelegate.$getByHandle('login-slide').update();
  }

  $scope.goToNextLoginStep = function (_step) {

    $ionicSlideBoxDelegate.$getByHandle('login-slide').slide(_step);

  }

});
