import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Cocktail } from '../../types/cocktails'

// Type definition of the cocktail slice state
export interface ICocktailState {
  cocktail: Cocktail | undefined
}

// Initial state
const initialState: ICocktailState = {
  cocktail: undefined,
}

const getRandomCocktail = createAsyncThunk('getRandomCocktail', async () => {
  // TODO: fetch data from API
  await Promise.reject()
  return null
})

// Cocktails Slice definition
const cocktailSlice = createSlice({
  name: 'cocktail',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getRandomCocktail.fulfilled, (state, action) => {
      const payload = action.payload
      // TODO: Update state according to payload
    })
  },
})

// Export reducer
export default cocktailSlice.reducer

export const cocktailAction = { getRandomCocktail }
