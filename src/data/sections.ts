export interface SectionMeta {
  id: string
  label: string
  accent: 'green' | 'cyan' | 'alert'
}

export const sections: SectionMeta[] = [
  { id: 'hero', label: 'LifeShield AI', accent: 'green' },
  { id: 'problem', label: 'The Problem', accent: 'alert' },
  { id: 'landscape', label: 'Industry Landscape', accent: 'cyan' },
  { id: 'market', label: 'Market & TAM', accent: 'cyan' },
  { id: 'solution', label: 'Our Solution', accent: 'green' },
  { id: 'architecture', label: 'Architecture', accent: 'green' },
  { id: 'services', label: 'NVIDIA Services', accent: 'green' },
  { id: 'trust', label: 'Trust & Evaluation', accent: 'green' },
  { id: 'llm', label: 'LLM Strategy', accent: 'green' },
  { id: 'differentiators', label: 'Differentiators', accent: 'cyan' },
  { id: 'why-nvidia', label: 'Why NVIDIA', accent: 'green' },
  { id: 'business-value', label: 'Business Value', accent: 'cyan' },
  { id: 'scaling', label: 'Scaling as Product', accent: 'cyan' },
  { id: 'roadmap', label: 'Roadmap', accent: 'green' },
  { id: 'closing', label: 'Closing', accent: 'green' },
]
