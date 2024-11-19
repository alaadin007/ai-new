import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ChatWindow } from './components/ChatWindow';
import { SearchSection } from './components/SearchSection';
import { NewsArticle } from './pages/NewsArticle';
import { NewsIndex } from './pages/NewsIndex';
import { PatientSearch } from './components/PatientManagement/PatientSearch';
import PatientDetails from './pages/PatientDetails';
import { generateResponse } from './lib/openai';
import { ChatHistory } from './components/ChatHistory';
import { useChatStore } from './lib/store';

// Wrapper component to handle chat layout
function ChatLayout() {
  const [messages, setMessages] = useState<Array<{ isAi: boolean; message: string }>>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const { sessions, currentSessionId, fetchSessions, createSession, addMessage, setCurrentSession } = useChatStore();

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const handleSearch = async (query: string) => {
    setIsChatVisible(true);
    setIsLoading(true);
    setMessages(prev => [...prev, { isAi: false, message: query }]);

    try {
      const response = await generateResponse(query);
      setMessages(prev => [...prev, { isAi: true, message: response }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { isAi: true, message: 'I apologize, but I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    const message = newMessage;
    setNewMessage('');
    setMessages(prev => [...prev, { isAi: false, message }]);
    setIsLoading(true);

    try {
      const response = await generateResponse(message);
      setMessages(prev => [...prev, { isAi: true, message: response }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { isAi: true, message: 'I apologize, but I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = async () => {
    const sessionId = await createSession('New Chat');
    setCurrentSession(sessionId);
    setMessages([]);
    setIsChatVisible(false);
  };

  const handleSaveToCategory = (sessionId: string, category: string) => {
    console.log('Save to category:', sessionId, category);
  };

  return (
    <div className="flex">
      <ChatHistory
        sessions={sessions}
        currentSessionId={currentSessionId}
        onSelectSession={setCurrentSession}
        onNewChat={handleNewChat}
        onSaveToCategory={handleSaveToCategory}
      />
      <div className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <SearchSection onSearch={handleSearch} />
          <ChatWindow
            messages={messages}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            onSendMessage={handleSendMessage}
            onSaveToCategory={handleSaveToCategory}
            isVisible={isChatVisible}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

// Main App component
function App() {
  const location = useLocation();
  const showChatHistory = location.pathname === '/';

  return (
    <div className="min-h-screen bg-[#0B1220] text-white flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<ChatLayout />} />
          <Route path="/news" element={<NewsIndex />} />
          <Route path="/news/:id/:slug" element={<NewsArticle />} />
          <Route path="/patients" element={<PatientSearch />} />
          <Route path="/patients/:id" element={<PatientDetails />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

// Router wrapper
export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}