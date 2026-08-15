import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { appConfig } from './app.config';

describe('app.config translation wiring', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [...appConfig.providers, provideHttpClientTesting()]
    });
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('registers the HTTP loader rather than the no-op loader', () => {
    expect(TestBed.inject(TranslateLoader)).toBeInstanceOf(TranslateHttpLoader);
    httpMock.match(() => true);
  });

  it('requests translation files over HTTP for the active and fallback languages', () => {
    TestBed.inject(TranslateService);

    const reqs = httpMock.match(r => /^\/i18n\/(en|hy|ru)\.json$/.test(r.url));
    expect(reqs.length).toBeGreaterThan(0);
    expect(reqs.every(r => r.request.method === 'GET')).toBe(true);

    for (const req of reqs) {
      req.flush({ hero: { title: 'translated' } });
    }
  });

  it('resolves keys once the file has loaded', () => {
    const translate = TestBed.inject(TranslateService);

    for (const req of httpMock.match(r => r.url.startsWith('/i18n/'))) {
      req.flush({ hero: { title: 'translated' } });
    }

    expect(translate.instant('hero.title')).toBe('translated');
  });
});
