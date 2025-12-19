import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RoleBasedNavigation from '../../components/ui/RoleBasedNavigation';
import QuickActionToolbar from '../../components/ui/QuickActionToolbar';
import StatusIndicatorPanel from '../../components/ui/StatusIndicatorPanel';
import MetricCard from './components/MetricCard';
import RecentCollectionsTable from './components/RecentCollectionsTable';
import NavigationTile from './components/NavigationTile';
import SystemAlerts from './components/SystemAlerts';
import QuickStats from './components/QuickStats';
import MovieManagement from './components/MovieManagement';
import ExhibitorManagement from './components/ExhibitorManagement';
import GlobalSearch from './components/GlobalSearch';
import CollectionDataManagement from './components/CollectionDataManagement';
import Icon from '../../components/AppIcon';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
  const [metrics, setMetrics] = useState({
    todayCollections: 2450000,
    weeklyTotal: 15750000,
    pendingSubmissions: 12,
    systemActivity: 245,
  });

  const [quickStats, setQuickStats] = useState({
    totalMovies: 8,
    activeTheaters: 45,
    totalExhibitors: 32,
    pendingApprovals: 12,
    weeklyRevenue: 15750000,
    monthlyRevenue: 62500000,
  });

  const [recentCollections, setRecentCollections] = useState([
    {
      id: 'COL-2023-001',
      theater: 'PVR Cinemas',
      location: 'Mumbai - Juhu',
      movie: 'Pathaan',
      date: '2023-12-12',
      amount: 245000,
      status: 'pending',
    },
    {
      id: 'COL-2023-002',
      theater: 'INOX Megaplex',
      location: 'Delhi - Connaught Place',
      movie: 'Jawan',
      date: '2023-12-12',
      amount: 185000,
      status: 'pending',
    },
    {
      id: 'COL-2023-003',
      theater: 'Cinepolis',
      location: 'Bangalore - Koramangala',
      movie: 'Dunki',
      date: '2023-12-11',
      amount: 165000,
      status: 'approved',
    },
    {
      id: 'COL-2023-004',
      theater: 'Carnival Cinemas',
      location: 'Pune - Aundh',
      movie: 'Pathaan',
      date: '2023-12-11',
      amount: 125000,
      status: 'pending',
    },
    {
      id: 'COL-2023-005',
      theater: 'Miraj Cinemas',
      location: 'Hyderabad - Banjara Hills',
      movie: 'Jawan',
      date: '2023-12-10',
      amount: 95000,
      status: 'approved',
    },
  ]);

  const [systemAlerts, setSystemAlerts] = useState([
    {
      id: 'alert-001',
      type: 'critical',
      title: 'Pending Approvals Threshold',
      message: '12 collections pending approval for more than 24 hours',
      details: 'Collections from PVR Cinemas (3), INOX Megaplex (4), Cinepolis (2), and others require immediate attention to maintain workflow efficiency.',
      timestamp: new Date(Date.now() - 3600000),
      actionLabel: 'Review Now',
      dismissed: false,
    },
    {
      id: 'alert-002',
      type: 'warning',
      title: 'Ledger Reconciliation Due',
      message: '5 exhibitor accounts require reconciliation',
      details: 'Monthly reconciliation deadline approaching for exhibitors: PVR Cinemas, INOX Megaplex, Carnival Cinemas, Miraj Cinemas, and Wave Cinemas.',
      timestamp: new Date(Date.now() - 7200000),
      actionLabel: 'View Accounts',
      dismissed: false,
    },
    {
      id: 'alert-003',
      type: 'info',
      title: 'System Maintenance Scheduled',
      message: 'Scheduled maintenance on 15th December 2023, 02:00 AM - 04:00 AM IST',
      details: 'Database optimization and security updates will be performed. System will be unavailable during this period. All users have been notified via email.',
      timestamp: new Date(Date.now() - 10800000),
      dismissed: false,
    },
  ]);

  const navigationTiles = [
    {
      title: 'Movie Management',
      description: 'Add, edit, and manage movie assignments',
      icon: 'Film',
      iconColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
      count: quickStats?.totalMovies,
      countLabel: 'active movies',
      route: '/movie-manager-dashboard',
    },
    {
      title: 'Exhibitor Management',
      description: 'Manage exhibitor accounts and assignments',
      icon: 'Building2',
      iconColor: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
      count: quickStats?.totalExhibitors,
      countLabel: 'registered exhibitors',
      route: '/exhibitor-portal',
    },
    {
      title: 'Collections Approval',
      description: 'Review and approve collection submissions',
      icon: 'CheckCircle2',
      iconColor: 'bg-gradient-to-br from-amber-500 to-amber-600',
      count: quickStats?.pendingApprovals,
      countLabel: 'pending approvals',
      badge: quickStats?.pendingApprovals,
    },
    {
      title: 'Ledger Operations',
      description: 'View and manage exhibitor ledgers',
      icon: 'BookOpen',
      iconColor: 'bg-gradient-to-br from-purple-500 to-purple-600',
      count: quickStats?.activeTheaters,
      countLabel: 'active accounts',
    },
    {
      title: 'Closing Statements',
      description: 'Generate picture closing statements',
      icon: 'FileText',
      iconColor: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      route: '/closing-statement-generation',
    },
    {
      title: 'Reports Dashboard',
      description: 'Access comprehensive reports and analytics',
      icon: 'BarChart3',
      iconColor: 'bg-gradient-to-br from-green-500 to-green-600',
    },
  ];

  useEffect(() => {
    // Check authentication
    if (!userInfo || userInfo.user?.role !== 'admin') {
      navigate('/');
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        todayCollections: prev?.todayCollections + Math.floor(Math.random() * 50000),
        systemActivity: prev?.systemActivity + Math.floor(Math.random() * 10),
      }));
    }, 30000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [navigate, userInfo]);

  const handleApproveCollection = (collectionId) => {
    setRecentCollections((prev) =>
      prev?.map((col) =>
        col?.id === collectionId ? { ...col, status: 'approved' } : col
      )
    );
    setQuickStats((prev) => ({
      ...prev,
      pendingApprovals: Math.max(0, prev?.pendingApprovals - 1),
    }));
  };

  const handleRejectCollection = (collectionId) => {
    setRecentCollections((prev) =>
      prev?.map((col) =>
        col?.id === collectionId ? { ...col, status: 'rejected' } : col
      )
    );
    setQuickStats((prev) => ({
      ...prev,
      pendingApprovals: Math.max(0, prev?.pendingApprovals - 1),
    }));
  };

  const handleViewCollection = (collectionId) => {
    console.log('Viewing collection:', collectionId);
  };

  const handleDismissAlert = (alertId) => {
    setSystemAlerts((prev) =>
      prev?.map((alert) =>
        alert?.id === alertId ? { ...alert, dismissed: true } : alert
      )
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    })?.format(amount);
  };

  // Admin dashboard sections
  const adminSections = [
    { id: 'overview', label: 'Dashboard Overview', icon: 'LayoutDashboard' },
    { id: 'movies', label: 'Movie Management', icon: 'Film' },
    { id: 'exhibitors', label: 'Exhibitor Management', icon: 'Building2' },
    { id: 'search', label: 'Global Search', icon: 'Search' },
    { id: 'collections', label: 'Collection Data', icon: 'IndianRupee' },
    { id: 'ledger', label: 'Ledger Management', icon: 'BookOpen' },
    { id: 'statements', label: 'Closing Statements', icon: 'FileText' },
    { id: 'reports', label: 'Reports & Analytics', icon: 'BarChart3' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" size={48} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavigation userRole="admin" />
      <QuickActionToolbar userRole="admin" />
      <div className="main-content with-toolbar">
        <div className="content-container">
          {/* Hero Header Section */}
          <div className="mb-8">
            <div className="grid grid-responsive grid-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                    <Icon name="Shield" size={32} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 text-balance">
                      Admin Control Center
                    </h1>
                    <p className="text-base sm:text-lg text-muted-foreground text-balance leading-relaxed">
                      Complete system oversight and financial management for movie distribution operations
                    </p>
                    <div className="flex flex-wrap items-center gap-4 mt-4">
                      <div className="flex items-center gap-2 text-sm text-success">
                        <Icon name="CheckCircle" size={16} />
                        <span>System Operational</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="Clock" size={16} />
                        <span>Last updated: {new Date().toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick Stats Card */}
              <div className="bg-gradient-to-br from-card to-muted/30 border border-border rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Today's Overview</h3>
                  <Icon name="TrendingUp" size={20} className="text-success" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Collections</span>
                    <span className="font-semibold text-foreground">{formatCurrency(metrics?.todayCollections)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Pending</span>
                    <span className="font-semibold text-warning">{metrics?.pendingSubmissions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Active Users</span>
                    <span className="font-semibold text-success">{metrics?.systemActivity}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Global Search Bar */}
            <div className="mb-8">
              <GlobalSearch />
            </div>
          </div>

          {/* Admin Section Navigation */}
          <div className="bg-card border border-border rounded-lg overflow-hidden mb-6">
            <div className="border-b border-border overflow-x-auto">
              <div className="flex">
                {adminSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                      activeSection === section.id
                        ? 'border-primary text-primary bg-primary/5'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Icon name={section.icon} size={16} />
                    {section.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">
              {/* Dashboard Overview */}
              {activeSection === 'overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                    <MetricCard
                      title="Today's Collections"
                      value={formatCurrency(metrics?.todayCollections)}
                      change="+12.5% from yesterday"
                      changeType="positive"
                      icon="IndianRupee"
                      iconColor="bg-gradient-to-br from-blue-500 to-blue-600"
                      loading={loading}
                    />
                    <MetricCard
                      title="Weekly Total"
                      value={formatCurrency(metrics?.weeklyTotal)}
                      change="+8.3% from last week"
                      changeType="positive"
                      icon="TrendingUp"
                      iconColor="bg-gradient-to-br from-emerald-500 to-emerald-600"
                      loading={loading}
                    />
                    <MetricCard
                      title="Pending Submissions"
                      value={metrics?.pendingSubmissions}
                      change="Requires attention"
                      changeType="warning"
                      icon="Clock"
                      iconColor="bg-gradient-to-br from-amber-500 to-amber-600"
                      loading={loading}
                    />
                    <MetricCard
                      title="System Activity"
                      value={metrics?.systemActivity}
                      change="Active users online"
                      changeType="neutral"
                      icon="Activity"
                      iconColor="bg-gradient-to-br from-purple-500 to-purple-600"
                      loading={loading}
                    />
                  </div>

                  <StatusIndicatorPanel userRole="admin" />
                  <QuickStats stats={quickStats} />

                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2">
                      <RecentCollectionsTable
                        collections={recentCollections}
                        onApprove={handleApproveCollection}
                        onReject={handleRejectCollection}
                        onView={handleViewCollection}
                      />
                    </div>
                    <div>
                      <SystemAlerts alerts={systemAlerts} onDismiss={handleDismissAlert} />
                    </div>
                  </div>

                  <div>
                    <div className="mb-4">
                      <h2 className="text-xl font-semibold text-foreground mb-2">
                        Quick Navigation
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Access major system functions and management areas
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {navigationTiles?.map((tile, index) => (
                        <NavigationTile key={index} {...tile} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Movie Management */}
              {activeSection === 'movies' && <MovieManagement />}

              {/* Exhibitor Management */}
              {activeSection === 'exhibitors' && <ExhibitorManagement />}

              {/* Global Search */}
              {activeSection === 'search' && (
                <div className="text-center py-8 text-muted-foreground">
                  <Icon name="Search" size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Global search is available in the header above</p>
                  <p className="text-sm mt-2">Use the search bar to find movies, theaters, users, and financial data</p>
                </div>
              )}

              {/* Collection Data Management */}
              {activeSection === 'collections' && <CollectionDataManagement />}

              {/* Ledger Management */}
              {activeSection === 'ledger' && (
                <div className="text-center py-8 text-muted-foreground">
                  <Icon name="BookOpen" size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Ledger Management functionality will be implemented here</p>
                  <p className="text-sm mt-2">View ledger accounts, entries, manual additions, and reconciliation</p>
                </div>
              )}

              {/* Picture Closing Statements */}
              {activeSection === 'statements' && (
                <div className="text-center py-8 text-muted-foreground">
                  <Icon name="FileText" size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Picture Closing Statement generation will be implemented here</p>
                  <p className="text-sm mt-2">Auto-generate final financial reports with movie and theater selection</p>
                </div>
              )}

              {/* Reports & Analytics */}
              {activeSection === 'reports' && (
                <div className="text-center py-8 text-muted-foreground">
                  <Icon name="BarChart3" size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Reports & Analytics dashboard will be implemented here</p>
                  <p className="text-sm mt-2">Collection summaries, theater performance, movie analytics, and financial reconciliation</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;