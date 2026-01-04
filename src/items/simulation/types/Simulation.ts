export interface Simulation {
  id: string;
  name: string;
  description: string | null;
  stockItemRef: string;
  priceRange: {
    from: number;
    to: number;
    step: number;
  };
}
