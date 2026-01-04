import { useEffect, useMemo, useState } from 'react';

import {
  useCreateSimulationMutation,
  useDeleteSimulationMutation,
  useGetSimulationMetricsQuery,
  useGetSimulationsQuery,
  useUpdateSimulationMutation,
} from '@/services/hostApi';

import type { Simulation, SimulationMetrics } from '../types';
import { mapSimulationMetricsFromDTO, mapSimulationsFromDTO } from './mappers';

export const useSimulations = () => {
  const { data, isLoading, error, refetch } = useGetSimulationsQuery();
  const [activeSimulationId, setActiveSimulationId] = useState<string | null>(
    null
  );

  const simulations: Simulation[] = useMemo(
    () => (data?.items ? mapSimulationsFromDTO(data.items) : []),
    [data]
  );

  const activeSimulation = useMemo(
    () => simulations.find((s) => s.id === activeSimulationId) ?? null,
    [simulations, activeSimulationId]
  );

  useEffect(() => {
    if (!activeSimulationId && simulations.length > 0) {
      setActiveSimulationId(simulations[0].id);
    }
  }, [simulations, activeSimulationId]);

  return {
    simulations,
    activeSimulation,
    activeSimulationId,
    setActiveSimulationId,
    isLoading,
    error,
    refetch,
  };
};

export const useSimulationMetrics = (simulationId: string | undefined) => {
  const { data, isLoading, error } = useGetSimulationMetricsQuery(
    simulationId!,
    { skip: !simulationId }
  );

  const metrics: SimulationMetrics | undefined = useMemo(
    () => (data ? mapSimulationMetricsFromDTO(data) : undefined),
    [data]
  );

  return { metrics, isLoading, error };
};

export const useSimulationActions = () => {
  const [createSimulation, createState] = useCreateSimulationMutation();
  const [updateSimulation, updateState] = useUpdateSimulationMutation();
  const [deleteSimulation, deleteState] = useDeleteSimulationMutation();

  const create = async (params: {
    stockItemRef: string;
    priceRange: [number, number, number];
    name: string;
    description?: string | null;
  }) => {
    const result = await createSimulation(params);
    return result;
  };

  const update = async (params: {
    simulationId: string;
    name?: string;
    description?: string | null;
    priceRange?: [number, number, number];
    stockItemRef?: string;
  }) => {
    const result = await updateSimulation(params);
    return result;
  };

  const remove = async (simulationId: string) => {
    const result = await deleteSimulation({ simulationId });
    return result;
  };

  return {
    create,
    update,
    remove,
    isCreating: createState.isLoading,
    isUpdating: updateState.isLoading,
    isDeleting: deleteState.isLoading,
  };
};
