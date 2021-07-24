import { TestBed } from '@angular/core/testing';

import { GeneicService } from './geneic.service';

describe('GeneicServiceService', () => {
  let service: GeneicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
