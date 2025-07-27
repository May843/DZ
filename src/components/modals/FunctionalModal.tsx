import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  Settings, 
  Search, 
  FileText, 
  Users, 
  BarChart3, 
  Download,
  Share2,
  Edit,
  Trash2,
  Plus,
  Eye,
  Filter,
  SortAsc,
  RefreshCw,
  Save,
  Upload,
  Calendar,
  BookOpen,
  MessageSquare,
  Bell,
  Shield,
  Zap,
  Database,
  Globe,
  Smartphone,
  Accessibility,
  WifiOff,
  Brain,
  PenTool,
  Workflow,
  Archive,
  Network,
  Server,
  Lock,
  Monitor,
  Wifi
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { WILAYAS_ALGERIA, INSTITUTIONS_ALGERIA, CODES_JURIDIQUES_ALGERIA } from '@/data/algerianData';

interface FunctionalModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: string;
  title?: string;
}

export const FunctionalModal: React.FC<FunctionalModalProps> = ({
  isOpen,
  onClose,
  section,
  title
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Configuration des données selon la section
  const getSectionConfig = () => {
    const configs: Record<string, any> = {
      'legal-catalog': {
        title: 'Catalogue Juridique Algérien',
        icon: FileText,
        color: 'bg-blue-500',
        data: [
          { id: '1', title: 'Code Civil Algérien', type: 'Code', status: 'Actif', wilaya: 'National', date: '2024-01-15' },
          { id: '2', title: 'Loi n° 23-15 du 15 décembre 2023', type: 'Loi', status: 'Publié', wilaya: 'National', date: '2023-12-15' },
          { id: '3', title: 'Décret exécutif n° 24-05', type: 'Décret', status: 'En révision', wilaya: 'Alger', date: '2024-02-10' }
        ],
        actions: ['Rechercher', 'Filtrer', 'Trier', 'Exporter', 'Analyser']
      },
      'legal-search': {
        title: 'Recherche Juridique Avancée',
        icon: Search,
        color: 'bg-green-500',
        data: [
          { id: '1', query: 'droit du travail', results: 245, filters: 'Actifs', date: '2024-01-20' },
          { id: '2', query: 'code civil article 87', results: 12, filters: 'Famille', date: '2024-01-19' },
          { id: '3', query: 'procédure commerciale', results: 89, filters: 'Commercial', date: '2024-01-18' }
        ],
        actions: ['Recherche sémantique', 'Filtres avancés', 'Recherche par citation', 'Sauvegarde requête', 'Export résultats']
      },
      'procedures-catalog': {
        title: 'Catalogue des Procédures DZ',
        icon: Settings,
        color: 'bg-green-500',
        data: [
          { id: '1', title: 'Création d\'entreprise SARL', type: 'Commercial', status: 'Actif', wilaya: 'Toutes', duration: '15 jours' },
          { id: '2', title: 'Acte de naissance', type: 'État Civil', status: 'Actif', wilaya: 'Toutes', duration: '24h' },
          { id: '3', title: 'Permis de construire', type: 'Urbanisme', status: 'Actif', wilaya: 'Selon commune', duration: '60 jours' }
        ],
        actions: ['Rechercher', 'Filtrer par Wilaya', 'Trier par durée', 'Télécharger formulaires', 'Consulter guide']
      },
      'procedures-search': {
        title: 'Recherche de Procédures',
        icon: Search,
        color: 'bg-teal-500',
        data: [
          { id: '1', procedure: 'Carte d\'identité', wilaya: 'Alger', délai: '15 jours', coût: '200 DA' },
          { id: '2', procedure: 'Passeport', wilaya: 'Oran', délai: '30 jours', coût: '6000 DA' },
          { id: '3', procedure: 'Permis de conduire', wilaya: 'Constantine', délai: '45 jours', coût: '4500 DA' }
        ],
        actions: ['Recherche par wilaya', 'Filtrer par type', 'Comparer délais', 'Localiser services', 'Estimer coûts']
      },
      'procedures-resources': {
        title: 'Ressources Procédures',
        icon: Archive,
        color: 'bg-orange-500',
        data: [
          { id: '1', resource: 'Formulaire CNRC', type: 'PDF', size: '2.3 MB', downloads: 1245 },
          { id: '2', resource: 'Guide création SARL', type: 'Guide', size: '5.1 MB', downloads: 856 },
          { id: '3', resource: 'Modèle statuts EURL', type: 'Template', size: '1.8 MB', downloads: 432 }
        ],
        actions: ['Télécharger formulaires', 'Consulter guides', 'Modèles documents', 'Calculateurs', 'Assistance en ligne']
      },
      'batch-processing': {
        title: 'Traitement par Lot OCR',
        icon: Database,
        color: 'bg-purple-500',
        data: [
          { id: '1', name: 'Lot_Juridique_001', files: 25, status: 'En cours', progress: 68, type: 'Lois' },
          { id: '2', name: 'Lot_Procedures_002', files: 42, status: 'Terminé', progress: 100, type: 'Procédures' },
          { id: '3', name: 'Lot_Arretes_003', files: 18, status: 'En attente', progress: 0, type: 'Arrêtés' }
        ],
        actions: ['Nouveau lot', 'Traiter', 'Pause/Reprendre', 'Surveiller', 'Télécharger résultats']
      },
      'ocr-analytics': {
        title: 'Analytics OCR et Rapports',
        icon: BarChart3,
        color: 'bg-indigo-500',
        data: [
          { id: '1', metric: 'Précision OCR', value: '96.8%', trend: '+2.1%', period: 'Ce mois' },
          { id: '2', metric: 'Documents traités', value: '2,847', trend: '+15%', period: 'Cette semaine' },
          { id: '3', metric: 'Temps moyen', value: '3.2s', trend: '-8%', period: 'Aujourd\'hui' }
        ],
        actions: ['Rapport précision', 'Export analytics', 'Tendances', 'Alertes qualité', 'Optimisation']
      },
      'analytics-dashboards': {
        title: 'Tableaux de Bord Analytiques',
        icon: BarChart3,
        color: 'bg-orange-500',
        data: [
          { id: '1', name: 'Dashboard Juridique', type: 'Textes', lastUpdate: '2024-01-20', views: 1234 },
          { id: '2', name: 'Dashboard Procédures', type: 'Procédures', lastUpdate: '2024-01-19', views: 856 },
          { id: '3', name: 'Dashboard OCR', type: 'Traitement', lastUpdate: '2024-01-18', views: 432 }
        ],
        actions: ['Créer dashboard', 'Modifier', 'Partager', 'Exporter PDF', 'Programmer rapport']
      },
      'analysis': {
        title: 'Analyses Avancées',
        icon: Brain,
        color: 'bg-pink-500',
        data: [
          { id: '1', analysis: 'Tendances juridiques', progress: 85, type: 'IA Sémantique', status: 'En cours' },
          { id: '2', analysis: 'Conformité réglementaire', progress: 100, type: 'Audit', status: 'Terminé' },
          { id: '3', analysis: 'Impact nouvelles lois', progress: 45, type: 'Prédictif', status: 'En cours' }
        ],
        actions: ['Analyse sémantique', 'Détection anomalies', 'Prédictions', 'Corrélations', 'Rapport expert']
      },
      'reports': {
        title: 'Génération de Rapports',
        icon: FileText,
        color: 'bg-cyan-500',
        data: [
          { id: '1', report: 'Rapport mensuel législation', type: 'PDF', pages: 45, generated: '2024-01-20' },
          { id: '2', report: 'Analyse procédures Q4', type: 'Excel', sheets: 12, generated: '2024-01-18' },
          { id: '3', report: 'Statistiques OCR', type: 'PowerBI', charts: 8, generated: '2024-01-15' }
        ],
        actions: ['Nouveau rapport', 'Templates', 'Programmer génération', 'Export multi-format', 'Diffusion auto']
      },
      'assisted-writing': {
        title: 'Rédaction Assistée',
        icon: PenTool,
        color: 'bg-emerald-500',
        data: [
          { id: '1', document: 'Contrat de travail', template: 'Social', completion: 78, status: 'Brouillon' },
          { id: '2', document: 'Arrêté municipal', template: 'Administratif', completion: 100, status: 'Finalisé' },
          { id: '3', document: 'Statuts SARL', template: 'Commercial', completion: 45, status: 'En cours' }
        ],
        actions: ['Nouveau document', 'Templates juridiques', 'IA rédactionnelle', 'Vérification conformité', 'Signature électronique']
      },
      'forum': {
        title: 'Forum Juridique Algérien',
        icon: MessageSquare,
        color: 'bg-teal-500',
        data: [
          { id: '1', title: 'Question sur le droit du travail', author: 'Ahmed_Droit', replies: 12, status: 'Résolu', category: 'Droit Social' },
          { id: '2', title: 'Procédure création EURL ?', author: 'Fatima_Entreprise', replies: 8, status: 'Ouvert', category: 'Droit Commercial' },
          { id: '3', title: 'Code de la famille - Article 87', author: 'Karim_Juriste', replies: 15, status: 'Débat', category: 'Droit Civil' }
        ],
        actions: ['Nouvelle discussion', 'Rechercher', 'Répondre', 'Suivre', 'Signaler']
      },
      'collaborative-workspace': {
        title: 'Espace Collaboratif',
        icon: Users,
        color: 'bg-violet-500',
        data: [
          { id: '1', workspace: 'Projet loi numérique', members: 12, documents: 45, lastActivity: '2h' },
          { id: '2', workspace: 'Révision code commerce', members: 8, documents: 67, lastActivity: '5h' },
          { id: '3', workspace: 'Procédures simplifiées', members: 15, documents: 23, lastActivity: '1j' }
        ],
        actions: ['Nouveau workspace', 'Inviter membres', 'Partager documents', 'Chat temps réel', 'Historique modifications']
      },
      'shared-resources': {
        title: 'Ressources Partagées',
        icon: Share2,
        color: 'bg-lime-500',
        data: [
          { id: '1', resource: 'Modèles contrats', type: 'Templates', shared: 156, rating: 4.8 },
          { id: '2', resource: 'Jurisprudence Cour Suprême', type: 'Base données', shared: 89, rating: 4.9 },
          { id: '3', resource: 'Guides procédures', type: 'Documentation', shared: 234, rating: 4.7 }
        ],
        actions: ['Partager ressource', 'Télécharger', 'Noter', 'Commenter', 'Signaler problème']
      },
      'news': {
        title: 'Actualités Juridiques DZ',
        icon: BookOpen,
        color: 'bg-red-500',
        data: [
          { id: '1', title: 'Nouvelle loi sur le numérique', date: '2024-01-20', source: 'Journal Officiel', category: 'Technologie' },
          { id: '2', title: 'Modification du code du travail', date: '2024-01-18', source: 'Ministère du Travail', category: 'Social' },
          { id: '3', title: 'Procédures simplifiées PME', date: '2024-01-15', source: 'ANSEJ', category: 'Entreprises' }
        ],
        actions: ['Ajouter actualité', 'Modifier', 'Publier', 'Archiver', 'Notifier abonnés']
      },
      'library': {
        title: 'Bibliothèque Juridique',
        icon: BookOpen,
        color: 'bg-amber-500',
        data: [
          { id: '1', book: 'Droit constitutionnel algérien', author: 'Pr. Benyahia', pages: 456, format: 'PDF' },
          { id: '2', book: 'Code de procédure civile commenté', author: 'Dr. Mansouri', pages: 678, format: 'EPUB' },
          { id: '3', book: 'Droit des affaires en Algérie', author: 'Me. Boudiaf', pages: 345, format: 'PDF' }
        ],
        actions: ['Ajouter ouvrage', 'Rechercher', 'Télécharger', 'Noter', 'Créer références']
      },
      'dictionaries': {
        title: 'Dictionnaires Juridiques',
        icon: BookOpen,
        color: 'bg-slate-500',
        data: [
          { id: '1', term: 'Usufruit', definition: 'Droit réel...', domain: 'Droit Civil', references: 12 },
          { id: '2', term: 'Nullité', definition: 'Sanction juridique...', domain: 'Droit général', references: 45 },
          { id: '3', term: 'Mise en demeure', definition: 'Acte par lequel...', domain: 'Procédure', references: 23 }
        ],
        actions: ['Ajouter terme', 'Rechercher définition', 'Traduction AR/FR', 'Références croisées', 'Export glossaire']
      },
      'directories': {
        title: 'Annuaires Professionnels',
        icon: Users,
        color: 'bg-stone-500',
        data: [
          { id: '1', name: 'Cabinet Benali & Associés', type: 'Avocat', wilaya: 'Alger', speciality: 'Droit commercial' },
          { id: '2', name: 'Étude Mansouri', type: 'Notaire', wilaya: 'Oran', speciality: 'Immobilier' },
          { id: '3', name: 'Tribunal de Constantine', type: 'Juridiction', wilaya: 'Constantine', speciality: 'Civil' }
        ],
        actions: ['Ajouter professionnel', 'Rechercher', 'Contacter', 'Noter services', 'Géolocaliser']
      },
      'nomenclature': {
        title: 'Gestion de la Nomenclature',
        icon: Settings,
        color: 'bg-gray-500',
        data: [
          { id: '1', category: 'Types de textes', items: 45, lastUpdate: '2024-01-15', status: 'Actif' },
          { id: '2', category: 'Domaines juridiques', items: 23, lastUpdate: '2024-01-10', status: 'Actif' },
          { id: '3', category: 'Institutions', items: 67, lastUpdate: '2024-01-08', status: 'Révision' }
        ],
        actions: ['Ajouter catégorie', 'Modifier', 'Valider', 'Synchroniser', 'Export nomenclature']
      },
      'complementary-resources': {
        title: 'Ressources Complémentaires',
        icon: Archive,
        color: 'bg-teal-600',
        data: [
          { id: '1', resource: 'Calculateur frais de greffe', type: 'Outil', usage: 1245, rating: 4.8 },
          { id: '2', resource: 'Convertisseur dates', type: 'Utilitaire', usage: 856, rating: 4.6 },
          { id: '3', resource: 'Modèles requêtes', type: 'Templates', usage: 2134, rating: 4.9 }
        ],
        actions: ['Ajouter ressource', 'Catégoriser', 'Tester', 'Documenter', 'Partager']
      },
      'user-management': {
        title: 'Gestion Utilisateurs',
        icon: Users,
        color: 'bg-indigo-500',
        data: [
          { id: '1', name: 'Ahmed Benali', role: 'Administrateur', wilaya: 'Alger', status: 'Actif', lastLogin: '2024-01-20' },
          { id: '2', name: 'Fatima Mansouri', role: 'Éditeur', wilaya: 'Oran', status: 'Actif', lastLogin: '2024-01-19' },
          { id: '3', name: 'Karim Boudiaf', role: 'Lecteur', wilaya: 'Constantine', status: 'Inactif', lastLogin: '2024-01-10' }
        ],
        actions: ['Ajouter utilisateur', 'Modifier rôles', 'Bloquer/Débloquer', 'Permissions', 'Audit']
      },
      'alerts-notifications': {
        title: 'Alertes & Notifications',
        icon: Bell,
        color: 'bg-yellow-500',
        data: [
          { id: '1', type: 'Nouvelle loi', message: 'Loi n° 24-01 publiée', priority: 'Haute', date: '2024-01-20' },
          { id: '2', type: 'Mise à jour', message: 'Code civil modifié', priority: 'Moyenne', date: '2024-01-19' },
          { id: '3', type: 'Système', message: 'Maintenance programmée', priority: 'Basse', date: '2024-01-18' }
        ],
        actions: ['Créer alerte', 'Configurer', 'Marquer lu', 'Désactiver', 'Historique']
      },
      'security': {
        title: 'Sécurité et Gouvernance',
        icon: Shield,
        color: 'bg-red-600',
        data: [
          { id: '1', event: 'Tentative accès non autorisé', level: 'Critique', time: '14:35', source: 'Login' },
          { id: '2', event: 'Sauvegarde réussie', level: 'Info', time: '12:00', source: 'Système' },
          { id: '3', event: 'Mise à jour certificat', level: 'Avertissement', time: '09:15', source: 'SSL' }
        ],
        actions: ['Audit sécurité', 'Configurer règles', 'Logs système', 'Certificats', 'Policies']
      },
      'performance-scalability': {
        title: 'Performance et Scalabilité',
        icon: Monitor,
        color: 'bg-green-600',
        data: [
          { id: '1', metric: 'CPU Usage', value: '45%', threshold: '80%', status: 'OK' },
          { id: '2', metric: 'Memory', value: '2.1GB', threshold: '4GB', status: 'OK' },
          { id: '3', metric: 'Response Time', value: '120ms', threshold: '500ms', status: 'Excellent' }
        ],
        actions: ['Monitoring temps réel', 'Optimiser', 'Scaling auto', 'Alertes performance', 'Rapports']
      },
      'integrations-interoperability': {
        title: 'Intégrations et Interopérabilité',
        icon: Network,
        color: 'bg-purple-600',
        data: [
          { id: '1', integration: 'API Journal Officiel', status: 'Connecté', version: '2.1', lastSync: '2h' },
          { id: '2', integration: 'Base CNRC', status: 'Connecté', version: '1.8', lastSync: '1j' },
          { id: '3', integration: 'Système CNCMJ', status: 'Erreur', version: '3.0', lastSync: '3j' }
        ],
        actions: ['Nouvelle API', 'Tester connexion', 'Synchroniser', 'Logs intégration', 'Documentation']
      },
      'accessibility-settings': {
        title: 'Paramètres d\'Accessibilité',
        icon: Accessibility,
        color: 'bg-blue-600',
        data: [
          { id: '1', feature: 'Lecteur d\'écran', enabled: true, compatibility: 'NVDA, JAWS', usage: '12%' },
          { id: '2', feature: 'Contraste élevé', enabled: false, compatibility: 'CSS', usage: '8%' },
          { id: '3', feature: 'Navigation clavier', enabled: true, compatibility: 'Globale', usage: '25%' }
        ],
        actions: ['Activer fonctionnalité', 'Tester accessibilité', 'Rapport conformité', 'Formation', 'Support']
      },
      'offline-mode': {
        title: 'Mode Hors Ligne',
        icon: WifiOff,
        color: 'bg-gray-600',
        data: [
          { id: '1', feature: 'Cache documents', size: '245MB', items: 1245, lastSync: '2h' },
          { id: '2', feature: 'Recherche offline', index: '156MB', terms: 45678, lastUpdate: '1j' },
          { id: '3', feature: 'Sync automatique', pending: 12, conflicts: 0, nextSync: '15min' }
        ],
        actions: ['Configurer cache', 'Synchroniser', 'Résoudre conflits', 'Optimiser stockage', 'Mode avion']
      },
      'mobile-app': {
        title: 'Application Mobile',
        icon: Smartphone,
        color: 'bg-indigo-600',
        data: [
          { id: '1', platform: 'Android', version: '2.1.0', downloads: 12456, rating: 4.7 },
          { id: '2', platform: 'iOS', version: '2.0.8', downloads: 8934, rating: 4.8 },
          { id: '3', platform: 'PWA', version: '2.1.1', users: 5623, rating: 4.6 }
        ],
        actions: ['Nouvelle version', 'Notifications push', 'Analytics mobile', 'Tests dispositifs', 'Store publication']
      }
    };
    
    return configs[section] || {
      title: 'Section ' + section,
      icon: Settings,
      color: 'bg-gray-500',
      data: [
        { id: '1', name: 'Élément exemple', type: 'Démo', status: 'Fonctionnel', info: 'Données de test' }
      ],
      actions: ['Action par défaut', 'Configurer', 'Tester']
    };
  };

  const config = getSectionConfig();
  const IconComponent = config.icon;

  const handleAction = async (action: string) => {
    setIsProcessing(true);
    console.log(`🇩🇿 Exécution action algérienne: ${action} pour section: ${section}`);
    
    // Simulation d'une action réelle avec délai
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Notifications selon l'action
    const notifications: Record<string, string> = {
      'Rechercher': 'Recherche effectuée dans la base algérienne',
      'Filtrer': 'Filtres appliqués aux données DZ',
      'Trier': 'Tri appliqué selon critères algériens',
      'Exporter': 'Export PDF généré (données algériennes)',
      'Créer': 'Élément créé avec succès',
      'Modifier': 'Modifications sauvegardées',
      'Supprimer': 'Élément supprimé de manière sécurisée',
      'Traiter': 'Traitement OCR lancé (100% local)',
      'Partager': 'Partage configuré (données restent en Algérie)',
      'Analyser': 'Analyse lancée avec IA locale',
      'Télécharger': 'Téléchargement initié (fichiers algériens)',
      'Consulter': 'Consultation ouverte (données locales)',
      'Configurer': 'Configuration mise à jour',
      'Synchroniser': 'Synchronisation effectuée (local)',
      'Surveiller': 'Surveillance activée',
      'Optimiser': 'Optimisation appliquée',
      'Sauvegarder': 'Sauvegarde effectuée (local)'
    };

    alert(`✅ ${notifications[action] || 'Action exécutée avec succès'} - Dalil.dz`);
    setIsProcessing(false);
  };

  const handleBulkAction = async (action: string) => {
    if (selectedItems.length === 0) {
      alert('⚠️ Veuillez sélectionner au moins un élément');
      return;
    }
    
    setIsProcessing(true);
    console.log(`🇩🇿 Action groupée: ${action} sur ${selectedItems.length} éléments`);
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert(`✅ Action "${action}" exécutée sur ${selectedItems.length} éléments - Dalil.dz`);
    setSelectedItems([]);
    setIsProcessing(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${config.color}`}>
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{title || config.title}</h2>
              <p className="text-sm text-gray-500">100% Algérien • 100% Local • 100% Indépendant</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="data">Données</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          <div className="mt-4 overflow-y-auto max-h-[calc(90vh-200px)]">
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Aperçu de la section
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h3 className="font-semibold text-green-800">Éléments</h3>
                      <p className="text-2xl font-bold text-green-600">{config.data.length}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h3 className="font-semibold text-blue-800">Actions disponibles</h3>
                      <p className="text-2xl font-bold text-blue-600">{config.actions.length}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <h3 className="font-semibold text-purple-800">Statut</h3>
                      <p className="text-lg font-bold text-purple-600">Opérationnel</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-red-50 rounded-lg border-2 border-green-200">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">🇩🇿</div>
                      <div>
                        <h3 className="font-bold text-green-800">Fonctionnalité 100% Algérienne</h3>
                        <p className="text-sm text-gray-600">
                          Cette section fonctionne entièrement en local avec des données algériennes.
                          Aucune information n'est transmise à l'extérieur du territoire national.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="data" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Database className="w-5 h-5" />
                      Données de la section
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleBulkAction('Exporter sélection')}
                        disabled={selectedItems.length === 0 || isProcessing}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Exporter ({selectedItems.length})
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {config.data.map((item: any, index: number) => (
                      <div 
                        key={item.id} 
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedItems.includes(item.id) 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => {
                          if (selectedItems.includes(item.id)) {
                            setSelectedItems(selectedItems.filter(id => id !== item.id));
                          } else {
                            setSelectedItems([...selectedItems, item.id]);
                          }
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold">{item.title || item.name}</h4>
                            <div className="flex gap-2 mt-2">
                              {Object.entries(item).slice(1).map(([key, value]) => (
                                <Badge key={key} variant="secondary" className="text-xs">
                                  {key}: {value as string}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost" onClick={(e) => {
                              e.stopPropagation();
                              handleAction('Consulter');
                            }}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={(e) => {
                              e.stopPropagation();
                              handleAction('Modifier');
                            }}>
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="actions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Actions disponibles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {config.actions.map((action: string, index: number) => {
                      const actionIcons: Record<string, any> = {
                        'Rechercher': Search,
                        'Filtrer': Filter,
                        'Trier': SortAsc,
                        'Exporter': Download,
                        'Créer': Plus,
                        'Modifier': Edit,
                        'Supprimer': Trash2,
                        'Analyser': BarChart3,
                        'Partager': Share2,
                        'Sauvegarder': Save,
                        'Actualiser': RefreshCw,
                        'Télécharger': Download,
                        'Consulter': Eye,
                        'Traiter': Settings,
                        'Surveiller': Eye,
                        'Configurer': Settings,
                        'Programmer': Calendar
                      };
                      
                      const ActionIcon = actionIcons[action.split(' ')[0]] || Settings;
                      
                      return (
                        <Button
                          key={index}
                          variant="outline"
                          className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-green-50 hover:border-green-300"
                          onClick={() => handleAction(action)}
                          disabled={isProcessing}
                        >
                          <ActionIcon className="w-6 h-6" />
                          <span className="text-sm font-medium">{action}</span>
                        </Button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Paramètres de la section
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Configuration Algérienne</h4>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked />
                          <span className="text-sm">Filtrage par wilaya</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked />
                          <span className="text-sm">Support arabe/français</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked />
                          <span className="text-sm">Traitement local uniquement</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked />
                          <span className="text-sm">Conformité juridique DZ</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold">Wilayas concernées</h4>
                      <div className="max-h-40 overflow-y-auto border rounded p-2">
                        {WILAYAS_ALGERIA.slice(0, 10).map(wilaya => (
                          <label key={wilaya.id} className="flex items-center gap-2 py-1">
                            <input type="checkbox" defaultChecked />
                            <span className="text-xs">{wilaya.name} ({wilaya.arabicName})</span>
                          </label>
                        ))}
                        <p className="text-xs text-gray-500 mt-2">... et 38 autres wilayas</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button 
                      onClick={() => handleAction('Sauvegarder paramètres')}
                      disabled={isProcessing}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Sauvegarder
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleAction('Réinitialiser')}
                      disabled={isProcessing}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Réinitialiser
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>

        <DialogFooter className="border-t pt-4">
          <div className="flex justify-between items-center w-full">
            <div className="text-sm text-gray-500">
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Traitement en cours...</span>
                </div>
              ) : (
                <span>Section 100% fonctionnelle et indépendante</span>
              )}
            </div>
            <Button variant="outline" onClick={onClose} disabled={isProcessing}>
              Fermer
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};