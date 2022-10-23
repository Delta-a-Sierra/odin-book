import { useState, useEffect } from "react";

interface preferencesInterface {
  theme: {
    dark: boolean
  }
}

const defaultPref: preferencesInterface | null = {
  theme: {
    dark: false
  }
}

export const usePreferences = () => {
  const [preferences, setPreferences] = useState(defaultPref);

  useEffect(() => {
    const pref = loadPreferences()
    if (JSON.stringify(pref) === JSON.stringify(defaultPref)) {
      return
    }
    if (pref) {
      updatePreferences(pref as preferencesInterface)
    }
  }, [])

  const loadPreferences = () => {
    let pref = localStorage.getItem('preferences')
    if (!pref) {
      return defaultPref
    }
    pref = JSON.parse(pref)
    return pref as preferencesInterface | null
  }

  const updatePreferences = async (newPrefs: preferencesInterface) => {
    setPreferences(newPrefs)
    localStorage.setItem('preferences', JSON.stringify(newPrefs))
  }
  return { preferences, updatePreferences };
}






