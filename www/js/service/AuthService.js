goiotaAppService.service("AuthService", function ($rootScope) {


	this.login = function() {

		NativeStorage.getItem("isFingerPrintActive", function (_isFPActive) {

			if(_isFPActive) {

				window.plugins.touchid.isAvailable(
				  function(type) {

						window.plugins.touchid.verifyFingerprintWithCustomPasswordFallback(
						  'Scan your fingerprint please', // this will be shown in the native scanner popup
						   function(msg) {
								 $rootScope.$broadcast('FingerPrint:verifyed','');
							 },
						   function(msg) {
								 $rootScope.$broadcast('PinCode:verifyed','');
							 }
						);

					},
				  function(msg) {
						$rootScope.$broadcast('PinCode:verifyed','');
					}
				);

			} else {
				$rootScope.$broadcast('PinCode:verifyed','');
			}

		}, function (value) {
			 $rootScope.$broadcast('UserNotRegistered','');
		});


  };


	this.activateFingerPrint = function (_activate) {


		if(_activate) {
			NativeStorage.setItem("isFingerPrintActive", true, function (value) {

      }, function (value) {

      });
		} else {
			NativeStorage.setItem("isFingerPrintActive", false, function (value) {

			}, function (value) {

			});
		}


	};


	this.isFingerPrintActive = function() {

		var result = false;

		NativeStorage.getItem("isFingerPrintActive",function (_isFPActive) { result = true; }, function (value) {} );

		return result;

  };

});
