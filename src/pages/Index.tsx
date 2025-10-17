import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Avatar } from '@/components/ui/avatar';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Привет! Я AI ассистент. Чем могу помочь?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponses = [
        'Отличный вопрос! Я могу помочь вам с этим.',
        'Понял вас. Давайте разберёмся с этой задачей.',
        'Интересно! Вот что я думаю по этому поводу...',
        'Я обработал ваш запрос и готов предложить решение.',
      ];

      const aiMessage: Message = {
        id: Date.now() + 1,
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F19] via-[#151922] to-[#0B0F19] flex flex-col">
      <header className="border-b border-border/40 backdrop-blur-sm bg-card/30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF9D00] to-[#FFD21E] flex items-center justify-center">
              <Icon name="Sparkles" size={20} className="text-background" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-[#FF9D00] to-[#FFD21E] bg-clip-text text-transparent">
                AI Chat
              </h1>
              <p className="text-xs text-muted-foreground">Powered by AI</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="border-border/40 hover:bg-muted/50">
            <Icon name="Settings" size={16} className="mr-2" />
            Настройки
          </Button>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6 max-w-4xl flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 pb-4">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex gap-3 animate-fade-in ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {message.sender === 'ai' && (
                <Avatar className="w-8 h-8 border-2 border-primary/20">
                  <div className="w-full h-full bg-gradient-to-br from-[#FF9D00] to-[#FFD21E] flex items-center justify-center">
                    <Icon name="Bot" size={16} className="text-background" />
                  </div>
                </Avatar>
              )}

              <Card
                className={`px-4 py-3 max-w-[80%] ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-br from-[#FF9D00] to-[#FFD21E] text-background border-0'
                    : 'bg-card border-border/40'
                }`}
              >
                <p className={`text-sm leading-relaxed ${message.sender === 'user' ? 'text-background' : 'text-foreground'}`}>
                  {message.text}
                </p>
                <p
                  className={`text-xs mt-2 ${
                    message.sender === 'user' ? 'text-background/70' : 'text-muted-foreground'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString('ru-RU', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </Card>

              {message.sender === 'user' && (
                <Avatar className="w-8 h-8 border-2 border-muted">
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <Icon name="User" size={16} className="text-foreground" />
                  </div>
                </Avatar>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start animate-fade-in">
              <Avatar className="w-8 h-8 border-2 border-primary/20">
                <div className="w-full h-full bg-gradient-to-br from-[#FF9D00] to-[#FFD21E] flex items-center justify-center">
                  <Icon name="Bot" size={16} className="text-background" />
                </div>
              </Avatar>
              <Card className="px-4 py-3 bg-card border-border/40">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </Card>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="sticky bottom-0 pt-4 bg-gradient-to-t from-background via-background to-transparent">
          <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/40">
            <div className="flex gap-3 items-end">
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Напишите сообщение..."
                className="min-h-[60px] max-h-[200px] resize-none bg-muted/50 border-border/40 focus:border-primary/40"
              />
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="bg-gradient-to-r from-[#FF9D00] to-[#FFD21E] hover:from-[#FF9D00]/90 hover:to-[#FFD21E]/90 text-background font-medium px-6"
              >
                <Icon name="Send" size={18} />
              </Button>
            </div>
            <div className="flex gap-2 mt-3">
              <Button
                variant="outline"
                size="sm"
                className="text-xs border-border/40 hover:bg-muted/50"
                onClick={() => setInputValue('Расскажи о себе')}
              >
                Расскажи о себе
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs border-border/40 hover:bg-muted/50"
                onClick={() => setInputValue('Как ты работаешь?')}
              >
                Как ты работаешь?
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs border-border/40 hover:bg-muted/50"
                onClick={() => setInputValue('Помоги с задачей')}
              >
                Помоги с задачей
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
