import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Top Bar (Exact details from Google Maps: Shop no 19, 20, 21, 22, Kathauta Chauraha Rd, Vijayant Khand, Gomti Nagar, Lucknow, UP 226010)
    'top.address': 'Kathauta Chauraha Rd, Vijayant Khand, Gomti Nagar, Lucknow 226010',
    'top.phone': '094159 22031',
    'top.freeDelivery': 'Free Delivery on orders over ₹499',
    'top.timing': 'Mon - Sun: 10:00 AM - 9:30 PM',
    'top.langSwitch': 'हिन्दी',

    // Nav
    'nav.home': 'Home',
    'nav.categories': 'Categories',
    'nav.deals': 'Deals',
    'nav.newArrivals': 'New Arrivals',
    'nav.about': 'About Us',
    'nav.recipes': 'Recipes',
    'nav.contact': 'Contact Us',
    'nav.shopByCategories': 'Shop by Categories',
    'nav.flashDeals': 'FLASH DEALS',

    // Search & Account & Cart
    'search.placeholder': 'Search fresh veggies, atta, milk, snacks...',
    'search.allCategories': 'All Categories',
    'account.welcome': 'Welcome,',
    'account.signIn': 'Sign In / Register',
    'account.myAccount': 'My Account',
    'cart.myCart': 'My Cart',
    'cart.empty': 'Your Basket is Empty',
    'cart.addToCart': 'ADD TO CART',
    'cart.inCart': 'in Cart',

    // Hero
    'hero.badge': 'SUPERMARKET FRESH',
    'hero.titleLine1': 'Everything Your Family',
    'hero.titleLine2': 'Needs, Under One Roof.',
    'hero.subtitle': 'Fresh fruits, farm vegetables, authentic staples, snacks, and daily household essentials delivered to your doorstep in 30 minutes.',
    'hero.shopNow': 'SHOP NOW',
    'hero.exploreDeals': 'EXPLORE DEALS',
    'hero.upTo30Off': 'UP TO 30% OFF',

    // Features
    'feat.farmFresh': 'Farm Fresh',
    'feat.farmFreshDesc': 'Quality Produce',
    'feat.freeDelivery': 'Free Delivery',
    'feat.freeDeliveryDesc': 'On orders over ₹499',
    'feat.securePayment': 'Secure Payment',
    'feat.securePaymentDesc': '100% UPI & Cards',
    'feat.easyReturns': 'Easy Returns',
    'feat.easyReturnsDesc': 'At your doorstep',

    // Sections
    'sec.shopByCategory': 'Shop by Category',
    'sec.dealOfDay': 'Deal of the Day',
    'sec.whyChoose': 'Why Choose Express daily Mart',
    'sec.trusted': 'Trusted by 50,000+ Happy Families in India',
    'sec.newsletterTitle': 'Get Special Supermarket Offers',
    'sec.newsletterSubtitle': 'Subscribe to receive weekly flash deal coupons, recipe guides & festival discounts.',
    'sec.subscribe': 'Subscribe',

    // Category names
    'cat.fruitsVegetables': 'Fruits & Vegetables',
    'cat.dairyEggs': 'Dairy & Eggs',
    'cat.snacksMunchies': 'Snacks & Munchies',
    'cat.beverages': 'Beverages',
    'cat.breakfastCereals': 'Breakfast & Cereals',
    'cat.bakeryBread': 'Bakery & Bread',
    'cat.householdEssentials': 'Household Essentials',
    'cat.personalCare': 'Personal Care & Beauty',

    // Banners
    'banner.superSaver': 'Weekend Super Saver',
    'banner.superSaverDesc': 'Fresh farm fruits and crunchy vegetables at lowest wholesale rates.',
    'banner.30Min': '30 Minutes Delivery',
    'banner.30MinDesc': 'Express doorstep grocery delivery straight from our local dark store hub.',

    // Footer
    'footer.tagline': 'Your trusted neighborhood supermarket for fresh groceries, authentic staples, and household essentials.',
    'footer.quickLinks': 'QUICK LINKS',
    'footer.customerService': 'CUSTOMER SERVICE',
    'footer.categories': 'CATEGORIES',
    'footer.contactUs': 'CONTACT US',
    'footer.weAccept': 'WE ACCEPT',
    'footer.rights': '© 2026 Express daily Mart. All Rights Reserved.'
  },
  hi: {
    // Top Bar
    'top.address': 'कठौता चौराहा रोड, पेट्रोल पंप के सामने, विजयांत खंड, गोमती नगर, लखनऊ 226010',
    'top.phone': '094159 22031',
    'top.freeDelivery': '₹499 से अधिक के ऑर्डर पर मुफ्त डिलीवरी',
    'top.timing': 'सोमवार - रविवार: प्रातः 10:00 - रात्रि 9:30',
    'top.langSwitch': 'English',

    // Nav
    'nav.home': 'होम',
    'nav.categories': 'श्रेणियाँ',
    'nav.deals': 'ऑफ़र्स',
    'nav.newArrivals': 'नये उत्पाद',
    'nav.about': 'हमारे बारे में',
    'nav.recipes': 'रेसिपी',
    'nav.contact': 'संपर्क करें',
    'nav.shopByCategories': 'श्रेणी अनुसार खरीदें',
    'nav.flashDeals': 'धमाका डील',

    // Search & Account & Cart
    'search.placeholder': 'ताज़ी सब्ज़ियां, आटा, दाल, दूध, स्नैक्स खोजें...',
    'search.allCategories': 'सभी श्रेणियाँ',
    'account.welcome': 'नमस्ते,',
    'account.signIn': 'लॉग इन / रजिस्टर',
    'account.myAccount': 'मेरा खाता',
    'cart.myCart': 'मेरी टोकरी',
    'cart.empty': 'आपकी टोकरी खाली है',
    'cart.addToCart': 'टोकरी में जोड़ें',
    'cart.inCart': 'टोकरी में',

    // Hero
    'hero.badge': 'सुपरमार्केट ताज़ा उत्पाद',
    'hero.titleLine1': 'आपके पूरे परिवार की',
    'hero.titleLine2': 'हर ज़रूरत, एक ही छत के नीचे।',
    'hero.subtitle': 'ताज़े फल, हरी सब्ज़ियां, शुद्ध किराना, स्नैक्स और घरेलू सामान सीधे आपके घर पर केवल 30 मिनट में।',
    'hero.shopNow': 'अभी खरीदें',
    'hero.exploreDeals': 'ऑफ़र्स देखें',
    'hero.upTo30Off': '30% तक छूट',

    // Features
    'feat.farmFresh': 'खेतों से ताज़ा',
    'feat.farmFreshDesc': 'शुद्ध गुणवत्ता',
    'feat.freeDelivery': 'मुफ्त डिलीवरी',
    'feat.freeDeliveryDesc': '₹499 से अधिक पर',
    'feat.securePayment': 'सुरक्षित भुगतान',
    'feat.securePaymentDesc': '100% यूपीआई व कार्ड',
    'feat.easyReturns': 'आसान वापसी',
    'feat.easyReturnsDesc': 'घर बैठे तत्काल',

    // Sections
    'sec.shopByCategory': 'श्रेणियों के अनुसार खरीदारी',
    'sec.dealOfDay': 'आज का विशेष ऑफ़र',
    'sec.whyChoose': 'एक्सप्रेस डेली मार्ट ही क्यों?',
    'sec.trusted': 'भारत के 50,000+ संतुष्ट परिवारों का भरोसा',
    'sec.newsletterTitle': 'पाएं सुपरमार्केट के विशेष ऑफ़र',
    'sec.newsletterSubtitle': 'साप्ताहिक डिस्काउंट कूपन और त्योहारी छूट की जानकारी के लिए सब्सक्राइब करें।',
    'sec.subscribe': 'सब्सक्राइब करें',

    // Category names
    'cat.fruitsVegetables': 'फल और सब्ज़ियां',
    'cat.dairyEggs': 'दूध और अंडे',
    'cat.snacksMunchies': 'स्नैक्स और नमकीन',
    'cat.beverages': 'पेय पदार्थ',
    'cat.breakfastCereals': 'नाश्ता और अनाज',
    'cat.bakeryBread': 'बेकरी और ब्रेड',
    'cat.householdEssentials': 'घरेलू आवश्यक वस्तुएं',
    'cat.personalCare': 'व्यक्तिगत देखभाल और सौंदर्य',

    // Banners
    'banner.superSaver': 'वीकेंड सुपर सेवर सेल',
    'banner.superSaverDesc': 'ताज़े फल और सब्ज़ियां बाज़ार में सबसे कम थोक दामों पर।',
    'banner.30Min': '30 मिनट में सुपरफास्ट डिलीवरी',
    'banner.30MinDesc': 'नज़दीकी स्टोर से सीधे आपके दरवाज़े तक ताज़ा किराने की डिलीवरी।',

    // Footer
    'footer.tagline': 'ताज़ी सब्जियों, शुद्ध दालों और घरेलू सामान के लिए आपका विश्वसनीय सुपरमार्केट।',
    'footer.quickLinks': 'त्वरित लिंक',
    'footer.customerService': 'ग्राहक सेवा',
    'footer.categories': 'श्रेणियाँ',
    'footer.contactUs': 'संपर्क करें',
    'footer.weAccept': 'भुगतान के साधन',
    'footer.rights': '© 2026 एक्सप्रेस डेली मार्ट. सर्वाधिकार सुरक्षित।'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('nfb_language') as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('nfb_language', lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
