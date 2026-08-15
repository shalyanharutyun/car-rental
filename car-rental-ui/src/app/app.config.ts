import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { TranslateService, provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { firstValueFrom } from 'rxjs';
import { routes } from './app.routes';
import { authInterceptor } from './core/auth.interceptor';
import { DEFAULT_LANG, SUPPORTED_LANGS, detectInitialLang } from './core/i18n';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection(),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(FormsModule),
    provideRouter(routes),
    provideTranslateService({
      loader: provideTranslateHttpLoader({ prefix: '/i18n/', suffix: '.json' }),
      fallbackLang: DEFAULT_LANG,
      lang: detectInitialLang()
    }),
    provideAppInitializer(() => {
      const translate = inject(TranslateService);
      const lang = detectInitialLang();

      translate.addLangs([...SUPPORTED_LANGS]);

      return firstValueFrom(translate.setFallbackLang(DEFAULT_LANG))
        .then(() => firstValueFrom(translate.use(lang)));
    })
  ]
};

export { SUPPORTED_LANGS };
