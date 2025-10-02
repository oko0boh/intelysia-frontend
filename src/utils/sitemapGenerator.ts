import { businesses } from './data';

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const generateSitemap = (): SitemapUrl[] => {
  const baseUrl = 'https://intelysia.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const urls: SitemapUrl[] = [
    // Main pages
    {
      loc: `${baseUrl}/`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 1.0
    },
    {
      loc: `${baseUrl}/about`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/blog`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/search`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.8
    }
  ];

  // Add business detail pages
  businesses.forEach(business => {
    urls.push({
      loc: `${baseUrl}/business/${business.id}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.7
    });
  });

  // Add category pages
  const categories = Array.from(new Set(businesses.map(b => b.category)));
  categories.forEach(category => {
    urls.push({
      loc: `${baseUrl}/category/${encodeURIComponent(category.toLowerCase())}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.8
    });
  });

  // Add location pages
  const locations = Array.from(new Set(businesses.map(b => b.location)));
  locations.forEach(location => {
    urls.push({
      loc: `${baseUrl}/location/${encodeURIComponent(location.toLowerCase())}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.8
    });
  });

  return urls;
};

export const generateSitemapXML = (): string => {
  const urls = generateSitemap();
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  urls.forEach(url => {
    xml += '  <url>\n';
    xml += `    <loc>${url.loc}</loc>\n`;
    if (url.lastmod) xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    if (url.changefreq) xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    if (url.priority) xml += `    <priority>${url.priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  return xml;
};
