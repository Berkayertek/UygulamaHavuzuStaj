import { TestBed } from '@angular/core/testing';

import { VkiService } from './vki.service';

describe('VkiService', () => {
  let service: VkiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VkiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
