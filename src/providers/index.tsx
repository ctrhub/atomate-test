import MantineProvider from "./MantineProvider";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
		<MantineProvider>
			{children}
		</MantineProvider>
	);
}