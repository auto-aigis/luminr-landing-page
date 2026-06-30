'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuthContext } from '@/app/_components/AuthProvider';
import { paddleApi } from '@/app/_lib/api';
import { Tier, TIER_LIMITS } from '@/app/_lib/types';
import { Check, Crown, Zap, Building2, AlertCircle, Loader2 } from 'lucide-react';

const tiers = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'forever',
    icon: Building2,
    color: 'gray',
    features: [
      '1 brand monitored',
      'Up to 3 competitors',
      '10 AI analysis runs/month',
      'Basic visibility score',
      'Citation count only',
    ],
    notIncluded: [
      'Brand perception summary',
      'Competitor comparison',
      'Actionable recommendations',
      'Knowledge gap analysis',
    ],
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 199,
    annualPrice: 1990,
    period: 'month',
    annualPeriod: 'year',
    icon: Zap,
    color: 'teal',
    features: [
      '1 brand monitored',
      'Up to 10 competitors',
      '100 AI analysis runs/month',
      'Full dashboard access',
      'Brand perception summary',
      'Competitor comparison',
      '3 actionable recommendations',
      'Knowledge gap analysis',
      'Weekly automated analysis',
      'Email support',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 599,
    annualPrice: 5990,
    period: 'month',
    annualPeriod: 'year',
    icon: Crown,
    color: 'amber',
    features: [
      '3 brands monitored',
      '25 competitors per brand',
      'Unlimited AI analysis runs',
      'Full dashboard + Reports',
      '5 priority-ranked recommendations',
      'Source Attribution Report',
      'Topic Coverage Assessment',
      'Share of Voice Report',
      'Daily automated analysis',
      'Real-time Slack alerts',
      '5 team seats',
      'Priority support',
    ],
  },
];

export default function PricingPage() {
  const router = useRouter();
  const { user, refresh } = useAuthContext();
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('monthly');
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState('');

const tier = user?.tier ?? 'free';

  useEffect(() => {
    initPaddle();
  }, []);
  useEffect(() => {
    initPaddle();
  }, []);

  const initPaddle = () => {
    const script = document.createElement('script');
    script.src = 'https://cdn.paddle.com/paddle/v2/paddle.js';
    script.async = true;
    script.onload = () => {
      const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
      if (token && (window as any).Paddle) {
        (window as any).Paddle.Environment.set('sandbox');
        (window as any).Paddle.Initialize({ token });
      }
    };
    document.body.appendChild(script);
  };

  const handleSubscribe = async (tierId: string) => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (tierId === 'free') return;

    setLoading(tierId);
    setError('');

    try {
      const billing = billingInterval === 'yearly' ? 'yearly' : 'monthly';
      const { price_id } = await paddleApi.createCheckout(tierId, billing);

      if ((window as any).Paddle) {
        (window as any).Paddle.Checkout.open({
          items: [{ priceId: price_id, quantity: 1 }],
          customData: { user_id: user.id },
          settings: { displayMode: 'overlay' },
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout failed');
    } finally {
      setLoading(null);
    }
  };

  const getButtonText = (tierId: string) => {
    if (loading === tierId) return 'Loading...';
    if (tierId === 'free') return 'Current Plan';
    if (tier === 'free') return 'Start Free Trial';
    if (tierId === tier) return 'Current Plan';
    if (tierId === 'starter' && tier === 'professional') return 'Downgrade';
    return 'Upgrade';
  };

  const isCurrentOrHigher = (tierId: string) => {
    const order = ['free', 'starter', 'professional'];
    return order.indexOf(tierId) <= order.indexOf(tier);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Choose the plan that fits your AI visibility needs
          </p>

          <div className="inline-flex items-center bg-gray-200 rounded-lg p-1">
            <button
              onClick={() => setBillingInterval('monthly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingInterval === 'monthly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingInterval('yearly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingInterval === 'yearly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly
              <Badge variant="secondary" className="ml-2 bg-teal-100 text-teal-700">
                Save 17%
              </Badge>
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((t) => {
            const isCurrent = tier === t.id;
            const price = billingInterval === 'yearly' && t.annualPrice ? t.annualPrice : t.price;
            const periodLabel = billingInterval === 'yearly' && t.annualPrice ? 'year' : t.period;
            const isDisabled = loading !== null;

            return (
              <Card
                key={t.id}
                className={`relative ${
                  t.id === 'starter' ? 'border-teal-500 border-2 shadow-lg' : ''
                }`}
              >
                {t.id === 'starter' && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-teal-600">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <t.icon
                    className={`w-10 h-10 mx-auto mb-2 ${
                      t.color === 'teal' ? 'text-teal-600' :
                      t.color === 'amber' ? 'text-amber-500' :
                      'text-gray-500'
                    }`}
                  />
                  <CardTitle className="text-xl">{t.name}</CardTitle>
                  <CardDescription>
                    {t.id === 'free' ? (
                      <span className="text-3xl font-bold text-gray-900">Free</span>
                    ) : (
                      <>
                        <span className="text-3xl font-bold text-gray-900">${price}</span>
                        <span className="text-gray-500">/{periodLabel}</span>
                      </>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {t.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                    {t.notIncluded?.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                        <span className="w-5 h-5 flex-shrink-0 mt-0.5">—</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={isCurrent ? 'outline' : t.id === 'starter' ? 'default' : 'outline'}
                    disabled={isDisabled || (isCurrent && tier !== 'free')}
                    onClick={() => handleSubscribe(t.id)}
                  >
                    {loading === t.id && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {getButtonText(t.id)}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          <p>All plans include a 14-day money-back guarantee.</p>
          <p className="mt-2">Need a custom plan? Contact us at hello@luminr.ai</p>
        </div>
      </div>
    </div>
  );
}
