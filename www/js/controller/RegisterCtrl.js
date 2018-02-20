goiotaAppCtrl.controller('RegisterCtrl', function (
  $rootScope,
  $scope,
  $window,
  $timeout,
  $ionicSlideBoxDelegate,
  LoadingService,
  AuthService,
  SecureStorageService,
  IotaService
) {


  $scope.registerData = {};

  $scope.$on('$ionicView.enter', function() {

    $scope.isIphoneX = window.device.model.indexOf("10,") != -1;

    $window.initHeaderAnimation("particles-register");


    $scope.createSeed();

    $scope.initQRCode();

  });

  $scope.$on('getAccountData:done', function(event,data) {

    $state.go('dashboard');

  });


  $scope.validatePin = function () {



      if(this.regPinForm.$valid && $scope.registerData.pin.length == 4) {

          $scope.goToNextLoginStep(3);

          if($scope.registerData.useFingerprint) {

            AuthService.activateFingerPrint(true);

            window.plugins.uniqueDeviceID.get(function success(uuid) {

                SecureStorageService.setSeed(uuid,$scope.newSeed);

              },function error(error){}
            );


          } else {

            AuthService.activateFingerPrint(false);

          }


          SecureStorageService.setSeed($scope.registerData.pin,$scope.newSeed);

          IotaService.initIota($scope.newSeed);
          IotaService.initAccountData();

      }



  }


  $scope.createSeed = function () {

    LoadingService.show();

    var _aSeed = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ9";

    for (var i = 0; i < 81; i++) {
      _aSeed += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    $timeout( function(){

      LoadingService.hide();

      $scope.newSeed = _aSeed;


    }, 500);


  }

  $scope.registerNewSeed = function () {

      LoadingService.show();

      IotaService.initIota($scope.newSeed);
      IotaService.initAccountData();

  }

  $scope.initQRCode = function () {

    var options = {
        render: 'canvas',
        crisp:true,
        ecLevel: 'L',
        minVersion: 1,
        fill: '#fff',
        back: '#22313a',
        text: $scope.newSeed,
        size: 125,
        rounded: 50,
        quiet: 0,
        mSize: 18,
        mPosX: 50,
        mPosY: 50
    };

    $('#qrcodeRegister').empty().html(kjua(options));


  }

  $scope.isIphoneX = function () {
    return window.device.model.indexOf("10,") != -1;
  }

  $scope.lockRegSlide = function () {
    $ionicSlideBoxDelegate.$getByHandle('reg-slide').enableSlide(false);
    $ionicSlideBoxDelegate.$getByHandle('reg-slide').update();
  }

  $scope.goToNextLoginStep = function (_step) {
    $ionicSlideBoxDelegate.$getByHandle('reg-slide').slide(_step);
  }


});
