import { FC, /* Fragment, useCallback, useEffect,*/ useState } from 'react'
import {
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from '@mui/material'
// import { Cocktail } from '../../types/cocktails'
// import CocktailCard from '../CocktailCard'
import API from '../../client/api'
import { Cocktail, Cocktails } from '../../types/cocktails'
import CocktailCard from '../CocktailCard'

interface IProps {
  ingredients?: string[]
}

const FindCocktail: FC<IProps> = ({ ingredients }) => {
  // console.log('ingredients:', ingredients)

  const [filter, setFilter] = useState<string>()
  // const [results, setResults] = useState<Array<{ name: string; img: string }>>()
  const [results, setResults] = useState<Array<Cocktail>>()

  // Solution 1 - When the filter changed, we automatically fetch data
  // const fetchCocktailsByIngredient = useCallback(async (filter: string) => {
  // Solution 2 - When we clcik on the button validate
  const fetchCocktailsByIngredient = async () => {
    // console.log('fetchCocktailsByIngredient')
    // console.log(filter)
    if (filter !== undefined) {
      try {
        // www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin
        const response = await API.get(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${filter}`,
        )
        // console.log(response.data)
        const { drinks } = response.data
        // console.log(drinks)

        // Solution 1 - Custom component with <{ name: string; img: string }>
        let res: Array<{ name: string; img: string }> = []

        drinks.forEach((element: any) => {
          res.push({ name: element.strDrink, img: element.strDrinkThumb })
        })

        // Solution 2 - CocktailCard component
        let requests = drinks.map(async (element: Cocktail) => {
          // console.log(element)
          return await API.get(
            `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${element.idDrink}`,
          )
        })

        let formattedData = []
        Promise.all(requests).then((responses) => {
          // console.log(responses)

          // const { drinks } = responses.data
          // console.log(drinks)

          formattedData = responses.map((drink) => {
            const { drinks } = drink.data
            // console.log(drinks)
            const obj = drinks[0]

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

            return objFormatted
          })

          // console.log(formattedData)
          setResults(formattedData)
        })

        // console.log(res)
        // setResults(res)
      } catch (error) {
        // console.log(error);
      }
    } else {
      // console.log("can't fetch data : filter is undefined")
    }
    // Solution 1 - When the filter changed, we automatically fetch data
    // }, [])
    // Solution 2 - When we click on the button validate
  }

  // // Solution 1 - When the filter changed, we automatically fetch data
  // useEffect(() => {
  //   // console.log('useEffect')
  //   // console.log(filter)

  //   if (filter !== undefined) {
  //     // console.log(filter)
  //     fetchCocktailsByIngredient(filter)
  //   }
  // }, [filter])

  // console.log(results)

  const handleCheck = (
    _event: React.SyntheticEvent<Element, Event>,
    ingredient: string,
    checked: boolean,
  ) => {
    // console.log(event.target)
    // console.log(ingredient)

    if (checked) {
      // console.log(ingredient)
      setFilter(ingredient)
    } else {
      setFilter(undefined)
      setResults([])
    }
  }

  return (
    <Stack direction={'column'} alignItems="center" spacing={4}>
      <Typography variant="body1">
        Entrez les informations pour trouver un cocktail selon vos goûts
      </Typography>
      <Button
        variant={'outlined'}
        color="secondary"
        onClick={fetchCocktailsByIngredient}
      >
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
                    // onClick={() => {
                    //   setFilter(ingredient)
                    // }}
                    onChange={(event, checked) =>
                      handleCheck(event, ingredient, checked)
                    }
                  />
                )
              })}
          </FormGroup>
        </Card>
      </Stack>

      {/* List of cocktails */}
      <Stack direction={'row'} spacing={2}>
        {/* TODO: Show list of cocktail containing selected ingredient */}
        <div
          style={{
            // width: '100%',
            // backgroundColor: 'blue',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {results &&
            results.map((element, index) => {
              // console.log(element)
              return (
                // Initial
                // <div
                //   key={index}
                //   style={{
                //     // backgroundColor: 'pink',
                //     margin: '5px',
                //     border: '1px solid black',
                //   }}
                // >
                //   <p>{element.name}</p>
                //   <img src={element.img} style={{ width: 200, height: 200 }} />
                // </div>
                // Bonus
                <div style={{ margin: '10px' }} key={index}>
                  <CocktailCard cocktail={element} />
                </div>
              )
            })}
        </div>
      </Stack>
    </Stack>
  )
}

export default FindCocktail
