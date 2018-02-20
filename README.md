# GoIota

Is a secure local Wallet for holding, receiving and sending IOTA. We only use the IOTA `https://github.com/iotaledger/iota.lib.js/` library and no other third party libraries.

No data are sent to other parties !!!

The preconfigure Node is `https://iotanode.us:443 (https://iota.dance/nodes)`. You can change the Node configuration like in the `Available Configurations` Section mentioned.  


## Disclaimer


This is not an official IOATA Foundation Project, although the only libraries we use come from the IOTA Foundation.
We are in the official IOTA Slack/Discord Dev chats and trying to reach out to get a audit. We will keep you updated. Till then we are working on new features and the mobile version.


## Getting Started

These instructions will get you a copy of the project up and running on your local phone. So you can use your own local Wallet.


## Prerequisites

1. Download & Install [NodeJS](https://nodejs.org/en/download/)

2. Install [Ionic](https://ionicframework.com/):

  ```
  npm install -g cordova ionic
  ```

### Installation

1. Clone this repository:

  ```
  git clone https://github.com/goiota/ios
  ```

2. Go to the `ios` directory:

  ```
  cd ios
  ```

3. Add IOS Plattform:

  ```
  cordova platform add ios
  ```

4. Build Project

  ```
  cordova build ios
  ```

5. Run Project

  ```
  cordova run ios
  ```

6. Enjoy your local Wallet :-)


## Available Configurations:

`IOTA-Node (provider)` Edit the file `config.js` under `/js/config.js`. Change the provider value with the node you wont to connect. For Sending Transfer or generating Address you need a Node that allows POW


## Donate Now:

Help us keep making awesome stuff

By donating you will support further development of features.

1. IOTA Address

```
EWYJHRVRQQLVDHKRELDPLTBHEVUCDAWLHDKCLKZNRKAOOWLWHF9RVIROAXVDQKTRYCXHPHXROKTYHXGKDYCVQITDGZ
```

2. BTC Address

```
1PNLRruGDoTWLYnoXuK9zGdLxXHsWZjtM9
```  

3. ETH Address

```
0x2568950b4e489d15a475bbb4b8fdaef3b8109b75
```  
4. BCH Address

```
16eyGRPK6xigrTuqPtjD9giWwqAfyMUGgC
```        
