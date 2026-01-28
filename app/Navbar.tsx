'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, User } from 'lucide-react';

interface NavbarProps {
    companies?: string[];
    roles?: string[];
    userInitials?: string;
    userName?: string;
    activeTab: 'dashboard' | 'data';
    onTabChange: (tab: 'dashboard' | 'data') => void;
  }
  

  export default function Navbar({
    companies = ['Protiviti'],
    roles = ['Approver'],
    userInitials = 'NK',
    userName = 'Nikhil Kumar',
    activeTab,
    onTabChange,
  }: NavbarProps) {
  
//   const [activeTab, setActiveTab] = useState<'dashboard' | 'data'>('dashboard');
  const [selectedCompany, setSelectedCompany] = useState(companies[0]);
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const companyRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Handle tab change
  const handleTabChange = (tab: 'dashboard' | 'data') => {
    onTabChange(tab);
  };
  

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        companyRef.current &&
        !companyRef.current.contains(event.target as Node)
      ) {
        if (openDropdown === 'company') setOpenDropdown(null);
      }
      if (roleRef.current && !roleRef.current.contains(event.target as Node)) {
        if (openDropdown === 'role') setOpenDropdown(null);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#004068] text-white border-b border-gray-200">
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Tab Switch */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => handleTabChange('dashboard')}
                className={`px-6 py-2 rounded-md font-medium text-sm transition-all duration-200 ${
                  activeTab === 'dashboard'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => handleTabChange('data')}
                className={`px-6 py-2 rounded-md font-medium text-sm transition-all duration-200 ${
                  activeTab === 'data'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Data
              </button>
            </div>
          </div>

          {/* Right Section - Fixed Dropdowns and Profile */}
          <div className="flex items-center gap-4 ml-8">
            {/* Company Dropdown */}
            <div ref={companyRef} className="relative">
              <button
                onClick={() =>
                  setOpenDropdown(openDropdown === 'company' ? null : 'company')
                }
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                {selectedCompany}
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    openDropdown === 'company' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openDropdown === 'company' && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="py-1">
                    {companies.map((company) => (
                      <button
                        key={company}
                        onClick={() => {
                          setSelectedCompany(company);
                          setOpenDropdown(null);
                        }}
                        className={`w-full px-4 py-2 text-sm text-left transition-colors duration-150 ${
                          selectedCompany === company
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {company}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Role Dropdown */}
            <div ref={roleRef} className="relative">
              <button
                onClick={() =>
                  setOpenDropdown(openDropdown === 'role' ? null : 'role')
                }
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                {selectedRole}
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    openDropdown === 'role' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openDropdown === 'role' && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="py-1">
                    {roles.map((role) => (
                      <button
                        key={role}
                        onClick={() => {
                          setSelectedRole(role);
                          setOpenDropdown(null);
                        }}
                        className={`w-full px-4 py-2 text-sm text-left transition-colors duration-150 ${
                          selectedRole === role
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar and Menu */}
            <div ref={profileRef} className="relative ml-4">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-semibold text-sm hover:bg-blue-600 transition-colors duration-200 hover:shadow-lg"
              >
                {userInitials}
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-900">
                      {userName}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{selectedRole}</p>
                  </div>
                  <div className="py-1">
                    <button className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 transition-colors duration-150 flex items-center gap-2">
                      <User size={16} />
                      Profile Settings
                    </button>
                    <button className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                      Help & Support
                    </button>
                  </div>
                  <div className="py-1 border-t border-gray-200">
                    <button className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 transition-colors duration-150 font-medium">
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}