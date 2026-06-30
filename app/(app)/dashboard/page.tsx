'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuthContext } from '@/app/_components/AuthProvider';
import { brandApi, analysisApi } from '@/app/_lib/api';
import { Brand, AnalysisRun } from '@/app/_lib/types';
import { TIER_LIMITS } from '@/app/_lib/types';
import {
  TrendingUp,
  RefreshCw,
  AlertCircle,
  ArrowRight,
  Crown,
  Users,
  Target,
  Lightbulb,
  BarChart3,
  Lock,
  Loader2,
} from 'lucide-react';

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, refresh } = useAuthContext();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisRun | null>(null);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState('');

  const checkoutSuccess = searchParams.get('checkout') === 'success';
  const transactionId = searchParams.get('transaction_id');

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (checkoutSuccess && transactionId) {
      handlePostCheckout(transactionId);
    }
  }, [checkoutSuccess, transactionId]);

  const loadData = async () => {
    try {
      const [brandList, sub] = await Promise.all([
        brandApi.list(),
        fetch('/api/auth/subscription').then(r => r.json()).catch(() => null)
      ]);
      setBrands(brandList);
      if (brandList.length > 0) {
        setSelectedBrand(brandList[0]);
        const latest = await analysisApi.latest(brandList[0].id);
        setAnalysis(latest);
      }
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePostCheckout = async (txnId: string) => {
    try {
      await fetch('/api/paddle/verify-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transaction_id: txnId }),
      });
      await refresh();
      router.replace('/dashboard');
    } catch (err) {
      console.error('Verification failed:', err);
    }
  };

  const handleRunAnalysis = async () => {
    if (!selectedBrand) return;
    setRunning(true);
    setError('');
    try {
      const result = await analysisApi.run(selectedBrand.id);
      setAnalysis(result);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setRunning(false);
    }
  };

  const tier = user?.tier ?? 'free';
  const limits = TIER_LIMITS[tier];
  const runCount = user?.run_count_this_month ?? 0;
  const runLimit = user?.run_limit ?? 10;
  const canRun = runCount < runLimit && !running;

  const ScoreGauge = ({ score }: { score: number }) => {
    const color = score >= 70 ? 'text-green-600' : score >= 40 ? 'text-amber-600' : 'text-red-600';
    return (
      <div className="relative w-40 h-40">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="70" cy="70" r="60" stroke="#e5e7eb" strokeWidth="12" fill="none" />
          <circle
            cx="70" cy="70" r="60"
            stroke={score >= 70 ? '#16a34a' : score >= 40 ? '#d97706' : '#dc2626'}
            strokeWidth="12"
            fill="none"
            strokeDasharray={`${(score / 100) * 377} 377`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-bold ${color}`}>{score}</span>
          <span className="text-xs text-gray-500">out of 100</span>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-40" />)}
        </div>
      </div>
    );
  }

  if (brands.length === 0) {
    return (
      <div className="p-6">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              Set up your brand
            </CardTitle>
            <CardDescription>
              Complete the onboarding wizard to start analyzing your AI visibility
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/onboarding">
              <Button className="w-full">Start Setup</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {checkoutSuccess && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 flex items-center gap-2">
          <Crown className="w-5 h-5" />
          Payment successful! Your subscription is now active.
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Visibility Dashboard</h1>
          {selectedBrand && (
            <p className="text-gray-600">Monitoring: {selectedBrand.name}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={handleRunAnalysis}
            disabled={!canRun}
            className="gap-2"
          >
            {running ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            {running ? 'Running...' : 'Refresh Analysis'}
          </Button>
          {!canRun && (
            <Link href="/pricing">
              <Button variant="outline" className="gap-2">
                <Crown className="w-4 h-4 text-amber-500" />
                Upgrade
              </Button>
            </Link>
          )}
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      <div className="flex items-center gap-2 text-sm text-gray-600">
        <RefreshCw className="w-4 h-4" />
        <span>Run count: {runCount} / {runLimit === Infinity ? '∞' : runLimit} this month</span>
        <Progress value={runLimit === Infinity ? 0 : (runCount / runLimit) * 100} className="w-24 h-2" />
      </div>

      {analysis ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">AI Visibility Score</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ScoreGauge score={analysis.visibility_score} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Citation Count</CardTitle>
                <CardDescription>Your brand appearances in AI responses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-gray-900">{analysis.citation_count_brand}</div>
                <p className="text-sm text-gray-500 mt-1">Total citations</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Brand Mentions</CardTitle>
                <CardDescription>Competitor comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(analysis.citations_by_competitor).map(([comp, count]) => (
                    <div key={comp} className="flex justify-between text-sm">
                      <span className="text-gray-600">{comp}</span>
                      <span className="font-medium">{count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {limits.has_full_dashboard && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Brand Perception Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{analysis.perception_summary}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Competitor Visibility Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Brand</TableHead>
                        <TableHead>Visibility Score</TableHead>
                        <TableHead>Citations</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="bg-teal-50">
                        <TableCell className="font-medium text-teal-700">{selectedBrand?.name} (You)</TableCell>
                        <TableCell>{analysis.visibility_score}</TableCell>
                        <TableCell>{analysis.citation_count_brand}</TableCell>
                      </TableRow>
                      {Object.entries(analysis.citations_by_competitor).map(([comp, count]) => (
                        <TableRow key={comp}>
                          <TableCell>{comp}</TableCell>
                          <TableCell>{Math.min(100, Math.round((count / Math.max(analysis.citation_count_brand || 1, 1)) * 100))}</TableCell>
                          <TableCell>{count}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {analysis.recommendations && analysis.recommendations.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="w-5 h-5" />
                      Actionable Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analysis.recommendations.slice(0, limits.max_recommendations).map((rec, i) => (
                        <div key={rec.id || i} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-start gap-3">
                            <Badge variant="outline" className="mt-0.5">
                              #{i + 1}
                            </Badge>
                            <div>
                              <h4 className="font-medium text-gray-900">{rec.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {analysis.knowledge_gaps && analysis.knowledge_gaps.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      Knowledge Gap Analysis
                    </CardTitle>
                    <CardDescription>Topics where competitors are cited but you are not</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.knowledge_gaps.map((gap, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-red-500">•</span>
                          <span className="text-gray-700">{gap}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {!limits.has_full_dashboard && (
            <Card>
              <CardContent className="py-8 text-center">
                <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Unlock Full Dashboard</h3>
                <p className="text-gray-600 mb-4">
                  Upgrade to Starter to see brand perception, competitor comparison, recommendations, and knowledge gaps.
                </p>
                <Link href="/pricing">
                  <Button>Upgrade to Starter</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <Card className="p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No analysis yet</h3>
          <p className="text-gray-600 mb-4">Run your first AI visibility analysis to see results.</p>
          <Button onClick={handleRunAnalysis} disabled={!canRun}>
            Run First Analysis
          </Button>
        </Card>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="p-6">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-40" />)}
        </div>
      </div>
    }>
    >
      <DashboardContent />
    </Suspense>
  );
}
