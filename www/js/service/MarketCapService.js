goiotaAppService.service("MarketCapService", function ($http) {


	this.getData = function() {

		return $http.get('https://api.coinmarketcap.com/v1/ticker/iota/?convert=EUR').then(function(response) {
            return response.data[0];
    });

  };



});
