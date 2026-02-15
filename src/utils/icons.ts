import { 
  BookOpen, 
  Calculator, 
  Microscope, 
  Atom, 
  Globe, 
  Music, 
  Code, 
  Palette, 
  Dna, 
  Cpu,
  Brain,
  Rocket
} from 'lucide-react';

export const getIconByName = (name: string) => {
  const normalizeName = name.toLowerCase().replace('-', '');
  
  switch (normalizeName) {
    case 'mathematics':
    case 'calculator':
    case 'math':
      return Calculator;
    case 'microscope':
    case 'biology':
    case 'science':
      return Microscope;
    case 'atom':
    case 'physics':
    case 'chemistry':
      return Atom;
    case 'bookopen':
    case 'languages':
    case 'english':
    case 'reading':
      return BookOpen;
    case 'globe':
    case 'socialstudies':
    case 'geography':
    case 'history':
      return Globe;
    case 'music':
    case 'arts':
      return Music;
    case 'code':
    case 'programming':
    case 'cs':
      return Code;
    case 'palette':
    case 'art':
    case 'design':
      return Palette;
    case 'dna':
      return Dna;
    case 'cpu':
    case 'technology':
      return Cpu;
    case 'brain':
    case 'psychology':
      return Brain;
    case 'rocket':
      return Rocket;
    default:
      return BookOpen; // Default icon
  }
};
