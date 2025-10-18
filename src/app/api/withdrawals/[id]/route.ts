import { NextResponse } from 'next/server';
import { withdrawals } from '@/data/withdrawals';

let withdrawalsDB = [...withdrawals];

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { status } = await request.json();

  const withdrawalIndex = withdrawalsDB.findIndex((w) => w.id === id);

  if (withdrawalIndex === -1) {
    return NextResponse.json({ message: 'Withdrawal not found' }, { status: 404 });
  }

  withdrawalsDB[withdrawalIndex].status = status;

  return NextResponse.json(withdrawalsDB[withdrawalIndex]);
}
