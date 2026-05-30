// src/App.tsx
// Top-level orchestrator: chooses the active screen and mounts the modal.
// Replace `useScreen` with a real router once you have multiple URLs.

import { useState } from 'react';
import { useScreen } from '@/hooks/useScreen';
import {
  CategoriesScreen,
  DashboardScreen,
  GoalsScreen,
  NewTransactionModal,
  OnboardingScreen,
  SettingsScreen,
  StatsScreen,
  TransactionsScreen,
} from '@/components/screens';

export default function App() {
  const [screen, go] = useScreen('onboarding');
  const [modal, setModal] = useState<'newtx' | null>(null);

  const openNewTx = () => setModal('newtx');
  const closeModal = () => setModal(null);
  const navigate = (s: Parameters<typeof go>[0]) => {
    go(s);
    closeModal();
  };

  let current;
  switch (screen) {
    case 'onboarding':
      current = <OnboardingScreen onLogin={() => navigate('dashboard')} />;
      break;
    case 'dashboard':
      current = <DashboardScreen go={navigate} openNewTx={openNewTx} />;
      break;
    case 'tx':
      current = <TransactionsScreen go={navigate} openNewTx={openNewTx} />;
      break;
    case 'categories':
      current = <CategoriesScreen go={navigate} openNewTx={openNewTx} />;
      break;
    case 'goals':
      current = <GoalsScreen go={navigate} openNewTx={openNewTx} />;
      break;
    case 'stats':
      current = <StatsScreen go={navigate} openNewTx={openNewTx} />;
      break;
    case 'settings':
      current = <SettingsScreen go={navigate} openNewTx={openNewTx} />;
      break;
    default:
      current = <DashboardScreen go={navigate} openNewTx={openNewTx} />;
  }

  return (
    <div className="h-full w-full">
      {current}
      {modal === 'newtx' ? <NewTransactionModal onClose={closeModal} /> : null}
    </div>
  );
}
