import minibusImg from "../../public/vehicles/minibus.jpg";
import van from "../../public/vehicles/van.jpg";
import vanTwo from "../../public/vehicles/van2.jpg";
import vanThree from "../../public/vehicles/van3.avif"
import vanFour from "../../public/vehicles/van4.jpg";;


export const site = {
    brand: "Wyne Taxi",
    phoneDisplay: "+41 79 336 73 22",
    phoneTel: "+41793367322",
    // WhatsApp uses international number without + and spaces
    whatsappNumber: "41793367322",
    email: "info@wynetaxi.ch",
    area: ["Aarau", "Wynetal", "Umgebung"],
    highlights: [
      "Pünktlich & zuverlässig",
      "Fixpreise auf Anfrage",
      "24/7 nach Verfügbarkeit"
    ],
    services: [
      {
        title: "Transfer",
        desc: "Flughafen, Bahnhof, Spital oder Hotel — stressfrei ankommen.",
        bullets: ["Door-to-door", "Pünktliche Abholung", "Komfort & Sicherheit"]
      },
      {
        title: "Gruppenreisen",
        desc: "Für Teams, Familien, Events — gemeinsam fahren, gemeinsam ankommen.",
        bullets: ["Planbar", "Koordination inklusive", "Gepäckfreundlich"]
      },
      {
        title: "Tagestouren",
        desc: "Tagesausflüge mit Route nach Wunsch — entspannt statt gehetzt.",
        bullets: ["Flexible Stops", "Individuelle Route", "Top für Gäste"]
      }
    ],
    vehicles: [
      {
        name: "Komfort Limousine",
        capacity: "bis 4 Personen",
        images: [minibusImg, van, vanTwo, vanThree, vanFour],
        perks: ["Klimatisiert", "Leise Fahrt", "Ideal für Transfers"]
      },
      {
        name: "Van / Minibus",
        capacity: "bis 11 Personen",
        images: [minibusImg, van, vanTwo, vanThree, vanFour],
        perks: ["Gruppen & Gepäck", "Eventfahrten", "Airport shuttles"]
      }
    ] satisfies Vehicle[],
    faq: [
      {
        q: "Wie kann ich reservieren?",
        a: "Am schnellsten per WhatsApp oder Telefon. Alternativ per E-Mail mit Abholort, Ziel, Datum/Uhrzeit und Personenanzahl."
      },
      {
        q: "Gibt es Fixpreise?",
        a: "Ja — Fixpreise sind auf Anfrage möglich. Schick die Route und Uhrzeit, dann bekommst du eine klare Antwort."
      },
      {
        q: "Fahrt ihr nachts?",
        a: "Grundsätzlich ja (24/7 nach Verfügbarkeit). Früh reservieren hilft, damit du safe bist."
      }
    ]
  };
  export type Vehicle = {
    name: string;
    capacity: string;
    perks: string[];
    images: string[]; // always present
  };
  
  export type BookingPayload = {
    pickup: string;
    destination: string;
    date: string;
    time: string;
    passengers: number;
    name: string;
    phone: string;
    notes: string;
  };
  
  export function bookingToText(p: BookingPayload) {
    const lines = [
      "Reservation Anfrage",
      "-------------------",
      `Name: ${p.name || "-"}`,
      `Telefon: ${p.phone || "-"}`,
      `Abholort: ${p.pickup || "-"}`,
      `Ziel: ${p.destination || "-"}`,
      `Datum: ${p.date || "-"}`,
      `Uhrzeit: ${p.time || "-"}`,
      `Personen: ${Number.isFinite(p.passengers) ? p.passengers : "-"}`,
      `Notiz: ${p.notes || "-"}`
    ];
    return lines.join("\n");
  }
  
  export function buildWhatsAppLink(text: string) {
    const encoded = encodeURIComponent(text);
    return `https://wa.me/${site.whatsappNumber}?text=${encoded}`;
  }
  
  export function buildMailtoLink(subject: string, body: string) {
    const s = encodeURIComponent(subject);
    const b = encodeURIComponent(body);
    return `mailto:${site.email}?subject=${s}&body=${b}`;
  }
  