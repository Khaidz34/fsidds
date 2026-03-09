// ═══════════════════════════════════════════════════════════
// MULTI-LANGUAGE SUPPORT (Vietnamese, English, Japanese)
// ═══════════════════════════════════════════════════════════

const translations = {
  vi: {
    // Auth
    login: 'Đăng nhập',
    register: 'Đăng ký',
    logout: 'Đăng xuất',
    username: 'Tên đăng nhập',
    password: 'Mật khẩu',
    fullname: 'Họ và tên',
    confirmPassword: 'Xác nhận mật khẩu',
    rememberMe: 'Nhớ mật khẩu',
    forgotPassword: 'Quên mật khẩu?',
    noAccount: 'Chưa có tài khoản?',
    haveAccount: 'Đã có tài khoản?',
    registerNow: 'Đăng ký ngay',
    
    // Navigation
    dashboard: 'Tổng quan',
    orderToday: 'Đặt cơm hôm nay',
    myOrders: 'Đơn của tôi',
    menuManagement: 'Quản lý Menu',
    allOrders: 'Tất cả đơn',
    statistics: 'Thống kê',
    payment: 'Thanh toán',
    invoice: 'Xuất hóa đơn',
    feedback: 'Góp ý',
    userManagement: 'Quản lý tài khoản',
    
    // Common
    save: 'Lưu',
    cancel: 'Hủy',
    delete: 'Xóa',
    edit: 'Sửa',
    search: 'Tìm kiếm',
    filter: 'Lọc',
    export: 'Xuất',
    print: 'In',
    copy: 'Copy',
    close: 'Đóng',
    
    // Menu
    todayMenu: 'Menu hôm nay',
    selectDish: 'Chọn món',
    dish: 'Món',
    dishes: 'món',
    notes: 'Ghi chú',
    orderFor: 'Đặt cho',
    submitOrder: 'Đặt cơm',
    
    // Messages
    success: 'Thành công',
    error: 'Lỗi',
    warning: 'Cảnh báo',
    loading: 'Đang tải...',
    noData: 'Không có dữ liệu',
    
    // Branding
    appName: 'FSI DDS',
    appSubtitle: 'Hệ thống đặt cơm nội bộ',
    appTagline: 'Đặt cơm nhanh, ăn ngon mỗi ngày',
    
    // Export
    exportZalo: 'Xuất văn bản Zalo',
    exportCSV: 'Xuất CSV',
    orderList: 'Danh sách đặt cơm',
    copyToZalo: 'Copy để gửi Zalo',
  },
  
  en: {
    // Auth
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    username: 'Username',
    password: 'Password',
    fullname: 'Full Name',
    confirmPassword: 'Confirm Password',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    noAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
    registerNow: 'Register now',
    
    // Navigation
    dashboard: 'Dashboard',
    orderToday: 'Order Today',
    myOrders: 'My Orders',
    menuManagement: 'Menu Management',
    allOrders: 'All Orders',
    statistics: 'Statistics',
    payment: 'Payment',
    invoice: 'Invoice',
    feedback: 'Feedback',
    userManagement: 'User Management',
    
    // Common
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    search: 'Search',
    filter: 'Filter',
    export: 'Export',
    print: 'Print',
    copy: 'Copy',
    close: 'Close',
    
    // Menu
    todayMenu: "Today's Menu",
    selectDish: 'Select Dish',
    dish: 'Dish',
    dishes: 'dishes',
    notes: 'Notes',
    orderFor: 'Order for',
    submitOrder: 'Submit Order',
    
    // Messages
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    loading: 'Loading...',
    noData: 'No data',
    
    // Branding
    appName: 'FSI DDS',
    appSubtitle: 'Internal Meal Ordering System',
    appTagline: 'Order fast, eat well every day',
    
    // Export
    exportZalo: 'Export Zalo Text',
    exportCSV: 'Export CSV',
    orderList: 'Order List',
    copyToZalo: 'Copy to Zalo',
  },
  
  ja: {
    // Auth
    login: 'ログイン',
    register: '登録',
    logout: 'ログアウト',
    username: 'ユーザー名',
    password: 'パスワード',
    fullname: '氏名',
    confirmPassword: 'パスワード確認',
    rememberMe: 'ログイン状態を保持',
    forgotPassword: 'パスワードを忘れた？',
    noAccount: 'アカウントをお持ちでない？',
    haveAccount: 'アカウントをお持ちですか？',
    registerNow: '今すぐ登録',
    
    // Navigation
    dashboard: 'ダッシュボード',
    orderToday: '今日の注文',
    myOrders: 'マイオーダー',
    menuManagement: 'メニュー管理',
    allOrders: '全注文',
    statistics: '統計',
    payment: '支払い',
    invoice: '請求書',
    feedback: 'フィードバック',
    userManagement: 'ユーザー管理',
    
    // Common
    save: '保存',
    cancel: 'キャンセル',
    delete: '削除',
    edit: '編集',
    search: '検索',
    filter: 'フィルター',
    export: 'エクスポート',
    print: '印刷',
    copy: 'コピー',
    close: '閉じる',
    
    // Menu
    todayMenu: '本日のメニュー',
    selectDish: '料理を選択',
    dish: '料理',
    dishes: '品',
    notes: 'メモ',
    orderFor: '注文者',
    submitOrder: '注文する',
    
    // Messages
    success: '成功',
    error: 'エラー',
    warning: '警告',
    loading: '読み込み中...',
    noData: 'データなし',
    
    // Branding
    appName: 'FSI DDS',
    appSubtitle: '社内食事注文システム',
    appTagline: '素早く注文、毎日美味しく',
    
    // Export
    exportZalo: 'Zaloテキスト出力',
    exportCSV: 'CSV出力',
    orderList: '注文リスト',
    copyToZalo: 'Zaloにコピー',
  }
};

// Current language (default: Vietnamese)
let currentLang = localStorage.getItem('appLang') || 'vi';

// Get translation
function t(key) {
  return translations[currentLang]?.[key] || translations['vi'][key] || key;
}

// Change language with smooth animation
function setLanguage(lang) {
  if (!translations[lang]) return;
  
  // Add fade out animation
  document.body.style.opacity = '0.95';
  
  setTimeout(() => {
    currentLang = lang;
    localStorage.setItem('appLang', lang);
    updatePageTranslations();
    
    // Update all language switchers
    document.querySelectorAll('.lang-switcher').forEach(switcher => {
      switcher.setAttribute('data-active', lang);
      switcher.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    });
    
    // Fade back in
    document.body.style.opacity = '1';
    
    // Show toast notification
    const langNames = {
      vi: 'Tiếng Việt 🇻🇳',
      en: 'English 🇬🇧',
      ja: '日本語 🇯🇵'
    };
    
    if (typeof toast === 'function') {
      toast(`Đã chuyển sang ${langNames[lang]}`, 'success');
    }
  }, 150);
}

// Update all translations on page
function updatePageTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = t(key);
    
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = translation;
    } else {
      el.textContent = translation;
    }
  });
  
  // Update page title if exists
  const titleKey = document.querySelector('[data-i18n-title]')?.getAttribute('data-i18n-title');
  if (titleKey) {
    document.title = t(titleKey);
  }
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
  updatePageTranslations();
  
  // Set active language button
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.getAttribute('data-lang') === currentLang) {
      btn.classList.add('active');
    }
  });
});
