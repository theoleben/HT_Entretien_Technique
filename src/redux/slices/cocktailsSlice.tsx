import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Cocktail } from '../../types/cocktails'

// // Type definition of the cocktail slice state
export interface ICocktailState {
  cocktails: Array<Cocktail>
}

// // Initial state
const initialState: ICocktailState = {
  cocktails: [],
}

// const initialState: Array<Cocktail> = []

const getRandomCocktail = createAsyncThunk('getRandomCocktail', async () => {
  // TODO: fetch data from API
  await Promise.reject()
  return null
})

// Cocktails Slice definition
const cocktailSlice = createSlice({
  name: 'cocktail',
  initialState,
  reducers: {
    // Add a cocktail to the favorite list
    cocktailAdded(state, action) {
      // console.log(action.payload)
      const arr = state.cocktails.filter(
        (e) => e.idDrink === action.payload.idDrink,
      )
      // Case where the drink is not in the favorite list
      if (arr.length > 0) {
        // console.log('Drink is already in the list')
        /* vendors contains the element we're looking for */
      } else {
        // console.log('Add it')
        state.cocktails.push(action.payload)
      }
    },
    // Remove a cocktail to the favorite list
    cocktailRemoved(state, action) {
      // console.log(action.payload)
      const newArr = state.cocktails.filter(
        (e) => e.idDrink !== action.payload.idDrink,
      )
      // console.log(newArr.length)
      // console.log(newArr[0].idDrink)
      state.cocktails = [...newArr]
    },
  },
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

// Actions
export const { cocktailAdded, cocktailRemoved } = cocktailSlice.actions

// Selector
export const selectAllCocktails = (state: ICocktailState) => {
  // console.log(state)
  return state.cocktails
}
