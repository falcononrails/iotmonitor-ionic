## About
This is the front-end of an IoT Monitor built using Ionic/Angular and leveraging MQTT.  

![App interfaces](./Overview.png)

## Libraries used
- Eclipse Paho for MQTT support
- Highcharts for graph diplay

## Features
- Authentication using JWT
- Add different brokers
- Add topics
- Monitor your live sensor data

## Setting up
- Clone the repo & navigate to it `git clone https://github.com/falcononrails/iotmonitor-ionic.git && cd iotmonitor-ionic` 
- Install all dependencies `npm install`
- Run the app `ionic serve`

## Usage
After signing up and signing in, a typical scenario is as follows: 
- Create an account in [CloudMQTT](https://www.cloudmqtt.com)
- Set up an instance
- Add the server, username, password and port (it should support websockets) from your Cloud MQTT instance and save.  
![Adding a broker](./add_broker.png)
- You can now use the CloudMQTT Websockets UI to send data & click on the graph icon to display your live data.
- In order to display data from a sensor, subscribe to the same topic as in the app, connect your sensor to CloudMQTT, and bingo!





