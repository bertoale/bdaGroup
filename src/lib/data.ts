import { 
  Palmtree, 
  Building2, 
  Home as HomeIcon, 
  Wrench, 
  CalendarCheck, 
  Sparkles 
} from "lucide-react";

export interface Subsidiary {
  id: string;
  name: string;
  brand: string;
  category: string;
  desc: string;
  paragraphs?: string[];
  href: string;
  ctaText: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  images?: string[];
  badge: string;
  isExternal: boolean;
}

export const subsidiaries: Subsidiary[] = [
  {
    id: "vacation-rentals",
    name: "Vacation Rental",
    brand: "BDA Holiday Rentals",
    category: "Hospitality & Travel",
    desc: "We're your key to an unforgettable vacation experience. Our curated collection spans the globe, offering unique accommodations throughout Asia. Whether you crave the energy of a bustling city or the tranquility of a beachfront, we have something for every traveler. At BDA Holiday Rentals, we believe in going the extra mile. Each accommodation is handpicked and personally inspected by our team to ensure your stay is nothing short of exceptional. We're dedicated to delivering quality and comfort, ensuring that every aspect of your holiday experience is carefully considered. By choosing BDA Holiday Rentals, you're not only securing a fantastic place to stay; you're also supporting local businesses. We take pride in being a driving force behind the communities we touch, enriching your travel experience while keeping the spirit of local hospitality alive.",
    href: "https://bestdealsasiarentals.com/",
    ctaText: "Explore",
    icon: Palmtree,
    image: "https://storage.googleapis.com/bda_rental/bda-group/images/villa-1.webp",
    images: [
      "https://storage.googleapis.com/bda_rental/bda-group/images/villa-1.webp",
      "https://storage.googleapis.com/bda_rental/bda-group/images/villa-2.webp",
      "https://storage.googleapis.com/bda_rental/bda-group/images/villa-3.webp",
    ],
    badge: "Hospitality",
    isExternal: true,
  },
  {
    id: "property-management",
    name: "Property Management & Hospitality",
    brand: "BDA Hospitality",
    category: "Asset Operations",
    desc: "We specialize in seamless property management and exceptional hospitality services. From maximizing property value to ensuring a delightful guest experience, we handle every detail with expertise, allowing property owners to thrive and guests to enjoy a memorable stay.",
    href: "https://bestdealsasiahospitality.com/",
    ctaText: "Explore",
    icon: Building2,
    image: "https://storage.googleapis.com/bda_rental/bda-group/images/hospitality-1.webp",
    images: [
      "https://storage.googleapis.com/bda_rental/bda-group/images/hospitality-1.webp",
      "https://storage.googleapis.com/bda_rental/bda-group/images/hospitality-2.webp",
      "https://storage.googleapis.com/bda_rental/bda-group/images/hospitality-3.webp",
    ],
    badge: "Management",
    isExternal: true,
  },
  {
    id: "real-estate",
    name: "Real Estate",
    brand: "BDA Real Estate",
    category: "Property Brokerage",
    desc: "Unlock the full potential of your property with BDA Real Estate, your certified and registered property agency in Indonesia. Elevate your selling experience as we specialize in expertly listing and marketing properties for long-term rentals, leaseholds, and freeholds.",
    href: "https://bestdealsrealestate.com/",
    ctaText: "Explore",
    icon: HomeIcon,
    image: "https://storage.googleapis.com/bda_rental/bda-group/images/real-estate.webp",
    badge: "Investment",
    isExternal: true,
  },
  {
    id: "project-maintenance",
    name: "Project & Maintenance",
    brand: "BDA Project & Maintenance",
    category: "Upkeep & Renovation",
    desc: "Keep your property in pristine condition with BDA Project and Maintenance Services. We offer professional, high-standard maintenance, renovation, and property upkeep solutions tailored specifically for villas, residences, and commercial venues. From regular pool and garden maintenance to full renovation projects and electrical, plumbing, or structural repairs, our skilled team ensures quality craftsmanship and absolute safety. We manage every project efficiently to protect your investment and elevate its value.",
    href: "https://bestprojectandmaintenance.com/",
    ctaText: "Explore",
    icon: Wrench,
    image: "https://storage.googleapis.com/bda_rental/bda-group/images/project.webp",
    badge: "Maintenance",
    isExternal: true,
  },
  {
    id: "function-event",
    name: "Function & Event",
    brand: "BDA Events",
    category: "Event Planning",
    desc: "Elevate your cherished moments with our exceptional event planning services at Best Deal Asia Group. We specialize in curating unforgettable experiences for every occasion. Explore our carefully selected range of exclusive accommodations, meticulously tailored to serve as the perfect backdrop for your events. Whether it's a romantic wedding, a joyful gathering, a milestone birthday, or a corporate celebration, our venues are crafted to make your special day truly exceptional. Relax and let us take care of the details! Our dedicated team ensures a seamless event planning process, allowing you to focus on creating enduring memories.",
    href: "/#function-event",
    ctaText: "Explore",
    icon: CalendarCheck,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    badge: "Events",
    isExternal: false,
  },
  {
    id: "digital-solutions",
    name: "Digital Solutions",
    brand: "BDA Digital Solutions",
    category: "Technology & Creative",
    desc: "At BDA Digital Solutions, we specialize in crafting unparalleled services and digital products to meet your unique needs. Our expertise spans across a spectrum of services including web design, mobile apps, graphic design, social media management, and digital marketing. Elevate your online presence with our innovative solutions tailored just for you.",
    href: "https://bestdealsdigitalsolutions.com/",
    ctaText: "Explore",
    icon: Sparkles,
    image: "https://storage.googleapis.com/bda_rental/bda-group/images/digital-1.webp",
    images: [
      "https://storage.googleapis.com/bda_rental/bda-group/images/digital-1.webp",
      "https://storage.googleapis.com/bda_rental/bda-group/images/digital-2.webp",
      "https://storage.googleapis.com/bda_rental/bda-group/images/digital-3.webp",
    ],
    badge: "Tech",
    isExternal: true,
  },
];

export interface SocialLink {
  name: string;
  href: string;
  icon: "tiktok" | "instagram" | "facebook" | "youtube";
}

export const socialLinks: SocialLink[] = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/bestdealsasiarentals",
    icon: "instagram",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/people/Best-Deals-Asia-Group/100086480796938/",
    icon: "facebook",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@bestdealsasiagroup",
    icon: "tiktok",
  },
  /*
  {
    name: "YouTube",
    href: "https://www.youtube.com/@bestdealsasiagroup",
    icon: "youtube",
  },
  */
];
