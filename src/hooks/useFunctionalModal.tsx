import { useState, useCallback } from 'react';

export interface ModalConfig {
  isOpen: boolean;
  section: string;
  title?: string;
}

export const useFunctionalModal = () => {
  const [modalConfig, setModalConfig] = useState<ModalConfig>({
    isOpen: false,
    section: '',
    title: undefined
  });

  const openModal = useCallback((section: string, title?: string) => {
    console.log(`🇩🇿 Ouverture modale fonctionnelle pour section: ${section}`);
    setModalConfig({
      isOpen: true,
      section,
      title
    });
  }, []);

  const closeModal = useCallback(() => {
    console.log('🇩🇿 Fermeture modale fonctionnelle');
    setModalConfig(prev => ({
      ...prev,
      isOpen: false
    }));
  }, []);

  return {
    modalConfig,
    openModal,
    closeModal
  };
};

// Gestionnaire global pour tous les boutons non fonctionnels
export const createFunctionalHandler = (section: string, title?: string) => {
  return () => {
    // Dispatch d'un événement global pour ouvrir la modale
    window.dispatchEvent(new CustomEvent('open-functional-modal', {
      detail: { section, title }
    }));
  };
};

// Liste des sections qui doivent ouvrir des modales fonctionnelles
export const FUNCTIONAL_SECTIONS = [
  // Textes juridiques
  'legal-catalog',
  'legal-search',
  
  // Procédures
  'procedures-catalog', 
  'procedures-search',
  'procedures-resources',
  
  // OCR IA
  'batch-processing',
  'ocr-analytics',
  
  // Analyse & Rapports
  'analytics-dashboards',
  'analysis',
  'reports',
  'assisted-writing',
  
  // Collaboration
  'forum',
  'collaborative-workspace',
  'shared-resources',
  
  // Actualités & Références
  'news',
  'library',
  'dictionaries',
  'directories',
  
  // Configuration
  'nomenclature',
  'complementary-resources',
  'alerts-notifications',
  'user-management',
  'security',
  'performance-scalability',
  'integrations-interoperability',
  'accessibility-settings',
  'offline-mode',
  'mobile-app'
];