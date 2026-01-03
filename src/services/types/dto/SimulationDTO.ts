export interface SimulationDTO {
  simulationId: string;
  name: string;
  description: string | null;
  stockItemRef: string;
  priceRange: [number, number, number];
}
