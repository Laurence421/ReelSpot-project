const apiKey = 'YOUR_API_KEY';
const url = `https://api.watchmode.com/v1/sources/?apiKey=${apiKey}`;

const response = await fetch(url);
const json = await response.json();
console.log(json);

[
  {
    "id": 203,
    "name": "Netflix",
    "type": "sub",
    "logo_100px": "https://cdn.watchmode.com/logos/203_logo_100px.jpg",
    "ios_appstore_url": "https://apps.apple.com/app/id363590051",
    "android_playstore_url": "https://play.google.com/store/apps/details?id=com.netflix.mediaclient",
    "android_tv_url": null,
    "fire_tv_url": null,
    "roku_url": null,
    "tvos_url": null,
    "regions": ["US","GB","AU"]
  },
  {
    "id": 26,
    "name": "Amazon Prime",
    "type": "sub",
    "logo_100px": "https://cdn.watchmode.com/logos/26_logo_100px.jpg",
    "ios_appstore_url": "https://apps.apple.com/app/id545519333",
    "android_playstore_url": "https://play.google.com/store/apps/details?id=com.amazon.avod.thirdpartyclient",
    "android_tv_url": null,
    "fire_tv_url": null,
    "roku_url": null,
    "tvos_url": null,
    "regions": [
      "US",
      "GB",
      "AU",
      "CA"
    ]
  }
]