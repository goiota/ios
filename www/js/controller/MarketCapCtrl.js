goiotaAppCtrl.controller('MarketCapCtrl', function (
  $rootScope,
  $scope,
  $http,
  $state,
  $window,
  LoadingService,
  MarketCapService,
  IotaService
) {


  $scope.marketCapDisplayUSD = true;

  $scope.$on('$ionicView.enter', function() {

    LoadingService.show();

    $window.initHeaderAnimation("particles-marketcap");

    $scope.getMarketCapValue();

    $scope.balance = IotaService.getBalance();

  });


  $scope.getMarketCapValue = function () {

    MarketCapService.getData().then(function(marketCapValue) {

      $scope.marketValue = marketCapValue;

      setTimeout(function() {
          LoadingService.hide();
      }, 500);


    }).catch(function (_result) {

        LoadingService.hide();

    });

  }


  $scope.goToDashboard = function() {
    $state.go('dashboard');
  };



});
