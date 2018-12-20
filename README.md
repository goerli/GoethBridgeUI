<p align="center"><a href="http://goerli.com"><img src="https://avatars1.githubusercontent.com/u/43071041?s=200&v=4" alt="GoethWebsite" height="100px"></a></p>

## Göeth Bridge UI

React web application to facilitate the exchange of testnet Ether to Göeth through the GoethBridge. Contains only the Bridge UI & functionality.

## Setup

#### dependencies
node `v8.10.0` or later 

#### instructions to run:
clone this repo

`npm i && npm start`

#### limitations

currently tested with Chrome MacOS `v70.0.3538.77`

### HOSTING ON SERVER

- create an instance in digitalocean or aws or any hosting with alteast **1 CPU & 2GB RAM**
- choose **```Ubuntu 16.04 lTS or 18.04 LTS```**
- do **```sudo apt update -y && sudo apt upgrade -y```** first
- install node, npm. follow this guide (https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04)
- then do **```sudo apt install -y make gcc g++```**
- next **```npm i -g pm2 serve```**
- then clone the project **```git clone https://github.com/goerli/GoethBridgeUI.git```**
- cd into the project and then do **```npm i```**
- next do **```pm2 start npm -- start```**
- do **```pm2 list```** to check if the app is running, pm2 allows you to run node app in background process
- visit **```YOUR_IP/DOMAIN:3000```** in the browser to see the UI
