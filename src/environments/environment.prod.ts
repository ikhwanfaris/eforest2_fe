export const environment = {
  production: true,
  serverUrl: 'https://eforestv2api.com',
  referralUrl: 'https://ef2.world/r/',
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
