import type { SimulationDTO } from '@/services/types/dto';

import type { Simulation } from '../types';

export const mapSimulationFromDTO = (dto: SimulationDTO): Simulation => ({
  id: dto.simulationId,
  name: dto.name,
  description: dto.description,
  stockItemRef: dto.stockItemRef,
  priceRange: {
    from: dto.priceRange[0],
    to: dto.priceRange[1],
    step: dto.priceRange[2],
  },
});

export const mapSimulationsFromDTO = (dtos: SimulationDTO[]): Simulation[] =>
  dtos.map(mapSimulationFromDTO);
