import { TestBed } from '@angular/core/testing';

import { QiitaService } from './qiita.service';

describe('QiitaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QiitaService = TestBed.get(QiitaService);
    expect(service).toBeTruthy();
  });
});
