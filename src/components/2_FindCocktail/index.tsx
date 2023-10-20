import { FC, Fragment, useCallback, useEffect, useState } from 'react'
import {
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from '@mui/material'
import { Cocktail } from '../../types/cocktails'
import CocktailCard from '../CocktailCard'
import API from '../../client/api'

interface IProps {
  ingredients?: string[]
}

const FindCocktail: FC<IProps> = ({ ingredients }) => {
  // console.log('ingredients:', ingredients)

  const [filter, setFilter] = useState<string>()
  const [results, setResults] = useState<Array<{ name: string; img: string }>>()

  const fetchCocktailsByIngredient = useCallback(async (filter: string) => {
    // console.log('fetchCocktailsByIngredient')
    // console.log(filter)
    try {
      // www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin
      const response = await API.get(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${filter}`,
      )
      // console.log(response)
      const { drinks } = response.data
      // console.log(drinks)

      let res: Array<{ name: string; img: string }> = []

      drinks.forEach((element: any) => {
        res.push({ name: element.strDrink, img: element.strDrinkThumb })
      })

      // console.log(res)
      setResults(res)
    } catch (error) {
      // console.log(error);
    }
  }, [])

  useEffect(() => {
    // console.log('useEffect')
    // console.log(filter)

    if (filter !== undefined) {
      // console.log(filter)
      fetchCocktailsByIngredient(filter)
    }
  }, [filter])

  // console.log(results)

  return (
    <Stack direction={'column'} alignItems="center" spacing={4}>
      <Typography variant="body1">
        Entrez les informations pour trouver un cocktail selon vos goûts
      </Typography>
      <Button variant={'outlined'} color="secondary">
        Valider
      </Button>

      {/* List of ingredients */}
      <Stack direction={'row'} alignItems="flex-start" spacing={2}>
        <Card style={{ padding: '10px', maxHeight: '300px', overflow: 'auto' }}>
          <Typography variant="h6">Sélectionnez un ingrédient</Typography>
          <FormGroup>
            {ingredients &&
              ingredients.map((ingredient) => {
                return (
                  <FormControlLabel
                    key={ingredient}
                    control={<Checkbox />}
                    label={ingredient}
                    checked={undefined}
                    onClick={() => {
                      setFilter(ingredient)
                    }}
                  />
                )
              })}
          </FormGroup>
        </Card>
      </Stack>

      {/* List of cocktails */}
      <Stack direction={'row'} spacing={2}>
        {/* TODO: Show list of cocktail containing selected ingredient */}
        {results &&
          results.map((element, index) => {
            return (
              <Fragment key={index}>
                <p>{element.name}</p>
                <img src={element.img} style={{ width: 200, height: 200 }} />
              </Fragment>
            )
          })}
      </Stack>
    </Stack>
  )
}

export default FindCocktail
