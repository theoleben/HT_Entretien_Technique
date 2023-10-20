import { FC, useCallback, useEffect, useState } from 'react'
import { Button, Stack, Typography } from '@mui/material'
import { useAppSelector } from '../../redux/hooks'
import { Cocktail } from '../../types/cocktails'
import CocktailCard from '../CocktailCard'
import API from '../../client/api'

const RandomCocktail: FC = () => {
  /* TODO: get cocktail data from API */
  const cocktail: Cocktail | undefined = undefined
  // console.log('RandomCocktail')

  const [cocktailS, setCocktailS] = useState<Cocktail>()
  // console.log('cocktailS:', cocktailS);

  // Hardcoded
  // let cocktail2 = {
  //   idDrink: '1',
  //   strDrink: 'Test',
  //   strInstructions: 'Mixer les indrédients',
  //   strDrinkThumb: 'fake_url', // url of the cocktail image

  //   strIngredient1: 'Gin',
  //   strIngredient2: 'Tonic',
  //   strIngredient3: 'Ing3',
  //   strIngredient4: 'Ing4',
  //   strIngredient5: 'Ing5',
  // }

  const fetchIngredients = useCallback(async () => {
    try {
      const response = await API.get(
        'https://www.thecocktaildb.com/api/json/v1/1/random.php',
      )
      // console.log(response.data)
      // console.log(response.data.drinks[0])

      let obj: Cocktail = {
        idDrink: response.data.drinks[0].idDrink,
        strDrink: response.data.drinks[0].strDrink,
        strInstructions: response.data.drinks[0].strInstructions,
        strDrinkThumb: response.data.drinks[0].strDrinkThumb, // url of the cocktail image
        strIngredient1: response.data.drinks[0].strIngredient1,
        strIngredient2: response.data.drinks[0].strIngredient2,
        strIngredient3: response.data.drinks[0].strIngredient3,
        strIngredient4: response.data.drinks[0].strIngredient4,
        strIngredient5: response.data.drinks[0].strIngredient5,
      }

      // console.log(obj)

      setCocktailS(obj)
    } catch (error) {
      // console.log(error);
    }
  }, [])

  useEffect(() => {
    // console.log('useEffect')
    fetchIngredients()
  }, [fetchIngredients])

  return (
    <Stack direction={'column'} alignItems="center" spacing={4}>
      <Typography variant="body1">En panne d'inspiration ?</Typography>
      <Button variant={'outlined'} color="secondary" onClick={fetchIngredients}>
        Trouve moi un cocktail
      </Button>
      {cocktailS && <CocktailCard cocktail={cocktailS} />}
    </Stack>
  )
}

export default RandomCocktail
