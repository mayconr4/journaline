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
        <h1 className="mb-6">Meu Perfil</h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 rounded-lg shadow-md"
        >
          {isEditing ? (
            <div className="mb-4">
              <input
                type="text"
                name="name"
                value={editedName}
                onChange={handleChange}
                className="profile-input w-full"
              />
            </div>
          ) : (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-[#414833]">{user.name}</h2>
            </div>
          )}

          {isEditing ? (
            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={editedEmail}
                onChange={handleChange}
                className="profile-input w-full"
              />
            </div>
          ) : (
            <div className="mb-6">
              <p className="text-[#656D4A]">{user.email}</p>
            </div>
          )}

          {isEditing ? (
            <textarea
              name="bio"
              value={editedBio}
              onChange={handleChange}
              className="profile-input w-full mb-8"
              rows={4}
            />
          ) : (
            <p className="text-[#333D29] mb-10">{user.bio}</p>
          )}

          {isEditing ? (
            <div className="flex space-x-4 mt-8">
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
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary mt-8"
              onClick={handleEdit}
            >
              Editar Perfil
            </motion.button>
          )}
        </motion.div>
      </main>
    </div>
  );
}
