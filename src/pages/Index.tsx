import React, { useState } from 'react';
import MobileFrame from '@/components/MobileFrame';
import BottomNav from '@/components/layout/BottomNav';
import HomeScreen from '@/components/screens/HomeScreen';
import HomeScreenAr from '@/components/screens/HomeScreenAr';
import SearchResultsScreen from '@/components/screens/SearchResultsScreen';
import DrugDetailsScreen from '@/components/screens/DrugDetailsScreen';
import ThemeToggle from '@/components/layout/ThemeToggle';
import { ThemeProvider, useTheme } from '@/hooks/useTheme';

type Screen = 'home' | 'search' | 'drugDetails';

const AppContent = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedDrugId, setSelectedDrugId] = useState<string | null>(null);
  const { language } = useTheme();

  const handleDrugClick = (id: string) => {
    setSelectedDrugId(id);
    setCurrentScreen('drugDetails');
  };

  const handleSearch = (query: string) => {
    if (query.length > 2) {
      setCurrentScreen('search');
    }
  };

  const handleBack = () => {
    if (currentScreen === 'drugDetails') {
      setCurrentScreen('search');
    } else {
      setCurrentScreen('home');
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'home') {
      setCurrentScreen('home');
    } else if (tab === 'search') {
      setCurrentScreen('search');
    }
  };

  return (
    <>
      <ThemeToggle />
      <MobileFrame>
        {currentScreen === 'home' && (
          language === 'ar' ? (
            <HomeScreenAr 
              onDrugClick={handleDrugClick}
              onSearch={handleSearch}
            />
          ) : (
            <HomeScreen 
              onDrugClick={handleDrugClick}
              onSearch={handleSearch}
            />
          )
        )}
        
        {currentScreen === 'search' && (
          <SearchResultsScreen 
            onBack={handleBack}
            onDrugClick={handleDrugClick}
          />
        )}
        
        {currentScreen === 'drugDetails' && (
          <DrugDetailsScreen onBack={handleBack} />
        )}
        
        <BottomNav 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
        />
      </MobileFrame>
    </>
  );
};

const Index = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default Index;
