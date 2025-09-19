'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Document, Page, pdfjs } from 'react-pdf';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, FileText, Check, AlertCircle, Eye, Volume2, 
  Download, Loader2, RefreshCw, Brain, Stethoscope,
  VolumeX, Share2, TrendingUp, TrendingDown,
  Minus, Activity, Home, Zap
} from 'lucide-react';
import { useSpeechSynthesis } from 'react-speech-kit';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const UploadReportPage = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingStep, setProcessingStep] = useState('');
  const [educationLevel, setEducationLevel] = useState('simple'); // Default to simple
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState('');
  
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
      setAnalysisResult(null);
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => setFilePreview(e.target.result);
        reader.readAsDataURL(file);
      }
      
      // Simulate upload progress
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
  }, []);

  // REAL PROCESSING FUNCTION - CONNECTS TO API
  const processReport = async () => {
    setIsProcessing(true);
    setProcessingStep('Initializing AI analysis...');
    setError('');
    
    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);

      setProcessingStep('Uploading file to AI...');
      
      const response = await fetch('/api/upload-report', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      setProcessingStep('Processing with Google Gemini AI...');
      const result = await response.json();

      if (result.success) {
        setProcessingStep('Analysis complete!');
        
        // Transform API response to match UI expectations
        const transformedResult = {
          patientInfo: {
            name: "Patient Report", 
            reportDate: new Date().toISOString().split('T')[0],
            labName: "AI Medical Analysis"
          },
          overallStatus: result.analysis.overallStatus || 'NORMAL',
          criticalFindings: result.analysis.criticalFindings || [],
          detailedAnalysis: result.analysis.detailedAnalysis || {},
          urgencyLevel: result.analysis.overallStatus === 'CRITICAL' ? 'HIGH' : 
                       result.analysis.overallStatus === 'ATTENTION_NEEDED' ? 'MODERATE' : 'LOW',
          doctorConsultation: result.analysis.doctorConsultation,
          rawData: result.parsedData,
          extractedText: result.extractedText
        };
        
        setAnalysisResult(transformedResult);
        console.log('✅ Analysis completed:', transformedResult);
      } else {
        throw new Error('Analysis failed');
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
      case 'HIGH': 
      case 'CRITICAL': return <AlertCircle className="text-red-500" size={20} />;
      case 'MODERATE': return <TrendingUp className="text-yellow-500" size={20} />;
      case 'LOW': return <Minus className="text-green-500" size={20} />;
      default: return <Activity className="text-blue-500" size={20} />;
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
                Analyze Your <span className="text-green-600">Medical Report</span> 🏥
              </h1>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Upload your lab report and get <strong>real AI-powered analysis</strong> with simple explanations 
                and actionable health insights powered by Google Gemini.
              </p>
              
              {/* Education Level Toggle */}
              <div className="flex justify-center mt-6">
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
                      📚 Detailed Explanation
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
                          <p className="font-semibold text-blue-800">🤖 Google Gemini AI Processing...</p>
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
              {analysisResult && (
                <>
                  {/* Overall Status */}
                  <div className="bg-white rounded-3xl p-8 shadow-lg border border-green-100">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-gray-900">🤖 AI Health Analysis</h3>
                      <button
                        onClick={() => speakAnalysis('AI health analysis complete. Here are your results.')}
                        className={`p-3 rounded-xl transition-colors ${
                          isSpeaking ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                        }`}
                        title={isSpeaking ? "Stop Reading" : "Listen to Analysis"}
                      >
                        {isSpeaking ? <VolumeX size={20} /> : <Volume2 size={20} />}
                      </button>
                    </div>

                    {/* Overall Status Card */}
                    <div className={`p-6 rounded-2xl border-2 ${
                      analysisResult.overallStatus === 'CRITICAL' ? 'bg-red-50 border-red-200' :
                      analysisResult.overallStatus === 'ATTENTION_NEEDED' ? 'bg-yellow-50 border-yellow-200' :
                      'bg-green-50 border-green-200'
                    }`}>
                      <div className="flex items-center gap-3 mb-3">
                        {getSeverityIcon(analysisResult.urgencyLevel)}
                        <h4 className="text-lg font-bold">
                          {analysisResult.overallStatus === 'CRITICAL' ? '🚨 Critical - See Doctor Immediately' :
                           analysisResult.overallStatus === 'ATTENTION_NEEDED' ? '⚠️ Some Values Need Attention' :
                           '✅ All Values Look Good'}
                        </h4>
                      </div>
                      <p className="text-sm mb-4">
                        {educationLevel === 'simple' 
                          ? analysisResult.overallStatus === 'NORMAL' 
                            ? "Good news! Your test results look healthy."
                            : "Some of your test results need attention. Read the details below."
                          : "AI analysis complete. Detailed parameter evaluation and recommendations are provided below."
                        }
                      </p>
                      
                      {analysisResult.doctorConsultation && (
                        <div className="bg-white p-4 rounded-xl">
                          <p className="font-semibold text-red-700 mb-2">🏥 Doctor Consultation Recommended</p>
                          <p className="text-sm">
                            <strong>Timeline:</strong> {analysisResult.doctorConsultation.urgency}<br/>
                            <strong>Specialist:</strong> {analysisResult.doctorConsultation.specialist}<br/>
                            <strong>Reason:</strong> {analysisResult.doctorConsultation.reason}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Critical Findings */}
                  {analysisResult.criticalFindings?.length > 0 && (
                    <div className="bg-white rounded-3xl p-8 shadow-lg border border-red-200">
                      <h3 className="text-xl font-bold text-red-800 mb-6 flex items-center gap-2">
                        <AlertCircle size={24} />
                        🚨 Values That Need Attention
                      </h3>
                      
                      <div className="space-y-4">
                        {analysisResult.criticalFindings.map((finding, index) => (
                          <div key={index} className="p-4 bg-red-50 border border-red-200 rounded-xl">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-bold text-red-800">{finding.parameter}</h4>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(finding.status)}`}>
                                {finding.status}
                              </span>
                            </div>
                            <div className="text-sm">
                              <p><strong>Your Value:</strong> {finding.value}</p>
                              <p><strong>Normal Range:</strong> {finding.normalRange}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Detailed Analysis */}
                  <div className="space-y-6">
                    {Object.entries(analysisResult.detailedAnalysis).map(([category, data]) => (
                      <div key={category} className="bg-white rounded-3xl p-8 shadow-lg border border-green-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 capitalize">
                          📊 {category === 'CBC' ? 'Complete Blood Count' : 
                               category === 'Lipid' ? 'Lipid Profile' :
                               category === 'Diabetes' ? 'Diabetes Panel' :
                               category === 'Liver' ? 'Liver Function' :
                               category === 'Kidney' ? 'Kidney Function' :
                               category} Analysis
                        </h3>
                        
                        <div className="space-y-6">
                          {data.findings?.map((finding, index) => (
                            <div key={index} className="border border-gray-200 rounded-2xl p-6">
                              <div className="flex items-center justify-between mb-4">
                                <h4 className="text-lg font-semibold text-gray-900">{finding.test}</h4>
                                <div className="flex items-center gap-2">
                                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(finding.status)}`}>
                                    {finding.status}
                                  </span>
                                  <button
                                    onClick={() => speakAnalysis(finding.explanation?.[educationLevel] || finding.explanation?.simple)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                    title="Listen to Explanation"
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
                                    finding.status === 'HIGH' ? 'text-red-600' : 
                                    'text-yellow-600'
                                  }`}>
                                    {finding.status}
                                  </p>
                                </div>
                              </div>

                              {/* Color-coded Visual Indicator */}
                              <div className="mb-4">
                                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full transition-all duration-1000 ${
                                      finding.status === 'NORMAL' ? 'bg-green-500' :
                                      finding.status === 'HIGH' ? 'bg-red-500' :
                                      'bg-yellow-500'
                                    }`}
                                    style={{
                                      width: finding.status === 'NORMAL' ? '50%' : 
                                             finding.status === 'HIGH' ? '85%' : '30%'
                                    }}
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
                                  <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                    <Stethoscope size={16} />
                                    Medical Recommendations:
                                  </h5>
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
                                  <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                    <Home size={16} />
                                    Home Remedies & Lifestyle:
                                  </h5>
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
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={() => window.print()}
                      className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-2xl transition-colors"
                    >
                      <Download size={20} />
                      Download Report
                    </button>
                    <button 
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: 'Medical Report Analysis',
                            text: 'My medical report analysis from AI Health Assistant',
                            url: window.location.href
                          });
                        } else {
                          alert('Analysis can be printed or saved as PDF for sharing with your doctor.');
                        }
                      }}
                      className="flex-1 flex items-center justify-center gap-3 px-6 py-4 border border-green-600 text-green-600 hover:bg-green-50 font-semibold rounded-2xl transition-colors"
                    >
                      <Share2 size={20} />
                      Share with Doctor
                    </button>
                  </div>
                </>
              )}

              {/* Help Section */}
              <div className="bg-blue-50 rounded-3xl p-6 border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <Brain size={20} />
                  💡 Powered by Google Gemini AI
                </h4>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li>• Analyzes 50+ medical parameters instantly</li>
                  <li>• Color-coded severity indicators (🟢 Normal, 🟡 Attention, 🔴 Critical)</li>
                  <li>• Text-to-speech for accessibility</li>
                  <li>• Personalized recommendations and home remedies</li>
                  <li>• Real AI analysis - not just mock data!</li>
                </ul>
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
