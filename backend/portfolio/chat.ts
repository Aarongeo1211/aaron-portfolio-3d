import { api } from "encore.dev/api";
import { secret } from "encore.dev/config";

const geminiApiKey = secret("GEMINI_API_KEY");

export interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
}

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  response: string;
  timestamp: Date;
}

// Aaron's comprehensive information for AI context
const AARON_CONTEXT = `
You are Aaron George Abraham's AI assistant. Here is comprehensive information about Aaron:

PERSONAL INFO:
- Name: Aaron George Abraham
- Location: Bengaluru, India
- Phone: +91 9972038886
- Email: Aarongeo1211@gmail.com
- LinkedIn: linkedin.com/in/aaron-george-abraham-19b952256/
- GitHub: github.com/Aarongeo1211
- Portfolio Website: aarongeo.netlify.app
- Role: Full-stack Developer & AI/ML Engineer

EDUCATION:
- B.Tech Computer Science Engineering, Presidency University, Bengaluru (2022-2026) - CGPA: 8.23
- XII from St. Joseph's PU College (2021) - 84%
- X from United International School (2019) - 94%

CERTIFICATIONS:
- Real-life Machine Learning and Data Science (Udemy)
- Advanced Data Structures and Algorithms (Udemy)
- Learn Python (CodeChef)
- Learn Java (CodeChef)

CURRENT WORK EXPERIENCE:
1. Lead Developer at CodezyeCyber (Jan 2025 - Present)
   - Architecting Cybersecurity Compliance Tool
   - Integrating HubSpot CRM to automate lead management
   - Tech: Python, Flask, React.js, Node.js, AWS, HubSpot API, PostgreSQL

2. Lead Developer at Innovitegra Solutions (Sep 2024 - Jul 2025)
   - Built facial matching systems with 95%+ accuracy for 10+ banking clients
   - Reduced KYC time by 40% and false positives by 30%
   - Tech: OpenCV, TensorFlow, Tesseract OCR, Python, AWS, Docker

3. Founder at Fenox Digital Marketing (Oct 2023 - Present)
   - Scaled SEO agency, boosting client conversions by 25%
   - Tech: Next.js, Tailwind CSS, Google Tag Manager, Yoast SEO, Cloudflare CDN

4. Intern at ElimPay (June 2023 - July 2023)
   - Optimized blockchain-based payment system
   - Reduced transaction fees from 12% to 4%
   - Tech: Solidity, Web3.js, Node.js, React.js, Ethereum

MAJOR PROJECTS:

1. Web Vulnerability Scanner (Award-winning)
   - Automated security assessment tool for detecting OWASP vulnerabilities
   - Features: XSS, SQL Injection detection, custom YAML payload support, multi-threading
   - Tech: Python, BeautifulSoup, Requests, Multi-threading, YAML
   - Won Cybersecurity Track at Haccverse'25 HACC Hackathon

2. MEDVISION-AI (Flagship project)
   - AI-powered diagnostic platform for medical scan analysis
   - Features: ResNet45/EfficientNet for X-rays, AI Doctor Chatbot, triage system, scan comparison
   - Tech: React.js, FastAPI, Supabase, PyTorch, ResNet45, EfficientNet, OpenAI API, OpenCV
   - Bridges accessibility gap in healthcare with intelligent diagnostic tools

3. EarthVision
   - Real-time environmental dashboard for sustainable agriculture
   - Features: Precipitation monitoring, evapotranspiration analysis, drought index evaluation
   - Tech: React.js, Flask, OpenWeatherMap API, NASA EarthData, PostgreSQL, D3.js
   - Empowers farmers with climate-resilient decision-making tools

4. Compliance and Sanctions Screening Platform
   - Secure platform for financial institutions
   - Features: Multi-role authentication, sanctions screening with Elasticsearch, audit logging
   - Tech: React.js, FastAPI, MongoDB, Elasticsearch, JWT, Material-UI, APScheduler
   - Ensures regulatory compliance through intelligent user management

5. Pulse City - Bengaluru Traffic Dashboard
   - Real-time traffic management for Bengaluru
   - Features: Interactive maps, route optimization, weather/AQI integration
   - Tech: HTML, CSS (Bootstrap), JavaScript, Leaflet.js, TomTom API, OpenWeatherMap API
   - Assists commuters and emergency services with live traffic data

6. FRMS - Fraud and Risk Management System
   - AI-powered financial fraud detection platform
   - Features: Real-time detection, risk assessment, user behavior analytics, case management
   - Tech: Python, TensorFlow, Scikit-learn, FastAPI, React.js, PostgreSQL, Docker
   - Comprehensive platform for detecting and preventing financial fraud

7. Professional Websites Collection
   - Multiple client websites: rubcobangalore.com, careernxt.com, fitnesswithvikram.in, as-constructions.com
   - Features: Responsive design, SEO optimization, fast loading
   - Tech: Next.js, React.js, Tailwind CSS, Node.js, MongoDB, AWS, Cloudflare CDN
   - Showcases expertise in full-stack development and modern web technologies

8. Smart Traffic Management System
   - AI-powered system to detect ambulances and adjust traffic lights for emergency response
   - Tech: Python, TensorFlow, OpenCV, Tesseract OCR, IoT
   - Uses computer vision and IoT integration for emergency response

9. Facial Matching System for Banking KYC
   - Banking KYC system with 95%+ accuracy for identity verification
   - Reduced processing time by 40% and false positives by 30%
   - Tech: OpenCV, TensorFlow, Python, AWS, Docker
   - Implemented for 10+ banking clients at Innovitegra Solutions

TECHNICAL SKILLS:
Languages: Python (95%), JavaScript (90%), Java (85%), Solidity (80%)
Frontend: React.js (90%), Next.js (85%), Tailwind CSS (85%), HTML5, CSS3
Backend: Node.js (85%), Flask (88%), FastAPI
AI/ML: TensorFlow (90%), OpenCV (85%), Machine Learning (88%), Computer Vision (87%), PyTorch, ResNet45, EfficientNet
Cloud: AWS (80%)
DevOps: Docker (75%), Git (85%)
Databases: PostgreSQL (80%), MongoDB (75%), Supabase
Blockchain: Web3.js (75%), Ethereum (75%), Smart Contracts
APIs: REST APIs, OpenAI API, Google Maps API (80%), TomTom API, OpenWeatherMap API, HubSpot API (75)
Tools: Arduino (70%), Google Tag Manager (70), Yoast SEO, Cloudflare CDN (70%), Elasticsearch, Material-UI, APScheduler
Security: Cybersecurity (85%), OWASP vulnerabilities, Security Testing, JWT authentication
Other: IoT (75%), Tesseract OCR (75%), D3.js, NASA EarthData, BeautifulSoup, Multi-threading, YAML

ACHIEVEMENTS & AWARDS:
- Cybersecurity Track Winners - Haccverse'25 HACC Hackathon (2025)
- First Place - Technovanza: Assistive Technology Project (2024)
- Special Prize Winner - FutureForge Hackathon (IEEE InC4) (2024)
- Top 6 Finalist - Intelligent Wheelchair Competition (2023)
- Top 30 Finalist - Smart India Hackathon (College Level)

LEADERSHIP & COMMUNITY:
- Mentored 50+ students for IPA and IPR teams for 2 years
- Core Member of Build Club - Led workshops, organized events
- Boosted participation by 40% through mentoring and leadership
- Participated and organized multiple events with Build Club
- Active participant in multiple hackathons with consistent strong performance

PERSONALITY & INTERESTS:
- Passionate about AI/ML and solving real-world problems
- Enjoys leading technical workshops and mentoring developers
- Active in hackathons and technical competitions
- Constantly exploring emerging technologies in blockchain, computer vision, and automated systems
- Committed to using technology for social good (healthcare, environment, security)
- Dynamic and results-driven with proven expertise in computer vision, cybersecurity, and full-stack development
- Excels in creating secure, scalable solutions from facial recognition systems to AI-powered diagnostic tools
- Leverages artificial intelligence and machine learning to solve complex real-world challenges

PORTFOLIO HIGHLIGHTS:
- Current portfolio website: aarongeo.netlify.app
- GitHub showcases diverse portfolio from AI/ML projects to full-stack applications
- Built production-ready systems improving efficiency by 40% and reducing false positives by 30%
- Demonstrated success in developing applications that improve operational efficiency and reduce processing errors
- Experience spans from local Bengaluru traffic solutions to international banking and healthcare systems
- Worked both remotely and on-site, collaborating with teams across different time zones

Always respond as Aaron's helpful AI assistant. Be knowledgeable, friendly, and provide detailed information about Aaron's work, projects, and expertise. Reference his portfolio website aarongeo.netlify.app when appropriate. If asked about something not covered in this context, politely redirect to topics you can help with about Aaron.
`;

