import React, { useState, useEffect } from 'react';
import { useStaggerEntrance } from '../hooks/useGsapAnimation';
import {
  Users,
  UserPlus,
  Search,
  Key,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MoreVertical,
  Mail,
  Lock,
  Smartphone,
  RefreshCw
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  provider: string;
  status: string;
  mfa: boolean;
  lastSeen: string;
  createdAt: string;
}

export const AuthView: React.FC = () => {
  const containerRef = useStaggerEntrance();
  const [users, setUsers] = useState<UserRecord[]>([
    { id: 'usr_01', name: 'Frank Van Laarhoven', email: 'frank@openmeta.io', role: 'Owner', provider: 'Passkey', status: 'active', mfa: true, lastSeen: 'Just now', createdAt: '2026-08-01' },
    { id: 'usr_02', name: 'Maya Chen', email: 'maya@orbit.dev', role: 'Admin', provider: 'GitHub', status: 'active', mfa: true, lastSeen: '4 mins ago', createdAt: '2026-08-15' },
    { id: 'usr_03', name: 'Luis Romero', email: 'luis@northwind.io', role: 'Developer', provider: 'Google', status: 'active', mfa: false, lastSeen: '12 mins ago', createdAt: '2026-08-20' },
    { id: 'usr_04', name: 'Priya Shah', email: 'priya@folio.app', role: 'Analyst', provider: 'Magic Link', status: 'pending', mfa: false, lastSeen: '2 hours ago', createdAt: '2026-08-25' },
    { id: 'usr_05', name: 'Jonah Blake', email: 'jonah@kepler.so', role: 'Agent Service', provider: 'API Key', status: 'active', mfa: true, lastSeen: '1 sec ago', createdAt: '2026-09-01' }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('Developer');

  // Fetch live users from Go daemon if online
  useEffect(() => {
    fetch('http://127.0.0.1:8080/api/v1/auth/users')
      .then(res => res.json())
      .then(data => {
        if (data && data.users) {
          setUsers(data.users);
        }
      })
      .catch(() => {});
  }, []);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail) return;

    try {
      const res = await fetch('http://127.0.0.1:8080/api/v1/auth/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, email: newEmail, role: newRole })
      });
      if (res.ok) {
        const added = await res.json();
        setUsers(prev => [added, ...prev]);
      } else {
        throw new Error();
      }
    } catch {
      const localUser: UserRecord = {
        id: `usr_${String(users.length + 1).padStart(2, '0')}`,
        name: newName,
        email: newEmail,
        role: newRole,
        provider: 'Magic Link',
        status: 'active',
        mfa: false,
        lastSeen: 'Just now',
        createdAt: new Date().toISOString().split('T')[0]
      };
      setUsers(prev => [localUser, ...prev]);
    }

    setNewName('');
    setNewEmail('');
    setIsAddUserOpen(false);
  };

  const filteredUsers = users.filter(
    u =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div ref={containerRef} className="flex-1 flex flex-col h-full overflow-y-auto bg-background p-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border gap-3 gsap-fade-in">
        <div>
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-illum" />
            <h1 className="text-xl font-bold text-white tracking-tight">Authentication & Identity</h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage users, WebAuthn passkeys, OAuth providers, MFA security, and session tokens.
          </p>
        </div>

        <button
          onClick={() => setIsAddUserOpen(true)}
          className="px-3.5 py-1.5 rounded-lg neon-tube-button text-xs font-semibold flex items-center space-x-1.5 cursor-pointer self-start sm:self-auto"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>+ Create User</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 gsap-fade-in">
        <div className="p-4 rounded-xl neon-tube-card">
          <div className="text-xs font-mono text-slate-400">Total Users</div>
          <div className="text-xl font-bold text-white mt-1">{users.length}</div>
          <div className="text-[10px] text-emerald-400 font-mono mt-1">100% active identity tier</div>
        </div>
        <div className="p-4 rounded-xl neon-tube-card">
          <div className="text-xs font-mono text-slate-400">Passkey / WebAuthn</div>
          <div className="text-xl font-bold text-illum mt-1">80%</div>
          <div className="text-[10px] text-slate-400 font-mono mt-1">Hardware-bound keys</div>
        </div>
        <div className="p-4 rounded-xl neon-tube-card">
          <div className="text-xs font-mono text-slate-400">MFA Enforced</div>
          <div className="text-xl font-bold text-white mt-1">
            {users.filter(u => u.mfa).length} / {users.length}
          </div>
          <div className="text-[10px] text-emerald-400 font-mono mt-1">FIDO2 compliant</div>
        </div>
        <div className="p-4 rounded-xl neon-tube-card">
          <div className="text-xs font-mono text-slate-400">Auth Method</div>
          <div className="text-xs font-mono text-white mt-2 space-x-1 truncate">
            <span className="px-1.5 py-0.5 rounded bg-surface border border-border">OAuth</span>
            <span className="px-1.5 py-0.5 rounded bg-surface border border-border">Passkey</span>
            <span className="px-1.5 py-0.5 rounded bg-surface border border-border">Magic</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex items-center justify-between gap-3 gsap-fade-in">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search users by name, email, or role..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-surface-elevated border border-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-illum"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-xl border border-border bg-surface-card overflow-hidden gsap-fade-in">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-border bg-surface text-slate-400 font-mono text-[11px]">
              <th className="py-2.5 px-4 font-semibold">User</th>
              <th className="py-2.5 px-4 font-semibold">Role</th>
              <th className="py-2.5 px-4 font-semibold">Provider</th>
              <th className="py-2.5 px-4 font-semibold">Status</th>
              <th className="py-2.5 px-4 font-semibold">MFA</th>
              <th className="py-2.5 px-4 font-semibold">Last Active</th>
              <th className="py-2.5 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {filteredUsers.map(u => (
              <tr key={u.id} className="hover:bg-surface-elevated/40 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-full bg-surface border border-border flex items-center justify-center font-bold text-[10px] text-illum">
                      {u.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{u.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <Badge variant="outline">{u.role}</Badge>
                </td>
                <td className="py-3 px-4 font-mono text-slate-300">
                  {u.provider}
                </td>
                <td className="py-3 px-4">
                  <Badge variant={u.status === 'active' ? 'success' : 'warning'}>
                    {u.status}
                  </Badge>
                </td>
                <td className="py-3 px-4 font-mono">
                  {u.mfa ? (
                    <span className="text-emerald-400 flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Active</span>
                    </span>
                  ) : (
                    <span className="text-slate-500">Disabled</span>
                  )}
                </td>
                <td className="py-3 px-4 font-mono text-slate-400">
                  {u.lastSeen}
                </td>
                <td className="py-3 px-4 text-right">
                  <button className="p-1 rounded hover:bg-surface text-slate-400 hover:text-white">
                    <MoreVertical className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {isAddUserOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="w-full max-w-md p-6 rounded-2xl bg-surface-card border border-border shadow-2xl space-y-4">
            <h2 className="text-sm font-bold text-white">Create New User</h2>
            <form onSubmit={handleAddUser} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="e.g. Alex Mercer"
                  className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-white focus:outline-none focus:border-illum"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={e => setNewEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-white focus:outline-none focus:border-illum"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Role</label>
                <select
                  value={newRole}
                  onChange={e => setNewRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-white focus:outline-none focus:border-illum"
                >
                  <option value="Owner">Owner</option>
                  <option value="Admin">Admin</option>
                  <option value="Developer">Developer</option>
                  <option value="Analyst">Analyst</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsAddUserOpen(false)}
                  className="px-3 py-1.5 rounded-lg border border-border text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded-lg neon-tube-button font-semibold"
                >
                  Create & Send Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

