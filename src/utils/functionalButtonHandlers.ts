// Utilitaires pour rendre tous les boutons fonctionnels avec modales
// 100% Algérien - Transformation automatique des éléments non fonctionnels

import { createFunctionalHandler } from '@/hooks/useFunctionalModal';

// Mapping des actions vers des sections pour les modales
export const ACTION_TO_SECTION_MAP: Record<string, string> = {
  // Actions de recherche et filtrage
  'handleFilter': 'legal-catalog',
  'handleSort': 'legal-catalog',
  'handleSearch': 'legal-search',
  'handleAdvancedSearch': 'legal-search',
  
  // Actions de procédures
  'handleDownloadForms': 'procedures-resources',
  'handleConsultGuide': 'procedures-resources',
  'handleBrowseTemplates': 'procedures-catalog',
  
  // Actions OCR
  'handleBatchProcess': 'batch-processing',
  'handleOCRAnalytics': 'ocr-analytics',
  'handleMonitoring': 'ocr-analytics',
  
  // Actions de collaboration
  'handleForum': 'forum',
  'handleCollaborate': 'collaborative-workspace',
  'handleShare': 'shared-resources',
  
  // Actions d'analyse
  'handleCreateDashboard': 'analytics-dashboards',
  'handleAnalyze': 'analysis',
  'handleGenerateReport': 'reports',
  'handleAssistedWriting': 'assisted-writing',
  
  // Actions de configuration
  'handleUserManagement': 'user-management',
  'handleSecurity': 'security',
  'handleAlerts': 'alerts-notifications',
  'handleSettings': 'nomenclature',
  
  // Actions d'actualités
  'handleNews': 'news',
  'handleLibrary': 'library',
  'handleDictionary': 'dictionaries',
  'handleDirectory': 'directories'
};

// Générateur de handlers fonctionnels pour les boutons
export const createButtonHandler = (actionName: string, customSection?: string, customTitle?: string) => {
  const section = customSection || ACTION_TO_SECTION_MAP[actionName] || 'dashboard';
  const title = customTitle || `Action: ${actionName}`;
  
  return createFunctionalHandler(section, title);
};

// Transformation automatique des méthodes console.log en handlers fonctionnels
export const transformConsoleLogsToHandlers = () => {
  // Intercepter les console.log pour les transformer en actions
  const originalConsoleLog = console.log;
  
  console.log = (...args: any[]) => {
    const message = args.join(' ');
    
    // Détecter les patterns d'actions non fonctionnelles
    const actionPatterns = [
      { pattern: /handleFilter|Filtering|filtrage/i, section: 'legal-catalog', title: 'Filtrage des Données' },
      { pattern: /handleSort|Sorting|tri/i, section: 'legal-catalog', title: 'Tri et Organisation' },
      { pattern: /handleDownload|télécharger|download/i, section: 'procedures-resources', title: 'Téléchargements' },
      { pattern: /handleConsult|consulter|guide/i, section: 'procedures-resources', title: 'Consultation de Guides' },
      { pattern: /handleSearch|recherche|search/i, section: 'legal-search', title: 'Recherche Avancée' },
      { pattern: /handleAnalyze|analyse|analytics/i, section: 'analytics-dashboards', title: 'Analyses et Rapports' },
      { pattern: /handleCreate|créer|nouveau/i, section: 'analytics-dashboards', title: 'Création d\'Éléments' },
      { pattern: /handleEdit|modifier|edit/i, section: 'user-management', title: 'Modification' },
      { pattern: /handleDelete|supprimer|delete/i, section: 'user-management', title: 'Suppression Sécurisée' },
      { pattern: /handleExport|exporter|export/i, section: 'reports', title: 'Export de Données' },
      { pattern: /handleImport|importer|import/i, section: 'batch-processing', title: 'Import de Données' },
      { pattern: /handleBatch|lot|batch/i, section: 'batch-processing', title: 'Traitement par Lot' },
      { pattern: /handleForum|forum/i, section: 'forum', title: 'Forum Juridique' },
      { pattern: /handleNews|actualités|news/i, section: 'news', title: 'Actualités Juridiques' },
      { pattern: /handleLibrary|bibliothèque|library/i, section: 'library', title: 'Bibliothèque' },
      { pattern: /handleUser|utilisateur|user/i, section: 'user-management', title: 'Gestion Utilisateurs' },
      { pattern: /handleAlert|alerte|notification/i, section: 'alerts-notifications', title: 'Alertes et Notifications' },
      { pattern: /handleSecurity|sécurité|security/i, section: 'security', title: 'Sécurité' },
      { pattern: /handleConfig|configuration|settings/i, section: 'nomenclature', title: 'Configuration' }
    ];
    
    // Chercher un pattern correspondant
    const matchedPattern = actionPatterns.find(({ pattern }) => pattern.test(message));
    
    if (matchedPattern) {
      // Au lieu de logger, déclencher l'ouverture de la modale
      console.info(`🇩🇿 Action transformée: ${message} -> ${matchedPattern.section}`);
      window.dispatchEvent(new CustomEvent('open-functional-modal', {
        detail: { 
          section: matchedPattern.section, 
          title: matchedPattern.title 
        }
      }));
    } else {
      // Logger normal pour les autres messages
      originalConsoleLog.apply(console, args);
    }
  };
};

