import { api } from "encore.dev/api";

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

// Processes a chat message and returns an AI response about Aaron.
export const chat = api<ChatRequest, ChatResponse>(
  { expose: true, method: "POST", path: "/chat" },
  async (req) => {
    const message = req.message.toLowerCase();
    let response = "";

    // Simple keyword-based responses about Aaron
    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
      response = "Hello! I'm Aaron's AI assistant. I can tell you about Aaron George Abraham - a passionate Software Developer and AI/ML Engineer. What would you like to know about him?";
    } else if (message.includes("experience") || message.includes("work") || message.includes("job")) {
      response = "Aaron has impressive professional experience! He's currently a Freelance Lead Developer at CodezyeCyber, where he's architecting cybersecurity compliance tools. Previously, he worked at Innovitegra Solutions building facial matching systems with 95%+ accuracy for banking clients, reducing KYC time by 40%. He's also Co-Founder of Fenox Digital Marketing and interned at ElimPay working on blockchain payment systems.";
    } else if (message.includes("skills") || message.includes("technology") || message.includes("tech")) {
      response = "Aaron is highly skilled across multiple domains! His expertise includes Python (95%), JavaScript (90%), Java (85%), React.js, Node.js, TensorFlow, OpenCV, AWS, Docker, and PostgreSQL. He specializes in AI/ML, cybersecurity, full-stack development, and cloud technologies.";
    } else if (message.includes("projects") || message.includes("portfolio")) {
      response = "Aaron has worked on some amazing projects! His notable works include a Smart Traffic Management System using AI to detect ambulances, an award-winning Web Vulnerability Scanner for OWASP Top 10 vulnerabilities, MedVision AI for medical scan analysis, and facial matching systems for banking KYC. All projects focus on solving real-world problems with cutting-edge technology.";
    } else if (message.includes("education") || message.includes("study") || message.includes("university")) {
      response = "Aaron is pursuing his B.Tech in Computer Science Engineering at Presidency University, Bengaluru, with an impressive CGPA of 8.23. He completed his XII from St. Joseph's PU College with 84% and X from United International School with 94%.";
    } else if (message.includes("awards") || message.includes("achievements") || message.includes("recognition")) {
      response = "Aaron has received several prestigious awards! He won the Cybersecurity Track at Haccverse'25 HACC Hackathon, secured First Place at Technovanza (2024), received a Special Prize at FutureForge Hackathon (IEEE InC4), and was a Top 6 Finalist in the Intelligent Wheelchair Competition (2024). He's also a Core Member of Build Club, leading workshops for 50+ students.";
    } else if (message.includes("contact") || message.includes("reach") || message.includes("email") || message.includes("phone")) {
      response = "You can reach Aaron at aarongeo1211@gmail.com or call him at +91 9972038886. He's based in Bengaluru, India. You can also connect with him on LinkedIn (linkedin.com/in/aaron-george-abraham-19b952256/) and GitHub (github.com/Aarongeo1211) - he's always open to discussing new opportunities and collaborations!";
    } else if (message.includes("ai") || message.includes("machine learning") || message.includes("ml")) {
      response = "Aaron is passionate about AI/ML! He's built facial matching systems with 95%+ accuracy, developed MedVision AI for medical diagnostics using CNN models, and created smart traffic management systems. His expertise includes TensorFlow, OpenCV, computer vision, and deep learning technologies.";
    } else if (message.includes("cybersecurity") || message.includes("security")) {
      response = "Cybersecurity is one of Aaron's core strengths! He's currently working on cybersecurity compliance tools at CodezyeCyber and built an award-winning Web Vulnerability Scanner that detects OWASP Top 10 vulnerabilities like SQL injection and XSS. He won the Cybersecurity Track at Haccverse'25 HACC Hackathon.";
    } else if (message.includes("blockchain") || message.includes("web3")) {
      response = "Aaron has hands-on blockchain experience! During his internship at ElimPay, he optimized a blockchain-based payment system, successfully reducing transaction fees from 12% to 4%. He worked with Solidity, Web3.js, and Ethereum technologies.";
    } else if (message.includes("leadership") || message.includes("team") || message.includes("mentor")) {
      response = "Aaron is a natural leader! As a Core Member of Build Club, he led workshops for 50+ students and mentored 20+ students in their projects, boosting participation by 40%. He's also Co-Founder of Fenox Digital Marketing, where he scaled the SEO agency and boosted client conversions by 25%.";
    } else if (message.includes("location") || message.includes("where") || message.includes("based")) {
      response = "Aaron is based in Bengaluru, India. He's worked both remotely and on-site, collaborating with teams across different time zones and delivering high-quality solutions for clients worldwide.";
    } else if (message.includes("linkedin") || message.includes("github") || message.includes("social")) {
      response = "You can find Aaron on LinkedIn at linkedin.com/in/aaron-george-abraham-19b952256/ and on GitHub at github.com/Aarongeo1211. He regularly shares his projects and professional updates on these platforms!";
    } else {
      response = "I'd be happy to tell you more about Aaron! You can ask me about his experience, skills, projects, education, awards, or how to contact him. What specific aspect of Aaron's background interests you most?";
    }

    return {
      response,
      timestamp: new Date(),
    };
  }
);
