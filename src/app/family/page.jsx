'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, UserPlus, Shield, Eye, EyeOff, Share2, Bell, 
  Heart, Phone, Mail, Calendar, Clock, CheckCircle2,
  AlertTriangle, Settings, Trash2, Edit3, Crown,
  Activity, TrendingUp, MessageCircle, Video,
  Smartphone, Lock, Key, QrCode, Link2
} from 'lucide-react';
import { Switch } from '@headlessui/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Reveal from '@/components/reveal';

const FamilySharingPage = () => {
  // Patient data (John Doe)
  const patientInfo = {
    name: "John Doe",
    role: "Primary Patient",
    avatar: "👨‍💼",
    adherenceRate: 93.4,
    medications: 3,
    lastActive: "2 hours ago",
    emergencyContact: true
  };

  // Family members and caregivers
  const [familyMembers, setFamilyMembers] = useState([
    {
      id: 1,
      name: "Sarah Doe",
      relationship: "Spouse",
      avatar: "👩‍💼",
      role: "Primary Caregiver", 
      permissions: {
        viewReports: true,
        receiveAlerts: true,
        editReminders: false,
        emergencyNotifications: true,
        viewMedications: true
      },
      contactInfo: {
        phone: "+1 (555) 123-4567",
        email: "sarah.doe@email.com"
      },
      lastAccess: "1 day ago",
      notificationPreferences: {
        missedDose: true,
        weeklyReport: true,
        emergencyAlert: true,
        adherenceChanges: false
      },
      status: "active"
    },
    {
      id: 2,
      name: "Emily Doe",
      relationship: "Daughter",
      avatar: "👩‍🎓",
      role: "Family Member",
      permissions: {
        viewReports: true,
        receiveAlerts: false,
        editReminders: false,
        emergencyNotifications: true,
        viewMedications: true
      },
      contactInfo: {
        phone: "+1 (555) 987-6543",
        email: "emily.doe@college.edu"
      },
      lastAccess: "3 days ago",
      notificationPreferences: {
        missedDose: false,
        weeklyReport: true,
        emergencyAlert: true,
        adherenceChanges: false
      },
      status: "active"
    },
    {
      id: 3,
      name: "Dr. Sarah Williams",
      relationship: "Doctor",
      avatar: "👩‍⚕️",
      role: "Healthcare Provider",
      permissions: {
        viewReports: true,
        receiveAlerts: true,
        editReminders: true,
        emergencyNotifications: true,
        viewMedications: true
      },
      contactInfo: {
        phone: "+1 (555) 234-5678",
        email: "dr.williams@medicalpractice.com"
      },
      lastAccess: "5 hours ago",
      notificationPreferences: {
        missedDose: true,
        weeklyReport: true,
        emergencyAlert: true,
        adherenceChanges: true
      },
      status: "active"
    }
  ]);

  // Pending invitations
  const [pendingInvites, setPendingInvites] = useState([
    {
      id: 4,
      name: "Michael Doe",
      relationship: "Son",
      email: "michael.doe@email.com",
      invitedDate: "2025-09-14",
      status: "pending"
    }
  ]);

  // Recent activity
  const recentActivity = [
    {
      id: 1,
      user: "Sarah Doe",
      action: "viewed weekly report",
      time: "2 hours ago",
      type: "view"
    },
    {
      id: 2,
      user: "Dr. Sarah Williams",
      action: "updated medication reminder",
      time: "1 day ago", 
      type: "edit"
    },
    {
      id: 3,
      user: "Emily Doe",
      action: "received emergency alert",
      time: "2 days ago",
      type: "alert"
    },
    {
      id: 4,
      user: "Sarah Doe",
      action: "acknowledged missed dose alert",
      time: "3 days ago",
      type: "alert"
    }
  ];

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [newInvite, setNewInvite] = useState({
    name: '',
    email: '',
    relationship: '',
    role: 'Family Member'
  });

  // Permission categories
  const permissionCategories = [
    {
      key: 'viewReports',
      label: 'View Health Reports',
      description: 'Access weekly and monthly adherence reports',
      icon: Activity
    },
    {
      key: 'receiveAlerts',
      label: 'Receive Medication Alerts',
      description: 'Get notified when doses are missed',
      icon: Bell
    },
    {
      key: 'editReminders',
      label: 'Edit Reminders',
      description: 'Modify medication schedules and settings',
      icon: Edit3
    },
    {
      key: 'emergencyNotifications',
      label: 'Emergency Notifications',
      description: 'Receive critical health alerts immediately',
      icon: AlertTriangle
    },
    {
      key: 'viewMedications',
      label: 'View Medications',
      description: 'See current prescriptions and dosages',
      icon: Eye
    }
  ];

  const sendInvitation = () => {
    if (newInvite.name && newInvite.email && newInvite.relationship) {
      const invitation = {
        id: Date.now(),
        ...newInvite,
        invitedDate: new Date().toISOString().split('T')[0],
        status: 'pending'
      };
      
      setPendingInvites(prev => [...prev, invitation]);
      setNewInvite({ name: '', email: '', relationship: '', role: 'Family Member' });
      setShowInviteModal(false);
      
      alert(`📧 Invitation sent to ${newInvite.name} (${newInvite.email})\n🔐 They will receive secure access instructions via email.`);
    }
  };

  const updateMemberPermissions = (memberId, permission, value) => {
    setFamilyMembers(prev => prev.map(member => 
      member.id === memberId 
        ? { ...member, permissions: { ...member.permissions, [permission]: value }}
        : member
    ));
  };

  const removeMember = (memberId) => {
    if (confirm('Are you sure you want to remove this family member? They will lose access to all health information.')) {
      setFamilyMembers(prev => prev.filter(member => member.id !== memberId));
      alert('✅ Family member removed successfully. They have been notified of access revocation.');
    }
  };

  const generateShareLink = () => {
    const shareLink = `https://medicue.app/join/${Math.random().toString(36).substr(2, 9)}`;
    navigator.clipboard?.writeText(shareLink);
    alert(`🔗 Secure sharing link copied to clipboard:\n${shareLink}\n\n⚠️ This link expires in 24 hours for security.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-purple-50/30 to-blue-100">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <Reveal>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Family <span className="text-purple-600">Care Network</span> 👨‍👩‍👧‍👦
              </h1>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Connect family members and healthcare providers to collaborate on <strong>{patientInfo.name}'s</strong> medication management. 
                Secure, HIPAA-compliant sharing with granular privacy controls.
              </p>
            </div>
          </Reveal>

          {/* Patient Overview Card */}
          <Reveal delay={0.2}>
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 text-white mb-8 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
                    {patientInfo.avatar}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{patientInfo.name}</h2>
                    <p className="text-purple-100">{patientInfo.role}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-purple-100">
                      <span>📊 {patientInfo.adherenceRate}% Adherence</span>
                      <span>💊 {patientInfo.medications} Medications</span>
                      <span>🕐 Active {patientInfo.lastActive}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold mb-1">{familyMembers.length + 1}</div>
                  <div className="text-purple-100">Care Team Members</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button
                  onClick={() => setShowInviteModal(true)}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-2xl p-4 transition-colors flex items-center gap-3"
                >
                  <UserPlus size={24} />
                  <span className="font-semibold">Invite Family Member</span>
                </button>
                
                <button
                  onClick={generateShareLink}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-2xl p-4 transition-colors flex items-center gap-3"
                >
                  <Link2 size={24} />
                  <span className="font-semibold">Generate Share Link</span>
                </button>
                
                <div className="bg-white/10 rounded-2xl p-4 flex items-center gap-3">
                  <Shield size={24} />
                  <div>
                    <div className="font-semibold">HIPAA Compliant</div>
                    <div className="text-sm text-purple-100">End-to-end encrypted</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Family Members Grid */}
          <Reveal delay={0.3}>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Users className="text-purple-600" size={28} />
                Active Care Team Members
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {familyMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-2xl">
                          {member.avatar}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{member.name}</h3>
                          <p className="text-purple-600 text-sm">{member.relationship}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {member.role === 'Primary Caregiver' && (
                              <Crown className="text-yellow-500" size={14} />
                            )}
                            <span className="text-xs text-gray-500">{member.role}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-1">
                        <button
                          onClick={() => setEditingMember(member)}
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <Settings size={16} />
                        </button>
                        {member.role !== 'Healthcare Provider' && (
                          <button
                            onClick={() => removeMember(member.id)}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone size={14} />
                        <span>{member.contactInfo.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail size={14} />
                        <span className="truncate">{member.contactInfo.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock size={14} />
                        <span>Last access: {member.lastAccess}</span>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="text-xs text-gray-500 mb-2">Active Permissions:</div>
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(member.permissions)
                          .filter(([_, enabled]) => enabled)
                          .map(([permission, _]) => (
                            <span
                              key={permission}
                              className="px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium"
                            >
                              {permission === 'viewReports' && '📊'}
                              {permission === 'receiveAlerts' && '🔔'}
                              {permission === 'editReminders' && '✏️'}
                              {permission === 'emergencyNotifications' && '🚨'}
                              {permission === 'viewMedications' && '👁️'}
                            </span>
                          ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Notification Status</span>
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          member.status === 'active' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          <div className={`w-2 h-2 rounded-full ${
                            member.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                          }`} />
                          {member.status}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Pending Invitations */}
          {pendingInvites.length > 0 && (
            <Reveal delay={0.4}>
              <div className="bg-yellow-50 rounded-3xl p-6 border border-yellow-200 mb-8">
                <h3 className="text-lg font-bold text-yellow-900 mb-4 flex items-center gap-2">
                  <Clock className="text-yellow-600" size={20} />
                  Pending Invitations
                </h3>
                <div className="space-y-3">
                  {pendingInvites.map(invite => (
                    <div key={invite.id} className="flex items-center justify-between bg-white p-4 rounded-2xl">
                      <div>
                        <div className="font-semibold text-gray-900">{invite.name}</div>
                        <div className="text-sm text-gray-600">{invite.relationship} • {invite.email}</div>
                        <div className="text-xs text-gray-500">Invited on {invite.invitedDate}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                          Pending
                        </span>
                        <button
                          onClick={() => setPendingInvites(prev => prev.filter(p => p.id !== invite.id))}
                          className="p-1 text-gray-400 hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {/* Recent Activity */}
          <Reveal delay={0.5}>
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Activity className="text-blue-600" size={24} />
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {recentActivity.map(activity => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-2xl">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                        activity.type === 'view' ? 'bg-blue-500' :
                        activity.type === 'edit' ? 'bg-green-500' : 'bg-orange-500'
                      }`}>
                        {activity.type === 'view' && <Eye size={16} />}
                        {activity.type === 'edit' && <Edit3 size={16} />}
                        {activity.type === 'alert' && <Bell size={16} />}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{activity.user}</div>
                        <div className="text-sm text-gray-600">{activity.action}</div>
                        <div className="text-xs text-gray-500">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Privacy & Security */}
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Shield className="text-green-600" size={24} />
                  Privacy & Security
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                      <div className="text-sm text-gray-600">Extra security for family access</div>
                    </div>
                    <Switch
                      checked={true}
                      className="bg-green-600 relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                    >
                      <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                    </Switch>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">Activity Logging</div>
                      <div className="text-sm text-gray-600">Track all access and changes</div>
                    </div>
                    <Switch
                      checked={true}
                      className="bg-green-600 relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                    >
                      <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                    </Switch>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">Emergency Bypass</div>
                      <div className="text-sm text-gray-600">Allow emergency access without login</div>
                    </div>
                    <Switch
                      checked={false}
                      className="bg-gray-300 relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                    >
                      <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                    </Switch>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="text-sm text-gray-600 space-y-2">
                      <p>🔒 <strong>All data encrypted</strong> with industry-standard AES-256</p>
                      <p>🏥 <strong>HIPAA compliant</strong> sharing and storage</p>
                      <p>📱 <strong>Access logs</strong> maintained for audit trails</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Emergency Protocols */}
          <Reveal delay={0.6}>
            <div className="bg-red-50 rounded-3xl p-8 border border-red-200">
              <h3 className="text-xl font-bold text-red-900 mb-6 flex items-center gap-2">
                <AlertTriangle className="text-red-600" size={24} />
                🚨 Emergency Protocols
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-red-800 mb-3">Automatic Emergency Alerts</h4>
                  <ul className="space-y-2 text-red-700 text-sm">
                    <li>• 3+ consecutive missed doses triggers family alert</li>
                    <li>• Critical medication skipped sends immediate notification</li>
                    <li>• 48-hour inactivity generates wellness check</li>
                    <li>• GPS location shared during emergency situations</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-800 mb-3">Emergency Contacts Priority</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-red-700">
                      <span className="w-6 h-6 bg-red-200 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                      <span>Sarah Doe (Spouse) - Primary</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-red-700">
                      <span className="w-6 h-6 bg-red-200 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                      <span>Dr. Sarah Williams - Healthcare</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-red-700">
                      <span className="w-6 h-6 bg-red-200 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                      <span>Emily Doe (Daughter) - Family</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </main>

      {/* Invite Modal */}
      <AnimatePresence>
        {showInviteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowInviteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Invite Family Member</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={newInvite.name}
                    onChange={(e) => setNewInvite(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={newInvite.email}
                    onChange={(e) => setNewInvite(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter email address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                  <select
                    value={newInvite.relationship}
                    onChange={(e) => setNewInvite(prev => ({ ...prev, relationship: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select relationship</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Child">Child</option>
                    <option value="Parent">Parent</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Caregiver">Caregiver</option>
                    <option value="Healthcare Provider">Healthcare Provider</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    value={newInvite.role}
                    onChange={(e) => setNewInvite(prev => ({ ...prev, role: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="Family Member">Family Member</option>
                    <option value="Primary Caregiver">Primary Caregiver</option>
                    <option value="Healthcare Provider">Healthcare Provider</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={sendInvitation}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                >
                  Send Invitation
                </button>
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default FamilySharingPage;
