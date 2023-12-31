import { useDispatch, useSelector } from 'react-redux'

import type { AppDispatch, RootState } from './store'
import type { TypedUseSelectorHook } from 'react-redux'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
