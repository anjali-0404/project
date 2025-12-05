CREATE TABLE IF NOT EXISTS "Users" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  "passwordHash" VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'student',
  institution VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Projects" (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  domain VARCHAR(255) NOT NULL,
  abstract TEXT NOT NULL,
  "techStack" VARCHAR(255),
  institution VARCHAR(255) NOT NULL,
  "academicLevel" VARCHAR(10) NOT NULL,
  year INT NOT NULL,
  "plagiarismScore" FLOAT,
  "fileUrl" VARCHAR(255),
  "ownerId" INT REFERENCES "Users"(id),
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);
