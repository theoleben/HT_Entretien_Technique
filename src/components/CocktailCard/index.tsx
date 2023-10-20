import { FC } from 'react'
import { Button, Card, Stack, Typography } from '@mui/material'
import { Cocktail } from '../../types/cocktails'
import { useAppDispatch } from '../../redux/hooks'

interface IProps {
  cocktail: Cocktail
}

const CocktailCard: FC<IProps> = () => {
  const dispatch = useAppDispatch()

  return (
    <Card style={{ padding: '10px', maxWidth: '400px' }}>
      <Stack direction={'column'} alignItems="center" spacing={4}>
        <Stack alignItems="center" spacing={1}>
          <Typography variant="h5">TODO: Cocktail name</Typography>
          <Typography variant="h5">Ingrédients:</Typography>
          {/* TODO: Fill ingredients here */}
          <Typography variant="h5">Instructions:</Typography>
          {/* TODO: Fill instruction here */}
          <img
            src={'TODO: replace with image url here'}
            style={{ width: 200, height: 200 }}
          />
        </Stack>
      </Stack>
    </Card>
  )
}

export default CocktailCard
