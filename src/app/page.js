'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();


  if (!session) {
        return (
          <div>
              <h1>You are not logged in yet</h1>
          </div>
        )
    }

    return (
        <div>
            <h1>Chào {session.user.name || session.user.email}!</h1>
        </div>
    );
}