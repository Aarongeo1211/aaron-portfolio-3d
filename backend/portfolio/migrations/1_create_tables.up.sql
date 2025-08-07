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

-- Insert sample data
INSERT INTO projects (title, description, tech_stack, github_url, category, featured) VALUES
('Smart Traffic Management System', 'AI-powered system to detect ambulances and adjust traffic lights for emergency response', ARRAY['Python', 'TensorFlow', 'OpenCV', 'Tesseract OCR'], 'https://github.com/Aarongeo1211', 'AI/ML', true),
('Web Vulnerability Scanner', 'Award-winning tool detecting OWASP Top 10 vulnerabilities like SQL injection and XSS', ARRAY['Python', 'Flask', 'SQLAlchemy', 'React'], 'https://github.com/Aarongeo1211', 'Cybersecurity', true),
('MedVision AI', 'AI diagnostic tool for medical scan analysis using CNN models for anomaly detection', ARRAY['TensorFlow', 'OpenCV', 'Python', 'CNN Models'], 'https://github.com/Aarongeo1211', 'AI/ML', true),
('Facial Matching System', 'Banking KYC system with 95%+ accuracy, reducing processing time by 40%', ARRAY['OpenCV', 'TensorFlow', 'Python', 'AWS', 'Docker'], 'https://github.com/Aarongeo1211', 'AI/ML', true);

INSERT INTO skills (name, category, proficiency, icon) VALUES
('Python', 'Languages', 95, 'code'),
('JavaScript', 'Languages', 90, 'code'),
('Java', 'Languages', 85, 'coffee'),
('React.js', 'Frontend', 90, 'react'),
('Node.js', 'Backend', 85, 'server'),
('TensorFlow', 'AI/ML', 90, 'brain'),
('OpenCV', 'AI/ML', 85, 'eye'),
('AWS', 'Cloud', 80, 'cloud'),
('Docker', 'DevOps', 75, 'container'),
('PostgreSQL', 'Database', 80, 'database');

INSERT INTO experiences (company, position, description, tech_stack, start_date, end_date, location) VALUES
('CodezyeCyber', 'Freelance Lead Developer', 'Architected Cybersecurity Compliance Tool, integrating HubSpot CRM to automate lead management and enhance engagement', ARRAY['Python', 'Flask', 'React.js', 'Node.js', 'AWS', 'HubSpot API', 'PostgreSQL'], '2025-01-01', NULL, 'Remote'),
('Innovitegra Solutions', 'Freelance Lead Developer', 'Built facial matching systems (95%+ accuracy) for 10+ banking clients, cutting KYC time by 40% and false positives by 30%', ARRAY['OpenCV', 'TensorFlow', 'Tesseract OCR', 'Python', 'AWS', 'Docker'], '2024-09-01', '2025-07-31', 'Remote'),
('Fenox Digital Marketing', 'Co-Founder', 'Scaled SEO agency, boosting client conversions by 25% via optimized websites and automation', ARRAY['Next.js', 'Tailwind CSS', 'Google Tag Manager', 'Yoast SEO', 'Cloudflare CDN'], '2023-10-01', NULL, 'Bengaluru'),
('ElimPay', 'Intern', 'Optimized blockchain-based payment system, reducing transaction fees from 12% to 4%', ARRAY['Solidity', 'Web3.js', 'Node.js', 'React.js', 'Ethereum'], '2023-06-01', '2023-07-31', 'Remote');
