CREATE TABLE contacts (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE projects (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tech_stack TEXT[] NOT NULL,
  github_url TEXT,
  demo_url TEXT,
  image_url TEXT,
  category TEXT NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE skills (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  proficiency INTEGER NOT NULL CHECK (proficiency >= 1 AND proficiency <= 100),
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE experiences (
  id BIGSERIAL PRIMARY KEY,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  description TEXT NOT NULL,
  tech_stack TEXT[] NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert comprehensive project data with detailed descriptions
INSERT INTO projects (title, description, tech_stack, github_url, category, featured) VALUES
('Web Vulnerability Scanner', 'A lightweight yet powerful tool designed to detect and report common security vulnerabilities in web applications. Built with automation and developer usability in mind, it streamlines the process of identifying flaws that could lead to potential breaches. Key features include vulnerability detection for XSS, SQL Injection, and missing security headers, custom payload support using YAML configuration, website crawling with BeautifulSoup and multi-threading, and severity-based reports with actionable recommendations.', ARRAY['Python', 'BeautifulSoup', 'Requests', 'Multi-threading', 'YAML', 'Security Testing'], 'https://github.com/Aarongeo1211', 'Cybersecurity', true),
('MEDVISION-AI', 'An AI-powered diagnostic platform designed to support doctors by providing rapid and explainable medical scan analysis. It bridges the accessibility gap in healthcare by offering intelligent tools that aid early diagnosis and patient understanding. Features include AI-based scan interpretation for X-rays and breast ultrasounds using ResNet45 and EfficientNet, AI Doctor Chatbot for patient-friendly explanations, triage system for critical conditions, scan comparison tool for tracking progression, segmentation & heatmap analysis using attention maps, and multimodal integration combining visual insights with LLM-generated reports.', ARRAY['React.js', 'FastAPI', 'Supabase', 'PyTorch', 'ResNet45', 'EfficientNet', 'OpenAI API', 'OpenCV'], 'https://github.com/Aarongeo1211', 'AI/ML', true),
('EarthVision', 'A real-time data platform designed to support sustainable agricultural practices by delivering actionable environmental insights. Built to empower farmers and agricultural professionals, the system leverages live data collection and intelligent processing to assist in climate-resilient decision-making. Features include precipitation monitoring for irrigation optimization, evapotranspiration analysis for water efficiency, humidity tracking for plant health, rainfall insights for field-level decisions, and drought index evaluation for proactive strategies.', ARRAY['React.js', 'Flask', 'OpenWeatherMap API', 'NASA EarthData', 'PostgreSQL', 'D3.js'], 'https://github.com/Aarongeo1211', 'Environmental Tech', true),
('Compliance and Sanctions Screening Platform', 'A secure, role-based platform for financial institutions to ensure regulatory compliance through intelligent user management, sanctions screening, real-time risk assessments, and audit trails. Features include multi-role authentication (Super Admin, Institution Admin, User), sanctions screening using fuzzy search and Elasticsearch against OFAC and UN lists, user & institution management with role-based controls, audit logging for compliance tracking, and session security with JWT authentication.', ARRAY['React.js', 'FastAPI', 'MongoDB', 'Elasticsearch', 'JWT', 'Material-UI', 'APScheduler'], 'https://github.com/Aarongeo1211', 'FinTech', true),
('Pulse City', 'A real-time dashboard designed to assist commuters and emergency services by integrating live traffic, weather, air quality, and route optimization data for Bengaluru and nearby cities. Features include interactive map with real-time traffic visualization using Leaflet and TomTom overlays, route optimization with multi-route suggestions, live traffic data with color-coded delay indicators, weather & AQI integration via OpenWeatherMap, and emergency services mapping with contact information.', ARRAY['HTML', 'CSS (Bootstrap)', 'JavaScript', 'Leaflet.js', 'TomTom API', 'OpenWeatherMap API'], 'https://github.com/Aarongeo1211', 'Smart City', true),
('Professional Websites Collection', 'A collection of professional websites built and deployed for various clients across different industries. Projects include rubcobangalore.com (corporate business website), careernxt.com (career platform with job listings), fitnesswithvikram.in (fitness coaching website), and as-constructions.com (construction company portfolio). All feature custom responsive designs, SEO optimization, fast loading times, and secure hosting with SSL certificates.', ARRAY['Next.js', 'React.js', 'Tailwind CSS', 'Node.js', 'MongoDB', 'AWS', 'Cloudflare CDN'], 'https://github.com/Aarongeo1211', 'Web Development', true),
('FRMS - Fraud and Risk Management System', 'A comprehensive AI-powered platform designed to detect and prevent financial fraud in real-time. The system leverages advanced machine learning models and data analytics to identify suspicious activities, assess risks, and provide actionable insights to financial institutions. Features include real-time fraud detection using ML algorithms, risk assessment engine with transaction scoring, user behavior analytics for anomaly detection, case management system for fraud analysts, customizable rule engine, and detailed reporting and analytics on fraud trends.', ARRAY['Python', 'TensorFlow', 'Scikit-learn', 'FastAPI', 'React.js', 'PostgreSQL', 'Docker'], 'https://github.com/Aarongeo1211', 'AI/ML', true),
('Smart Traffic Management System', 'AI-powered system to detect ambulances and adjust traffic lights for emergency response using computer vision and IoT integration', ARRAY['Python', 'TensorFlow', 'OpenCV', 'Tesseract OCR', 'IoT'], 'https://github.com/Aarongeo1211', 'AI/ML', true),
('Facial Matching System', 'Banking KYC system with 95%+ accuracy for identity verification, reducing processing time by 40% and false positives by 30%', ARRAY['OpenCV', 'TensorFlow', 'Python', 'AWS', 'Docker'], 'https://github.com/Aarongeo1211', 'AI/ML', true);

INSERT INTO skills (name, category, proficiency, icon) VALUES
('Python', 'Languages', 95, 'code'),
('JavaScript', 'Languages', 90, 'code'),
('Java', 'Languages', 85, 'coffee'),
('Solidity', 'Languages', 80, 'code'),
('React.js', 'Frontend', 90, 'react'),
('Node.js', 'Backend', 85, 'server'),
('Flask', 'Backend', 88, 'server'),
('Next.js', 'Frontend', 85, 'react'),
('TensorFlow', 'AI/ML', 90, 'brain'),
('OpenCV', 'AI/ML', 85, 'eye'),
('Machine Learning', 'AI/ML', 88, 'brain'),
('Computer Vision', 'AI/ML', 87, 'eye'),
('AWS', 'Cloud', 80, 'cloud'),
('Docker', 'DevOps', 75, 'container'),
('Git', 'DevOps', 85, 'git-branch'),
('PostgreSQL', 'Database', 80, 'database'),
('MongoDB', 'Database', 75, 'database'),
('Blockchain', 'Technologies', 78, 'link'),
('IoT', 'Technologies', 75, 'cpu'),
('Cybersecurity', 'Technologies', 85, 'shield'),
('Web3.js', 'Blockchain', 75, 'link'),
('Ethereum', 'Blockchain', 75, 'link'),
('Google Maps API', 'Tools', 80, 'map'),
('Arduino', 'Tools', 70, 'cpu'),
('HubSpot API', 'Tools', 75, 'api'),
('Tesseract OCR', 'AI/ML', 75, 'scan-text'),
('Tailwind CSS', 'Frontend', 85, 'palette'),
('Google Tag Manager', 'Tools', 70, 'tag'),
('Cloudflare CDN', 'Tools', 70, 'cloud');

INSERT INTO experiences (company, position, description, tech_stack, start_date, end_date, location) VALUES
('CodezyeCyber', 'Lead Developer', 'Architected Cybersecurity Compliance Tool, integrating HubSpot CRM to automate lead management and enhance engagement for enterprise clients', ARRAY['Python', 'Flask', 'React.js', 'Node.js', 'AWS', 'HubSpot API', 'PostgreSQL'], '2025-01-01', NULL, 'Remote'),
('Innovitegra Solutions', 'Lead Developer', 'Built facial matching systems (95%+ accuracy) for 10+ banking clients, cutting KYC time by 40% and false positives by 30%. Led team of developers in implementing computer vision solutions', ARRAY['OpenCV', 'TensorFlow', 'Tesseract OCR', 'Python', 'AWS', 'Docker'], '2024-09-01', '2025-07-31', 'Remote'),
('Fenox Digital Marketing', 'Founder', 'Founded and scaled SEO agency, boosting client conversions by 25% via optimized websites and automation. Managed team and client relationships while developing technical solutions', ARRAY['Next.js', 'Tailwind CSS', 'Google Tag Manager', 'Yoast SEO', 'Cloudflare CDN'], '2023-10-01', NULL, 'Bengaluru'),
('ElimPay', 'Intern', 'Optimized blockchain-based payment system, reducing transaction fees from 12% to 4%. Worked on smart contract optimization and Web3 integration', ARRAY['Solidity', 'Web3.js', 'Node.js', 'React.js', 'Ethereum'], '2023-06-01', '2023-07-31', 'Remote');
