import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Video, 
  BarChart3, 
  MessageCircle, 
  List, 
  Users, 
  DollarSign, 
  Settings, 
  ChevronDown, 
  ChevronRight,
  Play,
  TrendingUp,
  FileText,
  Shield,
  Bell,
  Palette
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  badge?: number;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    badge: 3
  },
  {
    id: 'content',
    label: 'Content',
    icon: Video,
    children: [
      { id: 'videos', label: 'Videos', icon: Play },
      { id: 'playlists', label: 'Playlists', icon: List },
      { id: 'shorts', label: 'Shorts', icon: Video }
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    children: [
      { id: 'overview', label: 'Overview', icon: TrendingUp },
      { id: 'reach', label: 'Reach', icon: BarChart3 },
      { id: 'engagement', label: 'Engagement', icon: MessageCircle }
    ]
  },
  {
    id: 'community',
    label: 'Community',
    icon: Users,
    children: [
      { id: 'comments', label: 'Comments', icon: MessageCircle, badge: 12 },
      { id: 'community-posts', label: 'Community Posts', icon: FileText },
      { id: 'subscribers', label: 'Subscribers', icon: Users }
    ]
  },
  {
    id: 'monetization',
    label: 'Monetization',
    icon: DollarSign,
    children: [
      { id: 'revenue', label: 'Revenue', icon: DollarSign },
      { id: 'ads', label: 'Ads', icon: TrendingUp },
      { id: 'memberships', label: 'Memberships', icon: Users }
    ]
  },
  {
    id: 'customization',
    label: 'Customization',
    icon: Palette,
    children: [
      { id: 'branding', label: 'Branding', icon: Palette },
      { id: 'layout', label: 'Layout', icon: LayoutDashboard }
    ]
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    children: [
      { id: 'channel', label: 'Channel', icon: Settings },
      { id: 'upload', label: 'Upload defaults', icon: Video },
      { id: 'permissions', label: 'Permissions', icon: Shield },
      { id: 'notifications', label: 'Notifications', icon: Bell }
    ]
  }
];

const Sidebar: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>(['content']);
  const [activeItem, setActiveItem] = useState('dashboard');

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const renderNavItem = (item: NavItem, depth = 0) => {
    const isExpanded = expandedItems.includes(item.id);
    const isActive = activeItem === item.id;
    const hasChildren = item.children && item.children.length > 0;
    
    return (
      <div key={item.id} className="mb-1">
        <div
          className={`flex items-center px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 ${
            depth > 0 ? 'ml-6' : ''
          } ${
            isActive 
              ? 'bg-blue-600 text-white shadow-lg' 
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id);
            } else {
              setActiveItem(item.id);
            }
          }}
        >
          <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
          <span className="flex-1 text-sm font-medium">{item.label}</span>
          {item.badge && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full mr-2">
              {item.badge}
            </span>
          )}
          {hasChildren && (
            <div className="ml-2">
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </div>
          )}
        </div>
        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children!.map(child => renderNavItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 bg-gray-900 h-screen flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center mr-3">
            <Play className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-white text-lg font-bold">YouTube</h1>
            <p className="text-gray-400 text-sm">Studio</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {navItems.map(item => renderNavItem(item))}
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center text-gray-400 text-sm">
          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center mr-3">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <p className="text-white font-medium">Creator Studio</p>
            <p className="text-xs">v2.4.1</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;