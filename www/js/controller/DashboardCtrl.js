goiotaAppCtrl.controller('DashboardCtrl', function (
  $rootScope,
  $scope,
  $window,
  $timeout,
  $ionicModal,
  $compile,
  $ionicListDelegate,
  $http,
  $state,
  LoadingService,
  MarketCapService,
  IotaService,
  ToastMsgService
) {


  $scope.$on('$ionicView.enter', function() {

    $scope.initTransactionData();

    $window.initHeaderAnimation("particles-dashboard");

    $scope.initMarketCap();


  });

  $scope.$on('getAccountData:done', function(event,data) {

    LoadingService.hide();
    $scope.initTransactionData();

  });


  $scope.initTransactionData = function () {
    $scope.transactions = [];

    $scope.showZeroTransactions = false;

    $scope.transactions = IotaService.getTransactions();
    $scope.accountData = IotaService.getAccountData();
    $scope.balance = IotaService.getBalance();
  }

  $scope.reloadTransactions = function () {

    LoadingService.show();

    $timeout( function(){

        IotaService.initAccountData();

    }, 500);

  }



  $scope.initMarketCap = function () {
    MarketCapService.getData().then(function(marketCapValue) {
      $scope.marketCapData = marketCapValue;
    })
  }

  $scope.activateMenuBtn = function () {
    $('ion-floating-menu').toggleClass('active');
  }


  $scope.goToMarketCap = function() {
    $state.go('marketCap');
  };

  $scope.goToReceiveMoney = function() {
    $state.go('receiveMoney');
  };


  $scope.goToSendMoney = function() {
    $state.go('sendMoney');
  };

  $scope.copyToClipboard = function (aType,aValue) {
    cordova.plugins.clipboard.copy(aType);
    ToastMsgService.info("COPY." + aType);
  }


  $ionicModal.fromTemplateUrl('transactionDetail-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.transactionDetailModal = modal;
  });

  $scope.openTransactionDetailModal = function(aTransactionDetail) {

    $ionicListDelegate.closeOptionButtons();

    $scope.selectedTransactionDetails = aTransactionDetail;

    $scope.transactionDetailModal.show();

  };

  $scope.closeTransactionDetailModal = function() {
    $scope.transactionDetailModal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.transactionDetailModal.remove();
  });


});
