import { checkChromeAIAvailability } from "@/models/utils/chrome"

export const getChromeAISupported = async () => {
  try {
    let browserInfo = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)
    let version = browserInfo ? parseInt(browserInfo[2], 10) : 0

    if (version < 138) {
      return "browser_not_supported"
    }

    if (!("LanguageModel" in globalThis) && !("ai" in globalThis)) {
      return "ai_not_supported"
    }

    const capabilities = await checkChromeAIAvailability()
    if (capabilities === 'downloadable') {
      return "downloadable"
    }

    if (capabilities === 'downloading') {
      return "downloading"
    }

    if (capabilities !== "readily") {
      return "ai_not_ready"
    }

    return "success"
  } catch (e) {
    console.error(e)
    return "internal_error"
  }
}

export const isChromeAISupported = async () => {
  const result = await getChromeAISupported()
  return result === "success"
}
