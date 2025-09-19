'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, Calendar, Clock, CheckCircle2, XCircle, AlertTriangle,
  TrendingUp, TrendingDown, User, FileText, Pill, Heart,
  Download, Share2, Filter, Eye, Award, Target
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Reveal from '@/components/reveal';

const ViewReportsPage = () => {
  // Patient data from the prescription
  const patientInfo = {
    name: "John Doe",
    dob: "01/15/1980",
    age: 45,
    doctor: "Dr. Sarah Williams, MD",
    license: "12345",
    prescriptionDate: "September 15, 2025",
    followUp: "30 days"
  };

  // Medication data from prescription
  const medications = [
    {
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily with meals",
      quantity: "60 tablets",
      supply: "30 days",
      adherenceRate: 94.5,
      totalDoses: 60,
      takenDoses: 57,
      missedDoses: 3,
      color: "#10b981"
    },
    {
      name: "Lisinopril", 
      dosage: "10mg",
      frequency: "Once daily in the morning",
      quantity: "30 tablets",
      supply: "30 days", 
      adherenceRate: 86.7,
      totalDoses: 30,
      takenDoses: 26,
      missedDoses: 4,
      color: "#3b82f6"
    },
    {
      name: "Aspirin",
      dosage: "81mg", 
      frequency: "Once daily with food",
      quantity: "90 tablets",
      supply: "90 days",
      adherenceRate: 98.9,
      totalDoses: 30, // Last 30 days
      takenDoses: 29,
      missedDoses: 1,
      color: "#8b5cf6"
    }
  ];

  // Weekly adherence data
  const weeklyData = [
    { week: 'Week 1', metformin: 96, lisinopril: 86, aspirin: 100, overall: 94 },
    { week: 'Week 2', metformin: 93, lisinopril: 79, aspirin: 100, overall: 91 },
    { week: 'Week 3', metformin: 100, lisinopril: 93, aspirin: 100, overall: 98 },
    { week: 'Week 4', metformin: 89, lisinopril: 89, aspirin: 96, overall: 91 },
  ];

  // Daily adherence pattern (last 30 days)
  const dailyPatternData = [
    { day: 'Mon', adherence: 95 },
    { day: 'Tue', adherence: 89 },
    { day: 'Wed', adherence: 98 },
    { day: 'Thu', adherence: 92 },
    { day: 'Fri', adherence: 87 },
    { day: 'Sat', adherence: 94 },
    { day: 'Sun', adherence: 88 },
  ];

  // Time-based adherence
  const timeBasedData = [
    { time: '6 AM', adherence: 92 },
    { time: '8 AM', adherence: 95 },
    { time: '12 PM', adherence: 89 },
    { time: '6 PM', adherence: 93 },
    { time: '8 PM', adherence: 87 },
    { time: '10 PM', adherence: 91 },
  ];

  // Calculate overall stats
  const overallStats = {
    totalDoses: medications.reduce((sum, med) => sum + med.totalDoses, 0),
    takenDoses: medications.reduce((sum, med) => sum + med.takenDoses, 0),
    missedDoses: medications.reduce((sum, med) => sum + med.missedDoses, 0),
    overallAdherence: medications.reduce((sum, med) => sum + med.adherenceRate, 0) / medications.length,
    streak: 7, // Current streak in days
    longestStreak: 15
  };

  const [selectedPeriod, setSelectedPeriod] = useState('30days');
  const [selectedView, setSelectedView] = useState('overview');

  const generateReport = () => {
    const reportData = {
      patient: patientInfo,
      medications: medications,
      period: selectedPeriod,
      generated: new Date().toLocaleDateString(),
      stats: overallStats
    };
    
    console.log('📊 Generating comprehensive report...', reportData);
    alert('📋 Comprehensive health report generated!\n✅ Ready for download or sharing with healthcare provider.');
  };

  const shareReport = () => {
    alert('📤 Report sharing options:\n• Email to Dr. Sarah Williams\n• Download PDF\n• Print for records\n• Share with family member');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-blue-50/30 to-green-100">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <Reveal>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Weekly Health <span className="text-blue-600">Reports</span> 📊
              </h1>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Comprehensive medication adherence analytics for <strong>{patientInfo.name}</strong> 
                under care of <strong>{patientInfo.doctor}</strong>. Track progress, identify patterns, and optimize health outcomes.
              </p>
            </div>
          </Reveal>

          {/* Patient Information Card */}
          <Reveal delay={0.2}>
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-blue-100 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <User className="text-blue-600" size={28} />
                  Patient Information
                </h2>
                <div className="flex gap-3">
                  <button
                    onClick={generateReport}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl transition-colors"
                  >
                    <Download size={16} />
                    Generate Report
                  </button>
                  <button
                    onClick={shareReport}
                    className="flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-xl transition-colors"
                  >
                    <Share2 size={16} />
                    Share Report
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="text-sm text-gray-600 mb-1">Patient Name</div>
                  <div className="font-bold text-gray-900">{patientInfo.name}</div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="text-sm text-gray-600 mb-1">Date of Birth</div>
                  <div className="font-bold text-gray-900">{patientInfo.dob} (Age {patientInfo.age})</div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="text-sm text-gray-600 mb-1">Prescribing Doctor</div>
                  <div className="font-bold text-gray-900">{patientInfo.doctor}</div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="text-sm text-gray-600 mb-1">Prescription Date</div>
                  <div className="font-bold text-gray-900">{patientInfo.prescriptionDate}</div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Key Metrics Cards */}
          <Reveal delay={0.3}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-green-50 rounded-3xl p-6 border border-green-200 text-center">
                <div className="text-3xl font-bold text-green-700 mb-2">
                  {overallStats.overallAdherence.toFixed(1)}%
                </div>
                <div className="text-green-800 font-medium">Overall Adherence</div>
                <div className="flex items-center justify-center mt-2 text-green-600">
                  <TrendingUp size={16} className="mr-1" />
                  <span className="text-sm">+2.3% vs last month</span>
                </div>
              </div>

              <div className="bg-blue-50 rounded-3xl p-6 border border-blue-200 text-center">
                <div className="text-3xl font-bold text-blue-700 mb-2">
                  {overallStats.takenDoses}/{overallStats.totalDoses}
                </div>
                <div className="text-blue-800 font-medium">Doses Taken</div>
                <div className="flex items-center justify-center mt-2 text-blue-600">
                  <CheckCircle2 size={16} className="mr-1" />
                  <span className="text-sm">Last 30 days</span>
                </div>
              </div>

              <div className="bg-purple-50 rounded-3xl p-6 border border-purple-200 text-center">
                <div className="text-3xl font-bold text-purple-700 mb-2">
                  {overallStats.streak}
                </div>
                <div className="text-purple-800 font-medium">Current Streak</div>
                <div className="flex items-center justify-center mt-2 text-purple-600">
                  <Award size={16} className="mr-1" />
                  <span className="text-sm">Days consecutive</span>
                </div>
              </div>

              <div className="bg-orange-50 rounded-3xl p-6 border border-orange-200 text-center">
                <div className="text-3xl font-bold text-orange-700 mb-2">
                  {overallStats.missedDoses}
                </div>
                <div className="text-orange-800 font-medium">Missed Doses</div>
                <div className="flex items-center justify-center mt-2 text-orange-600">
                  <Target size={16} className="mr-1" />
                  <span className="text-sm">Room for improvement</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Medication Breakdown */}
          <Reveal delay={0.4}>
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Pill className="text-green-600" size={28} />
                Medication Adherence Breakdown
              </h2>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {medications.map((med, index) => (
                  <div key={index} className="border border-gray-200 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg text-gray-900">{med.name}</h3>
                      <div className="text-right">
                        <div className="text-2xl font-bold" style={{ color: med.color }}>
                          {med.adherenceRate}%
                        </div>
                        <div className="text-sm text-gray-500">adherence</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="text-sm text-gray-600">
                        <strong>Dosage:</strong> {med.dosage}
                      </div>
                      <div className="text-sm text-gray-600">
                        <strong>Frequency:</strong> {med.frequency}
                      </div>
                      <div className="text-sm text-gray-600">
                        <strong>Supply:</strong> {med.quantity} ({med.supply})
                      </div>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                      <div 
                        className="h-3 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${med.adherenceRate}%`,
                          backgroundColor: med.color
                        }}
                      />
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">✅ {med.takenDoses} taken</span>
                      <span className="text-red-500">❌ {med.missedDoses} missed</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Charts Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Weekly Adherence Trend */}
            <Reveal delay={0.5}>
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <TrendingUp className="text-blue-600" size={24} />
                  Weekly Adherence Trend
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis domain={[70, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="metformin" stroke="#10b981" strokeWidth={3} />
                    <Line type="monotone" dataKey="lisinopril" stroke="#3b82f6" strokeWidth={3} />
                    <Line type="monotone" dataKey="aspirin" stroke="#8b5cf6" strokeWidth={3} />
                    <Line type="monotone" dataKey="overall" stroke="#f59e0b" strokeWidth={4} strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Reveal>

            {/* Daily Pattern */}
            <Reveal delay={0.6}>
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Calendar className="text-purple-600" size={24} />
                  Daily Adherence Pattern
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dailyPatternData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis domain={[80, 100]} />
                    <Tooltip />
                    <Bar dataKey="adherence" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Reveal>
          </div>

          {/* Time-based Analysis */}
          <Reveal delay={0.7}>
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Clock className="text-orange-600" size={24} />
                Time-based Adherence Analysis
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={timeBasedData}>
                  <defs>
                    <linearGradient id="colorAdherence" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" />
                  <YAxis domain={[80, 100]} />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="adherence" 
                    stroke="#f59e0b" 
                    fillOpacity={1} 
                    fill="url(#colorAdherence)" 
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Reveal>

          {/* Insights and Recommendations */}
          <Reveal delay={0.8}>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Key Insights */}
              <div className="bg-blue-50 rounded-3xl p-8 border border-blue-200">
                <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center gap-2">
                  <Eye className="text-blue-600" size={24} />
                  📈 Key Insights
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-green-500 mt-0.5" size={20} />
                    <span className="text-blue-800">
                      <strong>Excellent Aspirin adherence</strong> at 98.9% - consistent daily routine working well
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="text-yellow-500 mt-0.5" size={20} />
                    <span className="text-blue-800">
                      <strong>Lisinopril needs attention</strong> - 86.7% adherence, morning routine needs strengthening
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <TrendingUp className="text-green-500 mt-0.5" size={20} />
                    <span className="text-blue-800">
                      <strong>Overall improvement</strong> - Week 3 showed 98% adherence, best performance yet
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="text-blue-500 mt-0.5" size={20} />
                    <span className="text-blue-800">
                      <strong>Morning slots optimal</strong> - 8 AM shows highest adherence at 95%
                    </span>
                  </li>
                </ul>
              </div>

              {/* Recommendations */}
              <div className="bg-green-50 rounded-3xl p-8 border border-green-200">
                <h3 className="text-xl font-bold text-green-900 mb-6 flex items-center gap-2">
                  <Heart className="text-green-600" size={24} />
                  💡 Recommendations
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center text-green-700 font-bold text-sm mt-0.5">1</div>
                    <span className="text-green-800">
                      <strong>Set stronger morning routine</strong> for Lisinopril - consider linking with coffee/breakfast
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center text-green-700 font-bold text-sm mt-0.5">2</div>
                    <span className="text-green-800">
                      <strong>Weekend planning</strong> - Saturday/Sunday show lower adherence, set weekend reminders
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center text-green-700 font-bold text-sm mt-0.5">3</div>
                    <span className="text-green-800">
                      <strong>Maintain current schedule</strong> for Aspirin and Metformin - working excellently
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center text-green-700 font-bold text-sm mt-0.5">4</div>
                    <span className="text-green-800">
                      <strong>Next follow-up</strong> with Dr. Sarah Williams in {patientInfo.followUp} to review progress
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Footer Summary */}
          <Reveal delay={0.9}>
            <div className="mt-12 bg-gray-900 rounded-3xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">📋 Report Summary</h3>
              <p className="text-gray-300 text-lg mb-6">
                Generated on {new Date().toLocaleDateString()} for {patientInfo.name} under care of {patientInfo.doctor}
              </p>
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <div className="text-2xl font-bold text-green-400">{overallStats.overallAdherence.toFixed(1)}%</div>
                  <div className="text-gray-400">Overall Success</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">{medications.length}</div>
                  <div className="text-gray-400">Medications Tracked</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">{overallStats.longestStreak}</div>
                  <div className="text-gray-400">Longest Streak (Days)</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-400">30</div>
                  <div className="text-gray-400">Days Analyzed</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ViewReportsPage;
