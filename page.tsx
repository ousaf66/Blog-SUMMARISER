'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [urdu, setUrdu] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarise = async () => {
    setLoading(true);
    const res = await fetch('https://your-vercel-backend.vercel.app/summarise', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    setSummary(data.summary);
    setUrdu(data.urduSummary);
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 space-y-4">
      <h1 className="text-2xl font-bold">Blog Summariser</h1>
      <Input placeholder="Enter blog URL" value={url} onChange={e => setUrl(e.target.value)} />
      <Button onClick={handleSummarise} disabled={loading}>
        {loading ? 'Summarising...' : 'Summarise Blog'}
      </Button>
      {summary && (
        <div className="mt-4">
          <h2 className="font-semibold">Summary:</h2>
          <p>{summary}</p>
          <h2 className="font-semibold mt-2">Urdu Translation:</h2>
          <p>{urdu}</p>
        </div>
      )}
    </div>
  );
}
