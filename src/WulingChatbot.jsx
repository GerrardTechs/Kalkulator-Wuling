import { useState, useRef, useEffect } from 'react';

export default function WulingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const initialRecommendations = [
    'Apa promo diskon Binguo MY26?',
    'Apa itu WFMS pada unit Darion?',
    'Apa itu Magic Battery Pro pada Wuling EV?',
    'Berapa lama garansi mesin untuk Wuling Eksion?'
  ];

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Halo Kak! 👋 Selamat datang di **Wuling Arista Lampung**. Saya Wuling AI Assistant. Silakan pilih topik di bawah atau ketik pertanyaan apa saja seputar unit, promo, dan teknologi Wuling ya!',
      recommendations: initialRecommendations
    }
  ]);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isOpen]);

  const formatBoldText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-extrabold text-slate-900">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  // Pemetaan kode visual dari AI ke file gambar di folder public/
  const visualMap = {
    'wfms': {
      url: '/wfms.jpg',
      title: 'Arsitektur Wonder Flexible Modular System (WFMS)'
    },
    'magic-battery': {
      url: '/magic-battery.jpg',
      title: '5 Perlindungan Keamanan MAGIC Battery Pro'
    },
    'ling-power': {
      url: '/ling-power.jpg',
      title: 'Komponen & 3 Mode Energi LING POWER Hybrid System'
    }
  };

  // Kirim pertanyaan (baik dari klik rekomendasi maupun ketik bebas) ke Backend AI
  const sendMessageToAI = async (currentHistory, userText) => {
    setIsTyping(true);

    try {
      const response = await fetch('https://kalkulator-wuling-be.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: currentHistory,
          message: userText
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Terjadi kesalahan server');

      const matchedVisual = data.visual && visualMap[data.visual] ? visualMap[data.visual] : null;

      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: data.reply,
          visualUrl: matchedVisual ? matchedVisual.url : null,
          visualTitle: matchedVisual ? matchedVisual.title : null,
          visualShown: false,
          recommendations: Array.isArray(data.recommendations) && data.recommendations.length > 0
            ? data.recommendations
            : initialRecommendations
        }
      ]);
    } catch (error) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'Maaf Kak, koneksi ke server AI terputus. Pastikan terminal backend (`node server.js`) sedang menyala ya! 🙏',
          recommendations: initialRecommendations
        }
      ]);
    }
  };

  const handleSelectRecommendation = (recText) => {
    if (isTyping) return;
    setMessages((prev) => [...prev, { sender: 'user', text: recText }]);
    sendMessageToAI(messages, recText);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isTyping) return;

    const query = inputMessage;
    setInputMessage('');
    setMessages((prev) => [...prev, { sender: 'user', text: query }]);
    sendMessageToAI(messages, query);
  };

  const handleShowVisual = (index, visualUrl, visualTitle) => {
    if (isTyping) return;
    setMessages((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], visualShown: true };
      return [...updated, { sender: 'user', text: `Tampilkan visual: ${visualTitle}` }];
    });
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: `Berikut adalah gambar visual untuk **${visualTitle}**, Kak:`,
          image: visualUrl,
          imageAlt: visualTitle
        }
      ]);
    }, 300);
  };

  const activeRecommendations = (() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].recommendations && messages[i].recommendations.length > 0) {
        return messages[i].recommendations;
      }
    }
    return initialRecommendations;
  })();

  return (
    <div className="fixed bottom-20 right-5 z-50 font-sans">
      {isOpen && (
        <div className="bg-white w-81 sm:w-96 h-[560px] rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden mb-3 animate-pop-in origin-bottom-right">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-800 to-cyan-600 p-4 text-white flex justify-between items-center shadow">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg animate-bounce">
                🤖
              </div>
              <div>
                <h4 className="font-extrabold text-sm leading-tight">Wuling AI Assistant</h4>
                <p className="text-[11px] text-blue-100 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block"></span>
                  Online • Wuling Arista Lampung
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white hover:rotate-90 transition-transform duration-200 text-lg font-bold px-2"
            >
              ✕
            </button>
          </div>

          {/* Area Chat */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col animate-pop-in ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 whitespace-pre-line leading-relaxed shadow-sm transition-all ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none font-medium'
                      : 'bg-white text-slate-700 border border-slate-200 rounded-bl-none'
                  }`}
                >
                  {formatBoldText(msg.text)}

                  {msg.image && (
                    <div className="mt-2.5 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 animate-fade-in-up">
                      <img
                        src={msg.image}
                        alt={msg.imageAlt}
                        className="w-full h-auto object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => window.open(msg.image, '_blank')}
                      />
                      <p className="text-[10px] text-center text-slate-500 py-1 bg-white">
                        🔍 Klik gambar untuk memperbesar
                      </p>
                    </div>
                  )}

                  {msg.visualUrl && !msg.visualShown && (
                    <div className="mt-3 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => handleShowVisual(idx, msg.visualUrl, msg.visualTitle)}
                        className="w-full bg-amber-50 hover:bg-amber-100 hover:scale-[1.02] active:scale-95 text-amber-800 border border-amber-300 font-bold py-1.5 px-3 rounded-lg text-[11px] flex items-center justify-center gap-1.5 transition-all shadow-sm"
                      >
                        <span>🖼️ Lihat Visual Komponen Ini</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start animate-pop-in">
                <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.15s]"></span>
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.3s]"></span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Rekomendasi Dinamis Hasil Racikan AI */}
          <div className="p-2.5 bg-white border-t border-slate-200">
            <p className="text-[10px] font-bold uppercase text-slate-400 mb-1.5 tracking-wider px-1">
              💡 Rekomendasi Pertanyaan Lanjutan:
            </p>
            <div className="flex flex-col gap-1 max-h-28 overflow-y-auto pr-1">
              {activeRecommendations.map((rec, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectRecommendation(rec)}
                  className="group text-left text-[11px] bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 text-slate-700 font-semibold py-1.5 px-2.5 rounded-xl border border-slate-200 transition-all duration-200 flex justify-between items-center"
                >
                  <span className="truncate">{rec}</span>
                  <span className="text-blue-500 font-bold ml-1 group-hover:translate-x-0.5 transition-transform">→</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input Chat */}
          <form onSubmit={handleSendMessage} className="p-2.5 bg-slate-100 border-t border-slate-200 flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ketik sapaan atau tanya seputar Wuling..."
              className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-xl text-xs transition shadow active:scale-95"
            >
              Kirim
            </button>
          </form>

        </div>
      )}

      {/* Tombol Floating */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-gradient-to-r from-blue-700 to-cyan-600 hover:from-blue-800 hover:to-cyan-700 text-white font-extrabold py-3.5 px-5 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-2.5 transition-all duration-300 ml-auto ${
          !isOpen ? 'animate-float' : ''
        }`}
      >
        <span className="text-xl transition-transform duration-300">{isOpen ? '✕' : '💬'}</span>
        <span className="text-xs sm:text-sm">
          {isOpen ? 'Tutup Wuling AI' : 'Tanya Komponen Wuling (AI)'}
        </span>
      </button>
    </div>
  );
}