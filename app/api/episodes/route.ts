import React from 'react';

import { NextRequest, NextResponse } from 'next/server';
import { fetchEpisodeInfo } from '@/app/handlers';

export const GET = async (request: NextRequest) => {
  const pageNum = request.nextUrl.searchParams.get('page');
  const episodeInfo = await fetchEpisodeInfo(pageNum);
  return NextResponse.json(episodeInfo);
};
