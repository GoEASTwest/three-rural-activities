'use client';

import { useState } from 'react';
import { families } from '@/data/families';
import { ChevronRight } from 'lucide-react';

interface FamilySidebarProps {
  selectedFamily: string;
  onFamilySelect: (familyId: string) => void;
}

export default function FamilySidebar({ selectedFamily, onFamilySelect }: FamilySidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-stone-50 to-stone-100 border-r-2 border-stone-300 shadow-lg transition-all duration-300 z-40 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="h-full relative">
        <div className="p-4 border-b border-stone-200">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <h2 className="text-lg font-semibold text-stone-800 font-serif">
                皖南名门
              </h2>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 hover:bg-stone-200 rounded transition-colors"
            >
              <ChevronRight className={`w-5 h-5 text-stone-600 transition-transform ${isCollapsed ? '' : 'rotate-180'}`} />
            </button>
          </div>
        </div>

        <nav className="p-2">
          {families.map((family) => (
            <button
              key={family.id}
              onClick={() => onFamilySelect(family.id)}
              className={`w-full text-left p-3 rounded-lg mb-2 transition-all duration-200 group ${
                selectedFamily === family.id
                  ? 'bg-gradient-to-r from-yellow-100 to-yellow-50 border-l-4 border-yellow-500 shadow-md'
                  : 'hover:bg-stone-100 hover:shadow-sm'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
                <span className="text-2xl">{family.emblem}</span>
                {!isCollapsed && (
                  <div className="flex-1">
                    <h3 className="font-medium text-stone-800">{family.name}</h3>
                    <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                      {family.description}
                    </p>
                  </div>
                )}
              </div>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-stone-200 bg-gradient-to-t from-stone-100 to-stone-50">
          {!isCollapsed && (
            <div className="text-xs text-stone-500 text-center">
              <p>徽派建筑美学</p>
              <p className="mt-1">千年家训传承</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}