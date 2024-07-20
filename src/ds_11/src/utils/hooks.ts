import { useEffect, useState } from 'react';

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
