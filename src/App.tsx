
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Index from '@/pages/Index';
import { AdminPanel } from '@/components/admin/AdminPanel';
import { UnifiedModalProvider } from '@/components/modals/unified/UnifiedModalProvider';
import { EnhancedSecurityProvider } from '@/components/security/EnhancedSecurityProvider';
import { GlobalNotificationManager } from '@/components/common/GlobalNotificationManager';
import { FunctionalModal } from '@/components/modals/FunctionalModal';
import { useFunctionalModal } from '@/hooks/useFunctionalModal';

import { AIAutoFillGlobalManager } from '@/components/ai/AIAutoFillGlobalManager';
import '@/utils/realActionHandler'; // Initialiser le gestionnaire d'actions réelles
import { initializeUniversalButtonHandlers } from '@/utils/universalButtonHandler';
import { initializeFunctionalHandlers } from '@/utils/functionalButtonHandlers';
import { initializeRealButtonHandlers } from '@/utils/realButtonHandlers';
import { initializeSampleData } from '@/data/sampleData';
import { useAppStore } from '@/stores/appStore';

function AppContent() {
  const { modalConfig, openModal, closeModal } = useFunctionalModal();

  // Initialiser les handlers universels et les données d'exemple au démarrage
  React.useEffect(() => {
    console.log('🇩🇿 Démarrage de l\'application Dalil.dz - 100% Algérienne');
    
    // Initialisation des handlers universels
    initializeUniversalButtonHandlers();
    
    // Initialisation des handlers fonctionnels pour tous les boutons
    initializeFunctionalHandlers();
    
    // NOUVEAU: Initialisation des handlers réels pour les boutons "Consulter", etc.
    initializeRealButtonHandlers();
    
    // Initialiser les données d'exemple seulement si le store est vide
    const store = useAppStore.getState();
    if (store.legalTexts.length === 0) {
      initializeSampleData();
    }

    // Gestionnaire global pour les modales fonctionnelles
    const handleOpenFunctionalModal = (event: CustomEvent) => {
      const { section, title } = event.detail;
      console.log(`🇩🇿 Événement global reçu pour section: ${section}`);
      openModal(section, title);
    };

    window.addEventListener('open-functional-modal', handleOpenFunctionalModal as EventListener);

    console.log('✅ Application Dalil.dz entièrement initialisée et fonctionnelle - TOUS LES BOUTONS RÉPARÉS');

    return () => {
      window.removeEventListener('open-functional-modal', handleOpenFunctionalModal as EventListener);
    };
  }, [openModal]);

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/:section" element={<Index />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
        <AIAutoFillGlobalManager />
        <GlobalNotificationManager />
      </div>
      
      {/* Modale fonctionnelle globale */}
      <FunctionalModal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        section={modalConfig.section}
        title={modalConfig.title}
      />
    </>
  );
}

function App() {
  return (
    <EnhancedSecurityProvider>
      <UnifiedModalProvider>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
          <AppContent />
        </BrowserRouter>
      </UnifiedModalProvider>
    </EnhancedSecurityProvider>
  );
}

export default App;
