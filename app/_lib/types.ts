export interface User {
  id: string;
  email: string;
  display_name?: string;
  is_email_verified: boolean;
  tier: Tier;
  run_count_this_month: number;
  run_limit: number;
  created_at: string;
}

export type Tier = 'free' | 'starter' | 'professional';

export interface Brand {
  id: string;
  user_id: string;
  name: string;
  website_url: string;
  industry_vertical: string;
  competitors: string[];
  created_at: string;
}

export interface AnalysisRun {
  id: string;
  brand_id: string;
  user_id: string;
  visibility_score: number;
  citation_count_brand: number;
  citations_by_competitor: Record<string, number>;
  perception_summary: string;
  recommendations: Recommendation[];
  knowledge_gaps: string[];
  raw_responses: Record<string, string>;
  triggered_by: 'manual' | 'scheduled';
  created_at: string;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: number;
}

export interface Subscription {
  id: string;
  tier: Tier;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  price_id?: string;
  current_period_end?: string;
  paddle_subscription_id?: string;
  run_count_this_month: number;
  run_limit: number;
}

export interface UserSettings {
  openai_api_key_masked?: string;
  slack_webhook_configured: boolean;
  alert_threshold: number;
}

export interface CheckoutSession {
  price_id: string;
  client_token: string;
}

export interface TierLimit {
  max_brands: number;
  max_competitors: number;
  max_runs_per_month: number;
  has_full_dashboard: boolean;
  max_recommendations: number;
  has_scheduled_analysis: boolean;
  has_alerts: boolean;
  has_team_seats: boolean;
  max_team_seats: number;
}

export const TIER_LIMITS: Record<Tier, TierLimit> = {
  free: {
    max_brands: 1,
    max_competitors: 3,
    max_runs_per_month: 10,
    has_full_dashboard: false,
    max_recommendations: 0,
    has_scheduled_analysis: false,
    has_alerts: false,
    has_team_seats: false,
    max_team_seats: 1,
  },
  starter: {
    max_brands: 1,
    max_competitors: 10,
    max_runs_per_month: 100,
    has_full_dashboard: true,
    max_recommendations: 3,
    has_scheduled_analysis: true,
    has_alerts: false,
    has_team_seats: false,
    max_team_seats: 1,
  },
  professional: {
    max_brands: 3,
    max_competitors: 25,
    max_runs_per_month: Infinity,
    has_full_dashboard: true,
    max_recommendations: 5,
    has_scheduled_analysis: true,
    has_alerts: true,
    has_team_seats: true,
    max_team_seats: 5,
  },
};
