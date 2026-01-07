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
    const matchesType = !typeFilter || card.type === typeFilter;
    const matchesSearch = card.title.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });


  const [shareLink, setShareLink] = useState<string | null>(null);
  const [shareLoading, setShareLoading] = useState(false);



  useEffect(() => {
    async function fetchShareStatus() {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/brain/share`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if ((response as any).data.hash) {
          setShareLink(`${SITE_URL}/share/${(response as any).data.hash}`)
        } else {
          setShareLink(null);
        }
      } catch {
        setShareLink(null);
      }
    }
    fetchShareStatus();
  }, []);

  async function handleShareOn() {
    setShareLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, { share: true }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`token`)}`
        }
      });
      setShareLink(`${SITE_URL}/share/${(response as any).data.hash}`);
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


  return (<div>
    <Sidebar setTypeFilter={setTypeFilter} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    {sidebarOpen && <div className="fixed inset-0 bg-slate-900/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)}></div>}
    <div className='p-4 ml-0 md:ml-72 min-h-screen bg-purple-50'>
      <CreateContentModal open={modalopen} onClose={() => {
        setmodalopen(false)
      }} />
      <div className='flex justify-end items-center mb-4'>
        <div className='flex justify-end gap-4'>
          <Button variant='primary' text='Add Content ' startIcon={<PlusIcon />} onClick={() => {
            setmodalopen(true)
          }} />

          {shareLink ?
            (
              <>
                <Button onClick={handleShareOff} variant='secondary' text='Share' startIcon={<ShareIcon />} loading={shareLoading} />
                <div className='flex items-center gap-2 bg-white px-2 py-1 rounded shadow border text-sm max-w-full overflow-x-auto' >
                  <span>Share link:</span>
                  <a href={shareLink} target='_blank' rel="noopener noreferrer" className='text-blue-600 underline truncate max-w-[200px]'>{shareLink}</a>
                  <Button onClick={() => { navigator.clipboard.writeText(shareLink) }} variant='primary' text='Copy' />
                </div>
              </>
            ) : (
              <Button onClick={handleShareOn} variant='secondary' text='Share' startIcon={<ShareIcon />} />
            )
          }
        </div>
      </div>
      <input type='text' value={search} onChange={e => setSearch(e.target.value)} placeholder='Search by title ' className='border rounded px-3 py-2 w-full md:w-64 mb-4' />
      <div className='flex gap-4 flex-wrap'>
        {loading && <div>Loading....</div>}
        {error && <div className='text-red-500' >{error}</div>}
        {filteredCards.map(card => (
          <Card
            key={card._id}
            id={card._id}
            title={card.title}
            link={card.link}
            type={card.type}
            onDelete={deleteCard}
            onShare={() => { navigate(`/share/${card._id}`) }}
          />
        ))}
      </div>
    </div>
  </div>
  )

}

export default DashBoard
