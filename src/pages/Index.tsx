import React, { useState } from 'react';
import MobileFrame from '@/components/MobileFrame';
import BottomNav from '@/components/layout/BottomNav';
import HomeScreen from '@/components/screens/HomeScreen';
import SearchResultsScreen from '@/components/screens/SearchResultsScreen';
import DrugDetailsScreen from '@/components/screens/DrugDetailsScreen';

type Screen = 'home' | 'search' | 'drugDetails';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedDrugId, setSelectedDrugId] = useState<string | null>(null);

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
    <MobileFrame>
      {currentScreen === 'home' && (
        <HomeScreen 
          onDrugClick={handleDrugClick}
          onSearch={handleSearch}
        />
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
  );
};

export default Index;
