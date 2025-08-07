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

-- Insert comprehensive project data
INSERT INTO projects (title, description, tech_stack, github_url, category, featured) VALUES
('Web Vulnerability Scanner', 'Automated Security Assessment Tool designed to detect and report common security vulnerabilities in web applications, including OWASP Top 10 vulnerabilities like SQL injection and XSS', ARRAY['Python', 'Flask', 'SQLAlchemy', 'React', 'Security Testing'], 'https://github.com/Aarongeo1211', 'Cybersecurity', true),
('MEDVISION-AI', 'AI-powered diagnostic platform designed to support doctors by providing rapid and explainable medical scan analysis, bridging accessibility gaps in healthcare', ARRAY['TensorFlow', 'OpenCV', 'Python', 'CNN Models', 'Medical AI'], 'https://github.com/Aarongeo1211', 'AI/ML', true),
('EarthVision', 'Real-time environmental dashboard designed to support sustainable agricultural practices by delivering actionable environmental insights through live data collection', ARRAY['React.js', 'Node.js', 'IoT', 'Data Analytics', 'Environmental APIs'], 'https://github.com/Aarongeo1211', 'Environmental Tech', true),
('Compliance and Sanctions Screening Platform', 'Secure, role-based platform for financial institutions to ensure regulatory compliance through intelligent user management and real-time risk assessments', ARRAY['Python', 'Flask', 'PostgreSQL', 'React.js', 'Compliance APIs'], 'https://github.com/Aarongeo1211', 'FinTech', true),
('Pulse City', 'Real-time dashboard for Bengaluru traffic management, integrating live traffic, weather, air quality, and route optimization data for commuters and emergency services', ARRAY['React.js', 'Google Maps API', 'Real-time APIs', 'Data Visualization'], 'https://github.com/Aarongeo1211', 'Smart City', true),
('FRMS - Fraud and Risk Management System', 'Comprehensive AI-powered platform for real-time financial fraud detection using advanced machine learning models and data analytics', ARRAY['Python', 'TensorFlow', 'Machine Learning', 'Real-time Processing', 'Financial APIs'], 'https://github.com/Aarongeo1211', 'AI/ML', true),
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
