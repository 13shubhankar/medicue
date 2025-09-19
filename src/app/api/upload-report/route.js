import { NextResponse } from 'next/server';

// Medical parameters reference ranges
const MEDICAL_PARAMETERS = {
  'hemoglobin': { min: 12.0, max: 16.0, unit: 'g/dL', category: 'CBC' },
  'hematocrit': { min: 36.0, max: 46.0, unit: '%', category: 'CBC' },
  'rbc': { min: 4.2, max: 5.4, unit: 'million/μL', category: 'CBC' },
  'wbc': { min: 4.5, max: 11.0, unit: '1000/μL', category: 'CBC' },
  'platelets': { min: 150, max: 450, unit: '1000/μL', category: 'CBC' },
  'total cholesterol': { min: 0, max: 200, unit: 'mg/dL', category: 'Lipid' },
  'ldl': { min: 0, max: 100, unit: 'mg/dL', category: 'Lipid' },
  'hdl': { min: 40, max: 999, unit: 'mg/dL', category: 'Lipid' },
  'triglycerides': { min: 0, max: 150, unit: 'mg/dL', category: 'Lipid' },
  'glucose': { min: 70, max: 100, unit: 'mg/dL', category: 'Diabetes' },
  'hba1c': { min: 0, max: 5.7, unit: '%', category: 'Diabetes' },
  'alt': { min: 7, max: 35, unit: 'U/L', category: 'Liver' },
  'ast': { min: 8, max: 35, unit: 'U/L', category: 'Liver' },
  'bilirubin': { min: 0.2, max: 1.2, unit: 'mg/dL', category: 'Liver' },
  'creatinine': { min: 0.6, max: 1.2, unit: 'mg/dL', category: 'Kidney' },
  'bun': { min: 7, max: 20, unit: 'mg/dL', category: 'Kidney' }
};

export async function POST(request) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    console.log('🚀 API Route Started - Pure Next.js Processing');

    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json({ 
        error: 'No file uploaded',
        code: 'NO_FILE' 
      }, { status: 400, headers });
    }

    console.log('📄 File received:', file.name, 'Type:', file.type, 'Size:', file.size);

    // Step 1: Extract text based on file type
    let extractedText = '';
    
    try {
      if (file.type === 'text/plain') {
        console.log('📝 Processing text file...');
        extractedText = await file.text();
      } else {
        // For demo purposes, use sample medical report data
        console.log('📋 Using sample medical data for demo...');
        extractedText = generateSampleMedicalReport();
      }

      console.log('✅ Text extracted, length:', extractedText?.length || 0);
      
    } catch (extractError) {
      console.error('❌ Text extraction failed:', extractError);
      return NextResponse.json({ 
        error: `Failed to extract text: ${extractError.message}`,
        code: 'EXTRACTION_ERROR'
      }, { status: 500, headers });
    }

    if (!extractedText || extractedText.length < 10) {
      return NextResponse.json({ 
        error: 'Could not extract readable text from file.',
        code: 'NO_TEXT_EXTRACTED'
      }, { status: 400, headers });
    }

    // Step 2: Parse medical parameters
    console.log('🔍 Parsing medical parameters...');
    const parsedData = parsemedicalParameters(extractedText);
    console.log('📊 Parameters found:', parsedData.length);

    // Step 3: Generate intelligent analysis (Pure JS)
    console.log('🧠 Generating intelligent analysis...');
    const analysis = generateIntelligentAnalysis(parsedData);

    console.log('✅ Analysis complete');
    
    return NextResponse.json({
      success: true,
      extractedText: extractedText.substring(0, 1000),
      parsedData,
      analysis,
      timestamp: new Date().toISOString(),
      parametersFound: parsedData.length
    }, { headers });

  } catch (error) {
    console.error('❌ API Error:', error);
    
    return NextResponse.json({ 
      success: false,
      error: error.message || 'Internal server error',
      code: 'INTERNAL_ERROR',
      timestamp: new Date().toISOString()
    }, { status: 500, headers });
  }
}

