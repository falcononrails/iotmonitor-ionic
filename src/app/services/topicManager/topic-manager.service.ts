import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { Topic } from "src/app/interface/topic";
import { TopicResponse } from "src/app/interface/topic-response";
import { Observable } from "rxjs";

const backend_url = "http://iotmonitor-backend.herokuapp.com/";

@Injectable({
  providedIn: "root"
})
export class TopicManagerService {
  constructor(private http: HttpClient) {}

  createTopic(topic: Topic) {
    return this.http.post(backend_url + "create-topic", topic);
  }

  getTopics(id: string): Observable<TopicResponse[]> {
    var json = {
      userId: id
    };
    return this.http.post<TopicResponse[]>(backend_url + "get-topics", json);
  }

  deleteTopic(id: string) {
    var json = {
      id: id
    };
    this.http.post(backend_url + "delete-topic", json).subscribe();
  }
}
