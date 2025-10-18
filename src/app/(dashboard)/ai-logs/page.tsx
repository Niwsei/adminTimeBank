import { AILogsView } from "@/components/ai-logs-view"

async function getAILogs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ai-logs`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function AILogsPage() {
  const initialLogs = await getAILogs();
  return <AILogsView initialLogs={initialLogs} />
}
