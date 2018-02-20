goiotaAppService.service("SecureStorageService", function ($rootScope,ToastMsgService,IotaService) {


	this.initFingerprint = function() {

		window.plugins.uniqueDeviceID.get(function success(uuid)
		{

			secureStorage = new cordova.plugins.SecureStorage(
			function () {
				secureStorage.get(
						function (value) {
							$rootScope.seed = value;
							IotaService.initIota(value);
							IotaService.initAccountData();
						},
						function (error) {

						},
						uuid
				);
			},
			function (error) {},
			'GoIota_SS_FP'
			);


		},
		function error(error)
		{

		});


  };


	this.initPinCode = function (_aPin) {


		secureStorage = new cordova.plugins.SecureStorage(
		function () {
			secureStorage.get(
					function (value) {

						$rootScope.$broadcast('initPinCode:done','');

						IotaService.initIota(value);
						IotaService.initAccountData();

					},
					function (error) {
						$rootScope.$broadcast('initPinCode:error','');
						ToastMsgService.error("ERROR.PIN_CODE_VALID");
					},
					_aPin
			);
		},
		function (error) {},
		'GoIota_SS_PC'
		);

	};


	this.setSeed = function (_pin,_seed,_isFingerPrint) {

		var varName = _isFingerPrint ? 'GoIota_SS_FP' : 'GoIota_SS_PC';

		secureStorage = new cordova.plugins.SecureStorage(
		function () {
			secureStorage.set(
				function (key) {},
				function (error) {},
				_pin, _seed
			)
		},
		function (error) {},
		varName
		);

	}


});
