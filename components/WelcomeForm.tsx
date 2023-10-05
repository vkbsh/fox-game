'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

import usePressKey from 'hooks/usePressKey';
import useLocalStorage, { LS_KEY_USER_NAME } from 'hooks/useLocalStorage';

export default function WelcomeForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useLocalStorage(LS_KEY_USER_NAME, '');

  usePressKey('Enter', () => setEditMode(false));

  useEffect(() => {
    if (editMode && inputRef.current) inputRef.current.focus();
  }, [editMode]);

  return (
    <div className="flex flex-col gap-4 h-96 justify-between items-center">
      {editMode || !name ? (
        <div className="flex gap-4 justify-center items-center">
          <span className="text-xl">Name:</span>
          <input
            type="name"
            value={name}
            ref={inputRef}
            className="input"
            name="user-name"
            onBlur={() => setEditMode(false)}
            onFocus={() => setEditMode(true)}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      ) : (
        <h2
          onClick={() => setEditMode(true)}
          className="text-center text-2xl leading-none"
        >
          Hello {name}
        </h2>
      )}

      {!name || editMode ? (
        <button type="button" className="btn disabled">
          Play
        </button>
      ) : (
        <Link href="/play" className="btn">
          Play
        </Link>
      )}
    </div>
  );
}
