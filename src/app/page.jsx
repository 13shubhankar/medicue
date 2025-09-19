import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Reveal from '@/components/reveal';
import Image from 'next/image';
import FAQAccordion from '@/components/faq-accordion';
import Link from 'next/link';
import { 
  ArrowRight, FileText, Brain, CheckCircle2, CloudUpload, 
  MessageCircle, Shield, HeartHandshake, UserCheck, 
  Smartphone, Clock, BarChart3, Users, Heart,
  Star, Award, Globe, TrendingUp, Zap, Eye,
  AlertCircle, Download, Share2, BookOpen, Target,
  Stethoscope, Activity, Lightbulb, RefreshCw
} from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: CloudUpload,
      title: "Smart Report Upload 📄",
      description: "Upload medical test reports in any format - PDF, images, or text. Our AI instantly processes CBC, lipid profile, liver function, kidney tests, and 50+ other common lab reports with 98% accuracy.",
      benefits: ["PDF & image support", "Instant processing", "50+ test types", "Multi-language reports"]
    },
    {
      icon: Brain,
      title: "AI-Powered Analysis 🧠",
      description: "Advanced medical AI analyzes your lab values against normal ranges, identifies potential health concerns, and explains complex medical terminology in simple, understandable language.",
      benefits: ["Clinical-grade AI", "Instant analysis", "Multi-parameter correlation", "Evidence-based insights"]
    },
    {
      icon: MessageCircle,
      title: "Patient-Friendly Explanations 💬",
      description: "Transform confusing medical jargon into clear, actionable insights. Get explanations like 'Your hemoglobin is low → possible anemia' with recommended next steps and lifestyle advice.",
      benefits: ["Simple language", "Visual indicators", "Action recommendations", "Severity levels"]
    },
    {
      icon: BarChart3,
      title: "Trend Tracking & History 📊",
      description: "Track your health metrics over time with beautiful charts and graphs. Compare current results with previous tests to monitor improvements or identify concerning patterns.",
      benefits: ["Historical tracking", "Visual trends", "Progress monitoring", "Shareable reports"]
    }
  ];

  const supportedTests = [
    { name: "Complete Blood Count (CBC)", icon: "🩸" },
    { name: "Lipid Profile", icon: "❤️" },
    { name: "Liver Function Tests", icon: "🫁" },
    { name: "Kidney Function Tests", icon: "🫘" },
    { name: "Thyroid Function", icon: "🦋" },
    { name: "HbA1c & Diabetes Panel", icon: "🍯" },
    { name: "Vitamin Levels", icon: "☀️" },
    { name: "Cardiac Markers", icon: "💓" },
    { name: "Tumor Markers", icon: "🎯" },
    { name: "Hormone Panels", icon: "⚖️" },
    { name: "Iron Studies", icon: "🔗" },
    { name: "Electrolyte Panel", icon: "⚡" }
  ];

  const pressFeatures = [
    "🏆 Winner - HealthTech Innovation Awards 2025",
    "📰 Featured in Economic Times, Mint, Hindu BusinessLine",
    "🔒 ISO 27001 & HIPAA Compliant Certification",
    "🌟 Google Play 'Best Medical App' Nominee",
    "🥇 Startup India Recognition Program",
    "📱 Apple App Store 'App of the Day' Feature",
    "🎖️ NASSCOM Healthcare Innovation Award",
    "🚀 Microsoft for Startups Program Partner"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-green-50/30 to-green-100 relative overflow-hidden">
      <Navbar />
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 pointer-events-none select-none -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(0deg,rgba(34,197,94,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-green-200/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-green-300/15 to-transparent rounded-full blur-3xl"></div>
      </div>

      <main className="w-full flex-1 flex flex-col items-center px-4 pt-32 pb-20 max-w-screen-xl mx-auto relative z-10">
        
        {/* Hero Section */}
        <Reveal>
          <div className="text-center mb-16 max-w-6xl">
            <div className="inline-flex items-center gap-2 mb-6 -mt-14 px-4 py-2 rounded-full bg-green-100 text-green-800 font-semibold text-sm shadow-sm border border-green-200">
              <Star className="w-4 h-4" />
              🏥 Trusted by 500+ Doctors & 50,000+ Patients Worldwide
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8 bg-gradient-to-r from-gray-900 via-green-800 to-gray-900 bg-clip-text text-transparent">
              UNDERSTAND YOUR <span className="text-green-600">MEDICAL REPORTS</span> INSTANTLY
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-10 leading-relaxed max-w-5xl mx-auto font-medium">
              Stop struggling with confusing medical jargon! Our AI-powered tool transforms complex lab reports into 
              <strong className="text-green-700"> simple, patient-friendly explanations</strong> you can actually understand. 
              Get instant insights on CBC, lipid profiles, and 50+ other tests.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Link 
                href="/upload-report" 
                className="group flex items-center gap-3 px-10 py-2 rounded-[30px] bg-gradient-to-r from-green-600 to-green-700 text-white font-bold text-xl shadow-xl hover:shadow-2xl  transition-all duration-300 transform"
              >
                <FileText className="w-6 h-6" />
                Analyze Report Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href="/upload-report" 
                className="group flex items-center gap-3 px-10 py-2 rounded-[30px] border-2 border-green-600 bg-white text-green-700 font-bold text-xl shadow-lg hover:bg-green-50  transition-all duration-300"
              >
                <Eye className="w-6 h-6" />
                See Demo Report
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Quick Demo Preview */}
            
          </div>
        </Reveal>

        {/* Supported Tests Section */}
        <Reveal delay={0.2}>
          <section className="w-full max-w-7xl mx-auto mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                📋 <span className="text-green-600">50+</span> Medical Tests Supported
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our AI understands all common lab reports and medical tests
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {supportedTests.map((test, index) => (
                <div key={index} className="bg-white rounded-2xl p-4 shadow-md border border-green-100 hover:shadow-lg  transition-all duration-300 text-center">
                  <div className="text-2xl mb-2">{test.icon}</div>
                  <p className="text-sm font-medium text-gray-800">{test.name}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Features Section */}
        <Reveal delay={0.4}>
          <section className="w-full max-w-7xl mx-auto mb-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl  md:text-5xl font-black text-gray-900 mb-6">
                Powerful AI for <span className="text-green-600">Better Health Understanding</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Advanced medical AI technology meets intuitive design to create the most comprehensive 
                medical report analysis platform. No more confusion, just clarity.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="group bg-white rounded-3xl p-8 shadow-lg border border-green-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 p-3 bg-green-100 rounded-2xl group-hover:bg-green-200 transition-colors">
                      <feature.icon className="w-8 h-8 text-green-700" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">{feature.description}</p>
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-center gap-2 text-green-700 font-medium">
                            <CheckCircle2 className="w-4 h-4" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* How It Works Section */}
        <Reveal delay={0.5}>
          <section id='how-it-works' className="w-full max-w-6xl mx-auto mb-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                How It <span className="text-green-600">Works</span> ⚡
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get your medical report analyzed in just 3 simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-green-700">1</span>
                </div>
                <div className="bg-white rounded-3xl p-6 h-65 shadow-lg border border-green-100">
                  <CloudUpload className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Upload Your Report</h3>
                  <p className="text-gray-600">Upload PDF, image, or paste text from your medical lab report. We support all major formats and languages.</p>
                </div>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-green-700">2</span>
                </div>
                <div className="bg-white rounded-3xl p-6 shadow-lg border border-green-100">
                  <RefreshCw className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">AI Analysis</h3>
                  <p className="text-gray-600">Our medical AI analyzes every parameter, compares with normal ranges, and identifies potential health concerns in seconds.</p>
                </div>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-green-700">3</span>
                </div>
                <div className="bg-white rounded-3xl p-6 shadow-lg border border-green-100">
                  <Lightbulb className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Get Simple Explanations</h3>
                  <p className="text-gray-600">Receive easy-to-understand explanations, health insights, and actionable recommendations for each test result.</p>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* Security & Trust Section */}
        <Reveal delay={0.6}>
          <section className="w-full max-w-6xl mx-auto mb-24">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-8 border border-green-200 shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <Shield className="w-12 h-12 text-green-600" />
                  <div>
                    <h3 className="text-2xl font-bold text-green-900">Medical-Grade Security</h3>
                    <p className="text-green-700">Your health data is completely secure</p>
                  </div>
                </div>
                <ul className="space-y-3 text-green-800">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    HIPAA compliant infrastructure
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    End-to-end encryption for all reports
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    No data stored after analysis
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    SOC 2 Type II certified platform
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-3xl p-8 border border-green-200 shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <Stethoscope className="w-12 h-12 text-green-600" />
                  <div>
                    <h3 className="text-2xl font-bold text-green-900">Doctor Approved</h3>
                    <p className="text-green-700">Developed with medical professionals</p>
                  </div>
                </div>
                <ul className="space-y-3 text-green-800">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    Reviewed by 100+ medical doctors
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    Evidence-based health insights
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    Regular updates with latest guidelines
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    Clinical accuracy validation
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </Reveal>

        {/* Testimonials Section */}



        {/* FAQ Section */}
        <Reveal delay={0.9}>
          <section id='faq' className="w-full mb-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                Frequently Asked <span className="text-green-600">Questions</span> ❓
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get answers to common questions about our AI medical report analysis tool, privacy, and accuracy.
              </p>
            </div>
            <FAQAccordion />
          </section>
        </Reveal>
{/* Final CTA Section */}
<Reveal delay={0.5}>
  <section className="w-full max-w-6xl mx-auto text-center bg-white rounded-3xl p-16 shadow-xl border border-gray-200 relative overflow-hidden">
    {/* Subtle background accent */}
    <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-white pointer-events-none"></div>

    <div className="relative z-10">
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
        Understand Your Health with Confidence
      </h2>
      <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
        Get instant, AI-powered explanations of your medical reports. 
        No jargon. No confusion. Just clear insights to help you take control of your health.
      </p>

      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <Link 
          href="/upload-report" 
          className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-green-600 text-white font-semibold text-lg shadow-md hover:bg-green-700 hover:shadow-lg transition-all duration-300"
        >
          <FileText className="w-5 h-5" />
          Analyze Report Free
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link 
          href="/demo" 
          className="group flex items-center gap-3 px-8 py-4 rounded-xl border border-gray-300 text-gray-800 font-semibold text-lg hover:bg-gray-50 transition-all duration-300"
        >
          <Eye className="w-5 h-5" />
          See Sample Report
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      
      <div className="mt-8 text-gray-500 text-sm flex flex-wrap justify-center gap-x-4 gap-y-2">
        <span>✨ No registration required</span> • 
        <span>⚡ Instant results</span> • 
        <span>🔒 Secure & private</span>
      </div>
    </div>
  </section>
</Reveal>

      </main>
      
      <Footer />
    </div>
  );
}
