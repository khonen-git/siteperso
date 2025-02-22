import * as React from 'react';
import { Introduction } from '@/components/sections/about/Introduction';
import { Timeline } from '@/components/sections/about/Timeline';
import { InteractiveCV } from '@/components/sections/about/InteractiveCV';
import { Ambitions } from '@/components/sections/about/Ambitions';

export default function AboutPage(): React.JSX.Element {
  return (
    <>
      <Introduction />
      <Timeline />
      <InteractiveCV />
      <Ambitions />
    </>
  );
} 