import {ActionTree} from 'vuex'
import config from 'config'
import RootState from '@vue-storefront/core/types/RootState'
import CartState from '@vue-storefront/core/modules/cart/types/CartState'
import rootStore from '@vue-storefront/core/store'
import { TaskQueue } from '@vue-storefront/core/lib/sync'

const _requestAction = async (getters, url, code) => {
  return await TaskQueue.execute({
    url: url,
    payload: {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      mode: 'cors',
      body: JSON.stringify({
        token: rootStore.getters['user/getUserToken'],
        quoteId: getters.getCartToken,
        giftCardCode: code
      })
    },
    silent: true
  })
}

const actions: ActionTree<CartState, RootState> = {
  /** Apply Gift Card Code */
  async applyGiftCardCode ({ getters, dispatch }, code) {
    if (getters.isTotalsSyncEnabled && getters.isCartConnected) {
      const task = await _requestAction(getters, config.amastyGiftCard.endpoint.apply, code)

      if (task.result && !task.result.hasOwnProperty('errorMessage')) {
        dispatch('syncTotals', { forceServerSync: true })
        return true
      }
    }

    return false
  },

  /** Check Gift Card Code */
  async checkGiftCardCode ({ getters, dispatch }, code) {
    await TaskQueue.execute({ url: config.amastyGiftCard.endpoint.check,
      payload: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify({
          giftCardCode: code
        })
      },
      silent: true
    })
  },

  /** Remove Gift Card Code */
  async removeGiftCardCode ({ getters, dispatch }, code) {
    if (getters.isTotalsSyncEnabled && getters.isCartConnected) {
      const task = await _requestAction(getters, config.amastyGiftCard.endpoint.remove, code)

      if (task.result && !task.result.hasOwnProperty('errorMessage')) {
        dispatch('syncTotals', { forceServerSync: true })
        return task.result
      }
    }

    return null
  }
}

export default actions
