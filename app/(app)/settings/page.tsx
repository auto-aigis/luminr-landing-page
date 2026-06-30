'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAuthContext } from '@/app/_components/AuthProvider';
import { settingsApi, paddleApi, authApi } from '@/app/_lib/api';
import {
  Settings as SettingsIcon,
  Key,
  CreditCard,
  User,
  Check,
  AlertCircle,
  Loader2,
} from 'lucide-react';

export default function SettingsPage() {
  const { user, refresh } = useAuthContext();
  const [openaiKey, setOpenaiKey] = useState('');
  const [slackWebhook, setSlackWebhook] = useState('');
  const [alertThreshold, setAlertThreshold] = useState(10);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const [subscription, setSubscription] = useState<any>(null);
  const [canceling, setCanceling] = useState(false);

  useEffect(() => {
    loadSettings();
    loadSubscription();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await settingsApi.get();
      setSlackWebhook(data.slack_webhook_configured ? ' configured' : '');
      setAlertThreshold(data.alert_threshold || 10);
    } catch (err) {
      console.error('Failed to load settings:', err);
    }
  };

  const loadSubscription = async () => {
    try {
      const sub = await paddleApi.getSubscription();
      setSubscription(sub);
    } catch (err) {
      console.error('Failed to load subscription:', err);
    }
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    setError('');
    setSaved(false);

    try {
      await settingsApi.update({
        openai_api_key: openaiKey || undefined,
        slack_webhook_url: slackWebhook || undefined,
        alert_threshold: alertThreshold,
      });
      setSaved(true);
      setOpenaiKey('');
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!confirm('Are you sure you want to cancel your subscription?')) return;
    setCanceling(true);
    try {
      await paddleApi.cancelSubscription();
      await loadSubscription();
      await refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to cancel');
    } {
      setCanceling(false);
    }
  };

  const tier = user?.tier ?? 'free';
  const isPaidTier = tier === 'starter' || tier === 'professional';

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Account
          </CardTitle>
          <CardDescription>Your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-gray-900">Email</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
            <Badge variant={user?.is_email_verified ? 'default' : 'destructive'}>
              {user?.is_email_verified ? 'Verified' : 'Unverified'}
            </Badge>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-gray-900">Current Plan</p>
              <p className="text-sm text-gray-500">
                {tier === 'free' ? 'Free' : tier.charAt(0).toUpperCase() + tier.slice(1)}
                {subscription?.current_period_end && (
                  <span> · Renews {new Date(subscription.current_period_end).toLocaleDateString()}</span>
                )}
              </p>
            </div>
            <Badge
              variant={isPaidTier ? 'default' : 'secondary'}
              className={isPaidTier ? 'bg-teal-100 text-teal-700' : ''}
            >
              {tier.toUpperCase()}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            API Keys
          </CardTitle>
          <CardDescription>
            Configure your OpenAI API key for analysis (optional)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="openaiKey">OpenAI API Key</Label>
            <Input
              id="openaiKey"
              type="password"
              value={openaiKey}
              onChange={(e) => setOpenaiKey(e.target.value)}
              placeholder="sk-..."
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              Leave blank to use the platform default key
            </p>
          </div>
          {tier === 'professional' && (
            <div>
              <Label htmlFor="slackWebhook">Slack Webhook URL</Label>
              <Input
                id="slackWebhook"
                type="url"
                value={slackWebhook}
                onChange={(e) => setSlackWebhook(e.target.value)}
                placeholder="https://hooks.slack.com/services/..."
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Get real-time alerts when your visibility score changes
              </p>
            </div>
          )}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}
          {saved && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-center gap-2">
              <Check className="w-4 h-4" />
              Settings saved successfully!
            </div>
          )}
          <Button onClick={handleSaveSettings} disabled={saving}>
            {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>
        </CardContent>
      </Card>

      {tier !== 'free' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Subscription
            </CardTitle>
            <CardDescription>Manage your subscription</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {subscription && subscription.current_period_end && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Next billing date</p>
                    <p className="text-sm text-gray-600">
                      {new Date(subscription.current_period_end).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <Badge
                    variant={subscription.status === 'active' ? 'default' : 'destructive'}
                    className={subscription.status === 'active' ? 'bg-green-100 text-green-700' : ''}
                  >
                    {subscription.status}
                  </Badge>
                </div>
              </div>
            )}
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <a href="/pricing">Change Plan</a>
              </Button>
              {isPaidTier && subscription?.paddle_subscription_id && (
                <Button
                  variant="outline"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleCancelSubscription}
                  disabled={canceling}
                >
                  {canceling && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Cancel Subscription
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="w-5 h-5" />
            Usage
          </CardTitle>
          <CardDescription>Your current usage this billing period</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Analysis Runs</p>
              <p className="text-2xl font-bold text-gray-900">
                {user?.run_count_this_month ?? 0} / {user?.run_limit === Infinity ? '∞' : user?.run_limit}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Plan Type</p>
              <p className="text-2xl font-bold text-gray-900 capitalize">{tier}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
