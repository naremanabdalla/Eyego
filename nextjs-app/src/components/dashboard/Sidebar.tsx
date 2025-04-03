import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const router = useRouter();

  const navItems = [
    { path: '/dashboard', icon: '🏠', label: 'Dashboard' },
    { path: '/profile', icon: '👤', label: 'Profile' },
  ];

  return (
    <div className={`bg-gray-800 text-white h-full ${collapsed ? 'w-16' : 'w-64'} transition-all duration-300`}>
      <nav className="mt-4">
        <ul>
          {navItems.map((item) => (
            <li key={item.path} className="p-2">
              <Link href={item.path} className={`
                  hover:bg-gray-700 block p-2 rounded flex items-center
                  ${router.pathname === item.path ? 'bg-gray-700' : ''}
                  ${collapsed ? 'justify-center' : ''}
                `}>
                <span className="text-xl">{item.icon}</span>
                {!collapsed && <span className="ml-2">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;