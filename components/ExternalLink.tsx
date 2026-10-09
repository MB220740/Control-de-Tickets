import { Link } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import type { ComponentProps } from 'react';
import { Platform } from 'react-native';

export function ExternalLink(props: Omit<ComponentProps<typeof Link>, 'href'> & { href: string }) {
  return (
    <Link
      target="_blank"
      {...props}
      href={props.href}
      onPress={(e) => {
        if (Platform.OS !== 'web') {
          // Evita el comportamiento predeterminado de abrir el enlace en el navegador nativo.
          e.preventDefault();
          // Abre el enlace en un navegador integrado en la aplicación.
          WebBrowser.openBrowserAsync(props.href as string);
        }
      }}
    />
  );
}
