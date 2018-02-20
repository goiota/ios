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


  });


  $scope.$on('getAccountData:done', function(event,data) {

    LoadingService.hide();

    $state.go('dashboard');

  });



});
