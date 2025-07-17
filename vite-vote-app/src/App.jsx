import { useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import LiveChats from "./pages/LiveChats";
import Settings from "./pages/Settings";
import Reports from "./pages/Reports";
import ChatBot from "./pages/ChatBot";

function App() {
  const [selectedItem, setSelectedItem] = useState("Dashboard");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const renderMainContent = () => {
    switch (selectedItem) {
      case "Dashboard":
        return <Dashboard />;
      case "Settings":
        return <Settings />;
      case "Reports":
        return <Reports />;
      case "LiveChats":
        return <LiveChats />;
      default:
        return <Dashboard />;
    }
  };

  const handleSidebarClick = (item) => {
    setSelectedItem(item);
    setShowMobileMenu(false);
  };

  return (
    <div className="app-container">
      <Navbar onToggleMobileMenu={() => setShowMobileMenu(!showMobileMenu)} />
      <div className="content">
        {/* Show sidebar always on desktop; toggle on mobile */}
        <Sidebar
          selectedItem={selectedItem}
          onSelect={handleSidebarClick}
          isMobile={true}
          showMobileMenu={showMobileMenu}
        />
        <main className="main-content">
          {renderMainContent()}
          <ChatBot />
        </main>
      </div>
    </div>
  );
}

export default App;
