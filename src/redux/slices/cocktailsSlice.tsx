import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit'
import { Cocktail } from '../../types/cocktails'

// // Type definition of the cocktail slice state
export interface ICocktailState {
  cocktails: Array<Cocktail>
  // Useless - we can manage ingredients in the selector
  // ingredients: Array<string>
}

// // Initial state
const initialState: ICocktailState = {
  cocktails: [],
  // Useless - we can manage ingredients in the selector
  // ingredients: [],
}

// const initialState: Array<Cocktail> = []

const desired_properties = [
  'strIngredient1',
  'strIngredient2',
  'strIngredient3',
  'strIngredient4',
  'strIngredient5',
]

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
      // console.log(cocktailAdded)
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

        // Useless - we can manage ingredients in the selector
        // for (const property in action.payload) {
        //   console.log(`${property}: ${action.payload[property]}`)

        //   if (
        //     desired_properties.includes(property) &&
        //     action.payload[property] !== null &&
        //     !state.ingredients.includes(action.payload[property])
        //   ) {
        //     console.log(property)
        //     state.ingredients.push(action.payload[property])
        //   }
        // }
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
      state.cocktails = newArr
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

export const selectAllIngredients = createSelector(
  [selectAllCocktails],
  (cocktails) => {
    let ingredients: Array<string> = []

    cocktails.forEach((element: Cocktail) => {
      for (const property in element) {
        // console.log(`${property}: ${action.payload[property]}`)

        if (
          desired_properties.includes(property) &&
          element[property as keyof typeof element] !== null &&
          !ingredients.includes(element[property as keyof typeof element])
        ) {
          // console.log(property)
          ingredients.push(element[property as keyof typeof element])
        }
      }
    })
    return ingredients.sort()
  },
)
