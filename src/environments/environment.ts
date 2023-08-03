// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  serverUrl: 'https://staging.eforestv2api.com',
  //serverUrl: 'https://eforestv2api.com',
  //serverUrl: 'https://eforestapi.com',
  referralUrl: 'https://staging.ef2.world/r/',
  defaultLang: 'en',
  announcementUrl: 'https://news.ef2.world',
  adsense: {
    adClient: 'ca-pub-6503011139456064',
    adSlot: 6662964045,
    show: true,
  },
  pusher: {
    broadcaster: 'pusher',
    key: 'bbe6db292ec53a29967e', // maybe better put this public key in env file
    cluster: 'ap1',
    wsHost: '',
    wsPort: 80,
    wssPort: 443,
    forceTLS: 'https',
    enabledTransports: ['ws', 'wss'],
  },
  pusher_visitor: {
    broadcaster: 'pusher',
    key: 'bbe6db292ec53a29967e', // maybe better put this public key in env file
    cluster: 'ap1',
    wsHost: '',
    wsPort: 80,
    wssPort: 443,
    forceTLS: 'https',
    enabledTransports: ['ws', 'wss'],
    authEndpoint: '/api/broadcasting/auth',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
