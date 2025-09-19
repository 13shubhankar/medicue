'use client';

import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from 'lucide-react';

const faqData = [
  {
    question: "How do I upload my medical report?",
    answer: "Simply click 'Analyze Report Free' and upload your PDF report, take a photo of your report, or copy-paste the text directly. Our AI-powered system instantly processes CBC, lipid profiles, liver function tests, and 50+ other common lab reports with 98% accuracy."
  },
  {
    question: "What types of medical reports can your AI analyze?",
    answer: "Our AI supports 50+ types of medical tests including Complete Blood Count (CBC), Lipid Profile, Liver Function Tests, Kidney Function Tests, Thyroid Function, HbA1c, Vitamin Levels, Cardiac Markers, Tumor Markers, Hormone Panels, Iron Studies, and Electrolyte Panels."
  },
  {
    question: "How secure and private is my medical report data?",
    answer: "We use medical-grade security with HIPAA-compliant infrastructure and end-to-end encryption. Your reports are analyzed instantly and NOT stored on our servers. All data is deleted immediately after providing your analysis results."
  },
  {
    question: "How accurate are the AI explanations for my test results?",
    answer: "Our AI achieves over 98% accuracy in analyzing digital lab reports and 95% for handwritten/scanned reports. The system has been trained on millions of medical reports and validated by 100+ medical professionals to ensure clinical accuracy."
  },
  {
    question: "Can I share my simplified report with my doctor or family?",
    answer: "Yes! After analysis, you can download a patient-friendly summary report or share it directly via email or WhatsApp. The simplified explanations help facilitate better discussions with your healthcare provider during consultations."
  },
  {
    question: "Does the AI work with handwritten lab reports?",
    answer: "Absolutely! Our advanced OCR (Optical Character Recognition) technology can read both typed and handwritten medical reports. For handwritten reports, our AI achieves 95% accuracy and highlights any values it's uncertain about for your review."
  },
  {
    question: "What languages are supported for medical report analysis?",
    answer: "Currently, we support English, Hindi, and regional Indian languages. Our AI can process reports from major Indian labs like SRL, Dr. Lal PathLabs, Metropolis, and international formats. We're continuously adding more language support."
  },
  {
    question: "How quickly do I get my report explanation?",
    answer: "Analysis is instant! Within 10-15 seconds of uploading your report, you'll receive easy-to-understand explanations like 'Your cholesterol is high → risk of heart disease' along with actionable recommendations and lifestyle tips."
  },
  {
    question: "Can the AI detect serious health conditions from my reports?",
    answer: "Our AI identifies potential health concerns and flags abnormal values with clear explanations. However, it's designed to complement, not replace, professional medical advice. We always recommend consulting your doctor for serious health decisions."
  },
  {
    question: "Is this service free to use?",
    answer: "Yes! Basic report analysis is completely free with no registration required. Simply upload your report and get instant explanations. We also offer premium features like historical tracking and detailed health insights for advanced users."
  },
  {
    question: "Can I track my health progress over time?",
    answer: "Yes! Our platform allows you to upload multiple reports over time and track trends in your health parameters. You'll see beautiful charts showing how your cholesterol, blood sugar, hemoglobin, and other values change over months and years."
  },
  {
    question: "What if I don't understand some medical terms in my explanation?",
    answer: "Our AI specifically converts complex medical jargon into simple language. If you still have questions, each explanation includes a 'Learn More' section with detailed but easy-to-understand information about specific health parameters and conditions."
  },
  {
    question: "Are the health recommendations personalized for me?",
    answer: "Yes! Based on your specific test results, age, and gender (if provided), our AI generates personalized recommendations for diet, exercise, and lifestyle changes. These suggestions are evidence-based and reviewed by medical professionals."
  },
  {
    question: "Can I use this for my family members' reports?",
    answer: "Absolutely! You can analyze reports for family members of any age. Our AI adjusts explanations and recommendations based on age groups (pediatric, adult, senior) and provides family-friendly health insights that everyone can understand."
  },
  {
    question: "Does the AI provide emergency warnings for critical values?",
    answer: "Yes! Our AI immediately flags critically abnormal values that may require urgent medical attention. You'll see clear warnings like 'URGENT: Extremely low hemoglobin - see doctor immediately' for values that could indicate serious health emergencies."
  }
];

export default function FAQAccordion() {
  return (
    <div className="w-full max-w-4xl  mx-auto">
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <Disclosure key={index} as="div" className="bg-white cursor-pointer rounded-2xl shadow-md border border-green-100 overflow-hidden">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between items-center px-6 py-5 text-left text-lg font-semibold text-green-900 hover:bg-green-50 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500">
                  <span>{faq.question}</span>
                  <ChevronDownIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-6 w-6 text-green-600 transition-transform duration-200`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-6 pb-5 text-gray-700 text-base leading-relaxed border-t border-green-100 bg-green-50/30">
                  {faq.answer}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
}
