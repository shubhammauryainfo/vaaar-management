import React, { useState } from 'react';
import { Menu, X, ChevronDown, Home, Users, CalendarDays, MessageSquareMore, Landmark, BellRing } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState('');

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <Home className="w-5 h-5" />,
      path: '/dashboard'
    },
   {
      title: 'Form Responses',
      icon: <MessageSquareMore className="w-5 h-5" />,
      path: '/formresponses'
    },
    {
      title: 'Events',
      icon: <CalendarDays className="w-5 h-5" />,
      path: '/events'
    },
    {
      title: 'Notices',
      icon: <BellRing className="w-5 h-5" />,
      path: '/notices'
    },
    {
      title: 'Members',
      icon: <Users className="w-5 h-5" />,
      path: '/members'
    },
    {
        title: 'Funds',
        icon: <Landmark className="w-5 h-5" />,
        path: '/funds'
      }
  ];

  const toggleSubmenu = (title) => {
    setOpenSubmenu(openSubmenu === title ? '' : title);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 right-4 z-50 p-2 rounded-lg bg-gray-800 text-white lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transition-transform duration-300 ease-in-out transform lg:transform-none lg:opacity-100 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-gray-700">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>

        {/* Navigation */}
        <nav className="mt-6">
          <div className="px-4 space-y-2">
            {menuItems.map((item) => (
              <div key={item.title}>
                {/* Menu Item */}
                <button
                  className={`flex items-center justify-between w-full px-4 py-3 text-sm rounded-lg hover:bg-gray-700 transition-colors ${
                    openSubmenu === item.title ? 'bg-gray-700' : ''
                  }`}
                  onClick={() => item.submenu && toggleSubmenu(item.title)}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                  {item.submenu && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        openSubmenu === item.title ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </button>

                {/* Submenu */}
                {item.submenu && (
                  <div
                    className={`mt-2 ml-4 space-y-2 transition-all duration-300 ${
                      openSubmenu === item.title ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
                  >
                    {item.submenu.map((subItem) => (
                      <a
                        key={subItem.title}
                        href={subItem.path}
                        className="block px-4 py-2 text-sm text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
                      >
                        {subItem.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
          <div className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-700 rounded-lg transition-colors cursor-pointer">
            <img
              src="/api/placeholder/32/32"
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-gray-400">Admin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;