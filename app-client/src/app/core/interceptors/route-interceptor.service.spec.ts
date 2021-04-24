import { TestBed } from '@angular/core/testing';

import { RouteInterceptorService } from './route-interceptor.service';

describe('RouteInterceptorService', () => {
  let service: RouteInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
