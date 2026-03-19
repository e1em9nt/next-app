import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);

  if (!response.ok) {
    return NextResponse.json({ error: 'Not found' }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data);
}