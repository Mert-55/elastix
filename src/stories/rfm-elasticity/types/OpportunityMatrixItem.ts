import type { RFMSegmentIds } from './RFMSegmentId';

/**
 * Elastizitäts-Klassifikation für Produkte
 * - inelastic: ε > -1 (Preiserhöhung möglich)
 * - elastic: ε < -1 (Vorsicht, Menge bricht ein)
 */
export type ElasticityType = 'inelastic' | 'elastic';

/**
 * Preis-Empfehlung basierend auf Elastizität und Segment
 */
export type PriceRecommendation = 'increase' | 'hold' | 'discount';

/**
 * Ein einzelnes Item in der Opportunity Matrix
 */
export interface OpportunityMatrixItem {
  /** Eindeutige ID des Items */
  id: string;

  /** Produktname */
  itemName: string;

  /**
   * Preiselastizität (ε)
   * Negativ: Normale Güter
   * > -1: Unelastisch (Preiserhöhung möglich)
   * < -1: Elastisch (Vorsicht bei Preiserhöhung)
   */
  elasticity: number;

  /** Klassifikation der Elastizität */
  elasticityType: ElasticityType;

  /**
   * Kaufhäufigkeit im aktuellen Segment
   * Wie oft kaufen Kunden dieses Segments das Produkt
   */
  purchaseFrequency: number;

  /**
   * Umsatzpotenzial bei Preiserhöhung (in %)
   * Berechnet basierend auf Elastizität und aktuellem Umsatz
   */
  revenuePotential: number;

  /** Empfehlung für Preisstrategie */
  recommendation: PriceRecommendation;

  /** Zugehöriges RFM-Segment */
  segmentId: RFMSegmentIds;
}
