import { useEffect, useState } from 'react';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

// export const useLocationChange = () => {
//   const [, setCurrentPath] = useState(window.location.hash);
//   useEffect(() => {
//     const onLocationChange = () => {
//       setCurrentPath(window.location.hash);
//     };
//     window.addEventListener('hashchange', onLocationChange);
//     return () => window.removeEventListener('hashchange', onLocationChange);
//   });
// };

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
