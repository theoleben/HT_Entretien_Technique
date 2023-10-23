import { FC, useCallback, useEffect, useState } from 'react'
import { Button, Stack, Typography } from '@mui/material'
import { Cocktail, Cocktails } from '../../types/cocktails'
import CocktailCard from '../CocktailCard'
import API from '../../client/api'

const RandomCocktail: FC = () => {
  /* TODO: get cocktail data from API */

  const [cocktailS, setCocktailS] = useState<Cocktail>()

  const fetchCocktail = useCallback(async () => {
    try {
      const response = await API.get<Cocktails>(
        'https://www.thecocktaildb.com/api/json/v1/1/random.php',
      )
      // console.log(response)
      const { drinks } = response.data
      // console.log(drinks)

      let obj = drinks[0]

      const {
        idDrink,
        strDrink,
        strInstructions,
        strDrinkThumb,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
      } = obj

      let objFormatted: Cocktail = {
        idDrink,
        strDrink,
        strInstructions,
        strDrinkThumb,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
      }

      // console.log(objFormatted)

      setCocktailS(objFormatted)
    } catch (error) {
      // console.log(error);
    }
  }, [])

  useEffect(() => {
    // console.log('useEffect')
    fetchCocktail()
  }, [fetchCocktail])

  return (
    <Stack direction={'column'} alignItems="center" spacing={4}>
      <Typography variant="body1">En panne d'inspiration ?</Typography>
      <Button variant={'outlined'} color="secondary" onClick={fetchCocktail}>
        Trouve moi un cocktail
      </Button>
      {cocktailS && <CocktailCard cocktail={cocktailS} />}
    </Stack>
  )
}

export default RandomCocktail
