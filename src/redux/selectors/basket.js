import { createDraftSafeSelector } from '@reduxjs/toolkit'

const selectBasket = (state) => state.basket

const basketSelector = createDraftSafeSelector(selectBasket, (basket) => basket)

export default basketSelector
