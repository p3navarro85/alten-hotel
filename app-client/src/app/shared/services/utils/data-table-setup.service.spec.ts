import { TestBed } from '@angular/core/testing';

import { DataTableSetupService } from './data-table-setup.service';

describe('DataTableSetupService', () => {
  let service: DataTableSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataTableSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
