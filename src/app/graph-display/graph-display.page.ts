import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import * as HighCharts from "highcharts";
import { Paho } from "ng2-mqtt/mqttws31";

@Component({
  selector: "app-graph-display",
  templateUrl: "./graph-display.page.html",
  styleUrls: ["./graph-display.page.scss"]
})
export class GraphDisplayPage implements OnInit {
  topicName: any;
  port: any;
  URL: any;
  username: any;
  password: any;
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.topicName = this.router.getCurrentNavigation().extras.state.topicName;
        this.username = this.router.getCurrentNavigation().extras.state.userName;
        this.URL = this.router.getCurrentNavigation().extras.state.URL;
        this.password = this.router.getCurrentNavigation().extras.state.password;
        this.port = this.router.getCurrentNavigation().extras.state.port;
      }
    });
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.plotDynamicSplineChart(
      this.URL,
      this.username,
      this.password,
      this.port,
      this.topicName
    );
  }

  plotDynamicSplineChart(URL, username, password, port, topic) {
    let myChart = HighCharts.chart("dynamicSpline", {
      chart: {
        type: "spline",
        animation: true, // don't animate in old IE
        marginRight: 10,
        events: {
          load: function() {
            var client;
            var mqttbroker = URL;
            var y;
            var options = {
              useSSL: true,
              userName: username,
              password: password,
              onSuccess: onConnect.bind(this)
            };
            client = new Paho.MQTT.Client(
              mqttbroker,
              Number(port),
              "mqtt_client" +
                Math.random()
                  .toString(16)
                  .substr(2, 8)
            );
            client.onMessageArrived = onMessageArrived.bind(this);
            client.onConnectionLost = onConnectionLost.bind(this);
            client.connect(options);
            function onConnect() {
              console.log("onConnect");
              client.subscribe(topic);
            }

            function onConnectionLost(responseObject) {
              if (responseObject.errorCode !== 0) {
                console.log("onConnectionLost:" + responseObject.errorMessage);
              }
            }

            function onMessageArrived(message) {
              y = Number(message.payloadString);
            }
            // set up the updating of the chart each second
            var series = this.series[0];
            setInterval(function() {
              var x = new Date().getTime(); // current time
              if (y) {
                series.addPoint([x, y], true, true);
                y = NaN;
              }
            }, 1000);
          }
        }
      },

      time: {
        useUTC: false
      },

      title: {
        text: "Live Sensor Data"
      },
      xAxis: {
        type: "datetime",
        tickPixelInterval: 150
      },
      yAxis: {
        title: {
          text: "Value"
        },
        plotLines: [
          {
            value: 0,
            width: 1,
            color: "#808080"
          }
        ]
      },
      tooltip: {
        headerFormat: "<b>{series.name}</b><br/>",
        pointFormat: "{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}"
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      series: [
        {
          name: "Random data",
          type: undefined,
          data: (function() {
            // generate an array of random data
            var data = [],
              time = new Date().getTime(),
              i;
            for (i = -19; i <= 0; i += 1) {
              data.push({
                x: time,
                y: 0
              });
            }
            return data;
          })()
        }
      ]
    });
  }
}
