import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import axios from "axios";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // RSS Proxy to bypass CORS
  app.get("/api/rss-proxy", async (req, res) => {
    try {
      const response = await axios.get("https://blog.mboker.cn/rss.xml", {
        headers: { 
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/xml, application/xml, application/rss+xml'
        },
        timeout: 10000
      });
      res.set("Content-Type", "text/xml; charset=utf-8");
      res.send(response.data);
    } catch (error) {
      console.error("RSS Proxy Error:", error);
      res.status(500).send("Failed to fetch RSS feed");
    }
  });

  // Daily Image Proxy (Bing)
  app.get("/api/daily-image", async (req, res) => {
    try {
      const bingResponse = await axios.get("https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN");
      const imageUrl = "https://www.bing.com" + bingResponse.data.images[0].url;
      res.json({ url: imageUrl, title: bingResponse.data.images[0].title });
    } catch (error) {
      console.error("Daily Image Error:", error);
      res.json({ url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000", title: "Nature" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
