import { apiStatus } from '../../../lib/util'
import { Router } from 'express'

const Magento2Client = require('magento2-rest-client').Magento2Client

module.exports = ({ config, db }) => {
  const api = Router()
  const client = Magento2Client(config.magento2.api)

  const _getToken = (reqBody) => {
    return reqBody.token || null
  }

  const _getRequestPath = (reqBody) => {
    return _getToken(reqBody)
      ? config.extensions.amastyGiftCard.apiPath.customer
        .replace('{{giftCardCode}}', encodeURIComponent(reqBody.giftCardCode))
      : config.extensions.amastyGiftCard.apiPath.guest
        .replace('{{quoteId}}', reqBody.quoteId)
        .replace('{{giftCardCode}}', encodeURIComponent(reqBody.giftCardCode))
  }

  /**
   * Apply gift card code
   */
  api.post('/apply-gift-card-code', (req, res) => {
    const reqBody= req.body
    const requestPath = _getRequestPath(req.body)

    if (!reqBody.quoteId || !reqBody.giftCardCode || !reqBody.quoteId) {
      return res.json({
        error: 'Something went wrong'
      })
    }

    client.addMethods('cart', restClient => {
      return {
        applyGiftCardCode () {
          return _getToken(reqBody)
            ? restClient.put(`${requestPath}?cartId=${reqBody.quoteId}`, _getToken(reqBody))
            : restClient.put(requestPath)
        }
      };
    });

    client.cart.applyGiftCardCode()
      .then(result => apiStatus(res, result, 200))
      .catch(err => apiStatus(res, err, 500));
  })

  /**
   * Check gift card code
   */
  api.post('/check-gift-card-code', (req, res) => {
    const reqBody= req.body
    const requestPath = config.extensions.amastyGiftCard.apiPath.check

    if (!reqBody.giftCardCode) {
      return res.json({
        error: 'Something went wrong'
      })
    }

    const body = {
      amgiftcard: reqBody.giftCardCode
    }

    client.addMethods('cart', restClient => {
      return {
        checkGiftCardCode () {
          return restClient.post(requestPath, body, _getToken(reqBody))
        }
      };
    });

    client.cart.checkGiftCardCode()
      .then(result => apiStatus(res, result, 200))
      .catch(err => apiStatus(res, err, 500));
  })

  /**
   * Remove gift card code
   */
  api.post('/remove-gift-card-code', (req, res) => {
    const reqBody= req.body
    const requestPath = _getRequestPath(reqBody)

    if (!reqBody.quoteId || !reqBody.giftCardCode || !reqBody.quoteId) {
      return res.json({
        error: 'Something went wrong'
      })
    }

    client.addMethods('cart', restClient => {
      return {
        removeGiftCardCode () {
          return _getToken(reqBody)
            ? restClient.delete(`${requestPath}?cartId=${reqBody.quoteId}`, _getToken(reqBody))
            : restClient.delete(requestPath)
        }
      };
    });

    client.cart.removeGiftCardCode()
      .then(result => apiStatus(res, result, 200))
      .catch(err => apiStatus(res, err, 500));
  })

  return api
}
