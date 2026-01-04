import type { StockItemDTO } from '@/services/types/dto';

import type {
  ElasticityType,
  OpportunityMatrixItem,
  PriceRecommendation,
} from '../../types/OpportunityMatrixItem';
import { RFMSegmentIds } from '../../types/RFMSegmentId';

const getElasticityType = (elasticity: number): ElasticityType =>
  elasticity > -1 ? 'inelastic' : 'elastic';

const getRecommendation = (
  elasticity: number,
  segmentKey: keyof typeof RFMSegmentIds
): PriceRecommendation => {
  const premiumSegments: (keyof typeof RFMSegmentIds)[] = [
    'Champion',
    'LoyalCustomers',
    'PotentialLoyalists',
  ];
  const isPremium = premiumSegments.includes(segmentKey);

  if (elasticity > -1 && isPremium) return 'increase';
  if (elasticity < -1.2) return 'discount';
  return 'hold';
};

export const mapStockItemToOpportunityMatrix = (
  dto: StockItemDTO
): OpportunityMatrixItem => ({
  id: dto.id,
  itemName: dto.itemName,
  elasticity: dto.elasticity,
  elasticityType: getElasticityType(dto.elasticity),
  purchaseFrequency: dto.purchaseFrequency,
  revenuePotential: dto.revenuePotential,
  recommendation: getRecommendation(dto.elasticity, dto.segment),
  segmentId: RFMSegmentIds[dto.segment],
});

export const mapStockItemsToOpportunityMatrix = (
  dtos: StockItemDTO[]
): OpportunityMatrixItem[] => dtos.map(mapStockItemToOpportunityMatrix);
