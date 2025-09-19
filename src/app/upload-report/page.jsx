'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Document, Page, pdfjs } from 'react-pdf';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, FileText, Check, AlertCircle, Eye, Volume2, 
  Download, Loader2, RefreshCw, Brain, Stethoscope,
  VolumeX, Share2, TrendingUp, TrendingDown, Award,
  Minus, Activity, Home, Zap, Target, Users, Heart,
  Shield, AlertTriangle, Calendar, Bell, Sparkles
} from 'lucide-react';
import { useSpeechSynthesis } from 'react-speech-kit';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const UploadReportPage = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [riskScore, setRiskScore] = useState(null);
  const [emergencyAlerts, setEmergencyAlerts] = useState(null);
  const [populationComparison, setPopulationComparison] = useState(null);
  const [healthPredictions, setHealthPredictions] = useState(null);
  const [aiInsights, setAiInsights] = useState(null);
  const [actionPlan, setActionPlan] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingStep, setProcessingStep] = useState('');
  const [educationLevel, setEducationLevel] = useState('simple');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [patientAge, setPatientAge] = useState(45);
  const [patientGender, setPatientGender] = useState('male');
  
  const { speak, cancel, speaking } = useSpeechSynthesis();

  const acceptedFormats = {
    'application/pdf': ['.pdf'],
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png'],
    'text/plain': ['.txt']
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      setUploadProgress(0);
      setError('');
      resetAnalysisResults();
      
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => setFilePreview(e.target.result);
        reader.readAsDataURL(file);
      }
      
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => processReport(), 500);
            return 100;
          }
          return prev + 15;
        });
      }, 150);
    }
  }, [patientAge, patientGender]);

  const resetAnalysisResults = () => {
    setAnalysisResult(null);
    setRiskScore(null);
    setEmergencyAlerts(null);
    setPopulationComparison(null);
    setHealthPredictions(null);
    setAiInsights(null);
    setActionPlan(null);
  };

  const processReport = async () => {
    setIsProcessing(true);
    setProcessingStep('🚀 Initializing Advanced AI Analysis...');
    setError('');
    
    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);
      formData.append('age', patientAge.toString());
      formData.append('gender', patientGender);

      setProcessingStep('🧠 Advanced Medical AI Processing...');
      
      const response = await fetch('/api/upload-report', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      setProcessingStep('📊 Generating Comprehensive Health Intelligence...');
      const result = await response.json();

      if (result.success) {
        setProcessingStep('✨ Analysis Complete!');
        
        setAnalysisResult(result.analysis);
        setRiskScore(result.riskScore);
        setEmergencyAlerts(result.emergencyAlerts);
        setPopulationComparison(result.populationComparison);
        setHealthPredictions(result.healthPredictions);
        setAiInsights(result.aiInsights);
        setActionPlan(result.actionPlan);
        
        console.log('✅ Advanced Analysis completed:', result);
      } else {
        throw new Error('Advanced analysis failed');
      }

    } catch (error) {
      console.error('❌ Processing error:', error);
      setError(error.message);
      setProcessingStep('');
    } finally {
      setIsProcessing(false);
    }
  };

  const speakAnalysis = (text) => {
    if (speaking || isSpeaking) {
      cancel();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speak({ 
        text, 
        rate: 0.8,
        onEnd: () => setIsSpeaking(false)
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'NORMAL': return 'text-green-600 bg-green-50 border-green-200';
      case 'HIGH':
      case 'ABNORMAL': return 'text-red-600 bg-red-50 border-red-200';
      case 'LOW': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'CRITICAL': return <Zap className="text-red-500" size={20} />;
      case 'HIGH': return <AlertCircle className="text-red-500" size={20} />;
      case 'MODERATE': return <TrendingUp className="text-yellow-500" size={20} />;
      case 'LOW': return <Minus className="text-green-500" size={20} />;
      default: return <Activity className="text-blue-500" size={20} />;
    }
  };

  const getRiskIcon = () => {
    if (!riskScore) return <Activity className="text-gray-500" size={24} />;
    switch (riskScore.level) {
      case 'EXCELLENT': return <Award className="text-green-500" size={24} />;
      case 'VERY_GOOD': return <Shield className="text-blue-500" size={24} />;
      case 'GOOD': return <Shield className="text-green-500" size={24} />;
      case 'MODERATE': return <AlertTriangle className="text-yellow-500" size={24} />;
      case 'HIGH': return <AlertTriangle className="text-orange-500" size={24} />;
      case 'CRITICAL': return <Zap className="text-red-500" size={24} />;
      default: return <Activity className="text-gray-500" size={24} />;
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFormats,
    maxFiles: 1
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-green-50/30 to-green-100">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                🏆 Advanced AI Medical <span className="text-green-600">Report Analyzer</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Upload your lab report and get <strong>comprehensive AI-powered analysis</strong> with risk assessment, 
                population comparison, health predictions, and personalized action plans.
              </p>
              
              {/* Patient Info */}
              <div className="flex justify-center mt-8 mb-6">
                <div className="bg-white rounded-2xl p-4 shadow-lg border border-green-100 flex gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input
                      type="number"
                      value={patientAge}
                      onChange={(e) => setPatientAge(parseInt(e.target.value) || 45)}
                      min="1"
                      max="120"
                      className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                      value={patientGender}
                      onChange={(e) => setPatientGender(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Education Level Toggle */}
              <div className="flex justify-center">
                <div className="bg-white rounded-2xl p-2 shadow-lg border border-green-100">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEducationLevel('detailed')}
                      className={`px-6 py-2 rounded-xl font-medium transition-all ${
                        educationLevel === 'detailed' 
                          ? 'bg-green-600 text-white' 
                          : 'text-green-600 hover:bg-green-50'
                      }`}
                    >
                      📚 Detailed Analysis
                    </button>
                    <button
                      onClick={() => setEducationLevel('simple')}
                      className={`px-6 py-2 rounded-xl font-medium transition-all ${
                        educationLevel === 'simple' 
                          ? 'bg-green-600 text-white' 
                          : 'text-green-600 hover:bg-green-50'
                      }`}
                    >
                      🎯 Simple Language
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Upload Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* File Upload Area */}
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-green-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Upload className="text-green-600" size={28} />
                  Upload Medical Report
                </h2>

                <div
                  {...getRootProps()}
                  className={`
                    border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300
                    ${isDragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-400 hover:bg-green-50/50'}
                  `}
                >
                  <input {...getInputProps()} />
                  
                  {uploadedFile ? (
                    <div className="space-y-4">
                      <FileText className="mx-auto text-green-600" size={48} />
                      <div>
                        <p className="font-semibold text-gray-900">{uploadedFile.name}</p>
                        <p className="text-sm text-gray-500">
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • {uploadedFile.type}
                        </p>
                      </div>
                      
                      {uploadProgress < 100 && (
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-green-600 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      )}
                      
                      {uploadProgress === 100 && !isProcessing && !analysisResult && (
                        <div className="flex items-center justify-center gap-2 text-green-600">
                          <Check size={20} />
                          <span>Upload Complete!</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="mx-auto text-gray-400" size={48} />
                      <div>
                        <p className="text-lg font-semibold text-gray-700">
                          {isDragActive ? "Drop your medical report here..." : "Drag & drop your medical report"}
                        </p>
                        <p className="text-gray-500">
                          Supports PDF, JPG, PNG, TXT formats
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Supported Formats */}
                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                  {['PDF', 'JPG', 'PNG', 'TXT'].map(format => (
                    <span key={format} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      {format}
                    </span>
                  ))}
                </div>

                {/* Processing Status */}
                <AnimatePresence>
                  {isProcessing && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <Loader2 className="animate-spin text-blue-600" size={20} />
                        <div>
                          <p className="font-semibold text-blue-800">🤖 Advanced AI Processing...</p>
                          <p className="text-sm text-blue-600">{processingStep}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Error Display */}
                {error && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="text-red-600" size={20} />
                      <div>
                        <p className="font-semibold text-red-800">Analysis Failed</p>
                        <p className="text-sm text-red-600">{error}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* File Preview */}
              {(uploadedFile || filePreview) && (
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-green-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Eye className="text-green-600" size={24} />
                    File Preview
                  </h3>
                  
                  {uploadedFile?.type.startsWith('image/') && filePreview ? (
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                      <img 
                        src={filePreview} 
                        alt="Medical Report Preview" 
                        className="w-full max-h-96 object-contain"
                      />
                    </div>
                  ) : uploadedFile?.type === 'application/pdf' ? (
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                      <Document file={uploadedFile} className="flex justify-center">
                        <Page 
                          pageNumber={1} 
                          width={400}
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                        />
                      </Document>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-32 bg-gray-50 rounded-xl">
                      <FileText className="text-gray-400" size={48} />
                      <span className="ml-3 text-gray-600">Document uploaded successfully</span>
                    </div>
                  )}
                </div>
              )}
            </motion.div>

            {/* Analysis Results Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Emergency Alerts */}
              {emergencyAlerts && emergencyAlerts.totalAlerts > 0 && (
                <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
                    <Zap size={24} />
                    🚨 EMERGENCY MEDICAL ALERTS
                  </h3>
                  {emergencyAlerts.alerts.map((alert, index) => (
                    <div key={index} className="mb-4 p-4 bg-red-100 rounded-xl">
                      <h4 className="font-bold text-red-900 mb-2">{alert.title}</h4>
                      <p className="text-red-800 mb-2">{alert.message}</p>
                      <div className="bg-red-200 p-3 rounded-lg">
                        <p className="font-semibold text-red-900">⚡ {alert.action}</p>
                        <p className="text-sm text-red-700">Timeframe: {alert.timeframe}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Risk Score Dashboard */}
              {riskScore && (
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-green-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">🎯 Health Risk Intelligence</h3>
                    <button
                      onClick={() => speakAnalysis(`Your health risk score is ${riskScore.score}. ${riskScore.message}`)}
                      className={`p-3 rounded-xl transition-colors ${
                        isSpeaking ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                      }`}
                    >
                      {isSpeaking ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                  </div>

                  <div className={`p-6 rounded-2xl border-2 ${riskScore.color.replace('text-', 'border-').replace('-600', '-200')}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getRiskIcon()}
                        <div>
                          <h4 className="text-2xl font-bold">Risk Score: {riskScore.score}/100</h4>
                          <p className="text-sm opacity-75">{riskScore.percentile}th percentile for your demographic</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-3xl font-bold ${riskScore.color.split(' ')[0]}`}>
                          {riskScore.level.replace('_', ' ')}
                        </div>
                        <div className="text-sm opacity-75">Risk Level</div>
                      </div>
                    </div>
                    
                    <p className="mb-4">{riskScore.message}</p>
                    
                    {/* Risk Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(riskScore.score, 100)}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className={`h-4 rounded-full ${
                          riskScore.score <= 15 ? 'bg-green-500' :
                          riskScore.score <= 30 ? 'bg-blue-500' :
                          riskScore.score <= 50 ? 'bg-yellow-500' :
                          riskScore.score <= 75 ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                      />
                    </div>
                    
                    {riskScore.lifeExpectancyImpact !== 0 && (
                      <p className="text-sm font-medium">
                        Life Expectancy Impact: {riskScore.lifeExpectancyImpact > 0 ? '+' : ''}{riskScore.lifeExpectancyImpact} years
                      </p>
                    )}

                    <div className="mt-4 p-4 bg-white rounded-xl">
                      <p className="font-semibold text-gray-900 mb-2">📋 Recommended Action:</p>
                      <p className="text-sm text-gray-700">{riskScore.recommendation}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Advanced Analysis Tabs */}
              {analysisResult && (
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-green-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                    <Brain className="text-green-600" size={28} />
                    🧠 Advanced Medical Intelligence
                  </h3>

                  {/* Tab Navigation */}
                  <div className="flex flex-wrap gap-2 mb-6 bg-gray-100 rounded-xl p-1">
                    {[
                      { id: 'overview', label: '📊 Overview', icon: Activity },
                      { id: 'detailed', label: '🔬 Detailed Analysis', icon: Stethoscope },
                      { id: 'predictions', label: '🔮 Health Predictions', icon: TrendingUp },
                      { id: 'comparison', label: '📈 Population Comparison', icon: Users },
                      { id: 'action', label: '🎯 Action Plan', icon: Target }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 py-2 px-3 rounded-lg font-medium transition-all text-sm ${
                          activeTab === tab.id 
                            ? 'bg-white text-green-600 shadow-sm' 
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <tab.icon size={14} />
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === 'overview' && (
                      <div className="space-y-6">
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="bg-green-50 p-4 rounded-xl text-center">
                            <Shield className="text-green-600 mx-auto mb-2" size={24} />
                            <div className="text-2xl font-bold text-green-600">
                              {analysisResult.summary?.normalValues || 0}
                            </div>
                            <p className="text-xs text-green-700">Normal Values</p>
                          </div>
                          <div className="bg-red-50 p-4 rounded-xl text-center">
                            <AlertTriangle className="text-red-600 mx-auto mb-2" size={24} />
                            <div className="text-2xl font-bold text-red-600">
                              {analysisResult.summary?.abnormalValues || 0}
                            </div>
                            <p className="text-xs text-red-700">Need Attention</p>
                          </div>
                          <div className="bg-blue-50 p-4 rounded-xl text-center">
                            <Activity className="text-blue-600 mx-auto mb-2" size={24} />
                            <div className="text-2xl font-bold text-blue-600">
                              {analysisResult.summary?.totalParameters || 0}
                            </div>
                            <p className="text-xs text-blue-700">Total Analyzed</p>
                          </div>
                        </div>

                        {/* AI Insights */}
                        {aiInsights && aiInsights.insights.length > 0 && (
                          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl">
                            <h4 className="font-bold text-purple-800 mb-4 flex items-center gap-2">
                              <Sparkles size={20} />
                              🤖 AI Health Insights
                            </h4>
                            {aiInsights.insights.slice(0, 2).map((insight, index) => (
                              <div key={index} className="mb-4 last:mb-0">
                                <h5 className="font-semibold text-purple-900">{insight.title}</h5>
                                <p className="text-purple-800 text-sm mt-1">{insight.insight}</p>
                                {insight.recommendation && (
                                  <p className="text-purple-700 text-xs mt-2 font-medium">
                                    💡 {insight.recommendation}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === 'detailed' && (
                      <div className="space-y-6">
                        {Object.entries(analysisResult.detailedAnalysis || {}).map(([category, data]) => (
                          <div key={category} className="border border-gray-200 rounded-2xl p-6">
                            <h4 className="text-xl font-bold text-gray-900 mb-4 capitalize">
                              {category === 'CBC' ? '🩸 Complete Blood Count' :
                               category === 'Lipid' ? '❤️ Lipid Profile' :
                               category === 'Diabetes' ? '🍯 Diabetes Panel' :
                               category === 'Liver' ? '🫁 Liver Function' :
                               category === 'Kidney' ? '🫘 Kidney Function' :
                               category} Analysis
                            </h4>
                            
                            {data.findings?.map((finding, index) => (
                              <div key={index} className="mb-6 p-4 border border-gray-100 rounded-xl">
                                <div className="flex items-center justify-between mb-3">
                                  <h5 className="font-semibold text-gray-900">{finding.test}</h5>
                                  <div className="flex items-center gap-2">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(finding.status)}`}>
                                      {finding.status}
                                    </span>
                                    <button
                                      onClick={() => speakAnalysis(finding.explanation?.[educationLevel] || finding.explanation?.simple)}
                                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                    >
                                      <Volume2 size={16} />
                                    </button>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                                  <div>
                                    <span className="text-gray-600">Your Value:</span>
                                    <p className="font-semibold">{finding.value} {finding.unit}</p>
                                  </div>
                                  <div>
                                    <span className="text-gray-600">Normal Range:</span>
                                    <p className="font-semibold">{finding.normalRange} {finding.unit}</p>
                                  </div>
                                  <div>
                                    <span className="text-gray-600">Status:</span>
                                    <p className={`font-semibold ${
                                      finding.status === 'NORMAL' ? 'text-green-600' : 
                                      finding.status === 'HIGH' ? 'text-red-600' : 'text-yellow-600'
                                    }`}>
                                      {finding.status}
                                    </p>
                                  </div>
                                </div>

                                {/* Visual Progress Bar */}
                                <div className="mb-4">
                                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ 
                                        width: finding.status === 'NORMAL' ? '50%' : 
                                               finding.status === 'HIGH' ? '85%' : '25%'
                                      }}
                                      transition={{ duration: 1, delay: index * 0.1 }}
                                      className={`h-3 ${
                                        finding.status === 'NORMAL' ? 'bg-green-500' :
                                        finding.status === 'HIGH' ? 'bg-red-500' : 'bg-yellow-500'
                                      }`}
                                    />
                                  </div>
                                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>Low</span>
                                    <span>Normal</span>
                                    <span>High</span>
                                  </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-xl mb-4">
                                  <p className="text-gray-700 leading-relaxed">
                                    {finding.explanation?.[educationLevel] || finding.explanation?.simple || 
                                     `Your ${finding.test} level is ${finding.status.toLowerCase()}.`}
                                  </p>
                                </div>

                                {finding.recommendations && (
                                  <div className="mb-4">
                                    <h6 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                      <Stethoscope size={16} />
                                      Medical Recommendations:
                                    </h6>
                                    <ul className="space-y-1">
                                      {finding.recommendations.map((rec, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                          <span className="text-blue-500 mt-1">•</span>
                                          {rec}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {finding.homeRemedies && (
                                  <div>
                                    <h6 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                      <Home size={16} />
                                      Home Remedies:
                                    </h6>
                                    <ul className="space-y-1">
                                      {finding.homeRemedies.map((remedy, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                          <span className="text-green-500 mt-1">•</span>
                                          {remedy}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === 'predictions' && healthPredictions && (
                      <div className="space-y-6">
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
                          <h4 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
                            <TrendingUp size={20} />
                            🔮 Health Trajectory Analysis
                          </h4>
                          <p className="text-blue-700 mb-4">{healthPredictions.overallOutlook}</p>
                          
                          {healthPredictions.predictions.map((prediction, index) => (
                            <div key={index} className="bg-white p-4 rounded-xl mb-4">
                              <div className="flex items-start gap-3">
                                <span className="text-2xl">{prediction.icon}</span>
                                <div>
                                  <h5 className="font-semibold text-gray-900">{prediction.condition}</h5>
                                  <p className="text-sm text-gray-600 mb-2">{prediction.prevention}</p>
                                  <div className="grid grid-cols-2 gap-4 text-xs">
                                    <div>
                                      <span className="font-medium">Risk: </span>
                                      <span className={prediction.currentRisk === 'HIGH' ? 'text-red-600' : 'text-yellow-600'}>
                                        {prediction.currentRisk}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="font-medium">Timeframe: </span>
                                      <span>{prediction.timeframe}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Timeline */}
                        <div className="space-y-4">
                          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Calendar size={20} />
                            📅 Health Improvement Timeline
                          </h4>
                          {healthPredictions.timeline.map((period, index) => (
                            <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                              <div className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full h-fit">
                                {index + 1}
                              </div>
                              <div>
                                <h5 className="font-semibold text-gray-900">{period.timeframe}</h5>
                                <p className="text-sm text-gray-600 mb-2">{period.expectedImpact}</p>
                                <ul className="text-xs text-gray-700 space-y-1">
                                  {period.actions.slice(0, 3).map((action, i) => (
                                    <li key={i}>• {action}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'comparison' && populationComparison && (
                      <div className="space-y-6">
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl">
                          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Users size={20} />
                            📊 How You Compare to Others
                          </h4>
                          <div className="text-center mb-6">
                            <div className="text-4xl font-bold text-blue-600">
                              {populationComparison.overallPercentile}%
                            </div>
                            <p className="text-blue-800">{populationComparison.summary}</p>
                          </div>
                          
                          <div className="grid gap-4">
                            {populationComparison.comparisons.slice(0, 6).map((comp, index) => (
                              <div key={index} className="bg-white p-4 rounded-xl">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="font-medium">{comp.parameter}</span>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    comp.category === 'EXCELLENT' ? 'bg-green-100 text-green-800' :
                                    comp.category === 'VERY_GOOD' ? 'bg-blue-100 text-blue-800' :
                                    comp.category === 'GOOD' ? 'bg-green-100 text-green-700' :
                                    'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {comp.percentile}th percentile
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600">{comp.comparison}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'action' && actionPlan && (
                      <div className="space-y-6">
                        {actionPlan.emergency && actionPlan.emergency.length > 0 && (
                          <div className="bg-red-50 border-2 border-red-200 p-6 rounded-xl">
                            <h4 className="font-bold text-red-800 mb-4 flex items-center gap-2">
                              <Zap size={20} />
                              🚨 EMERGENCY ACTIONS
                            </h4>
                            {actionPlan.emergency.map((action, index) => (
                              <div key={index} className="flex items-start gap-3 mb-2">
                                <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">!</span>
                                <p className="text-red-800 font-medium">{action}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="bg-blue-50 p-6 rounded-xl">
                            <h4 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
                              <Bell size={18} />
                              🔔 Immediate Actions (Next 48 Hours)
                            </h4>
                            {actionPlan.immediate.map((action, index) => (
                              <div key={index} className="flex items-start gap-3 mb-3">
                                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">{index + 1}</span>
                                <p className="text-blue-800 text-sm">{action}</p>
                              </div>
                            ))}
                          </div>

                          <div className="bg-green-50 p-6 rounded-xl">
                            <h4 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                              <Target size={18} />
                              🎯 Short-term Goals (1-4 Weeks)
                            </h4>
                            {actionPlan.shortTerm.slice(0, 4).map((action, index) => (
                              <div key={index} className="flex items-start gap-3 mb-3">
                                <span className="text-green-500 mt-1">•</span>
                                <p className="text-green-800 text-sm">{action}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Lifestyle Recommendations */}
                        <div className="grid md:grid-cols-3 gap-6">
                          {actionPlan.lifestyle?.map((category, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl border border-gray-200">
                              <h4 className="font-bold text-gray-900 mb-4">{category.category}</h4>
                              <ul className="space-y-2">
                                {category.recommendations.slice(0, 3).map((rec, i) => (
                                  <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                                    <span className="text-green-500 mt-1">•</span>
                                    {rec}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
              )}

              {/* Action Buttons */}
              {analysisResult && (
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => window.print()}
                    className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-2xl transition-colors"
                  >
                    <Download size={20} />
                    Download Complete Report
                  </button>
                  <button 
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: 'Advanced Medical Analysis Report',
                          text: 'My comprehensive health analysis from AI Medical Assistant',
                          url: window.location.href
                        });
                      }
                    }}
                    className="flex-1 flex items-center justify-center gap-3 px-6 py-4 border border-green-600 text-green-600 hover:bg-green-50 font-semibold rounded-2xl transition-colors"
                  >
                    <Share2 size={20} />
                    Share with Doctor
                  </button>
                </div>
              )}

              {/* Features Info */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-6 border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                  <Sparkles size={20} />
                  🚀 Advanced AI Features
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm text-purple-800">
                  <div>• Risk Score Calculation</div>
                  <div>• Population Comparison</div>
                  <div>• Health Predictions</div>
                  <div>• Emergency Alerts</div>
                  <div>• Personalized Action Plans</div>
                  <div>• Text-to-Speech</div>
                  <div>• Multi-format Support</div>
                  <div>• Expert Recommendations</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UploadReportPage;
