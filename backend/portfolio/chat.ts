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
      response = "Hello! I'm Aaron's AI assistant. I can tell you about Aaron George Abraham - a passionate Full-stack Developer and AI/ML Engineer from Bengaluru, India. He specializes in building secure, high-performance, and user-centric applications. What would you like to know about him?";
    } else if (message.includes("experience") || message.includes("work") || message.includes("job")) {
      response = "Aaron has impressive professional experience! He's currently a Lead Developer at CodezyeCyber (Jan 2025 - Present), architecting cybersecurity compliance tools with HubSpot CRM integration. Previously, he was Lead Developer at Innovitegra Solutions (Sep 2024 - Jul 2025), building facial matching systems with 95%+ accuracy for 10+ banking clients, reducing KYC time by 40%. He's also Founder of Fenox Digital Marketing (Oct 2023 - Present), scaling an SEO agency and boosting client conversions by 25%. He interned at ElimPay, optimizing blockchain payment systems and reducing transaction fees from 12% to 4%.";
    } else if (message.includes("skills") || message.includes("technology") || message.includes("tech")) {
      response = "Aaron is highly skilled across multiple domains! His core languages include Python, JavaScript, Java, and Solidity. He's expert in frameworks like React.js, Node.js, Flask, and Next.js. His AI/ML expertise includes TensorFlow, OpenCV, computer vision, and machine learning. He's proficient with cloud technologies (AWS), databases (PostgreSQL, MongoDB), DevOps tools (Docker, Git), and blockchain technologies. He also works with IoT, Arduino, Google Maps API, and various other cutting-edge technologies.";
    } else if (message.includes("projects") || message.includes("portfolio")) {
      response = "Aaron has worked on some incredible projects! His notable works include: 1) Web Vulnerability Scanner - An automated security assessment tool for detecting OWASP vulnerabilities, 2) MEDVISION-AI - A smart diagnostic platform for medical scan analysis, 3) EarthVision - Real-time environmental dashboard for sustainable agriculture, 4) Compliance and Sanctions Screening Platform for financial institutions, 5) Pulse City - Bengaluru live traffic dashboard, 6) FRMS - AI-powered fraud and risk management system, and 7) Multiple professional websites for various clients. All projects focus on solving real-world problems with cutting-edge technology.";
    } else if (message.includes("education") || message.includes("study") || message.includes("university")) {
      response = "Aaron is pursuing his B.Tech in Computer Science Engineering at Presidency University, Bengaluru (2022-2026), with an impressive CGPA of 8.23. He completed his XII from St. Joseph's PU College (2021) with 84% and X from United International School (2019) with 94%. He also has multiple certifications including Real-life Machine Learning and Data Science from Udemy, Advanced DSA from Udemy, and programming certifications from CodeChef in Python and Java.";
    } else if (message.includes("awards") || message.includes("achievements") || message.includes("recognition") || message.includes("hackathon")) {
      response = "Aaron has received numerous prestigious awards! Hackathon achievements include: Cybersecurity Track Winners at Haccverse'25 HACC Hackathon (2025), Special Prize Winner at FutureForge Hackathon (IEEE InC4) (2024), and active participation in multiple hackathons. Competition awards include First Place at Technovanza for Assistive Technology Project (2024), Top 6 Finalist in Intelligent Wheelchair Competition (2023), and Top 30 Finalist in Smart India Hackathon (College Level). He's also shown leadership by mentoring 50+ students for IPA and IPR teams for 2 years and organizing multiple events with Build Club.";
    } else if (message.includes("contact") || message.includes("reach") || message.includes("email") || message.includes("phone")) {
      response = "You can reach Aaron at Aarongeo1211@gmail.com or call him at +91 9972038886. He's based in Bengaluru, India. You can also connect with him on LinkedIn (linkedin.com/in/aaron-george-abraham-19b952256/) and GitHub (github.com/Aarongeo1211). He's always open to discussing new opportunities, collaborations, and innovative projects!";
    } else if (message.includes("ai") || message.includes("machine learning") || message.includes("ml")) {
      response = "Aaron is passionate about AI/ML! He's built facial matching systems with 95%+ accuracy for banking KYC, developed MEDVISION-AI for medical diagnostics using CNN models, created FRMS - an AI-powered fraud detection system, and built smart traffic management systems. His expertise includes TensorFlow, OpenCV, computer vision, deep learning, and real-time data processing. He's certified in Real-life Machine Learning and Data Science and constantly explores emerging AI technologies.";
    } else if (message.includes("cybersecurity") || message.includes("security")) {
      response = "Cybersecurity is one of Aaron's core strengths! He's currently working on cybersecurity compliance tools at CodezyeCyber and built an award-winning Web Vulnerability Scanner that detects OWASP Top 10 vulnerabilities like SQL injection and XSS. He won the Cybersecurity Track at Haccverse'25 HACC Hackathon and has developed compliance and sanctions screening platforms for financial institutions with enterprise-grade security standards.";
    } else if (message.includes("blockchain") || message.includes("web3")) {
      response = "Aaron has hands-on blockchain experience! During his internship at ElimPay, he optimized a blockchain-based payment system, successfully reducing transaction fees from 12% to 4%. He's proficient in Solidity, Web3.js, and Ethereum technologies. His blockchain expertise extends to building secure, scalable decentralized applications and smart contracts.";
    } else if (message.includes("leadership") || message.includes("team") || message.includes("mentor")) {
      response = "Aaron is a natural leader and mentor! He's mentored 50+ students for IPA and IPR teams for 2 years and has been actively involved with Build Club, organizing multiple events. As Founder of Fenox Digital Marketing, he scaled the SEO agency and boosted client conversions by 25%. He consistently demonstrates leadership in hackathons and technical projects, bringing teams together to create innovative solutions.";
    } else if (message.includes("location") || message.includes("where") || message.includes("based")) {
      response = "Aaron is based in Bengaluru, India. He's worked both remotely and on-site, collaborating with teams across different time zones and delivering high-quality solutions for clients worldwide. His projects span from local Bengaluru traffic solutions to international banking and healthcare systems.";
    } else if (message.includes("linkedin") || message.includes("github") || message.includes("social")) {
      response = "You can find Aaron on LinkedIn at linkedin.com/in/aaron-george-abraham-19b952256/ and on GitHub at github.com/Aarongeo1211. He regularly shares his projects, professional updates, and technical insights on these platforms. His GitHub showcases his diverse portfolio from AI/ML projects to full-stack applications!";
    } else if (message.includes("medvision") || message.includes("medical") || message.includes("healthcare")) {
      response = "MEDVISION-AI is one of Aaron's flagship projects! It's an AI-powered diagnostic platform designed to support doctors by providing rapid and explainable medical scan analysis. The platform bridges the accessibility gap in healthcare by offering intelligent tools that aid early diagnosis and patient understanding. It uses advanced computer vision and machine learning to analyze medical scans and provide actionable insights.";
    } else if (message.includes("vulnerability") || message.includes("scanner") || message.includes("owasp")) {
      response = "Aaron's Web Vulnerability Scanner is an award-winning automated security assessment tool! It's designed to detect and report common security vulnerabilities in web applications, including OWASP Top 10 vulnerabilities like SQL injection and XSS. Built with automation and developer usability in mind, it streamlines the process of identifying security flaws and helps developers strengthen web security during the development lifecycle.";
    } else if (message.includes("traffic") || message.includes("pulse city") || message.includes("bengaluru")) {
      response = "Pulse City is Aaron's innovative real-time traffic dashboard for Bengaluru! It's designed to assist commuters and emergency services by integrating live traffic, weather, air quality, and route optimization data for Bengaluru and nearby cities. The platform provides actionable insights for better urban mobility and emergency response, showcasing Aaron's ability to solve local problems with technology.";
    } else if (message.includes("fraud") || message.includes("frms") || message.includes("risk")) {
      response = "FRMS (Fraud and Risk Management System) is Aaron's comprehensive AI-powered platform for financial fraud detection! The system leverages advanced machine learning models and data analytics to identify suspicious activities in real-time, assess risks, and provide actionable insights to financial institutions. It demonstrates Aaron's expertise in building enterprise-grade AI solutions for critical business applications.";
    } else if (message.includes("earthvision") || message.includes("environmental") || message.includes("agriculture")) {
      response = "EarthVision is Aaron's real-time environmental dashboard designed to support sustainable agricultural practices! The platform delivers actionable environmental insights by leveraging live data collection and intelligent processing. It empowers farmers and agricultural professionals with climate-resilient decision-making tools, showcasing Aaron's commitment to using technology for environmental sustainability.";
    } else if (message.includes("fenox") || message.includes("seo") || message.includes("marketing")) {
      response = "Fenox Digital Marketing is Aaron's own SEO agency that he founded in October 2023! He successfully scaled the agency and boosted client conversions by 25% through optimized websites and automation. The company uses technologies like Next.js, Tailwind CSS, Google Tag Manager, Yoast SEO, and Cloudflare CDN to deliver exceptional digital marketing results for clients.";
    } else if (message.includes("cgpa") || message.includes("grades") || message.includes("academic")) {
      response = "Aaron has excellent academic performance! He's currently pursuing B.Tech CSE at Presidency University (2022-2026) with an impressive CGPA of 8.23. He completed his XII from St. Joseph's PU College with 84% and X from United International School with an outstanding 94%. His strong academic foundation complements his practical experience in software development and AI/ML.";
    } else if (message.includes("certifications") || message.includes("courses")) {
      response = "Aaron has multiple relevant certifications! He's completed Real-life Machine Learning and Data Science from Udemy, Advanced Data Structures and Algorithms (DSA) from Udemy, Learn Python from CodeChef, and Learn Java from CodeChef. These certifications demonstrate his commitment to continuous learning and staying updated with the latest technologies and best practices.";
    } else {
      response = "I'd be happy to tell you more about Aaron! You can ask me about his experience, skills, projects (like MEDVISION-AI, Web Vulnerability Scanner, FRMS, Pulse City), education, awards, certifications, or how to contact him. You can also ask about specific technologies he works with like AI/ML, cybersecurity, blockchain, or his leadership experience. What specific aspect of Aaron's background interests you most?";
    }

    return {
      response,
      timestamp: new Date(),
    };
  }
);
