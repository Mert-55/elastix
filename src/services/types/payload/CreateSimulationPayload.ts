export interface CreateSimulationPayload {
  stockItemRef: string;
  priceRange: [number, number, number];
  name: string;
  description?: string | null;
}
