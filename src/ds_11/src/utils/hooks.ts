import { useEffect, useState } from 'react';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { KoobDataService } from 'bi-internal/services';
const { koobDataRequest3 } = KoobDataService;
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

export const useKoobRequest = (cubeName, measures, dimensions, filters, schema, requestName) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await koobDataRequest3(cubeName, measures, dimensions, filters, schema, requestName);
      setData(res);
    };

    fetchData();
  }, [cubeName, measures, dimensions, filters, schema, requestName]);

  return { data };
};
