import GiftCard from '../types/GiftCard'

export const GiftCard = {
  name: 'GiftCard',
  computed: {
    appliedGiftCardCode (): GiftCard | false {
      return this.$store.getters['cart/getGiftCardCode']
    }
  },
  methods: {
    applyGiftCardCode (code: string): Promise<boolean> {
      return this.$store.dispatch('cart/applyGiftCardCode', code)
    },
    checkGiftCardCode (code: string): Promise<boolean> {
      return this.$store.dispatch('cart/checkGiftCardCode', code)
    },
    removeGiftCardCode (code: string): Promise<boolean> {
      return this.$store.dispatch('cart/removeGiftCardCode', code)
    }
  }
}
