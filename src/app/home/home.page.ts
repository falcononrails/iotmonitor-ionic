import { Component, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { NavController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { Router, NavigationExtras } from "@angular/router";

import { StorageManagerService } from "../services/storage-manager/storage-manager.service";
import { TopicManagerService } from "../services/topicManager/topic-manager.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"]
})
export class HomePage implements OnInit {
  user = {
    userToken: "",
    userName: "",
    userEmail: "",
    userId: ""
  };
  topics = [];

  constructor(
    private storageManager: StorageManagerService,
    private menu: MenuController,
    public alertController: AlertController,
    private topicManager: TopicManagerService,
    public navCtrl: NavController,
    public router: Router,
    private storage: Storage
  ) {}

  openFirst() {
    this.menu.enable(true, "first");
    this.menu.open("first");
  }

  showGraph(topic) {
    console.log(topic);
    let navigationExtras: NavigationExtras = {
      state: {
        topicName: topic.topic,
        username: topic.username,
        password: topic.password,
        URL: topic.URL,
        port: topic.port
      }
    };
    this.router.navigate(["graph-display"], navigationExtras);
  }
  ngOnInit() {
    this.storageManager.userToken().then(val => {
      this.user.userToken = val;
    });
    this.storageManager.userEmail().then(val => {
      this.user.userEmail = val;
    });
    this.storageManager.userId().then(val => {
      this.user.userId = val;
      this.topicManager.getTopics(val).subscribe(res => (this.topics = res));
    });
    this.storageManager.userName().then(val => {
      this.user.userName = val;
    });
  }

  ionViewWillEnter() {
    this.topicManager
      .getTopics(this.user.userId)
      .subscribe(res => (this.topics = res));
  }

  toggleMenu() {
    this.menu.toggle(); //Add this method to your button click function
  }

  delete(id) {
    this.deleteAlertConfirm(id);
  }
  async deleteAlertConfirm(id) {
    const alert = await this.alertController.create({
      header: "Confirm!",
      message: "Are you sure you want to <strong>delete</strong> this topic ?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {}
        },
        {
          text: "Okay",
          handler: () => {
            for (var i = 0; i < this.topics.length; i++) {
              if (this.topics[i].id === id) {
                this.topics.splice(i, 1);
              }
            }
            this.topicManager.deleteTopic(id);
          }
        }
      ]
    });

    await alert.present();
  }
  logOut() {
    this.storage.clear();
    this.router.navigate(["/login"]);
  }
}
