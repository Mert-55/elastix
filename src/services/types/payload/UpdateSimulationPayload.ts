export interface UpdateSimulationPayload {
  simulationId: string;
  name?: string;
  description?: string | null;
  priceRange?: [number, number, number];
  stockItemRef?: string;
}
