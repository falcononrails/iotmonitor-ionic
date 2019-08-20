import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { StorageManagerService } from "../services/storage-manager/storage-manager.service";
import { TopicManagerService } from "../services/topicManager/topic-manager.service";

@Component({
  selector: "app-add-topic",
  templateUrl: "./add-topic.page.html",
  styleUrls: ["./add-topic.page.scss"]
})
export class AddTopicPage implements OnInit {
  submitted = false;
  valid = true;
  topic = {
    URL: "",
    port: "",
    topic: "",
    username: "",
    password: "",
    userId: ""
  };

  get getControls() {
    return this.addTopicForm.controls;
  }

  addTopicForm = this.fb.group({
    URL: ["", [Validators.required]],
    port: ["", [Validators.required]],
    topic: ["", [Validators.required]],
    userName: ["", [Validators.required]],
    userPassword: ["", [Validators.required]]
  });
  constructor(
    private router: Router,
    private topicManager: TopicManagerService,
    private storageManager: StorageManagerService,
    private fb: FormBuilder,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.storageManager.userId().then(val => {
      this.topic.userId = val;
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.addTopicForm.valid) {
      this.topic.URL = this.addTopicForm.controls.URL.value;
      this.topic.port = this.addTopicForm.controls.port.value;
      this.topic.topic = this.addTopicForm.controls.topic.value;
      this.topic.username = this.addTopicForm.controls.userName.value;
      this.topic.password = this.addTopicForm.controls.userPassword.value;

      this.topicManager.createTopic(this.topic).subscribe(() => {
        this.router.navigate(["/home"]);
      });
    }
  }
}
