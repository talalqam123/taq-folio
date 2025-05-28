import React from "react";
import { 
  FaFigma, 
  FaGitAlt, 
  FaNodeJs, 
  FaMobileAlt, 
  FaServer, 
  FaDatabase,
  FaPython,
  FaFire
} from 'react-icons/fa';
import { 
  SiExpress, 
  SiPostgresql, 
  SiDjango 
} from 'react-icons/si';

export interface SkillCategory {
  name: string;
  percentage: string;
}

export const frontendSkills: SkillCategory[] = [
  {
    name: "React.js",
    percentage: "95%"
  },
  {
    name: "TypeScript",
    percentage: "90%"
  },
  {
    name: "CSS/SASS",
    percentage: "85%"
  },
  {
    name: "Tailwind CSS",
    percentage: "92%"
  },
  {
    name: "Next.js",
    percentage: "88%"
  }
];

export const backendSkills: SkillCategory[] = [
  {
    name: "Node.js",
    percentage: "85%"
  },
  {
    name: "Express.js",
    percentage: "80%"
  },
  {
    name: "Python",
    percentage: "75%"
  },
  {
    name: "Django/Flask",
    percentage: "70%"
  }
];

export const databaseSkills: SkillCategory[] = [
  {
    name: "MongoDB",
    percentage: "85%"
  },
  {
    name: "PostgreSQL",
    percentage: "80%"
  },
  {
    name: "Firebase",
    percentage: "75%"
  }
];

export interface OtherSkill {
  name: string;
  icon: React.ReactNode;
}

export const otherSkills: OtherSkill[] = [
  {
    name: "Figma",
    icon: React.createElement(FaFigma)
  },
  {
    name: "Git",
    icon: React.createElement(FaGitAlt)
  },
  {
    name: "Node.js",
    icon: React.createElement(FaNodeJs)
  },
  {
    name: "Python",
    icon: React.createElement(FaPython)
  },
  {
    name: "PostgreSQL",
    icon: React.createElement(SiPostgresql)
  },
  {
    name: "MongoDB",
    icon: React.createElement(FaDatabase)
  }
];
