goiotaAppCtrl.controller('EnterPinCtrl', function (
  $rootScope,
  $scope,
  $state,
  $window,
  $ionicSlideBoxDelegate,
  IotaService,
  SecureStorageService,
  ToastMsgService,
  AuthService,
  LoadingService
) {


  $scope.loginData = {};

  $scope.$on('$ionicView.enter', function() {

      $window.initHeaderAnimation("particles-enterpin");

  });


  $scope.$on('getAccountData:done', function(event,data) {

    LoadingService.hide();

    $state.go('dashboard');

  });

  $scope.$on('initPinCode:done', function(event,data) {

    LoadingService.show();

  });

  $scope.$on('initPinCode:error', function(event,data) {

    LoadingService.hide();

  });

  $scope.validatePin = function () {



      if(this.loginPinForm.$valid && $scope.loginData.pin.length == 4) {

        LoadingService.show();

        SecureStorageService.initPinCode($scope.loginData.pin);



      }



  }


});
