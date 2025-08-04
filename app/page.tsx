'use client';

import { useState } from 'react';
import createLink from "@/lib/route";

export default function HomePage() {
  const [alias, setAlias] = useState('');
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [shortUrl, setShortUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setShortUrl(null);

    const result = await createLink({ alias, url });

    if (result.error) {
      setMessage(`${result.error}`);
    } else if (result.alias) {
      const newUrl = `${window.location.origin}/${result.alias}`;
      setMessage('Link created successfully!');
      setShortUrl(newUrl);
    }
  };

  return (
      <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-blue-200">
        <h1 className="text-4xl font-bold mb-6 text-centerç">URL Shortener</h1>

        <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white shadow-md rounded px-8 py-6 space-y-4"
        >
          <input
              type="text"
              placeholder="Enter alias (e.g. my-link)"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}

              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
              type="text"
              placeholder="Enter full URL (e.g. https://example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}

              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Create Short URL
          </button>
        </form>

        {message && <p className="mt-4 text-sm">{message}</p>}
        {shortUrl && (
            <p className="mt-2 text-blue-600 underline">
              Link: <a href={shortUrl} target="_blank">{shortUrl}</a>
            </p>
        )}
      </main>
  );
}