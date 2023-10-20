import { FC, useState } from 'react'
import { Button, Stack, Typography } from '@mui/material'
import { useAppSelector } from '../../redux/hooks'
import { Cocktail } from '../../types/cocktails'
import CocktailCard from '../CocktailCard'

const RandomCocktail: FC = () => {
  /* TODO: get cocktail data from API */
  const cocktail: Cocktail | undefined = undefined

  return (
    <Stack direction={'column'} alignItems="center" spacing={4}>
      <Typography variant="body1">En panne d'inspiration ?</Typography>
      <Button variant={'outlined'} color="secondary">
        Trouve moi un cocktail
      </Button>
      {/* TODO: Show cocktail card */}
    </Stack>
  )
}

export default RandomCocktail
