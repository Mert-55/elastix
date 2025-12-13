import type { RFMSegmentIds } from './RFMSegmentId';

/**
 * Preissensitivitäts-Level für RFM-Segmente
 * Zeigt an, wie sensibel das Segment auf Preisänderungen reagiert
 */
export type PriceSensitivityLevel = 'low' | 'medium' | 'high';

/**
 * Churn-Risiko-Level basierend auf dem Recency-Wert
 */
export type ChurnRiskLevel = 'low' | 'medium' | 'high';

/**
 * KPI-Daten für ein einzelnes RFM-Segment
 * Enthält alle relevanten Metriken für die Segment-Analyse
 */
export interface RFMSegmentKPIData {
  /** Das zugehörige RFM-Segment */
  segmentId: RFMSegmentIds;

  /**
   * Segment-Preissensitivität
   * Aggregierter Score, der anzeigt ob bei diesem Segment
   * an der Preisschraube gedreht werden kann
   */
  priceSensitivity: {
    level: PriceSensitivityLevel;
    /** Prozentualer Wert (0-100) für die visuelle Darstellung */
    value: number;
  };

  /**
   * Wallet Share
   * Prozentsatz des Gesamtumsatzes, den dieses Segment ausmacht
   * Wichtig: Champions machen oft 80% des Umsatzes aus
   */
  walletShare: {
    /** Prozentualer Anteil am Gesamtumsatz (0-100) */
    percentage: number;
  };

  /**
   * Abwanderungsrisiko (Churn Risk)
   * Basierend auf dem Recency-Wert des Segments
   */
  churnRisk: {
    level: ChurnRiskLevel;
    /** Prozentualer Wert (0-100) für die visuelle Darstellung */
    value: number;
  };
}

/**
 * Map von Segment-IDs zu ihren KPI-Daten
 */
export type RFMSegmentKPIDataMap = Record<RFMSegmentIds, RFMSegmentKPIData>;
