import React from 'react';

import { NextRequest, NextResponse } from 'next/server';
import { fetchCharacterInfo } from '@/app/handlers';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

export const GET = async (request: NextRequest, { params }: Params) => {
  const characterId = params['characterId'];
  const characterInfo = await fetchCharacterInfo(characterId);
  return NextResponse.json(characterInfo);
};
