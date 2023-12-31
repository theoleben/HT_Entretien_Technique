import { FC } from 'react'
import { Button, Card, Stack, Typography } from '@mui/material'
import { Cocktail } from '../../types/cocktails'
import { useAppDispatch } from '../../redux/hooks'
import { cocktailAdded } from '../../redux/slices/cocktailsSlice'

interface IProps {
  cocktail: Cocktail
}

const CocktailCard: FC<IProps> = ({ cocktail }) => {
  const dispatch = useAppDispatch()
  // console.log(cocktail)

  let ingredients: string[] = [
    cocktail.strIngredient1,
    cocktail.strIngredient2,
    cocktail.strIngredient3,
    cocktail.strIngredient4,
    cocktail.strIngredient5,
  ]

  return (
    <Card style={{ padding: '10px', maxWidth: '400px' }}>
      <Stack direction={'column'} alignItems="center" spacing={4}>
        <Stack alignItems="center" spacing={1}>
          <Typography variant="h5">{cocktail.strDrink}</Typography>
          <Typography variant="h5">Ingrédients:</Typography>
          {/* TODO: Fill ingredients here */}
          {ingredients.map((element, index) => {
            return <p key={index}>{element}</p>
          })}

          <Typography variant="h5">Instructions:</Typography>
          {/* TODO: Fill instruction here */}
          {cocktail.strInstructions}
          <img
            src={cocktail.strDrinkThumb}
            style={{ width: 200, height: 200 }}
          />
          <Button
            variant="contained"
            onClick={() => {
              // console.log(cocktail)
              dispatch(cocktailAdded(cocktail))
            }}
          >
            Choisir
          </Button>
        </Stack>
      </Stack>
    </Card>
  )
}

export default CocktailCard
