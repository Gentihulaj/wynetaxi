let loaded = false;

export async function loadCalendlyScript(): Promise<void> {
  if (loaded) return;

  await new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load Calendly widget.js"));
    document.head.appendChild(s);
  });

  loaded = true;
}

export function openCalendlyPopup(url: string) {
  // @ts-ignore
  if (!window.Calendly?.initPopupWidget) {
    throw new Error("Calendly widget not available yet.");
  }
  // @ts-ignore
  window.Calendly.initPopupWidget({ url });
}
