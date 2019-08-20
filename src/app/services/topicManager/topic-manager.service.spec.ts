import { TestBed } from '@angular/core/testing';

import { TopicManagerService } from './topic-manager.service';

describe('TopicManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TopicManagerService = TestBed.get(TopicManagerService);
    expect(service).toBeTruthy();
  });
});
