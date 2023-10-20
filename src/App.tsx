import './App.css'
import { Stack, Tab, Tabs, Typography } from '@mui/material'
import { FC, useCallback, useEffect, useState } from 'react'
import FavoriteList from './components/3_FavoriteList'
import RandomCocktail from './components/1_RandomCocktail'
import FindCocktail from './components/2_FindCocktail'
import API from './client/api'

const App: FC = () => {
  const [tabValue, setTabValue] = useState(0)
  const [ingredients, setIngredients] = useState<string[]>([])

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const fetchIngredients = useCallback(async () => {
    try {
      const response = await API.get(
        'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list',
      )
      // console.log(response)
      const { drinks } = response.data
      // console.log(drinks)

      let ings: string[] = []

      drinks.forEach((element: any) => {
        ings.push(element.strIngredient1)
      })

      // console.log(ings)
      setIngredients(ings.sort())
    } catch (error) {
      // console.log(error);
    }
  }, [])

  useEffect(() => {
    // console.log('useEffect')
    fetchIngredients()
  }, [fetchIngredients])

  return (
    <Stack direction="column" spacing={2}>
      <Typography variant="h4">
        Bienvenue dans la fabrique de Cocktails!
      </Typography>
      <Tabs value={tabValue} onChange={handleChange} centered>
        <Tab label="Cocktail au hasard" value={0} />
        <Tab label="Trouver un cocktail" value={1} />
        <Tab label="Voir la liste" value={2} />
      </Tabs>
      {tabValue === 0 ? (
        <RandomCocktail />
      ) : tabValue === 1 ? (
        // <>TODO: Find a cocktail by ingredient</>
        <FindCocktail ingredients={ingredients} />
      ) : (
        <>TODO: My list of favorite cocktails</>
      )}
    </Stack>
  )
}

export default App
