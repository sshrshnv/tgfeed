
<p align="center">
  <img src="https://github.com/sshrshnv/tgfeed/assets/7159528/6abd1942-62c3-471c-af9e-6902bbe2dd85" width="96" height="96"/>
</p>
<b>
  <p align="center">
    TgFeed
  </p>
</b>

<p align="center">
  Read Telegram channels like a news feed.
</p>


###### Features
- New posts are always at the top of the list
- Stories, reactions and comments are disabled
- Reading archived channels
- Creating multiple feeds
- No binding to folders in the main application
- No third-party bots

###### Installation
This web-application is a PWA.
It can be installed on Android, iOS, macOS and Windows from Google Chrome, Safari and Microsoft Edge.

###### Security
Application only works on your device and communicates directly with Telegram servers.
Your data is not stored anywhere else and is not transferred anywhere.

###### Localization
You should add files in the `./src/shared/ui/locales/${lang}/` directory.

###### MTProto
Based on https://github.com/spalt08/mtproto-js
- Updated layer (158)
- Fixed server time offset
- Fixed writer buffer size
- BigInteger replaced with native BigInt
- Pako replaced with native DecompressionStream
