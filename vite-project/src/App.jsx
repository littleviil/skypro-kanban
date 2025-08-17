import AppContent from "./AppContent";
import { AuthProvider } from "./context/AuthProvider";
import { TaskProvider } from "./context/TaskProvider";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <AppContent />
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;