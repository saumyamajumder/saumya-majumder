import { contactInfo, experience, faqs, services, siteConfig, skillCategories } from "@/data/site";

/** Person, ProfessionalService, WebSite and FAQPage JSON-LD (server-rendered). */
export function StructuredData() {
  const url = siteConfig.url;
  const personId = `${url}/#person`;
  const current = experience.find((e) => e.current);

  const graph = [
    {
      "@type": "Person",
      "@id": personId,
      name: siteConfig.name,
      jobTitle: siteConfig.role,
      description: siteConfig.seoDescription,
      url,
      email: `mailto:${contactInfo.email}`,
      telephone: contactInfo.phone.replace(/\s/g, ""),
      address: {
        "@type": "PostalAddress",
        addressRegion: "West Bengal",
        addressCountry: "IN",
      },
      sameAs: [contactInfo.linkedin],
      knowsAbout: skillCategories.flatMap((c) => c.skills.map((s) => s.name)),
      ...(current && {
        worksFor: { "@type": "Organization", name: current.company, url: current.companyUrl },
      }),
    },
    {
      "@type": "ProfessionalService",
      "@id": `${url}/#service`,
      name: `${siteConfig.name} — ${siteConfig.role}`,
      description: siteConfig.tagline,
      url,
      image: `${url}/opengraph-image.png`,
      email: contactInfo.email,
      telephone: contactInfo.phone.replace(/\s/g, ""),
      founder: { "@id": personId },
      address: {
        "@type": "PostalAddress",
        addressRegion: "West Bengal",
        addressCountry: "IN",
      },
      areaServed: "Worldwide",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Web development services",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.title, description: s.summary },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${url}/#website`,
      url,
      name: siteConfig.name,
      inLanguage: "en",
      publisher: { "@id": personId },
    },
    {
      "@type": "FAQPage",
      "@id": `${url}/#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ];

  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
