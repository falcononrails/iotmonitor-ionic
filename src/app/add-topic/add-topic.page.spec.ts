import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AddTopicPage } from "./add-topic.page";

describe("AddTopicPage", () => {
  let component: AddTopicPage;
  let fixture: ComponentFixture<AddTopicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddTopicPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTopicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
