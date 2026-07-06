import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Sidebar from '../components/layout/Sidebar'
import MobileDrawer from '../components/layout/MobileDrawer'
import Footer from '../components/layout/Footer'

const Layout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed)
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)
  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 dark:bg-darkBg dark:text-slate-100 transition-colors duration-200">
      
      {/* Top Navbar */}
      <Navbar 
        toggleSidebar={toggleSidebar} 
        toggleMobileMenu={toggleMobileMenu} 
      />
      
      {/* Mobile Drawer Sheet */}
      <MobileDrawer 
        isOpen={mobileMenuOpen} 
        onClose={closeMobileMenu} 
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Collapsible Sidebar (desktop only) */}
        <Sidebar collapsed={sidebarCollapsed} />
        
        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-y-auto custom-scrollbar">
          <div className="flex-1 p-4 sm:p-6 md:p-8 max-w-[1600px] w-full mx-auto">
            {/* Active Route page injected here */}
            <Outlet />
          </div>
          
          <Footer />
        </main>
      </div>

    </div>
  )
}

export default Layout