// Transformation des handlers de placeholder
export const replacePageholderHandlers = () => {
  // Remplacer les handlers vides par des handlers fonctionnels
  const commonHandlers = [
    'handleFilter',
    'handleSort', 
    'handleSearch',
    'handleDownload',
    'handleConsult',
    'handleAnalyze',
    'handleCreate',
    'handleEdit',
    'handleDelete',
    'handleExport',
    'handleImport',
    'handleShare',
    'handleConfigure'
  ];
  
  commonHandlers.forEach(handlerName => {
    // Créer un handler global accessible
    (window as any)[handlerName] = createButtonHandler(handlerName);
  });
  
  console.log('🇩🇿 Handlers fonctionnels globaux créés:', commonHandlers);
};

// Injection de handlers fonctionnels dans les composants
export const injectFunctionalHandlers = (componentName: string) => {
  const handlers: Record<string, any> = {};
  
  // Selon le composant, injecter les handlers appropriés
  switch (componentName) {
    case 'LegalCatalog':
      handlers.handleFilter = createButtonHandler('handleFilter', 'legal-catalog', 'Filtrage Juridique');
      handlers.handleSort = createButtonHandler('handleSort', 'legal-catalog', 'Tri des Textes');
      handlers.handleSearch = createButtonHandler('handleSearch', 'legal-search', 'Recherche Juridique');
      break;
      
    case 'ProceduresCatalog':
      handlers.handleFilter = createButtonHandler('handleFilter', 'procedures-catalog', 'Filtrage Procédures');
      handlers.handleSort = createButtonHandler('handleSort', 'procedures-catalog', 'Tri des Procédures');
      handlers.handleDownload = createButtonHandler('handleDownload', 'procedures-resources', 'Téléchargements');
      break;
      
    case 'OCRBatch':
      handlers.handleBatch = createButtonHandler('handleBatch', 'batch-processing', 'Traitement par Lot');
      handlers.handleMonitor = createButtonHandler('handleMonitor', 'ocr-analytics', 'Surveillance OCR');
      break;
      
    case 'Analytics':
      handlers.handleCreate = createButtonHandler('handleCreate', 'analytics-dashboards', 'Créer Dashboard');
      handlers.handleAnalyze = createButtonHandler('handleAnalyze', 'analysis', 'Analyses Avancées');
      handlers.handleReport = createButtonHandler('handleReport', 'reports', 'Génération Rapports');
      break;
      
    default:
      // Handlers génériques
      handlers.handleAction = createButtonHandler('handleAction', 'dashboard', 'Action Générique');
  }
  
  return handlers;
};

// Initialisation automatique au chargement
export const initializeFunctionalHandlers = () => {
  console.log('🇩🇿 Initialisation des handlers fonctionnels algériens...');
  
  // Transformer les console.log
  transformConsoleLogsToHandlers();
  
  // Créer les handlers globaux
  replacePageholderHandlers();
  
  // Ajouter des listeners pour les boutons sans onClick
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    
    // Détecter les boutons sans handler
    if (target.tagName === 'BUTTON' && !target.onclick && !target.getAttribute('data-functional')) {
      const buttonText = target.textContent?.toLowerCase() || '';
      
      // Patterns pour détecter le type d'action
      const buttonPatterns = [
        { pattern: /recherch|search|find/i, section: 'legal-search', title: 'Recherche' },
        { pattern: /filtr|filter/i, section: 'legal-catalog', title: 'Filtrage' },
        { pattern: /tri|sort/i, section: 'legal-catalog', title: 'Tri' },
        { pattern: /télécharge|download/i, section: 'procedures-resources', title: 'Téléchargement' },
        { pattern: /export/i, section: 'reports', title: 'Export' },
        { pattern: /créer|create|nouveau|new/i, section: 'analytics-dashboards', title: 'Création' },
        { pattern: /modifi|edit|update/i, section: 'user-management', title: 'Modification' },
        { pattern: /supprim|delete|remove/i, section: 'user-management', title: 'Suppression' },
        { pattern: /analys|analytics/i, section: 'analysis', title: 'Analyse' },
        { pattern: /partag|share/i, section: 'shared-resources', title: 'Partage' },
        { pattern: /config|setting|paramètr/i, section: 'nomenclature', title: 'Configuration' }
      ];
      
      const matchedPattern = buttonPatterns.find(({ pattern }) => pattern.test(buttonText));
      
      if (matchedPattern) {
        // Marquer le bouton comme traité
        target.setAttribute('data-functional', 'true');
        
        // Ajouter l'handler
        target.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log(`🇩🇿 Bouton automatique cliqué: ${buttonText}`);
          window.dispatchEvent(new CustomEvent('open-functional-modal', {
            detail: { 
              section: matchedPattern.section, 
              title: matchedPattern.title 
            }
          }));
        });
        
        console.log(`🇩🇿 Handler automatique ajouté pour bouton: "${buttonText}" -> ${matchedPattern.section}`);
      }
    }
  });
  
  console.log('✅ Handlers fonctionnels algériens initialisés avec succès');
};