// components/DashboardLayout.tsx
import React from 'react';
import Sidebar from './Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../../redux/uiSlice';
import { RootState } from '../../store/index';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const isSidebarCollapsed = useSelector((state: RootState) => state.ui.isSidebarCollapsed);
  const dispatch = useDispatch();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar collapsed={isSidebarCollapsed} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
              aria-label="Toggle sidebar"
            >
              {isSidebarCollapsed ? 'Expand' : 'Collapse'}
            </button>
            <h1 className="text-lg font-medium text-gray-800">Admin Dashboard</h1>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;