import { useEffect, useState } from 'react';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { KoobDataService } from 'bi-internal/services';
const { koobDataRequest3 } = KoobDataService;
import type { RootState, AppDispatch } from '../store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// export const getKoobData = async (cubeName, measures, dimensions, filters, schema, requestName) => {
//   try {
//     const result = await koobDataRequest3(cubeName, measures, dimensions, filters, schema, requestName);
//     return result;
//   } catch (error) {
//     console.log('Error', error);
//   }
// };
