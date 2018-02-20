goiotaAppService.service("LoadingService", function ($ionicLoading) {


	this.show = function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="ripple"></ion-spinner>',
			noBackdrop: false
    });
  };

  this.hide = function(){
    $ionicLoading.hide();
  };




});
