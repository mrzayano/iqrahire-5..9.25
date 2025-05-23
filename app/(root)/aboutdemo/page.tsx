// app/settings/profile/page.tsx

'use client';

import { updateUserAbout } from '@/actions/fetch_user_data';
import { useTransition } from 'react';

export default function ProfileSettings() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    const about = formData.get('about') as string;

    startTransition(() => {
      updateUserAbout(about);
    });
  };

  return (
    <form action={handleSubmit} className="space-y-4">
      <textarea
        name="about"
        className="w-full border p-2"
        defaultValue="Hi, I'm Zayan. I love building healthcare solutions. Let's connect!"
      />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
}
