import { useEffect, useState } from 'react';

// `useEffect` no se invoca durante el renderizado en el servidor, lo que significa
// que podemos usarlo para determinar si estamos en el servidor o no.
export function useClientOnlyValue<S, C>(server: S, client: C): S | C {
  const [value, setValue] = useState<S | C>(server);
  useEffect(() => {
    setValue(client);
  }, [client]);

  return value;
}
