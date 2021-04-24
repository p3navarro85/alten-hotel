import { TestBed } from '@angular/core/testing';

import { MessageNotifierService } from './message-notifier.service';

describe('MessageNotifierService', () => {
  let service: MessageNotifierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageNotifierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
