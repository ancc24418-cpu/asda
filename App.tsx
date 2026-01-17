import React, { useState } from 'react';
import { UserRole, Credential } from './types';
import { INITIAL_CREDENTIALS } from './constants';
import { StudentView } from './components/views/StudentView';
import { InstitutionView } from './components/views/InstitutionView';
import { EmployerView } from './components/views/EmployerView';
import { ChatAssistant } from './components/ChatAssistant';
import { GraduationCap, Building2, Briefcase, UserCog, LogOut, Menu } from 'lucide-react';

const App: React.FC = () => {
  const [activeRole, setActiveRole] = useState<UserRole>('student');
  const [credentials, setCredentials] = useState<Credential[]>(INITIAL_CREDENTIALS);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleIssueCredential = (newCredData: Omit<Credential, 'id' | 'status' | 'txHash' | 'tokenId'>) => {
    const newCred: Credential = {
      ...newCredData,
      id: (credentials.length + 1).toString(),
      status: 'active',
      // Simulate unique blockchain identifiers
      tokenId: `SBT-${Math.floor(1000 + Math.random() * 9000)}`,
      txHash: `0x${Math.random().toString(16).substr(2, 40)}`
    };
    setCredentials([newCred, ...credentials]);
  };

  const navItems = [
    { id: 'student', label: 'Student Portal', icon: GraduationCap },
    { id: 'institution', label: 'Institution Portal', icon: Building2 },
    { id: 'employer', label: 'Verifier Portal', icon: Briefcase },
    { id: 'admin', label: 'Admin Console', icon: UserCog },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <GraduationCap size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">EduChain</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex md:gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveRole(item.id as UserRole)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  activeRole === item.id
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </button>
            ))}
          </div>

           {/* Mobile Menu Button */}
           <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
           >
             <Menu size={24} />
           </button>
        </div>
        
        {/* Mobile Nav */}
        {isMobileMenuOpen && (
             <div className="md:hidden border-t border-slate-200 bg-white px-4 py-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                        setActiveRole(item.id as UserRole);
                        setIsMobileMenuOpen(false);
                    }}
                    className={`flex w-full items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                      activeRole === item.id
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <item.icon size={16} />
                    {item.label}
                  </button>
                ))}
             </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {activeRole === 'student' && <StudentView credentials={credentials} />}
        {activeRole === 'institution' && <InstitutionView credentials={credentials} onIssue={handleIssueCredential} />}
        {activeRole === 'employer' && <EmployerView credentials={credentials} />}
        {activeRole === 'admin' && (
            <div className="flex h-[60vh] flex-col items-center justify-center text-slate-400">
                <UserCog size={48} className="mb-4 text-slate-300"/>
                <h2 className="text-xl font-semibold text-slate-600">Admin Console</h2>
                <p className="max-w-md text-center mt-2">
                    System operations, node management, and permission controls would be displayed here.
                    <br/><span className="text-xs">(Mock View)</span>
                </p>
            </div>
        )}
      </main>

      {/* AI Assistant */}
      <ChatAssistant />
    </div>
  );
};

export default App;
