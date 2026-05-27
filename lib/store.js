import { create } from 'zustand';

export const useStore = create((set) => ({
  // Wizard state
  category: null,               // 'smartphone' | 'laptop' | 'pc-builder'
  wizardAnswers: {},            // all step answers
  filters: [],                  // selected pre-filters
  currentStep: 0,

  // Results state  
  recommendations: [],          // from Claude API
  prices: {},                   // from SerpAPI, keyed by device name
  
  // User state
  profile: {
    name: "User",
    username: "@user",
    bio: "Tech enthusiast looking for the best performance-to-price ratio.",
    avatar: null
  },
  isAuthenticated: false,
  sessionEmail: "",
  lanyardMinimized: false,
  serpApiKey: "",
  preferences: {
    matchMode: "balanced",
    priceAlerts: true,
    fastAnimations: true,
    compactMobile: true,
  },
  savedPresets: [
    {
      id: "demo1",
      title: "📱 Samsung Galaxy A55 Search",
      details: "₹20k–₹35k · Gaming · 5G",
      savedAt: "2 days ago"
    },
    {
      id: "demo2",
      title: "🖥️ Gaming PC Build ₹80,000",
      details: "RTX 4060 · Ryzen 5 · 16GB RAM",
      savedAt: "5 days ago"
    }
  ],             // array of saved comparisons
  
  // Actions
  setCategory: (category) => set({ category }),
  setAnswer: (step, value) => set((state) => ({
    wizardAnswers: { ...state.wizardAnswers, [step]: value }
  })),
  setFilters: (filters) => set({ filters }),
  setStep: (step) => set({ currentStep: step }),
  setRecommendations: (recommendations) => set({ recommendations }),
  savePreset: (preset) => set((state) => ({
    savedPresets: [preset, ...state.savedPresets]
  })),
  login: (email) => set((state) => {
    const handle = email.split("@")[0] || "user";

    return {
      isAuthenticated: true,
      sessionEmail: email,
      profile: {
        ...state.profile,
        name: handle.replace(/[._-]/g, " "),
        username: `@${handle}`,
      },
    };
  }),
  logout: () => set({
    isAuthenticated: false,
    sessionEmail: "",
    profile: {
      name: "User",
      username: "@user",
      bio: "Tech enthusiast looking for the best performance-to-price ratio.",
      avatar: null
    },
  }),
  toggleLanyard: () => set((state) => ({ lanyardMinimized: !state.lanyardMinimized })),
  setSerpApiKey: (serpApiKey) => set({ serpApiKey }),
  setPreference: (key, value) => set((state) => ({
    preferences: { ...state.preferences, [key]: value }
  })),
  clearWizard: () => set({
    category: null,
    wizardAnswers: {},
    filters: [],
    currentStep: 0,
    recommendations: []
  }),
}));
