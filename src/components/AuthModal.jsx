import { useState } from 'react';

export default function AuthModal({ onClose, onLogin }) {
  const [tab, setTab] = useState('login');
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tab === 'register' && form.password !== form.confirm) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }
    const userName = tab === 'register' ? form.name : form.email.split('@')[0];
    // Store in localStorage
    localStorage.setItem('synthex_user', JSON.stringify({ name: userName, email: form.email }));
    setSuccess(true);
    setTimeout(() => {
      onLogin({ name: userName, email: form.email });
      onClose();
    }, 1500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Mon Compte</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          {success ? (
            <div className="auth-success">
              <div className="auth-success-icon">✓</div>
              <h3>{tab === 'login' ? 'Connexion réussie !' : 'Compte créé !'}</h3>
              <p>Bienvenue chez Synthex Peptides</p>
            </div>
          ) : (
            <>
              <div className="auth-tabs">
                <button className={`auth-tab ${tab === 'login' ? 'active' : ''}`} onClick={() => setTab('login')}>Connexion</button>
                <button className={`auth-tab ${tab === 'register' ? 'active' : ''}`} onClick={() => setTab('register')}>Créer un compte</button>
              </div>
              <form onSubmit={handleSubmit}>
                {tab === 'register' && (
                  <div className="form-group">
                    <label>Nom complet</label>
                    <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Jean Dupont" />
                  </div>
                )}
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="email@exemple.com" />
                </div>
                <div className="form-group">
                  <label>Mot de passe</label>
                  <input type="password" required minLength={6} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="••••••••" />
                </div>
                {tab === 'register' && (
                  <div className="form-group">
                    <label>Confirmer le mot de passe</label>
                    <input type="password" required value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} placeholder="••••••••" />
                  </div>
                )}
                <button type="submit" className="btn-submit">
                  {tab === 'login' ? 'Se connecter' : 'Créer mon compte'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
