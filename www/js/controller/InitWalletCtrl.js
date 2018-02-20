goiotaAppCtrl.controller('InitWalletCtrl', function (
  $rootScope,
  $scope,
  $ionicModal,
  $compile,
  $ionicListDelegate,
  $http,
  $state,
  LoadingService,
  MarketCapService,
  IotaService
) {


  $scope.$on('$ionicView.enter', function() {

    IotaService.initIota($rootScope.seed);
    IotaService.initAccountData();


  });


  $scope.$on('getAccountData:done', function(event,data) {

    $state.go('dashboard');

  });



});
