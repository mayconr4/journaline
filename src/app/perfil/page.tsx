'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/globals.css';
import { ChangeEvent } from 'react';

interface UserProfile {
  name: string;
  email: string;
  bio: string;
}

export default function Perfil() {
  const [user, setUser] = useState<UserProfile>({
    name: 'Nome do Usuário',
    email: 'usuario@email.com',
    bio: 'Bem-vindo ao seu perfil! Aqui você pode ver suas informações e conquistas.',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [editedEmail, setEditedEmail] = useState(user.email);
  const [editedBio, setEditedBio] = useState(user.bio);

  function handleEdit() {
    setIsEditing(true);
  }

  function handleSave() {
    setUser({ name: editedName, email: editedEmail, bio: editedBio });
    setIsEditing(false);
  }

  function handleCancel() {
    setEditedName(user.name);
    setEditedEmail(user.email);
    setEditedBio(user.bio);
    setIsEditing(false);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    if (name === 'name') setEditedName(value);
    else if (name === 'email') setEditedEmail(value);
    else if (name === 'bio') setEditedBio(value);
  }

  return (
    <div className="container">
      
      <main className="main-content">
        <h1 className="">Meu Perfil</h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="profile-card"
        >
          {isEditing ? (
            <form onSubmit={handleSave} className="form">
              <div>
                <label className="form-label" htmlFor="editedName">
                  Nome
                </label>
                <input
                  id="editedName"
                  type="text"
                  name="name"
                  value={editedName}
                  onChange={handleChange}
                  className="profile-input"
                />
              </div>

              <div>
                <label className="form-label" htmlFor="editedEmail">
                  Email
                </label>
                <input
                  id="editedEmail"
                  type="email"
                  name="email"
                  value={editedEmail}
                  onChange={handleChange}
                  className="profile-input"
                />
              </div>

              <div>
                <label className="form-label" htmlFor="editedBio">
                  Bio
                </label>
                <textarea
                  id="editedBio"
                  name="bio"
                  value={editedBio}
                  onChange={handleChange}
                  className="profile-input"
                  rows={4}
                />
              </div>

              <div className="button-group">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                  onClick={handleSave}
                >
                  Salvar
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary"
                  onClick={handleCancel}
                >
                  Cancelar
                </motion.button>
              </div>
            </form>
          ) : (
            <>
              <div className="profile-info-item">
                <h2 className="profile-heading">Nome: {user.name}</h2>
              </div>
              <div className="profile-info-item">
                <p className="profile-text">Email: {user.email}</p>
              </div>
              <div className="profile-bio-item">
                <p className="profile-text">Bio: {user.bio}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary profile-edit-button"
                onClick={handleEdit}
              >
                Editar Perfil
              </motion.button>
            </>
          )}
        </motion.div>
      </main>
    </div>
  );
}
