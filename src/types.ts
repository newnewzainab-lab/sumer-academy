export interface Course {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  instructor: string;
  category: 'Professional' | 'Academic' | 'Personal' | 'Tech';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  image: string;
}

export interface UserProfile {
  name: string;
  goal: string;
  currentSkills: string[];
  knowledgeGap?: string;
  recommendedPath?: string[];
  bakaloriaScore?: string;
  highSchoolTrack?: string;
  interests?: string;
}

export interface ReelItem {
  id: string;
  titleAr: string;
  titleEn: string;
  voiceText: string;
  componentType: 'resistor' | 'piston' | 'binary';
}

export interface Flashcard {
  front: string;
  back: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
  explanation?: string;
}

export interface CourseSyllabus {
  title: string;
  duration: string;
  description: string;
  modules: Array<{ unitTitle: string; content: string }>;
  quiz: QuizQuestion[];
}

export interface JobMatch {
  id: string;
  title: string;
  company: string;
  location: string;
  matchPercent: number;
  salary: string;
  logoLetter: string;
}