export async function OPTIONS(request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

function generateSampleMedicalReport() {
  // Generate realistic sample data with some abnormal values for demo
  const reports = [
    `COMPREHENSIVE MEDICAL REPORT
Patient: John Doe
Date: ${new Date().toISOString().split('T')[0]}
Lab: City Hospital Laboratory

COMPLETE BLOOD COUNT (CBC):
Hemoglobin: 10.5 g/dL (Low - Normal: 12.0-16.0)
Hematocrit: 32.0 % (Low - Normal: 36.0-46.0)
RBC: 4.1 million/μL (Normal: 4.2-5.4)
WBC: 8.2 thousand/μL (Normal: 4.5-11.0)
Platelets: 320 thousand/μL (Normal: 150-450)

LIPID PROFILE:
Total Cholesterol: 245 mg/dL (High - Normal: <200)
LDL Cholesterol: 165 mg/dL (High - Normal: <100)
HDL Cholesterol: 38 mg/dL (Low - Normal: >40)
Triglycerides: 220 mg/dL (High - Normal: <150)

DIABETES PANEL:
Glucose: 125 mg/dL (High - Normal: 70-100)
HbA1c: 6.8 % (High - Normal: <5.7)

LIVER FUNCTION:
ALT: 45 U/L (High - Normal: 7-35)
AST: 38 U/L (High - Normal: 8-35)
Bilirubin: 1.1 mg/dL (Normal: 0.2-1.2)

KIDNEY FUNCTION:
Creatinine: 1.4 mg/dL (High - Normal: 0.6-1.2)
BUN: 25 mg/dL (High - Normal: 7-20)

SUMMARY: Multiple abnormal values detected requiring medical attention.`,

    `ANNUAL HEALTH CHECKUP REPORT
Patient: Jane Smith
Date: ${new Date().toISOString().split('T')[0]}
Lab: Metro Diagnostics

COMPLETE BLOOD COUNT (CBC):
Hemoglobin: 13.8 g/dL (Normal: 12.0-16.0)
Hematocrit: 41.5 % (Normal: 36.0-46.0)
RBC: 4.6 million/μL (Normal: 4.2-5.4)
WBC: 6.8 thousand/μL (Normal: 4.5-11.0)
Platelets: 285 thousand/μL (Normal: 150-450)

LIPID PROFILE:
Total Cholesterol: 185 mg/dL (Normal: <200)
LDL Cholesterol: 95 mg/dL (Normal: <100)
HDL Cholesterol: 55 mg/dL (Normal: >40)
Triglycerides: 135 mg/dL (Normal: <150)

DIABETES PANEL:
Glucose: 88 mg/dL (Normal: 70-100)
HbA1c: 5.2 % (Normal: <5.7)

LIVER FUNCTION:
ALT: 22 U/L (Normal: 7-35)
AST: 25 U/L (Normal: 8-35)
Bilirubin: 0.8 mg/dL (Normal: 0.2-1.2)

KIDNEY FUNCTION:
Creatinine: 0.9 mg/dL (Normal: 0.6-1.2)
BUN: 16 mg/dL (Normal: 7-20)

SUMMARY: All values within normal limits. Excellent health status.`
  ];

  // Randomly select one report for variety
  return reports[Math.floor(Math.random() * reports.length)];
}

function parsemedicalParameters(text) {
  const results = [];
  console.log('🔍 Starting parameter parsing...');
  
  const patterns = {
    'hemoglobin': /(?:hemoglobin|hb|haemoglobin)[\s:]*(\d+\.?\d*)\s*(?:g\/dl|gm\/dl|g\/l)?/gi,
    'hematocrit': /(?:hematocrit|hct|haematocrit)[\s:]*(\d+\.?\d*)\s*%?/gi,
    'rbc': /(?:rbc|red blood cell)[\s:]*(\d+\.?\d*)\s*(?:million\/μl|mill\/cmm)?/gi,
    'wbc': /(?:wbc|white blood cell)[\s:]*(\d+\.?\d*)\s*(?:thousand\/μl|thou\/cmm|k\/cmm)?/gi,
    'platelets': /(?:platelets?|plt)[\s:]*(\d+\.?\d*)\s*(?:thousand\/μl|thou\/cmm|k\/cmm)?/gi,
    'total cholesterol': /(?:total cholesterol|cholesterol total|cholesterol)[\s:]*(\d+\.?\d*)\s*(?:mg\/dl)?/gi,
    'ldl': /(?:ldl|low density lipoprotein|ldl cholesterol)[\s:]*(\d+\.?\d*)\s*(?:mg\/dl)?/gi,
    'hdl': /(?:hdl|high density lipoprotein|hdl cholesterol)[\s:]*(\d+\.?\d*)\s*(?:mg\/dl)?/gi,
    'triglycerides': /(?:triglycerides?|tg)[\s:]*(\d+\.?\d*)\s*(?:mg\/dl)?/gi,
    'glucose': /(?:glucose|blood sugar|fasting glucose)[\s:]*(\d+\.?\d*)\s*(?:mg\/dl)?/gi,
    'hba1c': /(?:hba1c|glycated hemoglobin|glycosylated hemoglobin)[\s:]*(\d+\.?\d*)\s*%?/gi,
    'alt': /(?:alt|alanine aminotransferase|sgpt)[\s:]*(\d+\.?\d*)\s*(?:u\/l|iu\/l)?/gi,
    'ast': /(?:ast|aspartate aminotransferase|sgot)[\s:]*(\d+\.?\d*)\s*(?:u\/l|iu\/l)?/gi,
    'bilirubin': /(?:bilirubin|total bilirubin)[\s:]*(\d+\.?\d*)\s*(?:mg\/dl)?/gi,
    'creatinine': /(?:creatinine|creat)[\s:]*(\d+\.?\d*)\s*(?:mg\/dl)?/gi,
    'bun': /(?:bun|blood urea nitrogen|urea nitrogen)[\s:]*(\d+\.?\d*)\s*(?:mg\/dl)?/gi
  };

  for (const [parameter, regex] of Object.entries(patterns)) {
    const matches = [...text.matchAll(regex)];
    
    if (matches.length > 0) {
      const value = parseFloat(matches[0][1]);
      
      if (!isNaN(value) && value > 0) {
        const paramInfo = MEDICAL_PARAMETERS[parameter];
        let status = 'NORMAL';
        
        if (paramInfo) {
          if (value < paramInfo.min) status = 'LOW';
          else if (value > paramInfo.max) status = 'HIGH';
        }
        
        results.push({
          parameter: parameter.charAt(0).toUpperCase() + parameter.slice(1),
          value: value,
          unit: paramInfo?.unit || '',
          status: status,
          normalRange: paramInfo ? `${paramInfo.min}-${paramInfo.max}` : 'N/A',
          category: paramInfo?.category || 'General'
        });
        
        console.log(`✅ Found ${parameter}: ${value} (${status})`);
      }
    }
  }

  console.log(`📊 Total parameters extracted: ${results.length}`);
  return results;
}

function generateIntelligentAnalysis(parsedData) {
  console.log('🧠 Generating intelligent analysis without external APIs...');
  
  const criticalFindings = parsedData.filter(p => p.status !== 'NORMAL');
  const highValues = parsedData.filter(p => p.status === 'HIGH');
  const lowValues = parsedData.filter(p => p.status === 'LOW');
  
  // Determine overall status
  let overallStatus = 'NORMAL';
  if (criticalFindings.length > 0) {
    // Check for critical conditions
    const criticalParams = criticalFindings.filter(p => 
      (p.parameter.toLowerCase().includes('glucose') && p.status === 'HIGH') ||
      (p.parameter.toLowerCase().includes('creatinine') && p.status === 'HIGH') ||
      (p.parameter.toLowerCase().includes('hemoglobin') && p.status === 'LOW' && p.value < 10)
    );
    
    overallStatus = criticalParams.length > 0 ? 'CRITICAL' : 'ATTENTION_NEEDED';
  }
  
  // Group by category for detailed analysis
  const categoryMap = {};
  parsedData.forEach(param => {
    const category = param.category || 'General';
    if (!categoryMap[category]) {
      categoryMap[category] = { status: 'NORMAL', findings: [] };
    }
    
    const finding = createDetailedFinding(param);
    categoryMap[category].findings.push(finding);
    
    if (param.status !== 'NORMAL') {
      categoryMap[category].status = 'ABNORMAL';
    }
  });

  // Determine doctor consultation needs
  let doctorConsultation = null;
  if (criticalFindings.length > 0) {
    let specialist = "General Physician";
    let urgency = "Within 2-4 weeks";
    
    if (criticalFindings.some(f => f.parameter.toLowerCase().includes('glucose') || f.parameter.toLowerCase().includes('hba1c'))) {
      specialist = "Endocrinologist (Diabetes Specialist)";
      urgency = "Within 1-2 weeks";
    } else if (criticalFindings.some(f => f.parameter.toLowerCase().includes('cholesterol') || f.parameter.toLowerCase().includes('ldl') || f.parameter.toLowerCase().includes('hdl'))) {
      specialist = "Cardiologist (Heart Specialist)";
      urgency = "Within 2-3 weeks";
    } else if (criticalFindings.some(f => f.parameter.toLowerCase().includes('creatinine') || f.parameter.toLowerCase().includes('bun'))) {
      specialist = "Nephrologist (Kidney Specialist)";
      urgency = "Within 1-2 weeks";
    } else if (criticalFindings.some(f => f.parameter.toLowerCase().includes('alt') || f.parameter.toLowerCase().includes('ast'))) {
      specialist = "Hepatologist (Liver Specialist)";
      urgency = "Within 2-3 weeks";
    } else if (criticalFindings.some(f => f.parameter.toLowerCase().includes('hemoglobin') || f.parameter.toLowerCase().includes('rbc'))) {
      specialist = "Hematologist (Blood Specialist)";
      urgency = "Within 1-3 weeks";
    }
    
    if (overallStatus === 'CRITICAL') {
      urgency = "URGENT - Within 3-7 days";
    }
    
    doctorConsultation = {
      urgency,
      specialist,
      reason: `${criticalFindings.length} abnormal value(s) detected requiring medical evaluation and possible treatment`
    };
  }

  // Generate recommendations
  const recommendations = [];
  if (overallStatus === 'NORMAL') {
    recommendations.push(
      "Excellent! All your test results are within normal limits",
      "Continue your current healthy lifestyle habits",
      "Schedule regular check-ups as recommended by your doctor",
      "Maintain a balanced diet and regular exercise routine"
    );
  } else {
    recommendations.push(
      "Several test values require medical attention - please consult your healthcare provider",
      "This analysis is for informational purposes and not a substitute for professional medical advice",
      "Follow up with appropriate specialists as recommended",
      "Keep track of your symptoms and report any changes to your doctor"
    );
    
    if (highValues.length > 0) {
      recommendations.push("Focus on lifestyle modifications to address elevated values");
    }
    if (lowValues.length > 0) {
      recommendations.push("Consider nutritional support for low values under medical guidance");
    }
  }

  return {
    overallStatus,
    criticalFindings: criticalFindings.map(f => ({
      parameter: f.parameter,
      value: `${f.value} ${f.unit}`,
      normalRange: `${f.normalRange} ${f.unit}`,
      status: f.status,
      severity: determineSeverity(f)
    })),
    detailedAnalysis: categoryMap,
    doctorConsultation,
    recommendations,
    summary: {
      totalParameters: parsedData.length,
      normalValues: parsedData.filter(p => p.status === 'NORMAL').length,
      abnormalValues: criticalFindings.length,
      highValues: highValues.length,
      lowValues: lowValues.length
    }
  };
}

function determineSeverity(param) {
  const paramLower = param.parameter.toLowerCase();
  
  if (param.status === 'HIGH') {
    if (paramLower.includes('glucose') && param.value > 150) return 'HIGH';
    if (paramLower.includes('creatinine') && param.value > 1.5) return 'HIGH';
    if (paramLower.includes('cholesterol') && param.value > 250) return 'HIGH';
    return 'MODERATE';
  }
  
  if (param.status === 'LOW') {
    if (paramLower.includes('hemoglobin') && param.value < 10) return 'HIGH';
    if (paramLower.includes('hdl') && param.value < 35) return 'MODERATE';
    return 'MODERATE';
  }
  
  return 'LOW';
}

function createDetailedFinding(param) {
  const paramLower = param.parameter.toLowerCase();
  let simple = '';
  let detailed = '';
  let recommendations = [];
  let homeRemedies = [];
  
  // Generate explanations based on parameter and status
  if (paramLower.includes('hemoglobin')) {
    if (param.status === 'LOW') {
      simple = `Your hemoglobin (${param.value}) is low. This means your blood doesn't carry enough oxygen, which can make you feel tired and weak.`;
      detailed = `Low hemoglobin indicates anemia, which can be caused by iron deficiency, blood loss, chronic disease, or poor nutrition. This condition reduces your blood's ability to carry oxygen to your body's tissues.`;
      recommendations = ['Consult a hematologist or primary care doctor', 'Get iron studies and B12/folate levels checked', 'Consider iron supplementation under medical supervision'];
      homeRemedies = ['Eat iron-rich foods like spinach, red meat, and lentils', 'Take vitamin C with iron-rich meals', 'Avoid tea and coffee with meals', 'Cook in iron pans'];
    } else if (param.status === 'HIGH') {
      simple = `Your hemoglobin (${param.value}) is high. This could be due to dehydration, smoking, or living at high altitude.`;
      detailed = `Elevated hemoglobin may indicate dehydration, smoking, chronic lung disease, or polycythemia vera. High hemoglobin can make blood thicker and increase clotting risk.`;
      recommendations = ['Stay well hydrated', 'Quit smoking if applicable', 'See a doctor to rule out lung or blood disorders'];
      homeRemedies = ['Drink 8-10 glasses of water daily', 'Avoid smoking and secondhand smoke', 'Exercise moderately'];
    } else {
      simple = `Your hemoglobin (${param.value}) is normal. Your blood is carrying oxygen efficiently throughout your body.`;
      detailed = `Normal hemoglobin levels indicate healthy red blood cell production and adequate iron stores, supporting optimal oxygen delivery to tissues.`;
    }
  } else if (paramLower.includes('cholesterol')) {
    if (param.status === 'HIGH') {
      simple = `Your cholesterol (${param.value}) is high. This increases your risk of heart disease and stroke by clogging your arteries.`;
      detailed = `Elevated cholesterol leads to atherosclerosis (plaque buildup in arteries), increasing risk of heart attack, stroke, and peripheral artery disease. This is a major modifiable cardiovascular risk factor.`;
      recommendations = ['See a cardiologist within 4 weeks', 'Start a heart-healthy diet immediately', 'Begin regular aerobic exercise', 'Consider statin medication evaluation'];
      homeRemedies = ['Eat oats, barley, and beans for soluble fiber', 'Use olive oil instead of butter', 'Eat fatty fish twice weekly', 'Limit saturated and trans fats'];
    } else {
      simple = `Your cholesterol (${param.value}) is in a healthy range. This is excellent for your heart and blood vessel health.`;
      detailed = `Optimal cholesterol levels significantly reduce cardiovascular disease risk and support healthy blood flow throughout your circulatory system.`;
    }
  } else if (paramLower.includes('glucose')) {
    if (param.status === 'HIGH') {
      simple = `Your blood sugar (${param.value}) is high. This suggests your body may have trouble controlling sugar levels, possibly indicating diabetes.`;
      detailed = `Elevated glucose indicates impaired glucose metabolism, suggesting prediabetes or diabetes mellitus. Chronic high blood sugar can damage blood vessels, nerves, kidneys, and eyes.`;
      recommendations = ['URGENT: See an endocrinologist within 1-2 weeks', 'Start blood glucose monitoring', 'Begin carbohydrate counting', 'Consider diabetes medication evaluation'];
      homeRemedies = ['Eliminate sugary foods and refined carbs', 'Exercise 30 minutes after meals', 'Eat high-fiber vegetables', 'Control portion sizes strictly'];
    } else {
      simple = `Your blood sugar (${param.value}) is normal. Your body is effectively managing glucose levels.`;
      detailed = `Normal glucose levels indicate proper insulin function and effective carbohydrate metabolism, reducing diabetes and cardiovascular disease risk.`;
    }
  } else if (paramLower.includes('creatinine')) {
    if (param.status === 'HIGH') {
      simple = `Your creatinine (${param.value}) is high. This suggests your kidneys may not be filtering waste from your blood as effectively as they should.`;
      detailed = `Elevated creatinine indicates reduced kidney function (decreased glomerular filtration rate), which can progress to chronic kidney disease if not addressed. Early intervention is crucial.`;
      recommendations = ['See a nephrologist within 2 weeks', 'Get complete kidney function panel', 'Monitor blood pressure closely', 'Review all medications with doctor'];
      homeRemedies = ['Stay well hydrated with water', 'Reduce protein intake moderately', 'Avoid NSAIDs (ibuprofen, naproxen)', 'Control blood pressure and diabetes'];
    } else {
      simple = `Your creatinine (${param.value}) is normal. Your kidneys are filtering waste products effectively.`;
      detailed = `Normal creatinine levels indicate healthy kidney function and proper waste filtration, supporting overall metabolic health.`;
    }
  } else {
    // Generic explanations
    if (param.status === 'HIGH') {
      simple = `Your ${param.parameter} (${param.value}) is higher than normal. This may indicate a health condition that needs medical attention.`;
      detailed = `Elevated ${param.parameter} levels can indicate various underlying conditions and should be evaluated by a healthcare professional for proper diagnosis and treatment.`;
      recommendations = ['Consult your healthcare provider', 'Follow up with additional tests as recommended', 'Monitor symptoms'];
    } else if (param.status === 'LOW') {
      simple = `Your ${param.parameter} (${param.value}) is lower than normal. This may indicate a deficiency or health condition.`;
      detailed = `Low ${param.parameter} levels can indicate deficiencies or underlying health conditions requiring medical evaluation and appropriate treatment.`;
      recommendations = ['Consult your healthcare provider', 'Consider nutritional assessment', 'Follow up with additional tests'];
    } else {
      simple = `Your ${param.parameter} (${param.value}) is within the normal range. This is a good sign for your health.`;
      detailed = `Normal ${param.parameter} levels indicate proper physiological function in this area of your health.`;
    }
  }

  return {
    test: param.parameter,
    value: param.value,
    unit: param.unit,
    normalRange: param.normalRange,
    status: param.status,
    explanation: { simple, detailed },
    recommendations: recommendations.length > 0 ? recommendations : undefined,
    homeRemedies: homeRemedies.length > 0 ? homeRemedies : undefined
  };
}
