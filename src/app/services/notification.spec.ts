import { TestBed } from '@angular/core/testing';

import { Notification } from './notification';

describe('Notification', () => {
  let service: Notification;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Notification);
  });

  it('debe ser creado', () => {
    expect(service).toBeTruthy();
  });
});
