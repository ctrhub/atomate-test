import { MantineProvider as MantineProviderComponent, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';

const theme = createTheme({});

export default function MantineProvider({ children }: { children: React.ReactNode }) {
  return (
    <MantineProviderComponent theme={theme} defaultColorScheme='auto'>
      {children}
    </MantineProviderComponent>
  );
}
