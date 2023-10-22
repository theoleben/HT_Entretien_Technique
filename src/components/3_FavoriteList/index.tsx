import { FC /*useEffect, useState*/ } from 'react'
import { Button, Stack, Typography } from '@mui/material'
// import { Cocktail } from '../../types/cocktails'
// import CocktailCard from '../CocktailCard'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  cocktailRemoved,
  selectAllCocktails,
} from '../../redux/slices/cocktailsSlice'
// import { Cocktails } from '../../types/cocktails'

// Useless because we can retrieve redux data directly in this component
// interface IProps {
//   cocktails?: Array<Cocktail>
// }

// const FavoriteList: FC<IProps> = ({ cocktails }) => {
const FavoriteList: FC = () => {
  const showIngredientList = (): void => {
    // TODO: Fill the function
  }

  // console.log(cocktails)

  const dispatch = useAppDispatch()
  const cocktailsList = useAppSelector(selectAllCocktails)
  // console.log(cocktailsList)

  return (
    <Stack direction={'column'} alignItems="center" spacing={4}>
      <Typography variant="h5">Liste des cocktails choisis</Typography>
      <Stack direction={'column'} spacing={2}>
        <Stack direction={'row'} spacing={2} flexWrap="wrap">
          {/* TODO: Show list of favorite cocktails */}
          {cocktailsList?.map((element, index) => {
            return (
              <div
                key={index}
                style={{
                  // backgroundColor: 'pink',
                  margin: '5px',
                  border: '1px solid black',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <p>{element.strDrink}</p>
                <img
                  src={element.strDrinkThumb}
                  style={{ width: 200, height: 200 }}
                />
                <Button
                  sx={{ my: '15px', width: '80px' }}
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    // console.log(element)
                    dispatch(cocktailRemoved(element))
                  }}
                >
                  Retirer
                </Button>
              </div>
            )
          })}
        </Stack>
        <Button variant="outlined" onClick={showIngredientList}>
          Obtenir la liste des ingrédients à acheter
        </Button>
        <Stack direction={'column'}>
          {/* TODO: Show list of ingredients */}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default FavoriteList
