// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var goiotaApp = angular.module('goiotaApp', [
  'ionic',
  'goiotaApp.controllers',
  'goiotaApp.services',
  'ion-floating-menu',
  'pascalprecht.translate',
  'ui.utils.masks',
  'bc.AngularKeypad',
  'angularRipple'
]);

goiotaApp.run(function($rootScope,$state,$ionicPlatform,IotaService,AuthService,SecureStorageService,$window) {


  $ionicPlatform.ready(function() {

    AuthService.login();

    navigator.splashscreen.show();


    $rootScope.$on('FingerPrint:verifyed', function(event,data) {


      SecureStorageService.initFingerprint();


      setTimeout(function() {
          $state.go('initWallet');
          navigator.splashscreen.hide();
      }, 500);

    });

    $rootScope.$on('PinCode:verifyed', function(event,data) {

      $state.go('enterPin');

      setTimeout(function() {
          navigator.splashscreen.hide();
      }, 500);

    });

    $rootScope.$on('UserNotRegistered', function(event,data) {

      setTimeout(function() {
          navigator.splashscreen.hide();
      }, 500);

    });




    if(window.cordova && window.cordova.plugins.Keyboard) {

      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      cordova.plugins.Keyboard.disableScroll(true);

    }

    if (window.StatusBar) {
        StatusBar.overlaysWebView(true)
        StatusBar.styleDefault();
    }



    document.addEventListener("resume", function() {

      $window.location.reload();

    }, false);

    document.addEventListener("pause", function() {

      $window.location.reload();


    }, false);


  });



});


goiotaApp.config(function($ionicConfigProvider) {

  $ionicConfigProvider.views.swipeBackEnabled(false);

});


goiotaApp.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider



  .state('intro', {
      url: '/intro',
      templateUrl: 'view/intro.html',
      controller: 'IntroCtrl',
      location: false
  })

  .state('login', {
      url: '/login',
      templateUrl: 'view/login.html',
      controller: 'LoginCtrl',
      location: false
  })

  .state('register', {
      url: '/register',
      templateUrl: 'view/register.html',
      controller: 'RegisterCtrl',
      location: false
  })

  .state('initWallet', {
      url: '/initWallet',
      templateUrl: 'view/initWallet.html',
      controller: 'InitWalletCtrl',
      location: false
  })

  .state('enterPin', {
      url: '/enterPin',
      templateUrl: 'view/enterPin.html',
      controller: 'EnterPinCtrl',
      location: false
  })

  .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'view/dashboard.html',
      controller: 'DashboardCtrl',
      location: false
  })

  .state('marketCap', {
      url: '/marketCap',
      templateUrl: 'view/marketCap.html',
      controller: 'MarketCapCtrl',
      location: false
  })

  .state('sendMoney', {
      url: '/sendMoney',
      templateUrl: 'view/sendMoney.html',
      controller: 'SendCtrl',
      location: false
  })

  .state('receiveMoney', {
      url: '/receiveMoney',
      templateUrl: 'view/receiveMoney.html',
      controller: 'ReceiveCtrl',
      location: false
  })


  $urlRouterProvider.otherwise('intro');


});


goiotaApp.directive('textMaxlength', ['$compile', '$log', function($compile, $log) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, elem, attrs, ctrl) {
      attrs.$set("ngTrim", "false");
              var maxlength = parseInt(attrs.textMaxlength, 10);
              ctrl.$parsers.push(function (value) {

                  value = value.replace(/\s/g, "");

                  if (value.length > maxlength)
                  {

                      value = value.substr(0, maxlength);

                  }

                  ctrl.$setViewValue(value);
                  ctrl.$render();

                  return value;
              });
    }
  };
}]);
