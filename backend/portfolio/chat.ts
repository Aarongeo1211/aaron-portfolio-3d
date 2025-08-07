import { api } from "encore.dev/api";
import { secret } from "encore.dev/config";

const geminiApiKey = secret("GeminiAPIKey");

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

2. MEDVISION-AI (Flagship project)
   - AI-powered diagnostic platform for medical scan analysis
   - Features: ResNet45/EfficientNet for X-rays, AI Doctor Chatbot, triage system, scan comparison
   - Tech: React.js, FastAPI, Supabase, PyTorch, ResNet45, EfficientNet, OpenAI API, OpenCV

3. EarthVision
   - Real-time environmental dashboard for sustainable agriculture
   - Features: Precipitation monitoring, evapotranspiration analysis, drought index evaluation
   - Tech: React.js, Flask, OpenWeatherMap API, NASA EarthData, PostgreSQL, D3.js

4. Compliance and Sanctions Screening Platform
   - Secure platform for financial institutions
   - Features: Multi-role authentication, sanctions screening with Elasticsearch, audit logging
   - Tech: React.js, FastAPI, MongoDB, Elasticsearch, JWT, Material-UI, APScheduler

5. Pulse City - Bengaluru Traffic Dashboard
   - Real-time traffic management for Bengaluru
   - Features: Interactive maps, route optimization, weather/AQI integration
   - Tech: HTML, CSS (Bootstrap), JavaScript, Leaflet.js, TomTom API, OpenWeatherMap API

6. FRMS - Fraud and Risk Management System
   - AI-powered financial fraud detection platform
   - Features: Real-time detection, risk assessment, user behavior analytics, case management
   - Tech: Python, TensorFlow, Scikit-learn, FastAPI, React.js, PostgreSQL, Docker

7. Professional Websites Collection
   - Multiple client websites: rubcobangalore.com, careernxt.com, fitnesswithvikram.in, as-constructions.com
   - Features: Responsive design, SEO optimization, fast loading
   - Tech: Next.js, React.js, Tailwind CSS, Node.js, MongoDB, AWS, Cloudflare CDN

TECHNICAL SKILLS:
Languages: Python (95%), JavaScript (90%), Java (85%), Solidity (80%)
Frontend: React.js (90%), Next.js (85%), Tailwind CSS (85%)
Backend: Node.js (85%), Flask (88%)
AI/ML: TensorFlow (90%), OpenCV (85%), Machine Learning (88%), Computer Vision (87%)
Cloud: AWS (80%)
DevOps: Docker (75%), Git (85%)
Databases: PostgreSQL (80%), MongoDB (75%)
Blockchain: Web3.js (75%), Ethereum (75%)
Other: IoT (75%), Cybersecurity (85%), Google Maps API (80%), Arduino (70%)

ACHIEVEMENTS & AWARDS:
- Cybersecurity Track Winners - Haccverse'25 HACC Hackathon (2025)
- First Place - Technovanza: Assistive Technology Project (2024)
- Special Prize Winner - FutureForge Hackathon (IEEE InC4) (2024)
- Top 6 Finalist - Intelligent Wheelchair Competition (2023)
- Top 30 Finalist - Smart India Hackathon (College Level)

LEADERSHIP:
- Mentored 50+ students for IPA and IPR teams for 2 years
- Core Member of Build Club - Led workshops, organized events
- Boosted participation by 40% through mentoring and leadership

PERSONALITY & INTERESTS:
- Passionate about AI/ML and solving real-world problems
- Enjoys leading technical workshops and mentoring developers
- Active in hackathons and technical competitions
- Constantly exploring emerging technologies in blockchain, computer vision, and automated systems
- Committed to using technology for social good (healthcare, environment, security)

Always respond as Aaron's helpful AI assistant. Be knowledgeable, friendly, and provide detailed information about Aaron's work, projects, and expertise. If asked about something not covered in this context, politely redirect to topics you can help with about Aaron.
`;

async function callGeminiAPI(message: string): Promise<string> {
  try {
    const apiKey = geminiApiKey();
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${AARON_CONTEXT}\n\nUser question: ${message}\n\nPlease respond as Aaron's AI assistant with detailed, helpful information about Aaron. Keep responses conversational and informative.`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
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
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('Invalid response format from Gemini API');
    }
  } catch (error) {
    console.error('Gemini API error:', error);
    // Fallback to basic responses if Gemini fails
    return getFallbackResponse(message);
  }
}

function getFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
    return "Hello! I'm Aaron's AI assistant. I can tell you about Aaron George Abraham - a passionate Full-stack Developer and AI/ML Engineer from Bengaluru, India. He specializes in building secure, high-performance, and user-centric applications. What would you like to know about him?";
  } else if (lowerMessage.includes("experience") || lowerMessage.includes("work") || lowerMessage.includes("job")) {
    return "Aaron has impressive professional experience! He's currently a Lead Developer at CodezyeCyber (Jan 2025 - Present), architecting cybersecurity compliance tools with HubSpot CRM integration. Previously, he was Lead Developer at Innovitegra Solutions (Sep 2024 - Jul 2025), building facial matching systems with 95%+ accuracy for 10+ banking clients, reducing KYC time by 40%. He's also Founder of Fenox Digital Marketing (Oct 2023 - Present), scaling an SEO agency and boosting client conversions by 25%. He interned at ElimPay, optimizing blockchain payment systems and reducing transaction fees from 12% to 4%.";
  } else if (lowerMessage.includes("skills") || lowerMessage.includes("technology") || lowerMessage.includes("tech")) {
    return "Aaron is highly skilled across multiple domains! His core languages include Python (95%), JavaScript (90%), Java (85%), and Solidity (80%). He's expert in frameworks like React.js, Node.js, Flask, and Next.js. His AI/ML expertise includes TensorFlow, OpenCV, computer vision, and machine learning. He's proficient with cloud technologies (AWS), databases (PostgreSQL, MongoDB), DevOps tools (Docker, Git), and blockchain technologies. He also works with IoT, Arduino, Google Maps API, and various other cutting-edge technologies.";
  } else if (lowerMessage.includes("projects") || lowerMessage.includes("portfolio")) {
    return "Aaron has worked on some incredible projects! His notable works include: 1) Web Vulnerability Scanner - An automated security assessment tool for detecting OWASP vulnerabilities, 2) MEDVISION-AI - A smart diagnostic platform for medical scan analysis, 3) EarthVision - Real-time environmental dashboard for sustainable agriculture, 4) Compliance and Sanctions Screening Platform for financial institutions, 5) Pulse City - Bengaluru live traffic dashboard, 6) FRMS - AI-powered fraud and risk management system, and 7) Multiple professional websites for various clients. All projects focus on solving real-world problems with cutting-edge technology.";
  } else if (lowerMessage.includes("contact") || lowerMessage.includes("reach") || lowerMessage.includes("email") || lowerMessage.includes("phone")) {
    return "You can reach Aaron at Aarongeo1211@gmail.com or call him at +91 9972038886. He's based in Bengaluru, India. You can also connect with him on LinkedIn (linkedin.com/in/aaron-george-abraham-19b952256/) and GitHub (github.com/Aarongeo1211). He's always open to discussing new opportunities, collaborations, and innovative projects!";
  } else {
    return "I'd be happy to tell you more about Aaron! You can ask me about his experience, skills, detailed project information (like MEDVISION-AI with ResNet45/EfficientNet, Web Vulnerability Scanner with YAML configs, FRMS with real-time fraud detection, Pulse City with TomTom integration), education, awards, certifications, or how to contact him. You can also ask about specific technologies he works with like AI/ML, cybersecurity, blockchain, or his leadership experience. What specific aspect of Aaron's background interests you most?";
  }
}

// Processes a chat message and returns an AI response about Aaron.
export const chat = api<ChatRequest, ChatResponse>(
  { expose: true, method: "POST", path: "/chat" },
  async (req) => {
    let response: string;
    
    try {
      // Try to use Gemini API for more intelligent responses
      response = await callGeminiAPI(req.message);
    } catch (error) {
      console.error('Failed to get Gemini response, using fallback:', error);
      response = getFallbackResponse(req.message);
    }

    return {
      response,
      timestamp: new Date(),
    };
  }
);
