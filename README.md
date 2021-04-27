# Vue Storefront Amasty Gift Card Extension

The Klaviyo integration module for [vue-storefront](https://github.com/DivanteLtd/vue-storefront) v1.*.

## Installation

By hand (preferer):

```shell
git clone git@github.com:AbsoluteWebServices/vsf-amasty-gift-card.git ./vue-storefront/src/modules/
```

Registration the Amasty Gift Card module. Go to `./vue-storefront/src/modules/index.ts`

```js
...
import { CartExtend } from './vsf-amasty-gift-card'
...
extendModule(CartExtend)
...
register()
```

Add following settings to your config file.

```json
"amastyGiftCard": {
  "endpoint": {
    "apply": "http://localhost:8080/api/ext/vsf-amasty-gift-card/apply-gift-card-code",
    "check": "http://localhost:8080/api/ext/vsf-amasty-gift-card/check-gift-card-code",
    "remove": "http://localhost:8080/api/ext/vsf-amasty-gift-card/remove-gift-card-code"
  }
},
```

Add GiftCard component as mixin

```
...
import { GiftCard } from 'src/modules/vsf-amasty-gift-card/components/GiftCard'

export default {
  ...
  mixins: [GiftCard],
  ...
}
```

Install additional extension for `vue-storefront-api`:

```shell
cp -f ./vue-storefront/src/modules/vsf-amasty-gift-card/API/vsf-amasty-gift-card ./vue-storefront-api/src/api/extensions/
```

Add the config to your api config.

```json
  "extensions":{
    "amastyGiftCard": {
      "apiPath": {
        "guest": "/guest-carts/{{quoteId}}/gift-card/{{giftCardCode}}",
        "customer": "/carts/mine/gift-card/{{giftCardCode}}",
        "check": "/amgcard/cart/check"
      }
    }
    ...
  },
  "registeredExtensions": [
    "vsf-amasty-gift-card",
    ...
  ],
```
