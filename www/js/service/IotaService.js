goiotaApp.factory('IotaService', function($rootScope,IOTA_NODE) {


  var iota = null;
  var seed = null;

  var balance = {};
  var accountData = {};
  var transactions = [];
  var currentReceiveAddress = {};

  return {
    initIota: function(aSeed) {

      balance = {};
      accountData = {};
      accountData = [];

      seed = aSeed;

      iota = new IOTA({
        'provider' : IOTA_NODE.provider
      });

      this.initAccountData();

    },
    getIota: function() {
      return iota;
    },
    getSeed: function() {
      return seed;
    },
    getAccountData: function () {
      return accountData;
    },
    getTransactions: function () {
      return transactions;
    },
    getBalance: function () {
      return balance;
    },
    isAddress: function (aAddress) {
      return iota.valid.isAddress(aAddress);
    },
    getReceiveAddress: function () {
      return currentReceiveAddress;
    },
    initAccountData: function () {

          iota.api.getAccountData(this.getSeed().toUpperCase(), function(error, aAccountData) {


            var _iotaService = angular.element(document.body).injector().get("IotaService");

            if(!error) {

              accountData = aAccountData;
              accountData.latestAddress = iota.utils.addChecksum(accountData.latestAddress);


              currentReceiveAddress = _.first(_.sortBy(_.where(_.where(_.flatten(accountData.transfers),{currentIndex:0}),{value:0}), function(o) {
                return o.attachmentTimestamp;
              }).reverse());

              if(currentReceiveAddress != undefined) {
                currentReceiveAddress.checkSumAddress = iota.utils.addChecksum(currentReceiveAddress.address);
              }


              var aUnit = _iotaService.getBalanceUnit(accountData.balance);

              balance = {
                'amount'            : iota.utils.convertUnits(accountData.balance, 'i', aUnit),
                'unit'              : aUnit,
                'exchangeAmount'    : iota.utils.convertUnits(accountData.balance, 'i', 'Mi'),
              }


              _iotaService.initTransactionData();

              $rootScope.$broadcast('getAccountData:done','');


            } else {

              balance = {
                'amount'            : 0,
                'unit'              : 'i',
                'exchangeAmount'    : 0,
              }

              $rootScope.$broadcast('getAccountData:error','');

            }


          });

    },
    initTransactionData : function () {

          transactions = [];

          var _iotaService = angular.element(document.body).injector().get("IotaService");

          var iotaTransactions = iota.utils.categorizeTransfers(accountData.transfers, accountData.addresses);

          // init SentTransactions

          var sentTransactions =  _.where(_.flatten(iotaTransactions.sent),{currentIndex:0});

          angular.forEach(sentTransactions, function(aTransaction, key) {

                var aUnit = _iotaService.getBalanceUnit(aTransaction.value)

                aTransaction.value = iota.utils.convertUnits(aTransaction.value, 'i', aUnit);
                aTransaction.unit = aUnit;
                aTransaction.isSentTransaction = true;

                transactions.push(aTransaction);


          });

          // init ReceivedTransactions

          var receivedTransactions = _.filter(_.flatten(iotaTransactions.received), function(aTransaction){
            return _.contains(accountData.addresses, aTransaction.address);
          });


          angular.forEach(receivedTransactions, function(aTransaction, key) {

                var aUnit = _iotaService.getBalanceUnit(aTransaction.value)

                aTransaction.value = iota.utils.convertUnits(aTransaction.value, 'i', aUnit);
                aTransaction.unit = aUnit;
                aTransaction.isSentTransaction = false;

                transactions.push(aTransaction);


          });


          transactions = _.sortBy(transactions, function(o) {
            return o.attachmentTimestamp;
          }).reverse();



          transactions = _.groupBy(transactions, function(aTransaction){ return aTransaction.bundle; });


    },
    getBalanceUnit : function (balance) {

    	var aUnit;
    	balance = Number(balance);

    	if(balance < 1000){
    		aUnit = 'i';
    	}else if(balance < 1000000){
    		aUnit = 'Ki';
    	}else if(balance < 1000000000){
    		aUnit = 'Mi';
    	}else if(balance < 1000000000000){
    		aUnit = 'Gi';
    	}else if(balance < 1000000000000000){
    		aUnit = 'Ti';
    	}else{
    		aUnit = 'Pi';
    	}

      return aUnit;

    },
    getNewAddress : function () {

    	iota.api.getNewAddress(this.getSeed().toUpperCase(),{"checksum": true}, function(error, newAddress) {

        newAddress = iota.utils.noChecksum(newAddress);

        var _aSeed = angular.element(document.body).injector().get("IotaService").getSeed();

        iota.api.sendTransfer(_aSeed, 2, 14, [{"address": newAddress, "value": 0, "message": "", "tag": ""}], function(error, transfers) {

          if (error) {
            $rootScope.$broadcast('getNewAddress:error','');
          } else {
            $rootScope.$broadcast('getNewAddress:done','');
          }

        });



      });

    },
    sendTransfer : function (_aData) {

        var isAddressValid = iota.valid.isAddress(_aData.address);

        if(isAddressValid) {

          if(_aData.unit == 'i') {
            _aData.amount = parseFloat(_aData.amount);
          }

          var amount = iota.utils.convertUnits(_aData.amount, _aData.unit, "i");
          var currentBalance = iota.utils.convertUnits(this.getBalance().amount, this.getBalance().unit, "i");

          if (currentBalance>=amount) {


                  var transferObj = [
                    {
                      "address": _aData.address,
                      "value": amount,
                      "message": iota.utils.toTrytes(_aData.message),
                      "tag": ""
                    }
                  ];


                  iota.api.sendTransfer(this.getSeed().toUpperCase(), 2, 14, transferObj, function(error, transfers) {

                    if (error) {

                      $rootScope.$broadcast('sendTransfer:error','');

                    } else {

                      $rootScope.$broadcast('sendTransfer:done','');

                    }

                  });


          } else {
            $rootScope.$broadcast('sendTransfer:notEnoughBalance','');
          }



        } else {
          $rootScope.$broadcast('sendTransfer:addressNotValid','');
        }




    },
    promoteTransaction : function (_aHash) {



      var spamTransfer = [{address: '9'.repeat(81), value: 0, message: '', tag: ''}];

      iota.api.promoteTransaction(_aHash, 2, 14, spamTransfer,{interrupt: false, delay: 0}, function(error, transfers) {

        if (error) {



        } else {

          var _iotaService = angular.element(document.body).injector().get("IotaService");

          _iotaService.promoteTransaction(transfers[0].hash)

        }

      });

    },
    getCheckSum : function (_aAddress) {
      return iota.utils.addChecksum(_aAddress);
    },
    isPromotable : function (_aTail) {
      return iota.api.isPromotable(_aTail);
    },
    isReattachable : function (_aAddress) {
      iota.api.isReattachable(_aAddress, function(error, state) {

      });
    }
  };
});
