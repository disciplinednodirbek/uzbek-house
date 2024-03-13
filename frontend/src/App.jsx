import Layout from "./layout";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "context/AuthContext";
import "leaflet/dist/leaflet.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: 0, refetchOnWindowFocus: false, staleTime: 1000 * 60 },
    },
  });
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <Layout />
        </QueryClientProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
