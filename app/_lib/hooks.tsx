'use client';

import { useState, useEffect, useCallback } from 'react';
import { User, Tier, TIER_LIMITS } from './types';
import { authApi } from './api';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const u = await authApi.me();
      setUser(u);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const logout = useCallback(async () => {
    await authApi.logout();
    setUser(null);
  }, []);

  return { user, loading, refresh, logout };
}

export function useTier() {
  const { user } = useAuth();
  const tier = user?.tier ?? 'free';
  const limits = TIER_LIMITS[tier];

  const canRunAnalysis = (currentRuns: number) => currentRuns < (user?.run_limit ?? 10);
  const canAddBrand = (currentBrands: number) => currentBrands < limits.max_brands;
  const canAddCompetitor = (currentCompetitors: number) => currentCompetitors < limits.max_competitors;

  return {
    tier,
    limits,
    isFree: tier === 'free',
    isStarter: tier === 'starter',
    isProfessional: tier === 'professional',
    canRunAnalysis,
    canAddBrand,
    canAddCompetitor,
  };
}
