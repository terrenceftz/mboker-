/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowUpRight, Calendar, ArrowRight, Image as ImageIcon, MapPin, Wind } from 'lucide-react';
import { fetchLatestPosts, HaloPost } from './services/haloService';

// Logo Component with Purple Theme
const HaloLogo = ({ className = "" }: { className?: string }) => (
  <svg 
    id="_图层_1" 
    data-name="图层 1" 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 681.51 197.5"
    className={className}
  >
    <defs>
      <style>{`
        .cls-1 { fill: #9d8df1; stroke-width: 0px; }
        .cls-2 { fill: #c5b4f3; stroke-width: 0px; }
      `}</style>
    </defs>
    <g>
      <motion.path 
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="cls-2" 
        d="M161.81,2.12L9.42,122.73c-12.68,10.04-11.87,27.8-1.67,37.48l67.58-17.41c12.25-3.16,22.75,9.19,17.68,20.78l-5.5,12.54c24.74-1.3,46.71-18.02,53.95-42.66L177.02,12.38c2.65-9.01-7.85-16.09-15.21-10.26Z"
      />
      <motion.path 
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
        className="cls-2" 
        d="M20.78,166.59c-5.27-.86-9.66-3.18-13.03-6.38h0s30.54,29.09,30.54,29.09c14.91,14.2,39.39,9.28,47.65-9.57l1.58-3.61c-4.2.22-8.48.01-12.79-.69l-53.94-8.84Z"
      />
      <motion.path 
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
        className="cls-1" 
        d="M75.33,142.81L7.75,160.21c3.37,3.2,7.76,5.51,13.03,6.38l53.94,8.84c4.3.71,8.59.91,12.79.69l5.5-12.54c5.08-11.59-5.42-23.93-17.68-20.78Z"
      />
    </g>
    <g>
      {/* Title characters */}
      <motion.path initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="cls-2" d="M262.99,161.74v-49.32l-23.53,49.32h-11.31l-23.08-49.32h-.45c0,2.42.15,6.04.45,10.86v38.46h-11.31v-58.37h16.29l23.98,49.32,23.53-49.32h16.29v58.37h-10.86Z"/>
      <motion.path initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="cls-2" d="M290.14,103.37h36.65c14.78.3,22.47,5.13,23.08,14.48,0,5.73-3.62,9.81-10.86,12.22,10.25,2.71,15.38,7.54,15.38,14.48,0,4.23-1.97,7.85-5.88,10.86-5.13,4.23-12.67,6.33-22.62,6.33h-35.74v-58.37ZM301.45,127.81h19.91c11.76.3,17.49-2.86,17.19-9.5,0-5.73-5.73-8.6-17.19-8.6h-19.91v18.1ZM301.45,154.95h23.98c11.46-.3,17.34-3.77,17.65-10.41,0-6.63-6.64-9.95-19.91-9.95h-21.72v20.36Z"/>
      <motion.path initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="cls-2" d="M433.57,154.95c-7.24,5.43-17.19,8.14-29.86,8.14-13.57,0-23.98-2.86-31.22-8.6-6.04-5.73-9.21-12.51-9.5-20.36.3-9.95,4.82-17.94,13.57-23.98,6.93-4.22,15.98-6.33,27.15-6.33,12.36,0,22.17,2.71,29.41,8.14,6.94,6.04,10.55,13.43,10.86,22.17-.3,8.45-3.78,15.38-10.41,20.81ZM403.71,110.16c-18.4.61-28.05,8.6-28.96,23.98.91,14.48,10.56,22.02,28.96,22.62,18.1-.6,27.75-8.14,28.96-22.62-1.21-15.08-10.86-23.08-28.96-23.98Z"/>
      <motion.path initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="cls-2" d="M468.41,161.74h-11.31v-58.82h11.31v28.5l40.27-28.5h15.84l-34.84,23.98,35.74,34.84h-14.93l-28.96-29.41-13.12,8.6v20.81Z"/>
      <motion.path initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }} className="cls-2" d="M596.45,161.74h-61.08v-59.27h60.18v6.79h-48.87v18.55h45.25v7.24h-45.25v19.46h49.77v7.24Z"/>
      <motion.path initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="cls-2" d="M623.6,161.74h-11.31v-57.91h38.46c8.44,0,14.78,1.06,19,3.17,5.73,2.11,8.6,6.19,8.6,12.22,0,6.33-3.92,11.01-11.76,14.03,6.63,1.21,9.95,4.98,9.95,11.31l.91,10.41c-.3,2.71,1.05,4.52,4.07,5.43v1.36h-14.03c-.91-2.71-1.51-7.54-1.81-14.48.3-6.94-4.68-10.41-14.93-10.41h-27.15v24.88ZM623.6,130.07h26.24c11.16,0,16.74-3.32,16.74-9.95s-4.98-9.95-14.93-9.95h-28.05v19.91Z"/>
    </g>
  </svg>
);

