//función es exclusiva para web, ya que la versión nativa no admite actualmente el renderizado en el servidor.
export function useClientOnlyValue<S, C>(server: S, client: C): S | C {
  return client;
}
