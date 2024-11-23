// src/global.d.ts

interface TelegramWebAppUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
  }
  
  interface TelegramWebApp {
    initData: string;
    initDataUnsafe: {
      user?: TelegramWebAppUser;
    };
    ready: () => void;
    close: () => void;
    MainButton: {
      text: string;
      setText: (text: string) => void;
      onClick: () => void;
      isVisible: boolean;
      show: () => void;
      hide: () => void;
    };
  }
  
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
  