export default function App() {
  const [posts, setPosts] = useState<HaloPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [dailyImage, setDailyImage] = useState({ url: '', title: '' });

  useEffect(() => {
    async function loadData() {
      try {
        const [latest, imageRes] = await Promise.all([
          fetchLatestPosts(undefined, 6),
          fetch('/api/daily-image').then(res => res.json())
        ]);
        setPosts(latest);
        setDailyImage(imageRes);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0a16] text-[#e0d7f5] selection:bg-[#c5b4f3] selection:text-[#0d0a16] font-sans relative overflow-x-hidden">
      
      {/* Daily Image as a full-screen background with overlay */}
      <AnimatePresence>
        {dailyImage.url && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            className="fixed inset-0 z-0 pointer-events-none"
          >
            <img 
              src={dailyImage.url} 
              alt="Daily background" 
              className="w-full h-full object-cover grayscale brightness-50"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Atmospheric Mesh Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#9d8df1]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#c5b4f3]/10 rounded-full blur-[100px]" />
      </div>

      {/* Main Columnized Layout */}
      <main className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        
        {/* LEFT COLUMN: Hero & Identity */}
        <div className="flex-1 p-8 lg:p-20 flex flex-col justify-center border-r border-white/5">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-[180px] mb-12 opacity-80"
          >
            <HaloLogo />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-6xl lg:text-8xl font-black mb-6 tracking-tighter leading-none"
          >
            栖息于 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c5b4f3] to-[#9d8df1]">
              数字边境
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.7 }}
            className="text-xl max-w-md mb-12 leading-relaxed italic font-light"
          >
            记录每一次思考的波动。
            这里不仅是文字的集合，更是灵魂在赛博空间中的一次深长呼吸。
          </motion.p>

          <div className="flex gap-4">
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "#c5b4f3", color: "#0d0a16" }}
              className="px-8 py-4 rounded-full border border-[#c5b4f3] bg-transparent text-[#c5b4f3] font-bold transition-all flex items-center gap-2"
            >
              寻觅旅程 <ArrowRight className="w-4 h-4" />
            </motion.button>
            <button className="px-8 py-4 opacity-40 hover:opacity-100 transition-opacity">关于我</button>
          </div>

          {/* Daily Image Card - Artistic Corner */}
          {dailyImage.url && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-20 flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md max-w-fit"
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer">
                <img src={dailyImage.url} alt="Daily" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#c5b4f3] mb-1">
                  <ImageIcon className="w-3 h-3" /> 每日光影
                </div>
                <div className="text-xs font-medium opacity-80">{dailyImage.title}</div>
              </div>
            </motion.div>
          )}
        </div>

        {/* RIGHT COLUMN: Interactive Feed */}
        <div className="w-full lg:w-[45%] bg-[#0d0a16]/40 backdrop-blur-[60px] p-8 lg:p-12 overflow-y-auto max-h-screen custom-scrollbar">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-[#c5b4f3]">Recent Codex</h2>
            <span className="text-[10px] opacity-30 font-mono">Synced with Halo RSS</span>
          </div>

          <div className="grid grid-cols-1 gap-12">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-4 opacity-20">
                  <div className="h-4 w-24 bg-white rounded flex-shrink-0" />
                  <div className="h-8 w-full bg-white rounded" />
                  <div className="h-20 w-full bg-white rounded" />
                </div>
              ))
            ) : (
              posts.map((post, index) => (
                <motion.a 
                  key={post.metadata.name}
                  href={post.status.permalink}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative block"
                >
                  <div className="flex gap-6 items-start">
                    <span className="text-[11px] font-mono opacity-30 mt-1 rotate-90 origin-left">
                      {new Date(post.spec.publishTime).toLocaleDateString().replace(/\//g, '.')}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-[#9d8df1] transition-colors leading-tight">
                        {post.spec.title}
                      </h3>
                      <p className="text-sm text-[#e0d7f5]/40 line-clamp-3 mb-6 leading-relaxed">
                        {post.spec.excerpt}
                      </p>
                      <div className="flex items-center gap-6">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#c5b4f3] border-b border-[#c5b4f3]/20 pb-1">
                          阅读索引
                        </span>
                        <div className="flex gap-3 opacity-20 group-hover:opacity-100 transition-opacity">
                          <Wind className="w-3 h-3" />
                          <MapPin className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))
            )}
          </div>

          {/* Artistic Footer inside Column */}
          <footer className="mt-32 pt-12 border-t border-white/5 opacity-20 hover:opacity-40 transition-opacity">
            <div className="text-[10px] uppercase font-bold tracking-[0.5em] mb-4">
              MBOKER.CN / DIGITAL SOUL
            </div>
            <p className="text-[10px] leading-loose">
              本站内容归属作者所有。基于 Halo 2.0 系统构建。 <br />
              世界即使喧闹，文字始终安静。
            </p>
          </footer>
        </div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;400;700;800&display=swap');
        
        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background-color: #0d0a16;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(197, 180, 243, 0.1);
        }
      `}</style>
    </div>
  );
}
