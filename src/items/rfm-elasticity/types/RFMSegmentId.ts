export enum RFMSegmentIds {
  Champion = 'rfm.segment.champion',
  LoyalCustomers = 'rfm.segment.loyal',
  PotentialLoyalists = 'rfm.segment.potential',
  AtRisk = 'rfm.segment.at-risk',
  Hibernating = 'rfm.segment.hibernating',
  Lost = 'rfm.segment.lost',
}

export function getRFMSegmentById(id: RFMSegmentIds): string {
  return Object.keys(RFMSegmentIds).find(
    (key) => RFMSegmentIds[key as keyof typeof RFMSegmentIds] === id
  )!;
}
