import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Button } from '../Button'
import { Card } from '../Card'
import { CreateContentModal } from '../CreateContentModal'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Sidebar } from '../Sidebar'
import { useContents } from '../../hooks/useContents'
import { BACKEND_URL, SITE_URL } from '../../config'
import axios from 'axios'


import { Logo } from '../icons/Logo'

import toast from "react-hot-toast";

// Imports checked

export function DashBoard() {

  const [modalopen, setmodalopen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token, navigate]);
  const { cards, loading, error, deleteCard } = useContents(token);
  const [search, setSearch] = useState("");

  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const filteredCards = cards.filter(card => {
    const matchesType = !typeFilter || (card.type && card.type.toLowerCase() === typeFilter.toLowerCase());
    const matchesSearch = card.title.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });


  const [shareLink, setShareLink] = useState<string | null>(null);
  const [shareLoading, setShareLoading] = useState(false);



  useEffect(() => {
    async function fetchShareStatus() {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/brain/share`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const hash = response.data.hash || response.data.link;
        if (hash && hash !== "undefined") {
          setShareLink(`${SITE_URL}/share/${hash}`);
        } else {
          setShareLink(null);
        }
      } catch (err) {
        console.error("Failed to fetch share status:", err);
        setShareLink(null);
      }
    }
    fetchShareStatus();
  }, []);

  async function handleShareOn() {
    setShareLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, { share: true }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const hash = response.data.hash || response.data.link;
      if (hash && hash !== "undefined") {
        setShareLink(`${SITE_URL}/share/${hash}`);
        toast.success("Sharing enabled!");
      } else {
        toast.error("Server returned an invalid share hash. Please try again.");
      }
    } catch (err) {
      console.error("Sharing failed:", err);
      toast.error("Could not enable sharing. Please check your connection.");
    } finally {
      setShareLoading(false);
    }
  }

  async function handleShareOff() {
    setShareLoading(true);
    try {
      await axios.post(`${BACKEND_URL}/api/v1/brain/share`, { share: false }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setShareLink(null);
    } finally {
      setShareLoading(false);
    }
  }


  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-slate-950 transition-colors duration-300">
      <Sidebar setTypeFilter={setTypeFilter} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {sidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden transition-all duration-300" onClick={() => setSidebarOpen(false)}></div>
      )}

      <div className="ml-0 md:ml-72 min-h-screen transition-all duration-300">
        <CreateContentModal open={modalopen} onClose={() => setmodalopen(false)} />

        {/* Header/Actions Bar */}
        <header className="sticky top-0 z-30 bg-[#fafafa]/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-900 px-6 py-4 md:px-10 md:py-6 pl-16 md:pl-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="animate-fade-in">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Your Knowledge</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Manage your ideas and collections</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {shareLink ? (
                <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-2xl shadow-sm border border-purple-100 dark:border-slate-800 text-xs md:text-sm animate-fade-in" >
                  <span className="text-gray-400">Share link:</span>
                  <a href={shareLink} target='_blank' rel="noopener noreferrer" className='text-purple-600 dark:text-purple-400 font-medium truncate max-w-[120px] md:max-w-[200px] hover:underline'>{shareLink}</a>
                  <button onClick={() => { navigator.clipboard.writeText(shareLink) }} className="hover:text-purple-700 dark:hover:text-purple-300 font-bold ml-1 transition-colors cursor-pointer">Copy</button>
                  <div className="h-4 w-px bg-gray-200 dark:bg-slate-800 mx-1"></div>
                  <button onClick={handleShareOff} className="text-red-500 hover:text-red-600 text-xs font-semibold transition-colors cursor-pointer">Stop</button>
                </div>
              ) : (
                <Button onClick={handleShareOn} variant='secondary' text='Share Collection' startIcon={<ShareIcon />} loading={shareLoading} />
              )}

              <Button variant='primary' text='Add Content' startIcon={<PlusIcon />} onClick={() => setmodalopen(true)} />
            </div>
          </div>
        </header>

        <main className="p-6 md:p-10 max-w-7xl mx-auto">
          {/* Search bar */}
          <div className="mb-10 relative max-w-md animate-fade-in">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
            <input
              type='text'
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder='Search your brain...'
              className='bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl pl-11 pr-4 py-3 w-full shadow-sm dark:shadow-none focus:outline-none focus:ring-2 focus:ring-purple-600/10 dark:focus:ring-purple-500/20 focus:border-purple-600 dark:focus:border-purple-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 transition-all'
            />
          </div>

          {/* Grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 animate-pulse">
              <div className="w-12 h-12 bg-purple-100 dark:bg-slate-800 rounded-full mb-4"></div>
              <div className="h-4 w-32 bg-gray-100 dark:bg-slate-800 rounded"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 p-6 rounded-3xl border border-red-100 dark:border-red-900/20 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              {error}
            </div>
          ) : filteredCards.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center animate-fade-in">
              <div className="p-6 bg-gray-50 dark:bg-slate-900 rounded-full mb-6 text-gray-200 dark:text-slate-800">
                <Logo />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">No ideas found</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-xs">
                {search ? `We couldn't find anything matching "${search}"` : "Your second brain is empty. Start by adding some content!"}
              </p>
            </div>
          ) : (
            <div className='flex flex-wrap gap-8 justify-center md:justify-start animate-fade-in'>
              {filteredCards.map(card => (
                <Card
                  key={card._id}
                  title={card.title}
                  link={card.link}
                  type={(card.type || "").toLowerCase() as "youtube" | "twitter" | "notes"}
                  id={card._id}
                  text={card.text}
                  onDelete={deleteCard}
                  onShare={() => { navigate(`/share/${card._id}`) }}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default DashBoard

