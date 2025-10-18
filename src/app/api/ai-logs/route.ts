import { NextResponse } from 'next/server'
import { logs } from '@/data/ai-logs'

export async function GET() {
  return NextResponse.json(logs)
}
