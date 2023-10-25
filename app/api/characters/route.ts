import React from 'react';

import { NextRequest, NextResponse } from 'next/server';
import { fetchCharacterInfo } from '@/app/handlers';

export const GET = async (request: NextRequest) => {
  const pageNum = request.nextUrl.searchParams.get('page');
  const characterInfo = await fetchCharacterInfo(pageNum);
  return NextResponse.json({ characterInfo });
};