async function callGeminiAPI(message: string): Promise<string> {
  let apiKey: string;
  
  try {
    apiKey = geminiApiKey();
  } catch (error) {
    console.error('Gemini API key not configured:', error);
    throw new Error('API key not available');
  }
  
  // Check if API key is available and not empty
  if (!apiKey || apiKey.trim() === '' || apiKey === 'undefined') {
    console.error('Gemini API key is empty or undefined');
    throw new Error('API key not configured');
  }

  try {
    const requestBody = {
      contents: [{
        parts: [{
          text: `${AARON_CONTEXT}\n\nUser question: ${message}\n\nPlease respond as Aaron's AI assistant with detailed, helpful information about Aaron. Keep responses conversational and informative. When relevant, mention his portfolio website aarongeo.netlify.app.`
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    };

    console.log('Making Gemini API request...');
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Gemini API error: ${response.status} - ${response.statusText}`, errorText);
      
      // Parse error response for more details
      try {
        const errorData = JSON.parse(errorText);
        const errorMessage = errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`;
        throw new Error(`Gemini API error: ${errorMessage}`);
      } catch (parseError) {
        throw new Error(`Gemini API error: ${response.status} - ${response.statusText} - ${errorText}`);
      }
    }

    const data = await response.json();
    console.log('Gemini API response received');
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
      return data.candidates[0].content.parts[0].text;
    } else {
      console.error('Invalid Gemini API response format:', JSON.stringify(data, null, 2));
      
      // Check for safety filter blocks
      if (data.candidates && data.candidates[0] && data.candidates[0].finishReason === 'SAFETY') {
        throw new Error('Response blocked by Gemini safety filters');
      }
      
      // Check for other finish reasons
      if (data.candidates && data.candidates[0] && data.candidates[0].finishReason) {
        throw new Error(`Gemini API finished with reason: ${data.candidates[0].finishReason}`);
      }
      
      throw new Error('Invalid response format from Gemini API');
    }
  } catch (error) {
    console.error('Gemini API call failed:', error);
    throw error;
  }
}

function getFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
    return "Hello! I'm Aaron's AI assistant. I can tell you about Aaron George Abraham - a passionate Full-stack Developer and AI/ML Engineer from Bengaluru, India. He specializes in building secure, high-performance, and user-centric applications. You can also check out his portfolio at aarongeo.netlify.app. What would you like to know about him?";
  } else if (lowerMessage.includes("experience") || lowerMessage.includes("work") || lowerMessage.includes("job")) {
    return "Aaron has impressive professional experience! He's currently a Lead Developer at CodezyeCyber (Jan 2025 - Present), architecting cybersecurity compliance tools with HubSpot CRM integration. Previously, he was Lead Developer at Innovitegra Solutions (Sep 2024 - Jul 2025), building facial matching systems with 95%+ accuracy for 10+ banking clients, reducing KYC time by 40%. He's also Founder of Fenox Digital Marketing (Oct 2023 - Present), scaling an SEO agency and boosting client conversions by 25%. He interned at ElimPay, optimizing blockchain payment systems and reducing transaction fees from 12% to 4%. You can see more details on his portfolio at aarongeo.netlify.app.";
  } else if (lowerMessage.includes("skills") || lowerMessage.includes("technology") || lowerMessage.includes("tech")) {
    return "Aaron is highly skilled across multiple domains! His core languages include Python (95%), JavaScript (90%), Java (85%), and Solidity (80%). He's expert in frameworks like React.js, Node.js, Flask, and Next.js. His AI/ML expertise includes TensorFlow, OpenCV, computer vision, and machine learning. He's proficient with cloud technologies (AWS), databases (PostgreSQL, MongoDB), DevOps tools (Docker, Git), and blockchain technologies. He also works with IoT, Arduino, Google Maps API, and various other cutting-edge technologies. Check out his full skill set at aarongeo.netlify.app.";
  } else if (lowerMessage.includes("projects") || lowerMessage.includes("portfolio")) {
    return "Aaron has worked on some incredible projects! His notable works include: 1) Web Vulnerability Scanner - An award-winning automated security assessment tool, 2) MEDVISION-AI - A smart diagnostic platform for medical scan analysis, 3) EarthVision - Real-time environmental dashboard for sustainable agriculture, 4) Compliance and Sanctions Screening Platform for financial institutions, 5) Pulse City - Bengaluru live traffic dashboard, 6) FRMS - AI-powered fraud and risk management system, and 7) Multiple professional websites for various clients. All projects focus on solving real-world problems with cutting-edge technology. You can explore all his projects in detail at aarongeo.netlify.app.";
  } else if (lowerMessage.includes("contact") || lowerMessage.includes("reach") || lowerMessage.includes("email") || lowerMessage.includes("phone")) {
    return "You can reach Aaron at Aarongeo1211@gmail.com or call him at +91 9972038886. He's based in Bengaluru, India. You can also connect with him on LinkedIn (linkedin.com/in/aaron-george-abraham-19b952256/) and GitHub (github.com/Aarongeo1211). His portfolio website is aarongeo.netlify.app. He's always open to discussing new opportunities, collaborations, and innovative projects!";
  } else if (lowerMessage.includes("website") || lowerMessage.includes("portfolio") || lowerMessage.includes("netlify")) {
    return "Aaron's portfolio website is aarongeo.netlify.app! It showcases his work as a Full-stack Developer and AI/ML Engineer, featuring his projects, experience, skills, and achievements. The website demonstrates his expertise in building modern, responsive web applications and highlights his journey from cybersecurity to AI/ML development. You can explore his detailed project descriptions, technical skills, and professional accomplishments there.";
  } else if (lowerMessage.includes("awards") || lowerMessage.includes("achievements") || lowerMessage.includes("recognition") || lowerMessage.includes("hackathon")) {
    return "Aaron has received numerous prestigious awards! Hackathon achievements include: Cybersecurity Track Winners at Haccverse'25 HACC Hackathon (2025), Special Prize Winner at FutureForge Hackathon (IEEE InC4) (2024), and active participation in multiple hackathons. Competition awards include First Place at Technovanza for Assistive Technology Project (2024), Top 6 Finalist in Intelligent Wheelchair Competition (2023), and Top 30 Finalist in Smart India Hackathon (College Level). He's also shown leadership by mentoring 50+ students for IPA and IPR teams for 2 years and organizing multiple events with Build Club.";
  } else if (lowerMessage.includes("ai") || lowerMessage.includes("machine learning") || lowerMessage.includes("ml")) {
    return "Aaron is passionate about AI/ML! He's built facial matching systems with 95%+ accuracy for banking KYC, developed MEDVISION-AI for medical diagnostics using CNN models, created FRMS - an AI-powered fraud detection system, and built smart traffic management systems. His expertise includes TensorFlow, OpenCV, computer vision, deep learning, and real-time data processing. He's certified in Real-life Machine Learning and Data Science and constantly explores emerging AI technologies.";
  } else if (lowerMessage.includes("cybersecurity") || lowerMessage.includes("security")) {
    return "Cybersecurity is one of Aaron's core strengths! He's currently working on cybersecurity compliance tools at CodezyeCyber and built an award-winning Web Vulnerability Scanner that detects OWASP Top 10 vulnerabilities like SQL injection and XSS. He won the Cybersecurity Track at Haccverse'25 HACC Hackathon and has developed compliance and sanctions screening platforms for financial institutions with enterprise-grade security standards.";
  } else if (lowerMessage.includes("blockchain") || lowerMessage.includes("web3")) {
    return "Aaron has hands-on blockchain experience! During his internship at ElimPay, he optimized a blockchain-based payment system, successfully reducing transaction fees from 12% to 4%. He's proficient in Solidity, Web3.js, and Ethereum technologies. His blockchain expertise extends to building secure, scalable decentralized applications and smart contracts.";
  } else if (lowerMessage.includes("education") || lowerMessage.includes("study") || lowerMessage.includes("university")) {
    return "Aaron is pursuing his B.Tech in Computer Science Engineering at Presidency University, Bengaluru (2022-2026), with an impressive CGPA of 8.23. He completed his XII from St. Joseph's PU College (2021) with 84% and X from United International School (2019) with 94%. He also has multiple certifications including Real-life Machine Learning and Data Science from Udemy, Advanced DSA from Udemy, and programming certifications from CodeChef in Python and Java.";
  } else if (lowerMessage.includes("medvision") || lowerMessage.includes("medical") || lowerMessage.includes("healthcare")) {
    return "MEDVISION-AI is one of Aaron's flagship projects! It's an AI-powered diagnostic platform designed to support doctors by providing rapid and explainable medical scan analysis. Key features include: AI-Based Scan Interpretation for X-rays and breast ultrasounds using ResNet45 and EfficientNet, an AI Doctor Chatbot that explains findings in patient-friendly language, a Triage System for critical conditions, Scan Comparison Tool for tracking progression, and Segmentation & Heatmap Analysis using attention maps. Built with React.js, FastAPI, Supabase, PyTorch, and OpenAI API.";
  } else if (lowerMessage.includes("vulnerability") || lowerMessage.includes("scanner") || lowerMessage.includes("owasp")) {
    return "Aaron's Web Vulnerability Scanner is an award-winning automated security assessment tool! It's lightweight yet powerful, designed to detect common threats like XSS, SQL Injection, and missing security headers. Key features include Custom Payload Support using YAML configuration, Website Crawling with BeautifulSoup and multi-threading, and Severity-Based Reports with actionable recommendations. Built with Python, BeautifulSoup, Requests, and multi-threading for efficient vulnerability detection during the development lifecycle.";
  } else if (lowerMessage.includes("traffic") || lowerMessage.includes("pulse city") || lowerMessage.includes("bengaluru")) {
    return "Pulse City is Aaron's innovative real-time traffic dashboard for Bengaluru! It assists commuters and emergency services with features like Interactive Map using Leaflet with TomTom overlays, Route Optimization with multi-route suggestions, Live Traffic Data with color-coded delay indicators, Weather & AQI integration via OpenWeatherMap, and Emergency Services mapping. Built with HTML, CSS (Bootstrap), JavaScript, Leaflet.js, TomTom API, and OpenWeatherMap API for comprehensive urban mobility solutions.";
  } else if (lowerMessage.includes("fraud") || lowerMessage.includes("frms") || lowerMessage.includes("risk")) {
    return "FRMS (Fraud and Risk Management System) is Aaron's comprehensive AI-powered platform for financial fraud detection! Key features include Real-time Fraud Detection using machine learning algorithms, Risk Assessment Engine providing transaction scores, User Behavior Analytics for anomaly detection, Case Management System for fraud analysts, Customizable Rule Engine, and detailed Reporting and Analytics. Built with Python, TensorFlow, Scikit-learn, FastAPI, React.js, PostgreSQL, and Docker for enterprise-grade fraud prevention.";
  } else if (lowerMessage.includes("earthvision") || lowerMessage.includes("environmental") || lowerMessage.includes("agriculture")) {
    return "EarthVision is Aaron's real-time environmental dashboard for sustainable agriculture! It empowers farmers with features like Precipitation Monitoring for irrigation optimization, Evapotranspiration Analysis for water efficiency, Humidity Tracking for plant health, Rainfall Insights for field-level decisions, and Drought Index Evaluation for proactive strategies. Built with React.js, Flask, OpenWeatherMap API, NASA EarthData, PostgreSQL, and D3.js for climate-resilient agricultural decision-making.";
  } else if (lowerMessage.includes("compliance") || lowerMessage.includes("sanctions") || lowerMessage.includes("screening")) {
    return "Aaron's Compliance and Sanctions Screening Platform is a secure, role-based system for financial institutions! Features include Multi-role Authentication (Super Admin, Institution Admin, User), Sanctions Screening using fuzzy search and Elasticsearch against OFAC and UN lists, User & Institution Management with role-based controls, Audit Logging for compliance tracking, and Session Security with JWT authentication. Built with React.js, FastAPI, MongoDB, Elasticsearch, JWT, Material-UI, and APScheduler.";
  } else if (lowerMessage.includes("websites") || lowerMessage.includes("client") || lowerMessage.includes("rubco") || lowerMessage.includes("careernxt") || lowerMessage.includes("fitness")) {
    return "Aaron has built multiple professional websites for various clients! Notable projects include rubcobangalore.com (corporate business website), careernxt.com (career platform with job listings), fitnesswithvikram.in (fitness coaching website), and as-constructions.com (construction company portfolio). All feature custom responsive designs, SEO optimization, fast loading times, and secure hosting. Built with Next.js, React.js, Tailwind CSS, Node.js, MongoDB, AWS, and Cloudflare CDN.";
  } else if (lowerMessage.includes("fenox") || lowerMessage.includes("seo") || lowerMessage.includes("marketing")) {
    return "Fenox Digital Marketing is Aaron's own SEO agency that he founded in October 2023! He successfully scaled the agency and boosted client conversions by 25% through optimized websites and automation. The company uses technologies like Next.js, Tailwind CSS, Google Tag Manager, Yoast SEO, and Cloudflare CDN to deliver exceptional digital marketing results for clients.";
  } else if (lowerMessage.includes("leadership") || lowerMessage.includes("team") || lowerMessage.includes("mentor")) {
    return "Aaron is a natural leader and mentor! He's mentored 50+ students for IPA and IPR teams for 2 years and has been actively involved with Build Club, organizing multiple events. As Founder of Fenox Digital Marketing, he scaled the SEO agency and boosted client conversions by 25%. He consistently demonstrates leadership in hackathons and technical projects, bringing teams together to create innovative solutions.";
  } else {
    return "I'd be happy to tell you more about Aaron! You can ask me about his experience, skills, detailed project information (like MEDVISION-AI with ResNet45/EfficientNet, Web Vulnerability Scanner with YAML configs, FRMS with real-time fraud detection, Pulse City with TomTom integration), education, awards, certifications, or how to contact him. You can also visit his portfolio website at aarongeo.netlify.app to see his complete work. What specific aspect of Aaron's background interests you most?";
  }
}

// Processes a chat message and returns an AI response about Aaron.
export const chat = api<ChatRequest, ChatResponse>(
  { expose: true, method: "POST", path: "/chat" },
  async (req) => {
    let response: string;
    let usedGemini = false;
    
    try {
      console.log('Attempting to use Gemini API...');
      response = await callGeminiAPI(req.message);
      usedGemini = true;
      console.log('Successfully used Gemini API');
    } catch (error) {
      console.error('Gemini API failed, using fallback response:', error);
      response = getFallbackResponse(req.message);
    }

    console.log(`Response generated using ${usedGemini ? 'Gemini AI' : 'fallback system'}`);

    return {
      response,
      timestamp: new Date(),
    };
  }
);
