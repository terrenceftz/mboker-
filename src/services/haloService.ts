/**
 * Service to interact with Halo Blog API
 */

export interface HaloPost {
  metadata: {
    name: string;
    generateName: string;
    creationTimestamp: string;
  };
  spec: {
    title: string;
    slug: string;
    cover: string;
    excerpt: string;
    publishTime: string;
  };
  status: {
    permalink: string;
  };
}

const DEFAULT_HALO_URL = import.meta.env.VITE_HALO_API_URL || 'https://blog.mboker.cn';
const HALO_TOKEN = import.meta.env.VITE_HALO_API_TOKEN || '';

/**
 * Fetches latest posts using Halo API (Primary) or RSS fallback
 */
export async function fetchLatestPosts(haloUrl: string = DEFAULT_HALO_URL, size: number = 5): Promise<HaloPost[]> {
  // First try the RSS feed as requested by the user, as it often bypasses some API complexities
  try {
    const rssPosts = await fetchRSSPosts(haloUrl, size);
    if (rssPosts && rssPosts.length > 0) return rssPosts;
  } catch (error) {
    console.warn('RSS fetch failed, trying API...', error);
  }

  // Fallback to Content API if RSS fails
  try {
    const response = await fetch(`${haloUrl}/api/content.halo.run/v1alpha1/posts?size=${size}&sort=publishTime,desc`, {
      headers: {
        'Accept': 'application/json',
        ...(HALO_TOKEN ? { 'Authorization': `Bearer ${HALO_TOKEN}` } : {})
      },
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.warn('Halo API fetch failed, using mock data.', error);
    return getMockPosts();
  }
}

/**
 * Specifically fetches and parses the RSS feed
 */
async function fetchRSSPosts(baseUrl: string, size: number): Promise<HaloPost[]> {
  // Use the local server proxy to bypass CORS
  const response = await fetch('/api/rss-proxy');
  if (!response.ok) throw new Error('RSS Proxy fetch failed');
  
  const xmlText = await response.text();
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, "text/xml");
  const items = xmlDoc.querySelectorAll("item");
  
  const posts: HaloPost[] = [];
  
  for (let i = 0; i < Math.min(items.length, size); i++) {
    const item = items[i];
    const title = item.querySelector("title")?.textContent || "Untitled";
    const link = item.querySelector("link")?.textContent || "#";
    const pubDate = item.querySelector("pubDate")?.textContent || new Date().toISOString();
    const description = item.querySelector("description")?.textContent || "";
    
    // Extract first image from description if cover is missing in RSS (optional enhancement)
    const coverMatch = description.match(/<img[^>]+src="([^">]+)"/);
    const cover = coverMatch ? coverMatch[1] : "";
    
    // Create excerpt by stripping HTML tags
    const excerpt = description.replace(/<[^>]*>/g, '').substring(0, 150) + "...";

    posts.push({
      metadata: {
        name: `rss-${i}`,
        generateName: 'rss',
        creationTimestamp: new Date(pubDate).toISOString(),
      },
      spec: {
        title,
        slug: link.split('/').pop() || 'post',
        cover,
        excerpt,
        publishTime: new Date(pubDate).toISOString(),
      },
      status: {
        permalink: link,
      }
    });
  }
  
  return posts;
}

function getMockPosts(): HaloPost[] {
  return [
    {
      metadata: {
        name: 'post-1',
        generateName: 'p1',
        creationTimestamp: new Date().toISOString(),
      },
      spec: {
        title: '探索数字艺术的边界 (Exploring Digital Art Boundaries)',
        slug: 'exploring-digital-art',
        cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
        excerpt: '在这篇文章中，我们深入探讨了生成式艺术如何改变现代设计的景观，以及它所带来的无限可能性。',
        publishTime: new Date().toISOString(),
      },
      status: {
        permalink: '#',
      }
    },
    {
      metadata: {
        name: 'post-2',
        generateName: 'p2',
        creationTimestamp: new Date().toISOString(),
      },
      spec: {
        title: '全栈开发的未来趋势 (Future Trends in Fullstack)',
        slug: 'future-fullstack',
        cover: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop',
        excerpt: '从边缘计算到智能合约，全栈工程师正面临着前所未有的机遇与挑战。本文将为你一一拆解。',
        publishTime: new Date().toISOString(),
      },
      status: {
        permalink: '#',
      }
    },
    {
      metadata: {
        name: 'post-3',
        generateName: 'p3',
        creationTimestamp: new Date().toISOString(),
      },
      spec: {
        title: '极简主义与用户体验 (Minimalism & UX)',
        slug: 'minimalism-ux',
        cover: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=1200&auto=format&fit=crop',
        excerpt: '少即是多。在过度拥挤的信息时代，如何通过极简主义设计提升产品的使用体验。',
        publishTime: new Date().toISOString(),
      },
      status: {
        permalink: '#',
      }
    }
  ];
}
