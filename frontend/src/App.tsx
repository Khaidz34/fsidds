import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Utensils, 
  History, 
  User as UserIcon, 
  ChefHat, 
  LayoutDashboard, 
  LogOut, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  ShoppingBag,
  Bell,
  Search,
  Filter,
  X,
  Globe,
  Plus,
  Wallet,
  CreditCard,
  PlusCircle,
  ClipboardList,
  BarChart3,
  FileText,
  MessageSquare,
  Settings,
  Calendar,
  Zap,
  Activity,
  QrCode,
  Flame,
  Dna,
  Coffee,
  IceCream,
  Trash2,
  Pizza,
  Soup,
  Fish
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { User, MenuItem, Order, Language } from './types';
import { MOCK_USER, ADMIN_USER, MENU_ITEMS } from './constants';

const TRANSLATIONS = {
  vi: {
    dashboard: 'Bảng điều khiển',
    menu: 'Thực đơn',
    orders: 'Đơn hàng',
    wallet: 'Ví điện tử',
    settings: 'Cài đặt',
    calories: 'Calo',
    protein: 'Đạm',
    carbs: 'Tinh bột',
    fat: 'Béo',
    orderNow: 'Đặt món',
    balance: 'Số dư',
    topUp: 'Nạp tiền',
    weeklyActivity: 'Hoạt động tuần',
    todayMenu: 'Thực đơn hôm nay',
    pickupCode: 'Mã nhận món',
    scanToPickup: 'Quét tại quầy để nhận món',
    orderSuccess: 'Đặt món thành công!',
    nutritionInfo: 'Thông tin dinh dưỡng',
    admin: {
      menuManagement: 'Quản lý Menu',
      allOrders: 'Tất cả đơn',
      statistics: 'Thống kê',
      payments: 'Thanh toán',
      invoicing: 'Xuất hóa đơn',
      feedback: 'Góp ý',
      accountManagement: 'Quản lý tài khoản',
      ordersToday: 'Đơn hôm nay',
      users: 'Người đặt',
      monthlyRevenue: 'Doanh thu tháng',
      popularDishes: 'Món phổ biến',
      menuToday: 'Menu hôm nay',
      favoriteDishes: 'Món được yêu thích'
    }
  },
  en: {
    dashboard: 'Dashboard',
    menu: 'Menu',
    orders: 'Orders',
    wallet: 'Wallet',
    settings: 'Settings',
    calories: 'Calories',
    protein: 'Protein',
    carbs: 'Carbs',
    fat: 'Fat',
    orderNow: 'Order Now',
    balance: 'Balance',
    topUp: 'Top Up',
    weeklyActivity: 'Weekly Activity',
    todayMenu: "Today's Menu",
    pickupCode: 'Pickup Code',
    scanToPickup: 'Scan at counter to pickup',
    orderSuccess: 'Order Successful!',
    nutritionInfo: 'Nutrition Info',
    admin: {
      menuManagement: 'Menu Management',
      allOrders: 'All Orders',
      statistics: 'Statistics',
      payments: 'Payments',
      invoicing: 'Invoicing',
      feedback: 'Feedback',
      accountManagement: 'Account Management',
      ordersToday: 'Orders Today',
      users: 'Users',
      monthlyRevenue: 'Monthly Revenue',
      popularDishes: 'Popular Dishes',
      menuToday: 'Menu Today',
      favoriteDishes: 'Favorite Dishes'
    }
  },
  ja: {
    dashboard: 'ダッシュボード',
    menu: 'メニュー',
    orders: '注文',
    wallet: 'ウォレット',
    settings: '設定',
    calories: 'カロリー',
    protein: 'タンパク質',
    carbs: '炭水化物',
    fat: '脂質',
    orderNow: '今すぐ注文',
    balance: '残高',
    topUp: 'チャージ',
    weeklyActivity: '週間アクティビティ',
    todayMenu: '今日のメニュー',
    pickupCode: '受取コード',
    scanToPickup: 'カウンターでスキャンして受け取り',
    orderSuccess: '注文完了！',
    nutritionInfo: '栄養情報',
    admin: {
      menuManagement: 'メニュー管理',
      allOrders: 'すべての注文',
      statistics: '統計',
      payments: '支払い',
      invoicing: '請求書発行',
      feedback: 'フィードバック',
      accountManagement: 'アカウント管理',
      ordersToday: '今日の注文',
      users: 'ユーザー',
      monthlyRevenue: '月間収益',
      popularDishes: '人気の料理',
      menuToday: '今日のメニュー',
      favoriteDishes: 'お気に入りの料理'
    }
  }
};

const CHART_DATA = [
  { name: 'Mon', calories: 1850 },
  { name: 'Tue', calories: 2100 },
  { name: 'Wed', calories: 1950 },
  { name: 'Thu', calories: 2200 },
  { name: 'Fri', calories: 1800 },
  { name: 'Sat', calories: 1600 },
  { name: 'Sun', calories: 1700 },
];

const FallingPetals = ({ theme }: { theme: 'fusion' | 'corporate' }) => {
  const items = useMemo(() => Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `-${Math.random() * 15}s`,
    duration: `${8 + Math.random() * 12}s`,
    size: 8 + Math.random() * 12,
    rotation: Math.random() * 360,
  })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {items.map((item, i) => (
        <div
          key={item.id}
          className={`absolute animate-fall ${
            theme === 'fusion' 
              ? (i % 2 === 0 ? 'text-pink-400/30' : 'text-white/40')
              : (i % 2 === 0 ? 'text-blue-400/20' : 'text-white/30')
          }`}
          style={{
            left: item.left,
            animationDelay: item.delay,
            animationDuration: item.duration,
          }}
        >
          <div 
            className="w-4 h-6 bg-current blur-[1px]" 
            style={{ 
              borderRadius: '100% 0 100% 0',
              transform: `rotate(${item.rotation}deg)`,
              width: item.size,
              height: item.size * 1.5
            }} 
          />
        </div>
      ))}
    </div>
  );
};

