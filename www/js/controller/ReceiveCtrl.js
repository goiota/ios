goiotaAppCtrl.controller('ReceiveCtrl', function (
  $rootScope,
  $scope,
  $http,
  $state,
  $window,
  IotaService,
  LoadingService,
  ToastMsgService
) {



  $scope.$on('$ionicView.enter', function() {

    $scope.accountData = IotaService.getAccountData();
    $scope.receiveAddress = IotaService.getReceiveAddress().checkSumAddress;

    $window.initHeaderAnimation("particles-receive");

    $scope.initQRCode();

  });

  $scope.$on('getAccountData:done', function(event,data) {


    LoadingService.hide();


    $scope.$apply(function () {

        $scope.accountData = IotaService.getAccountData();
        $scope.receiveAddress = IotaService.getReceiveAddress().checkSumAddress;

        $scope.initQRCode();

    });



  });

  $scope.$on('getNewAddress:done', function(event,data) {


    IotaService.initAccountData();


  });

  $scope.$on('getNewAddress:error', function(event,data) {


    LoadingService.hide();

    ToastMsgService.error("ERROR.NODE_DOES_NOT_SUPPORT_ATTACH_TO_TANGLE");

  });


  $scope.getNewAddress = function () {

    LoadingService.show();

    IotaService.getNewAddress();

  }


  $scope.initQRCode = function () {

    var options = {
        render: 'canvas',
        crisp:true,
        ecLevel: 'L',
        minVersion: 1,
        fill: '#fff',
        back: '#22313a',
        text: $scope.getQRCodeData(),
        size: 125,
        rounded: 50,
        quiet: 0,
        mSize: 18,
        mPosX: 50,
        mPosY: 50
    };

    $('#qrcodeReceive').empty().html(kjua(options));


  }

  $scope.getQRCodeData = function () {
    return JSON.stringify(
      {
        'address': $scope.receiveAddress
      }
    )
  }

  $scope.sendEmail = function () {
      cordova.plugins.email.open({
      subject:     'My Iota Wallet',
      attachments: [$('#qrcodeReceive canvas')[0].toDataURL().replace('data:image/png;base64,','base64:icon.png//')],
      body:  $scope.receiveAddress
    });
  }


  $scope.sendWhatsapp = function () {
      window.plugins.socialsharing.shareViaWhatsApp(
        '',
        $('#qrcodeReceive canvas')[0].toDataURL(),
        '',
        function() {
        console.log('share ok')
      },
      function(errormsg){

      });
  }


  $scope.copyToClipboard = function () {
    cordova.plugins.clipboard.copy($scope.receiveAddress);
    ToastMsgService.info("COPY.HASH");
  }


  $scope.goToDashboard = function() {
    $state.go('dashboard');
  };



});
