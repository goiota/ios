goiotaAppCtrl.controller('IntroCtrl', function (
  $rootScope,
  $scope,
  $window
) {

  $scope.$on('$ionicView.enter', function() {


    $window.initHeaderAnimation("particles-intro");


  });


  $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
    $scope.introSlider = data.slider;
  });

  $scope.$on("$ionicSlides.slideChangeStart", function(event, data){
    console.log('Slide change is beginning');
  });



});
