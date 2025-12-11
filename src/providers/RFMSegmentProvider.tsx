import { createContext, useContext, useState } from 'react';
import { RFMSegmentIds } from '@/types/RFMSegmentId';

type RFMSegmentContextValue = {
  activeSegment: RFMSegmentIds;
  setActiveSegment: (segment: RFMSegmentIds) => void;
};

const RFMSegmentContext = createContext<RFMSegmentContextValue | undefined>(
  undefined
);

export function RFMSegmentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeSegment, setActiveSegment] = useState<RFMSegmentIds>(
    RFMSegmentIds.Champion
  );

  return (
    <RFMSegmentContext.Provider value={{ activeSegment, setActiveSegment }}>
      {children}
    </RFMSegmentContext.Provider>
  );
}

export function useRFMSegment() {
  const context = useContext(RFMSegmentContext);
  if (!context) {
    throw new Error('useRFMSegment must be used within RFMSegmentProvider');
  }
  return context;
}
