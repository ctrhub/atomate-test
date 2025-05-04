import { MantineProvider as MantineProviderComponent, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

const theme = createTheme({});

export default function MantineProvider({ children }: { children: React.ReactNode }) {
  return (
    <MantineProviderComponent theme={theme} defaultColorScheme='auto'>
      {children}
      <Notifications />
    </MantineProviderComponent>
  );
}
