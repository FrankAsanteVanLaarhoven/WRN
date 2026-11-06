import React, { useState } from 'react';
import { useStaggerEntrance } from '../hooks/useGsapAnimation';
import {
  Send,
  Mail,
  MessageSquare,
  Bell,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
  Radio,
  Sliders
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';

export const MessagingView: React.FC = () => {
  const containerRef = useStaggerEntrance();
  const [channel, setChannel] = useState<'email' | 'sms' | 'push'>('email');
  const [campaignTopic, setCampaignTopic] = useState('product-updates');
  const [targetCount, setTargetCount] = useState(1248);
  const [messageSubject, setMessageSubject] = useState('Welcome to WRN Coexistence Platform');
  const [messageBody, setMessageBody] = useState("Thanks for signing up. Here's how to get started with your new account and bounded agents.");
  const [isDispatched, setIsDispatched] = useState(false);

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDispatched(true);
    setTimeout(() => {
      setIsDispatched(false);
    }, 2500);
  };

  return (
    <div ref={containerRef} className="flex-1 flex flex-col h-full overflow-y-auto bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border gap-3 gsap-fade-in">
        <div>
          <div className="flex items-center space-x-2">
            <Send className="w-5 h-5 text-illum" />
            <h1 className="text-xl font-bold text-white tracking-tight">Unified Messaging & Notifications</h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Send email, SMS, and push notification campaigns through a single omnichannel API.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Badge variant="success">SendGrid: Active</Badge>
          <Badge variant="tube">Twilio: Active</Badge>
          <Badge variant="outline">FCM: Active</Badge>
        </div>
      </div>

      {/* Main Campaign Composer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 gsap-fade-in">
        {/* Left: Campaign Editor */}
        <div className="md:col-span-2 p-5 rounded-xl bg-surface-card border border-border space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <span className="text-xs font-mono font-bold text-white uppercase">Campaign Message Composer</span>

            {/* Channel Tabs */}
            <div className="flex items-center space-x-1 p-0.5 rounded-lg bg-surface border border-border text-xs font-mono">
              <button
                onClick={() => setChannel('email')}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded transition-all ${
                  channel === 'email' ? 'active-tube-pill font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Mail className="w-3 h-3" />
                <span>Email</span>
              </button>
              <button
                onClick={() => setChannel('sms')}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded transition-all ${
                  channel === 'sms' ? 'active-tube-pill font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <MessageSquare className="w-3 h-3" />
                <span>SMS</span>
              </button>
              <button
                onClick={() => setChannel('push')}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded transition-all ${
                  channel === 'push' ? 'active-tube-pill font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Bell className="w-3 h-3" />
                <span>Push</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleDispatch} className="space-y-3 text-xs font-mono">
            <div>
              <label className="text-slate-400 block mb-1">Target Topic</label>
              <select
                value={campaignTopic}
                onChange={e => setCampaignTopic(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-background border border-border text-white focus:outline-none focus:border-illum"
              >
                <option value="product-updates">product-updates ({targetCount} recipients)</option>
                <option value="security-alerts">security-alerts (All verified users)</option>
                <option value="agent-dispatches">agent-dispatches (Developers)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Subject / Header</label>
              <input
                type="text"
                value={messageSubject}
                onChange={e => setMessageSubject(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-background border border-border text-white focus:outline-none focus:border-illum"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Message Content</label>
              <textarea
                rows={4}
                value={messageBody}
                onChange={e => setMessageBody(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-background border border-border text-slate-300 focus:outline-none focus:border-illum"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-slate-400 text-[11px]">
                Omnichannel delivery via <strong className="text-white">Cloudflare Edge Queue</strong>
              </span>

              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg neon-tube-button font-semibold flex items-center space-x-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isDispatched ? 'Dispatched to 1,248 Targets!' : 'Send Campaign'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right: Live Delivery Channels */}
        <div className="space-y-3">
          <div className="p-4 rounded-xl neon-tube-card space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-white font-bold">Email (SendGrid)</span>
              <Badge variant="success">99.8% Delivered</Badge>
            </div>
            <div className="text-xl font-bold text-white">42,890</div>
            <div className="text-[10px] text-slate-400 font-mono">Sent past 30 days</div>
          </div>

          <div className="p-4 rounded-xl neon-tube-card space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-white font-bold">SMS (Twilio)</span>
              <Badge variant="success">Sub-second</Badge>
            </div>
            <div className="text-xl font-bold text-illum">6,120</div>
            <div className="text-[10px] text-slate-400 font-mono">Sent past 30 days</div>
          </div>

          <div className="p-4 rounded-xl neon-tube-card space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-white font-bold">Web & Mobile Push</span>
              <Badge variant="tube">Zero-Drop</Badge>
            </div>
            <div className="text-xl font-bold text-white">128,400</div>
            <div className="text-[10px] text-slate-400 font-mono">FCM / APNs delivered</div>
          </div>
        </div>
      </div>
    </div>
  );
};
