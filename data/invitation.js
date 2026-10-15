/**
 * Centralized Wedding Invitation Configuration Data
 * Edit couple names, dates, imagery, venues, contacts, gallery photos, and download links here.
 */
export const invitationData = {
  // Couple details
  couple: {
    groomName: "Karthik",
    brideName: "Dheeshma",
    firstName: "KARTHIK",
    secondName: "DHEESHMA",
    initials: "K & D",
    leftInitial: "K",
    rightInitial: "D",
    ampersand: "&",
  },

  // Hero section content
  hero: {
    introText: "TOGETHER WITH THEIR FAMILIES",
    ampersand: "&",
    weddingDate: "25 · 11 · 2026",
    dateText: "25 · 11 · 2026",
    scrollHintText: "SCROLL TO EXPLORE",
    // Real romantic couple photograph for Hero background
    imagePath: "/images/couple/hero-real.jpg",
    imageAlt: "Karthik and Dheeshma romantic wedding moment",
  },

  // Opening envelope content
  opening: {
    initials: "K & D",
    subtitle: "TOGETHER WITH THEIR FAMILIES",
    invitationText: "REQUEST THE HONOUR OF YOUR PRESENCE",
    dateText: "25 · 11 · 2026 • PALAKKAD",
  },

  // Section 3: Couple photo editorial section
  coupleSection: {
    heading: "TWO HEARTS, ONE BEAUTIFUL JOURNEY",
    scriptAccent: "A love story in full bloom",
    quote: "“Every love story is beautiful, but ours is our favorite.”",
    // Real couple photograph of Karthik & Dheeshma
    imagePath: "/images/couple/couple-real.jpg",
    imageAlt: "Karthik and Dheeshma couple portrait",
    storyText:
      "Surrounded by the warm serenity of Palakkad and the timeless blessings of our families, we begin this sacred chapter of togetherness. We joyfully invite you to be part of our celebration.",
    monogram: "K & D",
    dateBadge: "25 · 11 · 2026",
  },

  // Section 4: Wedding countdown & Save the Date
  countdown: {
    heading: "SAVE THE DATE",
    subheading: "Counting Down to the Celebration",
    coupleDisplay: "Karthik & Dheeshma",
    dateFormatted: "Wednesday, 25 November 2026",
    // Target timestamp in Asia/Kolkata (+05:30)
    targetTimestampISO: "2026-11-25T17:00:00+05:30",
    timezone: "Asia/Kolkata",
    receptionTime: "5:00 PM – 8:00 PM IST",
    eventNote: "Wedding Reception at Swami Auditorium",
  },

  // Section 5: Events and details schedule
  events: {
    sectionHeading: "WEDDING EVENTS & SCHEDULE",
    sectionSubheading: "A Sacred Union & Celebration",
    
    // Confirmed Reception
    reception: {
      tag: "Confirmed Celebration",
      title: "Wedding Reception",
      dateFormatted: "Wednesday, 25 November 2026",
      dateShort: "25 · 11 · 2026",
      time: "5:00 PM – 8:00 PM IST",
      targetTimestampISO: "2026-11-25T17:00:00+05:30",
      venueName: "Swami Auditorium",
      venueAddress: "Kulavanmukku, Palakkad",
      description: "Join us with your family for an evening of joyous greetings, dinner, and celebration.",
      isConfirmed: true,
    },

    // Traditional Ceremony (Thalikettu)
    ceremony: {
      tag: "Traditional Ritual",
      ritual: "THALIKETTU",
      title: "Wedding Ceremony",
      venueName: "Sree Azhakotha Mahadeva Temple",
      venueAddress: "Palakkad",
      muhurtam: "9:30 AM – 10:15 AM IST",
      dateStatus: "Date to be confirmed",
      description: "The auspicious sacred ritual uniting two souls in divine grace.",
      isConfirmed: false,
    },

    // Host details
    host: {
      label: "Warmly Invited By",
      name: "Mrs. Lakshmi Ramachandran",
      relation: "(W/o Late Ramachandran)",
      address: "Naluketttu Veedu, Puthanthara, Kuzhalmannam, Palakkad",
      contactNumber: "9645158159",
      contactTel: "tel:9645158159",
    },

    // Bride's Family details
    family: {
      label: "Bride's Family",
      relationPrefix: "D/o",
      parentsName: "Mr. Mani & Mrs. Baby",
      address: "Vadakkethara House, Kulavanmukku, Kuzhalmannam, Palakkad",
    },

    // Compliments line
    compliments: "With best compliments from Kamalraj & Friends and Relatives",
  },

  // Section 6: Venue Location & Directions
  venue: {
    heading: "VENUE & DIRECTIONS",
    subheading: "Find Your Way to the Celebration",
    venueName: "Swamy Auditorium",
    locality: "Kulavanmukku, Palakkad",
    fullAddress: "Swamy Auditorium, Kulavanmukku, Kuzhalmannam, Palakkad, Kerala 678702",
    date: "Wednesday, 25 November 2026",
    time: "5:00 PM – 8:00 PM IST",
    mapPreviewImage: "/images/venue/swami-auditorium.svg",
    isVerified: true,
    demoLabel: "CONFIRMED AUDITORIUM LOCATION",
    directionsUrl: "https://maps.app.goo.gl/z6qfZqSuyKFs4PUq5",
    googleMapsUrl: "https://maps.app.goo.gl/z6qfZqSuyKFs4PUq5",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001.49296402626!2d76.59326190917338!3d10.709988189390694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba872dffafddaab%3A0x76e8e7102739fe19!2sSwamy%20Auditorium!5e1!3m2!1sen!2sin!4v1792042825792!5m2!1sen!2sin",
    coordinates: {
      lat: 10.709988,
      lng: 76.593262,
    },
  },

  // Section 7: Pinterest-Style Photo Gallery
  gallery: {
    heading: "MOMENTS IN TIME",
    subheading: "A Visual Love Story",
    items: [
      {
        id: 1,
        title: "Golden Hour Promises",
        caption: "25 · 11 · 2026",
        src: "/images/couple/couple-real.jpg",
        alt: "Karthik and Dheeshma traditional wedding portrait",
        frame: "arch",
        orientation: "portrait",
      },
      {
        id: 2,
        title: "Hand in Hand",
        caption: "Kuzhalmannam Trails",
        src: "/images/couple/gallery-2.svg",
        alt: "Couple walking hand in hand",
        frame: "rect",
        orientation: "landscape",
      },
      {
        id: 3,
        title: "Whispered Promises",
        caption: "A Lifetime of Love",
        src: "/images/couple/hero-real.jpg",
        alt: "Karthik and Dheeshma looking at each other holding hands",
        frame: "oval",
        orientation: "portrait",
      },
      {
        id: 4,
        title: "Quiet Radiance",
        caption: "Palakkad Heritage",
        src: "/images/couple/gallery-4.svg",
        alt: "Bride and Groom portrait in traditional attire",
        frame: "arch",
        orientation: "portrait",
      },
      {
        id: 5,
        title: "Two Hearts Entwined",
        caption: "Forever & Always",
        src: "/images/couple/gallery-5.svg",
        alt: "Romantic sunset silhouette",
        frame: "rect",
        orientation: "landscape",
      },
      {
        id: 6,
        title: "A New Beginning",
        caption: "Karthik & Dheeshma",
        src: "/images/couple/gallery-6.svg",
        alt: "Celebrating love and family",
        frame: "arch",
        orientation: "portrait",
      },
    ],
  },

  // Section 8: Downloadable Wedding Invitation
  invitationDownload: {
    heading: "TRADITIONAL INVITATION CARD",
    subheading: "View & Download Official Card",
    title: "Official Wedding Invitation Postcard",
    fileName: "Karthik-and-Dheeshma-Wedding-Invitation.pdf",
    downloadUrl: "/invitation/karthik-dheeshma-wedding-invitation.pdf",
    imageDownloadUrl: "/invitation/karthik-dheeshma-wedding-card.jpg",
    previewImage: "/invitation/karthik-dheeshma-wedding-card.jpg",
    shareTitle: "Wedding Invitation — Karthik & Dheeshma",
    shareText:
      "We cordially invite you with family to the wedding reception of Karthik & Dheeshma on Wednesday, 25 November 2026 at Swamy Auditorium, Kulavanmukku, Palakkad.",
  },

  // Section 9: Closing Scene
  closing: {
    quote: "“With joy in our hearts, we step into forever.”",
    title: "We Can't Wait to Celebrate with You",
    names: "Karthik & Dheeshma",
    date: "25 · 11 · 2026",
    location: "Palakkad, Kerala",
  },

  // Backwards compatibility alias for details
  get details() {
    return {
      heading: "WITH JOY IN OUR HEARTS",
      coupleDisplay: "Karthik & Dheeshma",
      invitationWording:
        "Cordially invite your esteemed presence with family on the auspicious occasion of the Wedding Reception of my son Karthik & Dheeshma.",
      reception: this.events.reception,
      ceremony: this.events.ceremony,
      host: this.events.host,
      family: this.events.family,
      compliments: this.events.compliments,
      location: {
        isVerified: false,
        receptionMapUrl: this.venue.directionsUrl,
        venueName: this.venue.venueName,
        locality: this.venue.locality,
      },
    };
  },
};

export default invitationData;
