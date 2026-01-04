import {
  useCreateSimulationMutation,
  useDeleteSimulationMutation,
  useGetSimulationsQuery,
  useGetStockItemsQuery,
  useUpdateSimulationMutation,
} from '@/services/hostApi';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { Simulation } from '../types';

import { mapSimulationsFromDTO } from './mappers';

interface SimulationContextValue {
  simulations: Simulation[];
  activeSimulation: Simulation | null;
  activeSimulationId: string | null;
  activeStockItemName: string | null;
  setActiveSimulationId: (id: string | null) => void;
  isLoading: boolean;
  actions: {
    create: (params: {
      name: string;
      stockItemRef: string;
      priceRange: [number, number, number];
      description?: string | null;
    }) => Promise<unknown>;
    update: (params: {
      simulationId: string;
      name?: string;
      description?: string | null;
      priceRange?: [number, number, number];
      stockItemRef?: string;
    }) => Promise<unknown>;
    remove: (simulationId: string) => Promise<unknown>;
    isCreating: boolean;
    isUpdating: boolean;
    isDeleting: boolean;
  };
}

const SimulationContext = createContext<SimulationContextValue | undefined>(
  undefined
);

export function SimulationProvider({ children }: { children: ReactNode }) {
  const { data, isLoading } = useGetSimulationsQuery();
  const { data: stockItemsData } = useGetStockItemsQuery({});
  const [createSimulation, createState] = useCreateSimulationMutation();
  const [updateSimulation, updateState] = useUpdateSimulationMutation();
  const [deleteSimulation, deleteState] = useDeleteSimulationMutation();

  const [activeSimulationId, setActiveSimulationId] = useState<string | null>(
    null
  );

  // Track if we've already created a default simulation to avoid duplicates
  const hasCreatedDefaultRef = useRef(false);

  const simulations: Simulation[] = useMemo(
    () => (data?.items ? mapSimulationsFromDTO(data.items) : []),
    [data]
  );

  const activeSimulation = useMemo(
    () => simulations.find((s) => s.id === activeSimulationId) ?? null,
    [simulations, activeSimulationId]
  );

  // Get the stock item name for the active simulation
  const activeStockItemName = useMemo(() => {
    if (!activeSimulation?.stockItemRef || !stockItemsData?.items) {
      return null;
    }
    const stockItem = stockItemsData.items.find(
      (item) => item.id === activeSimulation.stockItemRef
    );
    return stockItem?.itemName ?? null;
  }, [activeSimulation?.stockItemRef, stockItemsData?.items]);

  // Auto-select first simulation or create one if none exist
  useEffect(() => {
    if (isLoading) return;

    if (simulations.length === 0 && !hasCreatedDefaultRef.current) {
      // Create a default simulation when none exist
      hasCreatedDefaultRef.current = true;
      createSimulation({
        name: 'Untitled Simulation',
        stockItemRef: '',
        priceRange: [-20, 20, 5],
      });
    } else if (!activeSimulationId && simulations.length > 0) {
      setActiveSimulationId(simulations[0].id);
    }
  }, [simulations, activeSimulationId, isLoading, createSimulation]);

  // Reset the ref when simulations exist again
  useEffect(() => {
    if (simulations.length > 0) {
      hasCreatedDefaultRef.current = false;
    }
  }, [simulations.length]);

  const handleCreate = useCallback(
    async (params: {
      name: string;
      stockItemRef: string;
      priceRange: [number, number, number];
      description?: string | null;
    }) => {
      const result = await createSimulation(params);
      // Auto-select the newly created simulation if it has a stockItemRef
      if ('data' in result && result.data && params.stockItemRef) {
        setActiveSimulationId(result.data.simulationId);
      }
      return result;
    },
    [createSimulation]
  );

  const actions = useMemo(
    () => ({
      create: handleCreate,
      update: async (params: {
        simulationId: string;
        name?: string;
        description?: string | null;
        priceRange?: [number, number, number];
        stockItemRef?: string;
      }) => {
        const result = await updateSimulation(params);
        return result;
      },
      remove: async (simulationId: string) => {
        const result = await deleteSimulation({ simulationId });
        return result;
      },
      isCreating: createState.isLoading,
      isUpdating: updateState.isLoading,
      isDeleting: deleteState.isLoading,
    }),
    [
      handleCreate,
      updateSimulation,
      deleteSimulation,
      createState,
      updateState,
      deleteState,
    ]
  );

  return (
    <SimulationContext.Provider
      value={{
        simulations,
        activeSimulation,
        activeSimulationId,
        activeStockItemName,
        setActiveSimulationId,
        isLoading,
        actions,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulationContext() {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error(
      'useSimulationContext must be used within SimulationProvider'
    );
  }
  return context;
}