const FallingFood = ({ theme }: { theme: 'fusion' | 'corporate' }) => {
  const foodIcons = [Pizza, Soup, Fish, Coffee, IceCream, Utensils];
  const items = useMemo(() => Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    Icon: foodIcons[i % foodIcons.length],
    left: `${Math.random() * 100}%`,
    delay: `-${Math.random() * 20}s`,
    duration: `${10 + Math.random() * 15}s`,
    size: 20 + Math.random() * 20,
  })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {items.map((item, i) => (
        <div
          key={item.id}
          className={`absolute animate-fall ${
            theme === 'fusion' 
              ? (i % 2 === 0 ? 'text-app-accent/45' : 'text-app-gold/45')
              : (i % 2 === 0 ? 'text-app-accent/45' : 'text-app-gold/45')
          }`}
          style={{
            left: item.left,
            animationDelay: item.delay,
            animationDuration: item.duration,
          }}
        >
          <item.Icon size={item.size} />
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const [theme, setTheme] = useState<'fusion' | 'corporate'>('fusion');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USER);
  const [currentLang, setCurrentLang] = useState<Language>('vi');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [showAddMenuModal, setShowAddMenuModal] = useState(false);
  const [newMenuItems, setNewMenuItems] = useState<Partial<MenuItem>[]>(
    Array(8).fill(null).map(() => ({
      name: { vi: '', en: '', ja: '' },
      description: { vi: '', en: '', ja: '' },
      price: 40000,
      category: 'main',
      image: '',
      tags: ['Món chính'],
      nutrition: { calories: 450, protein: 25, carbs: 50, fat: 15 }
    }))
  );
  const [replaceMenu, setReplaceMenu] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const t = TRANSLATIONS[currentLang];

  useEffect(() => {
    document.documentElement.className = theme === 'corporate' ? 'theme-corporate' : '';
  }, [theme]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectItem = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handlePlaceOrder = () => {
    setShowOrderSuccess(true);
    setSelectedItems([]);
    setTimeout(() => setShowOrderSuccess(false), 3000);
  };

  const handleLogin = (role: 'employee' | 'admin') => {
    setCurrentUser(role === 'admin' ? ADMIN_USER : MOCK_USER);
    setIsLoggedIn(true);
    setActiveTab('dashboard');
  };

  const handleBulkAddMenuItems = () => {
    const validItems = newMenuItems.filter(item => item.name?.vi && item.name.vi.trim() !== '');
    if (validItems.length === 0) return;

    const newItemsWithIds = validItems.map((item, index) => ({
      ...item,
      id: (replaceMenu ? index + 1 : menuItems.length + index + 1).toString(),
      available: true,
      image: '', // No images as requested
    })) as MenuItem[];

    if (replaceMenu) {
      setMenuItems(newItemsWithIds);
    } else {
      setMenuItems([...menuItems, ...newItemsWithIds]);
    }
    
    setShowAddMenuModal(false);
    setReplaceMenu(false);
    setNewMenuItems(
      Array(8).fill(null).map(() => ({
        name: { vi: '', en: '', ja: '' },
        description: { vi: '', en: '', ja: '' },
        price: 40000,
        category: 'main',
        image: '',
        tags: ['Món chính'],
        nutrition: { calories: 450, protein: 25, carbs: 50, fat: 15 }
      }))
    );
  };

  const handleDeleteMenuItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const filteredMenu = menuItems;

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-app-bg text-app-ink flex items-center justify-center p-6 relative overflow-hidden">
        {/* Decorative Elements - Fusion & Corporate Style */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none flex">
          <div className="w-1/2 h-full lotus-pattern border-r border-app-accent/10" />
          <div className="w-1/2 h-full seigaiha-pattern" />
        </div>

        {/* Cultural Symbols Background */}
        <FallingFood theme={theme} />
        <FallingPetals theme={theme} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[50vh] fuji-pattern opacity-80 pointer-events-none" />
        {theme === 'corporate' && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0054A6]/5 to-transparent pointer-events-none" />
        )}

        {/* Red/Blue Sun and Soft Accents */}
        <div className="absolute top-[-10%] right-[-10%] w-[40%] aspect-square bg-app-accent blur-[120px] rounded-full opacity-10 animate-zen-float" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] aspect-square bg-app-gold blur-[120px] rounded-full opacity-5" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="bg-white/90 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-2xl border border-app-accent/5 silk-texture relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-app-accent via-app-gold to-app-accent" />
            
            <div className="flex flex-col items-center mb-8">
              <div className="w-24 h-24 bg-app-accent rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-app-accent/30 border-4 border-white relative">
                <ChefHat className="text-white" size={48} />
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-app-gold rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                  <div className="w-6 h-6 lotus-icon-solid" />
                </div>
              </div>
              <h1 className="text-4xl font-display font-bold tracking-tight mb-2">
                <span className="text-app-accent">Gourmet</span>
                <span className="text-app-accent/80">Grid</span>
              </h1>
              <div className="flex items-center gap-3">
                <div className="h-px w-10 bg-app-accent/10" />
                <p className="text-[10px] text-app-accent/60 font-bold tracking-[0.5em] uppercase">{theme === 'fusion' ? 'Ẩm Thực Giao Thoa' : 'Corporate Dining'}</p>
                <div className="h-px w-10 bg-app-accent/10" />
              </div>
            </div>

            <div className="space-y-6">
              {/* Theme & Language Selector in Login */}
              <div className="flex flex-col gap-3 mb-2">
                <div className="flex items-center justify-center gap-2 bg-app-cream p-1.5 rounded-2xl border border-app-ink/10">
                  {(['fusion', 'corporate'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${theme === t ? 'bg-app-accent text-white shadow-lg' : 'text-app-ink/40 hover:text-app-accent'}`}
                    >
                      {t === 'fusion' ? 'Fusion' : 'Corporate'}
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-2 bg-app-cream p-1.5 rounded-2xl border border-app-ink/10">
                  {(['vi', 'en', 'ja'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setCurrentLang(lang)}
                      className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${currentLang === lang ? 'bg-app-accent text-white shadow-lg' : 'text-app-ink/40 hover:text-app-accent'}`}
                    >
                      {lang === 'vi' ? 'Tiếng Việt' : lang === 'en' ? 'English' : '日本語'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <button 
                  onClick={() => setCurrentUser(MOCK_USER)}
                  className={`py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative overflow-hidden ${currentUser.role === 'employee' ? 'bg-app-accent text-white shadow-lg shadow-app-accent/20' : 'bg-app-cream text-app-ink/40 border border-app-ink/10'}`}
                >
                  {currentUser.role === 'employee' && <div className="absolute inset-0 silk-texture opacity-20" />}
                  <span className="relative z-10">Nhân viên</span>
                </button>
                <button 
                  onClick={() => setCurrentUser(ADMIN_USER)}
                  className={`py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative overflow-hidden ${currentUser.role === 'admin' ? 'bg-app-accent text-white shadow-lg shadow-app-accent/20' : 'bg-app-cream text-app-ink/40 border border-app-ink/10'}`}
                >
                  {currentUser.role === 'admin' && <div className="absolute inset-0 silk-texture opacity-20" />}
                  <span className="relative z-10">Quản trị</span>
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-app-accent/60 ml-2">Mã nhân viên</label>
                <input 
                  type="text" 
                  defaultValue={currentUser.role === 'admin' ? 'GG-ADMIN-001' : 'GG-2026-8829'}
                  className="w-full bg-app-cream/50 border-2 border-app-ink/10 rounded-2xl py-4 px-6 text-app-ink outline-none focus:border-app-accent/30 focus:ring-4 focus:ring-app-accent/5 transition-all placeholder:text-app-ink/20 font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-app-accent/60 ml-2">Mật khẩu</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  defaultValue="password"
                  className="w-full bg-app-cream/50 border-2 border-app-ink/10 rounded-2xl py-4 px-6 text-app-ink outline-none focus:border-app-accent/30 focus:ring-4 focus:ring-app-accent/5 transition-all placeholder:text-app-ink/20 font-medium"
                />
              </div>

              <button 
                onClick={() => setIsLoggedIn(true)}
                className="w-full bg-app-accent text-white font-bold py-5 rounded-2xl shadow-2xl shadow-app-accent/30 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
              >
                <span className="uppercase tracking-[0.2em] text-xs">Vào không gian</span>
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
          
          <p className="text-center mt-8 text-[10px] text-[#DA251D]/40 font-bold uppercase tracking-[0.3em]">
            © 2026 GourmetGrid • Tinh Hoa Á Đông
          </p>
        </motion.div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-app-bg flex items-center justify-center lotus-pattern">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 border-4 border-app-accent/10 border-t-app-accent rounded-full animate-spin shadow-xl shadow-app-accent/5" />
          <div className="flex flex-col items-center">
            <p className="text-app-ink text-sm font-display font-bold tracking-tight mb-1">GourmetGrid</p>
            <p className="text-app-accent/60 text-[10px] font-bold tracking-[0.3em] uppercase">Đang chuẩn bị không gian...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-app-bg text-app-ink font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-24 md:w-72 bg-white border-r border-app-ink/10 flex flex-col transition-all duration-300 relative silk-texture">
        <div className="p-8 flex items-center gap-4">
          <div className="w-10 h-10 bg-app-accent rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-app-accent/20 border-2 border-white/30">
            <ChefHat size={20} className="text-white" />
          </div>
          <span className="hidden md:block font-display font-bold text-xl tracking-tight">
            <span className="text-app-accent">Gourmet</span>
            <span className="text-app-accent/60">Grid</span>
          </span>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto no-scrollbar">
          <div className="mb-4">
            <p className="px-4 text-[10px] font-bold text-[#DA251D]/40 uppercase tracking-[0.3em] mb-4">Mục lục</p>
            <SidebarItem 
              icon={<LayoutDashboard size={20} />} 
              label={t.dashboard} 
              active={activeTab === 'dashboard'} 
              onClick={() => setActiveTab('dashboard')} 
            />
            {currentUser.role !== 'admin' && (
              <SidebarItem 
                icon={<Utensils size={20} />} 
                label={t.menu} 
                active={activeTab === 'menu'} 
                onClick={() => setActiveTab('menu')} 
              />
            )}
            <SidebarItem 
              icon={<ClipboardList size={20} />} 
              label={currentUser.role === 'admin' ? t.admin.allOrders : t.orders} 
              active={activeTab === 'orders'} 
              onClick={() => setActiveTab('orders')} 
            />
            {currentUser.role !== 'admin' && (
              <SidebarItem 
                icon={<Wallet size={20} />} 
                label={t.wallet} 
                active={activeTab === 'wallet'} 
                onClick={() => setActiveTab('wallet')} 
              />
            )}
            <SidebarItem 
              icon={<MessageSquare size={20} />} 
              label={t.admin.feedback} 
              active={activeTab === 'feedback'} 
              onClick={() => setActiveTab('feedback')} 
            />
          </div>

          {currentUser.role === 'admin' && (
            <div className="pt-4 border-t border-[#E5E1D1]">
              <p className="px-4 text-[10px] font-bold text-[#DA251D]/40 uppercase tracking-[0.3em] mb-4">Quản trị</p>
              <SidebarItem 
                icon={<Settings size={20} />} 
                label={t.admin.menuManagement} 
                active={activeTab === 'menu-mgmt'} 
                onClick={() => setActiveTab('menu-mgmt')} 
              />
              <SidebarItem 
                icon={<BarChart3 size={20} />} 
                label={t.admin.statistics} 
                active={activeTab === 'stats'} 
                onClick={() => setActiveTab('stats')} 
              />
              <SidebarItem 
                icon={<CreditCard size={20} />} 
                label={t.admin.payments} 
                active={activeTab === 'payments'} 
                onClick={() => setActiveTab('payments')} 
              />
              <SidebarItem 
                icon={<FileText size={20} />} 
                label={t.admin.invoicing} 
                active={activeTab === 'invoicing'} 
                onClick={() => setActiveTab('invoicing')} 
              />
              <SidebarItem 
                icon={<UserIcon size={20} />} 
                label={t.admin.accountManagement} 
                active={activeTab === 'accounts'} 
                onClick={() => setActiveTab('accounts')} 
              />
            </div>
          )}
        </nav>

        <div className="p-4 mt-auto">
          <div className="hidden md:block bg-app-cream rounded-2xl p-5 mb-4 border border-app-ink/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-app-accent/5 rounded-full -mr-8 -mt-8" />
            <p className="text-[10px] font-bold text-app-accent/40 uppercase tracking-widest mb-1">{t.balance}</p>
            <p className="text-xl font-black text-app-accent">{currentUser.walletBalance.toLocaleString()}đ</p>
          </div>
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="w-full flex items-center justify-center gap-3 py-4 text-app-ink/40 hover:text-app-accent transition-colors"
          >
            <LogOut size={20} />
            <span className="hidden md:block font-bold text-xs uppercase tracking-widest">Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-24 border-b border-app-ink/10 flex items-center justify-between px-10 shrink-0 bg-white/80 backdrop-blur-md z-20 silk-texture">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-display font-bold tracking-tight capitalize brush-accent">{activeTab === 'menu-mgmt' ? t.admin.menuManagement : activeTab}</h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-app-cream p-1.5 rounded-xl border border-app-ink/10">
              {(['fusion', 'corporate'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${theme === t ? 'bg-app-accent text-white shadow-md' : 'text-app-ink/40 hover:text-app-accent'}`}
                >
                  {t === 'fusion' ? 'Fusion' : 'Corp'}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 bg-app-cream p-1.5 rounded-xl border border-app-ink/10">
              {(['vi', 'en', 'ja'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setCurrentLang(lang)}
                  className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${currentLang === lang ? 'bg-app-accent text-white shadow-lg' : 'text-app-ink/40 hover:text-app-accent'}`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 pl-6 border-l border-[#E5E1D1]">
              <div className="hidden md:block text-right">
                <p className="text-sm font-bold text-[#1C1917]">{currentUser.name}</p>
                <p className="text-[10px] text-app-accent/60 font-bold uppercase tracking-widest">{currentUser.role === 'admin' ? 'Quản trị viên' : 'Nhân viên'}</p>
              </div>
              <img src={currentUser.avatar} alt="Avatar" className="w-10 h-10 rounded-full border-2 border-app-accent/10 shadow-sm" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-10 bg-[#FDFCF8]">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && currentUser.role === 'employee' && (
              <motion.div
                key="dashboard-user"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard icon={<Flame className="text-app-accent" />} label="Calo trung bình" value="1,920" unit="kcal" />
                  <StatCard icon={<Activity className="text-app-accent" />} label="Bữa ăn tuần này" value="12" unit="bữa" />
                  <StatCard icon={<Dna className="text-app-accent" />} label="Lượng đạm" value="450" unit="g" />
                  <StatCard icon={<Wallet className="text-app-accent" />} label="Số dư ví" value={currentUser.walletBalance.toLocaleString()} unit="đ" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Chart Section */}
                  <div className="lg:col-span-2 lacquer-card p-8">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-xl font-display font-bold tracking-tight">{t.weeklyActivity}</h3>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-[#DA251D] rounded-full" />
                        <span className="text-xs text-[#1C1917]/40 font-bold uppercase tracking-widest">Calories</span>
                      </div>
                    </div>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={CHART_DATA}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#E5E1D1" vertical={false} />
                          <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#1C1917', fontSize: 12, fontWeight: 700 }} 
                          />
                          <YAxis hide />
                          <Tooltip 
                            cursor={{ fill: '#F5F2E9' }}
                            contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #DA251D20', borderRadius: '12px', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }}
                          />
                          <Bar dataKey="calories" radius={[10, 10, 10, 10]}>
                            {CHART_DATA.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={index === 3 ? '#DA251D' : '#DA251D30'} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Pickup Code Section */}
                  <div className="crimson-gradient rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center shadow-xl shadow-[#DA251D]/20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full lotus-pattern opacity-20" />
                    <div className="absolute bottom-0 right-0 w-full h-1/2 seigaiha-pattern opacity-5" />
                    <div className="bg-white p-5 rounded-3xl mb-6 shadow-2xl relative z-10 silk-texture">
                      <QrCode className="text-[#DA251D]" size={100} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 relative z-10">{t.pickupCode}</h3>
                    <p className="text-white/80 text-sm mb-6 relative z-10">{t.scanToPickup}</p>
                    <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-2xl font-mono text-xl font-black tracking-widest text-white border border-white/30 relative z-10">
                      GG-8829-X
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'dashboard' && currentUser.role === 'admin' && (
              <motion.div
                key="dashboard-admin"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Admin Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard icon={<Utensils className="text-[#DA251D]" />} label={t.admin.ordersToday} value="6" unit="đơn" />
                  <StatCard icon={<UserIcon className="text-[#4ADE80]" />} label={t.admin.users} value="3" unit="người" />
                  <StatCard icon={<Wallet className="text-[#DA251D]" />} label={t.admin.monthlyRevenue} value="1560" unit="k" />
                  <StatCard icon={<Flame className="text-[#DA251D]" />} label={t.admin.popularDishes} value="6" unit="món" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Today's Menu List */}
                  <div className="bg-white border border-[#F5E6D3] rounded-[2.5rem] p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-8">
                      <Utensils className="text-[#DA251D]" size={24} />
                      <h3 className="text-xl font-display font-bold tracking-tight">{t.admin.menuToday}</h3>
                    </div>
                    <div className="space-y-4">
                      {menuItems.map((item, idx) => (
                        <div key={item.id} className="flex items-center justify-between p-4 bg-[#FDF4E3]/50 rounded-2xl border border-[#F5E6D3]">
                          <div className="flex items-center gap-4">
                            <span className="text-sm font-black text-[#DA251D]">{idx + 1}</span>
                            <p className="font-bold text-sm">{item.name[currentLang]}</p>
                          </div>
                          <ChevronRight size={16} className="text-[#2D241E]/20" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Favorite Dishes List */}
                  <div className="bg-white border border-[#F5E6D3] rounded-[2.5rem] p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-8">
                      <Flame className="text-[#DA251D]" size={24} />
                      <h3 className="text-xl font-display font-bold tracking-tight">{t.admin.favoriteDishes}</h3>
                    </div>
                    <div className="space-y-6">
                      {[
                        { name: 'Nem hải sản', count: 6 },
                        { name: 'Thịt viên nấm sốt cà chua', count: 5 },
                        { name: 'Gà rang muối', count: 1 },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${idx === 0 ? 'bg-[#DA251D] text-white' : 'bg-[#FDF4E3] text-[#2D241E]/40'}`}>
                              {idx + 1}
                            </div>
                            <p className="font-bold text-sm">{item.name}</p>
                          </div>
                          <span className="text-sm font-black">{item.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'menu' && (
              <motion.div
                key="menu"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Promotional Banner */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative overflow-hidden rounded-[2.5rem] crimson-gradient p-8 md:p-12 shadow-2xl shadow-[#DA251D]/20"
                >
                  <div className="absolute top-0 left-0 w-full h-full lotus-pattern opacity-30" />
                  <div className="absolute bottom-0 right-10 w-48 h-32 fuji-pattern opacity-60" />
                  <div className="absolute -top-10 -left-10 w-64 h-64 dongson-pattern opacity-20" />
                  <div className="absolute bottom-0 right-0 w-full h-1/2 seigaiha-pattern opacity-10" />
                  <div className="absolute top-[-20%] right-[-5%] w-64 h-64 bg-white/10 blur-[80px] rounded-full animate-zen-float" />
                  
                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/30 shadow-xl shrink-0">
                      <Zap size={48} className="text-white animate-pulse" />
                    </div>
                    <div className="text-center md:text-left flex-1">
                      <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/30 mb-4">
                        <Calendar size={14} className="text-white" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Sự kiện đặc biệt</span>
                      </div>
                      <h3 className="text-2xl md:text-4xl font-display font-bold text-white mb-3 tracking-tight leading-tight">
                        Chào mừng Đại lễ 30/4 & 1/5
                      </h3>
                      <p className="text-white/90 text-sm md:text-base max-w-xl leading-relaxed">
                        Thưởng thức hương vị truyền thống trong không gian hiện đại. Khám phá bộ sưu tập thực đơn "Giao Thoa" đặc biệt chỉ có trong tuần lễ hội.
                      </p>
                    </div>
                    <div className="shrink-0">
                      <button className="bg-white text-[#DA251D] px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl group flex items-center gap-3">
                        <span>Khám phá ngay</span>
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Menu List */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredMenu.map((item) => (
                    <motion.div 
                      key={item.id}
                      layout
                      className={`lacquer-card p-6 flex flex-col cursor-pointer group relative overflow-hidden ${selectedItems.includes(item.id) ? 'border-[#DA251D] ring-2 ring-[#DA251D]/20' : ''}`}
                      onClick={() => handleSelectItem(item.id)}
                    >
                      {selectedItems.includes(item.id) && (
                        <div className="absolute top-4 right-4 z-10">
                          <div className="bg-[#DA251D] text-white p-1 rounded-full shadow-lg">
                            <CheckCircle2 size={16} />
                          </div>
                        </div>
                      )}
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <h4 className="text-lg font-display font-bold text-[#1C1917] group-hover:text-[#DA251D] transition-colors">{item.name[currentLang]}</h4>
                          <span className="text-lg font-black text-[#DA251D]">{item.price.toLocaleString()}đ</span>
                        </div>
                        <p className="text-xs text-[#1C1917]/60 line-clamp-2 mb-6 leading-relaxed">{item.description[currentLang]}</p>
                        
                        <div className="grid grid-cols-4 gap-2 pt-6 border-t border-[#F5F2E9]">
                          <NutritionMini label="Calo" value={item.nutrition.calories} />
                          <NutritionMini label="Đạm" value={item.nutrition.protein} />
                          <NutritionMini label="Béo" value={item.nutrition.fat} />
                          <NutritionMini label="Xơ" value={item.nutrition.carbs} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Place Order Bar */}
                {selectedItems.length > 0 && (
                  <motion.div 
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 z-[50]"
                  >
                    <div className="crimson-gradient p-6 rounded-3xl shadow-2xl flex items-center justify-between border border-white/20">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white font-black">
                          {selectedItems.length}
                        </div>
                        <div>
                          <p className="text-white font-bold">{selectedItems.length} món đã chọn</p>
                          <p className="text-white/60 text-xs">Tổng: {(selectedItems.length * 40000).toLocaleString()}đ</p>
                        </div>
                      </div>
                      <button 
                        onClick={handlePlaceOrder}
                        className="bg-white text-[#DA251D] px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
                      >
                        {t.orderNow}
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
            {activeTab === 'orders' && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="lacquer-card p-10 lotus-pattern">
                  <div className="flex items-center justify-between mb-10">
                    <h3 className="text-2xl font-display font-bold tracking-tight">{currentUser.role === 'admin' ? t.admin.allOrders : 'Lịch sử đặt món'}</h3>
                    <div className="flex gap-2">
                      <button className="p-3 bg-[#F5F2E9] rounded-xl border border-[#E5E1D1] text-[#1C1917]/40 hover:text-[#DA251D] transition-colors">
                        <Filter size={20} />
                      </button>
                      <button className="p-3 bg-[#F5F2E9] rounded-xl border border-[#E5E1D1] text-[#1C1917]/40 hover:text-[#DA251D] transition-colors">
                        <Search size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { date: '7/3/2026', main: 'Cơm Gà Hải Nam', side: 'Canh Rong Biển', note: 'Thêm cơm, ít cay', price: 40000 },
                      { date: '7/3/2026', main: 'Cá Kho Tộ', side: 'Rau Muống Xào', note: 'Không hành', price: 40000 },
                      { date: '7/3/2026', main: 'Thịt Kho Trứng', side: 'Canh Chua', note: 'Thêm ớt', price: 40000 },
                    ].map((order, i) => (
                      <div key={i} className="flex items-center justify-between p-6 bg-white rounded-2xl border border-[#E5E1D1] hover:border-[#DA251D] hover:shadow-md transition-all group">
                        <div className="flex items-center gap-6 flex-1">
                          <div className="w-14 h-14 bg-[#F5F2E9] rounded-2xl flex items-center justify-center text-[#1C1917]/20 group-hover:text-[#DA251D] transition-colors">
                            <Utensils size={24} />
                          </div>
                          <div className="grid grid-cols-4 gap-8 flex-1">
                            <div>
                              <p className="text-[10px] font-bold text-[#1C1917]/30 uppercase tracking-widest mb-1">Ngày</p>
                              <p className="text-sm font-bold text-[#1C1917]">{order.date}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-[#1C1917]/30 uppercase tracking-widest mb-1">Món 1</p>
                              <p className="text-sm font-bold text-[#1C1917]">{order.main}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-[#1C1917]/30 uppercase tracking-widest mb-1">Món 2</p>
                              <p className="text-sm font-bold text-[#1C1917]">{order.side}</p>
                            </div>
                            <div className="col-span-1">
                              <p className="text-[10px] font-bold text-[#1C1917]/30 uppercase tracking-widest mb-1">Ghi chú</p>
                              <p className="text-xs text-[#1C1917]/40 line-clamp-1 italic">"{order.note}"</p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right ml-8">
                          <p className="text-lg font-black text-[#DA251D]">{order.price.toLocaleString()}đ</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'menu-mgmt' && (
              <motion.div
                key="menu-mgmt"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="bg-white border border-[#F5E6D3] rounded-[2.5rem] p-10 shadow-sm">
                  <div className="flex items-center justify-between mb-10">
                    <h3 className="text-2xl font-display font-bold tracking-tight">{t.admin.menuManagement}</h3>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => setMenuItems([])}
                        className="bg-[#FDF4E3] text-[#DA251D] px-6 py-3 rounded-2xl font-bold text-sm border border-[#F5E6D3] hover:bg-red-50 transition-all"
                      >
                        Xóa tất cả
                      </button>
                      <button 
                        onClick={() => setShowAddMenuModal(true)}
                        className="bg-[#DA251D] text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-[#DA251D]/20 hover:scale-105 transition-all"
                      >
                        + Thêm thực đơn 8 món
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {menuItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-6 p-6 bg-[#FDF4E3]/30 rounded-3xl border border-[#F5E6D3]">
                        <div className="flex-1">
                          <p className="font-bold text-lg mb-1">{item.name[currentLang]}</p>
                          <p className="text-sm text-[#2D241E]/40 mb-4 line-clamp-1">{item.description[currentLang]}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-[#DA251D] font-black">{item.price.toLocaleString()}đ</span>
                            <div className="flex gap-2">
                              <button className="p-2 bg-white rounded-lg border border-[#F5E6D3] text-[#2D241E]/40 hover:text-[#DA251D] transition-colors">
                                <Settings size={16} />
                              </button>
                              <button 
                                onClick={() => handleDeleteMenuItem(item.id)}
                                className="p-2 bg-white rounded-lg border border-[#F5E6D3] text-[#2D241E]/40 hover:text-red-500 transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'stats' && (
              <motion.div
                key="stats"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="bg-white border border-[#F5E6D3] rounded-[2.5rem] p-10 shadow-sm">
                  <h3 className="text-2xl font-display font-bold tracking-tight mb-8">{t.admin.statistics}</h3>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={CHART_DATA}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#00000005" vertical={false} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#2D241E40', fontSize: 12, fontWeight: 700 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#2D241E40', fontSize: 12, fontWeight: 700 }} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                        <Bar dataKey="calories" fill="#DA251D" radius={[10, 10, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'payments' && (
              <motion.div
                key="payments"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="lacquer-card p-10">
                  <h3 className="text-2xl font-display font-bold tracking-tight mb-8">{t.admin.payments}</h3>
                  <div className="space-y-4">
                    {[
                      { user: 'Nguyễn Văn An', amount: 250000, status: 'Completed', date: '2026-03-09' },
                      { user: 'Trần Thị Bình', amount: 100000, status: 'Pending', date: '2026-03-09' },
                      { user: 'Lê Văn Cường', amount: 500000, status: 'Completed', date: '2026-03-08' },
                    ].map((p, i) => (
                      <div key={i} className="flex items-center justify-between p-6 bg-[#F5F2E9]/30 rounded-2xl border border-[#E5E1D1]">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#DA251D]">
                            <UserIcon size={24} />
                          </div>
                          <div>
                            <p className="font-bold text-[#1C1917]">{p.user}</p>
                            <p className="text-xs text-[#1C1917]/40 font-bold uppercase tracking-widest">{p.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-[#DA251D]">{p.amount.toLocaleString()}đ</p>
                          <span className={`text-[10px] font-bold uppercase tracking-widest ${p.status === 'Completed' ? 'text-emerald-600' : 'text-amber-600'}`}>
                            {p.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'invoicing' && (
              <motion.div
                key="invoicing"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="lacquer-card p-10 text-center py-20 lotus-pattern">
                  <FileText size={64} className="mx-auto text-[#DA251D]/20 mb-6" />
                  <h3 className="text-2xl font-display font-bold tracking-tight mb-4">{t.admin.invoicing}</h3>
                  <p className="text-[#1C1917]/40 mb-8 max-w-md mx-auto">Xuất hóa đơn hàng tháng cho công ty hoặc cá nhân một cách nhanh chóng.</p>
                  <button className="bg-[#DA251D] text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-[#DA251D]/20 hover:scale-105 transition-all">
                    Xuất hóa đơn tháng 3
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'feedback' && (
              <motion.div
                key="feedback"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="lacquer-card p-10">
                  <h3 className="text-2xl font-display font-bold tracking-tight mb-8">{t.admin.feedback}</h3>
                  <div className="space-y-6">
                    {[
                      { user: 'Nguyễn Văn An', rating: 5, comment: 'Món ăn rất ngon, phục vụ nhanh!' },
                      { user: 'Trần Thị Bình', rating: 4, comment: 'Cơm hơi ít một chút nhưng vị rất vừa miệng.' },
                      { user: 'Lê Văn Cường', rating: 5, comment: 'Bento truyền thống tuyệt vời.' },
                    ].map((f, i) => (
                      <div key={i} className="p-6 bg-[#F5F2E9]/30 rounded-2xl border border-[#E5E1D1]">
                        <div className="flex items-center justify-between mb-4">
                          <p className="font-bold text-[#1C1917]">{f.user}</p>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, star) => (
                              <Flame key={star} size={14} className={star < f.rating ? 'text-[#DA251D]' : 'text-[#1C1917]/10'} />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-[#1C1917]/60 italic">"{f.comment}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'accounts' && (
              <motion.div
                key="accounts"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="lacquer-card p-10">
                  <h3 className="text-2xl font-display font-bold tracking-tight mb-8">{t.admin.accountManagement}</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-[#E5E1D1]">
                          <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-[#1C1917]/40">Họ tên</th>
                          <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-[#1C1917]/40">Email</th>
                          <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-[#1C1917]/40">Vai trò</th>
                          <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-[#1C1917]/40">Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[MOCK_USER, ADMIN_USER].map((user) => (
                          <tr key={user.id} className="border-b border-[#E5E1D1]/50 last:border-0">
                            <td className="py-4 font-bold text-sm text-[#1C1917]">{user.name}</td>
                            <td className="py-4 text-sm text-[#1C1917]/60">{user.email}</td>
                            <td className="py-4">
                              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${user.role === 'admin' ? 'bg-[#DA251D]/10 text-[#DA251D]' : 'bg-emerald-100 text-emerald-700'}`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="py-4">
                              <button className="text-[#DA251D] text-xs font-bold hover:underline">Chỉnh sửa</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'wallet' && (
              <motion.div
                key="wallet"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-4xl mx-auto space-y-8"
              >
                <div className="crimson-gradient rounded-[3rem] p-12 relative overflow-hidden shadow-2xl border border-white/10">
                  <div className="absolute top-0 left-0 w-full h-full lotus-pattern opacity-20" />
                  <div className="absolute bottom-0 right-0 w-full h-1/2 seigaiha-pattern opacity-10" />
                  <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-white/10 blur-[100px] rounded-full" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-12">
                      <div className="w-16 h-10 bg-white/20 backdrop-blur-md rounded-xl border border-white/20 flex items-center justify-center">
                        <div className="w-8 h-8 bg-white/30 rounded-full" />
                      </div>
                      <CreditCard size={32} className="text-white/50" />
                    </div>
                    <p className="text-white/80 text-sm font-bold uppercase tracking-[0.3em] mb-2">{t.balance}</p>
                    <h2 className="text-6xl font-black tracking-tighter mb-12 text-white">{currentUser.walletBalance.toLocaleString()}đ</h2>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1">Chủ thẻ</p>
                        <p className="text-lg font-bold uppercase tracking-widest text-white">{currentUser.name}</p>
                      </div>
                      <button className="bg-white text-[#DA251D] px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:scale-105 transition-all">
                        {t.topUp}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="lacquer-card p-8">
                    <h3 className="text-xl font-display font-bold mb-6">Nạp tiền nhanh</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {[50000, 100000, 200000, 500000, 1000000].map(amount => (
                        <button key={amount} className="py-4 bg-[#F5F2E9] rounded-2xl border border-[#E5E1D1] text-sm font-black text-[#1C1917] hover:bg-[#DA251D] hover:text-white hover:border-[#DA251D] transition-all">
                          {amount / 1000}k
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="lacquer-card p-8">
                    <h3 className="text-xl font-display font-bold mb-6">Phương thức thanh toán</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-[#F5F2E9] rounded-2xl border border-[#E5E1D1]">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            <CreditCard size={20} className="text-[#DA251D]" />
                          </div>
                          <p className="font-bold text-[#1C1917]">Visa •••• 4242</p>
                        </div>
                        <div className="w-4 h-4 rounded-full border-2 border-[#DA251D] bg-[#DA251D] shadow-sm" />
                      </div>
                      <button className="w-full py-4 border-2 border-dashed border-[#E5E1D1] rounded-2xl text-[#1C1917]/40 font-bold text-xs uppercase tracking-widest hover:text-[#DA251D] hover:border-[#DA251D] transition-all">
                        Thêm phương thức mới
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <AnimatePresence>
        {showOrderSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 right-10 z-[100] bg-[#DA251D] text-white px-8 py-5 rounded-3xl shadow-2xl flex items-center gap-4 border border-[#DA251D]/50"
          >
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="font-black uppercase tracking-widest text-xs">{t.orderSuccess}</p>
              <p className="text-[10px] opacity-80 font-medium">Your meal is being prepared with love.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAddMenuModal && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddMenuModal(false)}
              className="absolute inset-0 bg-[#1C1917]/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#E5E1D1] silk-texture"
            >
              <div className="p-10">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-3xl font-display font-bold tracking-tight">Thêm thực đơn 8 món</h3>
                  <button onClick={() => setShowAddMenuModal(false)} className="p-2 hover:bg-[#F5F2E9] rounded-xl transition-colors">
                    <X size={24} className="text-[#1C1917]/20" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#E5E1D1]">
                        <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-[#1C1917]/40 px-2">#</th>
                        <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-[#1C1917]/40 px-2">Tên món (VI)</th>
                        <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-[#1C1917]/40 px-2">Giá (VNĐ)</th>
                        <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-[#1C1917]/40 px-2">Mô tả</th>
                      </tr>
                    </thead>
                    <tbody>
                      {newMenuItems.map((item, idx) => (
                        <tr key={idx} className="border-b border-[#E5E1D1]/50">
                          <td className="py-3 px-2 text-xs font-bold text-[#DA251D]">{idx + 1}</td>
                          <td className="py-3 px-2">
                            <input 
                              type="text" 
                              value={item.name?.vi}
                              onChange={(e) => {
                                const updated = [...newMenuItems];
                                updated[idx] = { ...updated[idx], name: { ...updated[idx].name!, vi: e.target.value } };
                                setNewMenuItems(updated);
                              }}
                              className="w-full px-4 py-2 bg-[#F5F2E9]/50 border border-[#E5E1D1] rounded-xl focus:outline-none focus:border-[#DA251D] text-sm font-bold"
                              placeholder="Tên món..."
                            />
                          </td>
                          <td className="py-3 px-2">
                            <input 
                              type="number" 
                              value={item.price}
                              onChange={(e) => {
                                const updated = [...newMenuItems];
                                updated[idx] = { ...updated[idx], price: parseInt(e.target.value) || 0 };
                                setNewMenuItems(updated);
                              }}
                              className="w-full px-4 py-2 bg-[#F5F2E9]/50 border border-[#E5E1D1] rounded-xl focus:outline-none focus:border-[#DA251D] text-sm font-black text-[#DA251D]"
                            />
                          </td>
                          <td className="py-3 px-2">
                            <input 
                              type="text" 
                              value={item.description?.vi}
                              onChange={(e) => {
                                const updated = [...newMenuItems];
                                updated[idx] = { ...updated[idx], description: { ...updated[idx].description!, vi: e.target.value } };
                                setNewMenuItems(updated);
                              }}
                              className="w-full px-4 py-2 bg-[#F5F2E9]/50 border border-[#E5E1D1] rounded-xl focus:outline-none focus:border-[#DA251D] text-sm"
                              placeholder="Mô tả..."
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-10 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      id="replaceMenu"
                      checked={replaceMenu}
                      onChange={(e) => setReplaceMenu(e.target.checked)}
                      className="w-5 h-5 accent-[#DA251D]"
                    />
                    <label htmlFor="replaceMenu" className="text-sm font-bold text-[#1C1917]/60 cursor-pointer">
                      Thay thế thực đơn hiện tại
                    </label>
                  </div>
                  <div className="flex gap-4 flex-1 justify-end">
                    <button 
                      onClick={() => setShowAddMenuModal(false)}
                      className="px-10 py-5 rounded-2xl font-bold text-sm uppercase tracking-widest border border-[#E5E1D1] text-[#1C1917]/40 hover:bg-[#F5F2E9] transition-all"
                    >
                      Hủy
                    </button>
                    <button 
                      onClick={handleBulkAddMenuItems}
                      className="px-10 py-5 bg-[#DA251D] text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-[#DA251D]/20 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      Thêm tất cả (8 món)
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group relative overflow-hidden ${active ? 'bg-app-accent text-white shadow-lg shadow-app-accent/20' : 'text-app-ink/40 hover:text-app-accent hover:bg-app-accent/5'}`}
    >
      {active && <div className="absolute inset-0 silk-texture opacity-10" />}
      <div className={`${active ? 'text-white' : 'group-hover:text-app-accent'} transition-colors relative z-10`}>
        {icon}
      </div>
      <span className="hidden md:block font-bold text-xs uppercase tracking-widest relative z-10">{label}</span>
      {active && <motion.div layoutId="active-pill" className="ml-auto w-1.5 h-1.5 bg-white rounded-full relative z-10" />}
    </button>
  );
}

function StatCard({ icon, label, value, unit }: { icon: React.ReactNode, label: string, value: string, unit: string }) {
  return (
    <div className="lacquer-card p-6 group relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-16 h-16 lotus-pattern opacity-[0.1] -mr-4 -mb-4" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 bg-app-accent/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm border border-app-accent/10">
            {icon}
          </div>
          <ChevronRight size={16} className="text-app-ink/20" />
        </div>
        <p className="text-[10px] font-bold text-app-ink/40 uppercase tracking-widest mb-1">{label}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black tracking-tight text-app-ink">{value}</span>
          <span className="text-[10px] font-bold text-app-ink/20 uppercase tracking-widest">{unit}</span>
        </div>
      </div>
    </div>
  );
}

function NutritionMini({ label, value }: { label: string, value: number }) {
  return (
    <div className="text-center">
      <p className="text-[8px] font-bold text-[#1C1917]/20 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-xs font-black text-[#1C1917]">{value}</p>
    </div>
  );
}

