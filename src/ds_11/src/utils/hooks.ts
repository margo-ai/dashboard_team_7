import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { KoobDataService } from 'bi-internal/services';
const { koobDataRequest3 } = KoobDataService;
import type { RootState, AppDispatch } from '../store';

export const useAppDispatch: any = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
