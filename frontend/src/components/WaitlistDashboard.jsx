import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  Users, 
  UserCheck, 
  UserX, 
  Download,
  Trash2,
  Eye,
  Edit,
  DollarSign,
  Target,
  Building,
  Mail,
  Phone,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  getWaitlistEntries, 
  getWaitlistStats, 
  updateWaitlistEntry, 
  deleteWaitlistEntry,
  exportWaitlistData,
  clearAllWaitlistEntries
} from '../utils/storage';

const WaitlistDashboard = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [stats, setStats] = useState({});
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const allEntries = getWaitlistEntries();
    const allStats = getWaitlistStats();
    setEntries(allEntries);
    setStats(allStats);
  };

  const handleStatusUpdate = (id, newStatus) => {
    updateWaitlistEntry(id, { status: newStatus });
    loadData();
  };

  const handleDeleteEntry = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      deleteWaitlistEntry(id);
      loadData();
    }
  };

  const handleExport = () => {
    exportWaitlistData();
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all entries? This action cannot be undone.')) {
      clearAllWaitlistEntries();
      loadData();
    }
  };

  const filteredEntries = entries.filter(entry => {
    const matchesFilter = filter === 'all' || entry.status === filter;
    const matchesSearch = 
      entry.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.company?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'contacted': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'onboarded': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getInterestIcon = (interestType) => {
    switch (interestType) {
      case 'borrower': return <Target className="w-4 h-4" />;
      case 'lender': return <DollarSign className="w-4 h-4" />;
      case 'both': return <TrendingUp className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-white">Waitlist Dashboard</h1>
              <p className="text-gray-400">Manage waitlist entries and track progress</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleExport} variant="outline" className="border-gray-600 text-white hover:bg-white hover:text-black">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button onClick={handleClearAll} variant="destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md border border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Entries</p>
                  <p className="text-3xl font-bold text-white">{stats.total || 0}</p>
                </div>
                <Users className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md border border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Recent (7 days)</p>
                  <p className="text-3xl font-bold text-white">{stats.recent || 0}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md border border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Borrowers</p>
                  <p className="text-3xl font-bold text-white">{stats.byInterest?.borrower || 0}</p>
                </div>
                <Target className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md border border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Lenders</p>
                  <p className="text-3xl font-bold text-white">{stats.byInterest?.lender || 0}</p>
                </div>
                <DollarSign className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name, email, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex space-x-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'bg-blue-500 text-white' : 'border-gray-600 text-white hover:bg-white hover:text-black'}
            >
              All ({stats.total || 0})
            </Button>
            <Button
              variant={filter === 'pending' ? 'default' : 'outline'}
              onClick={() => setFilter('pending')}
              className={filter === 'pending' ? 'bg-yellow-500 text-white' : 'border-gray-600 text-white hover:bg-white hover:text-black'}
            >
              Pending ({stats.byStatus?.pending || 0})
            </Button>
            <Button
              variant={filter === 'contacted' ? 'default' : 'outline'}
              onClick={() => setFilter('contacted')}
              className={filter === 'contacted' ? 'bg-blue-500 text-white' : 'border-gray-600 text-white hover:bg-white hover:text-black'}
            >
              Contacted ({stats.byStatus?.contacted || 0})
            </Button>
            <Button
              variant={filter === 'onboarded' ? 'default' : 'outline'}
              onClick={() => setFilter('onboarded')}
              className={filter === 'onboarded' ? 'bg-green-500 text-white' : 'border-gray-600 text-white hover:bg-white hover:text-black'}
            >
              Onboarded ({stats.byStatus?.onboarded || 0})
            </Button>
          </div>
        </div>

        {/* Entries List */}
        <div className="grid gap-4">
          {filteredEntries.length === 0 ? (
            <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md border border-gray-800">
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No waitlist entries found</p>
              </CardContent>
            </Card>
          ) : (
            filteredEntries.map((entry) => (
              <Card key={entry.id} className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md border border-gray-800 hover:border-gray-600 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {getInterestIcon(entry.interestType)}
                        <div>
                          <h3 className="font-semibold text-white">
                            {entry.firstName} {entry.lastName}
                          </h3>
                          <p className="text-gray-400 text-sm">{entry.email}</p>
                        </div>
                      </div>
                      {entry.company && (
                        <div className="flex items-center space-x-1 text-gray-400">
                          <Building className="w-4 h-4" />
                          <span className="text-sm">{entry.company}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Badge className={getStatusColor(entry.status)}>
                        {entry.status}
                      </Badge>
                      
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedEntry(entry)}
                          className="border-gray-600 text-white hover:bg-white hover:text-black"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        
                        <select
                          value={entry.status}
                          onChange={(e) => handleStatusUpdate(entry.id, e.target.value)}
                          className="px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                        >
                          <option value="pending">Pending</option>
                          <option value="contacted">Contacted</option>
                          <option value="onboarded">Onboarded</option>
                        </select>
                        
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteEntry(entry.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Entry Detail Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md border border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>Entry Details</span>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedEntry(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Name</p>
                  <p className="text-white">{selectedEntry.firstName} {selectedEntry.lastName}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-white">{selectedEntry.email}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <p className="text-white">{selectedEntry.phone}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Company</p>
                  <p className="text-white">{selectedEntry.company || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Role</p>
                  <p className="text-white">{selectedEntry.role || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Interest</p>
                  <p className="text-white capitalize">{selectedEntry.interestType}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Investment Amount</p>
                  <p className="text-white">{selectedEntry.investmentAmount || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Loan Amount</p>
                  <p className="text-white">{selectedEntry.loanAmount || 'N/A'}</p>
                </div>
              </div>
              
              {selectedEntry.additionalInfo && (
                <div>
                  <p className="text-gray-400 text-sm">Additional Info</p>
                  <p className="text-white">{selectedEntry.additionalInfo}</p>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Submitted</p>
                  <p className="text-white">{new Date(selectedEntry.submittedAt).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Status</p>
                  <Badge className={getStatusColor(selectedEntry.status)}>
                    {selectedEntry.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default WaitlistDashboard; 