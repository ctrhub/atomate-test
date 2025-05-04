import MantineProvider from "./MantineProvider";
import QueryProvider from "./QueryProvider";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
		<MantineProvider>
			<QueryProvider>
				{children}
			</QueryProvider>
		</MantineProvider>
	);
}