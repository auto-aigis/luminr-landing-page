'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Plus, ArrowRight, Check } from 'lucide-react';
import { brandApi } from '@/app/_lib/api';

const industries = [
  'SaaS',
  'E-commerce',
  'Healthcare',
  'FinTech',
  'Digital Media',
  'B2B Services',
  'Other',
];

const maxCompetitors = { free: 3, starter: 10, professional: 25 };

export function OnboardingWizard({ tier = 'free' }: { tier?: string }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [brandName, setBrandName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [industry, setIndustry] = useState('');
  const [competitors, setCompetitors] = useState<string[]>([]);
  const [newCompetitor, setNewCompetitor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const maxComp = maxCompetitors[tier as keyof typeof maxCompetitors] || 3;

  const addCompetitor = () => {
    if (newCompetitor.trim() && competitors.length < maxComp && !competitors.includes(newCompetitor.trim())) {
      setCompetitors([...competitors, newCompetitor.trim()]);
      setNewCompetitor('');
    }
  };

  const removeCompetitor = (comp: string) => {
    setCompetitors(competitors.filter((c) => c !== comp));
  };

  const canProceed = () => {
    if (step === 1) return brandName.trim().length > 0;
    if (step === 2) return websiteUrl.trim().length > 0;
    if (step === 3) return industry.length > 0;
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      await brandApi.create({
        name: brandName,
        website_url: websiteUrl,
        industry_vertical: industry,
        competitors,
      });
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create brand');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Set Up Your Brand</CardTitle>
          <CardDescription>
            Step {step} of 4 — Tell us about your brand
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-6">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full ${
                  s <= step ? 'bg-teal-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="brandName">Brand / Company Name</Label>
                <Input
                  id="brandName"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="Acme Inc."
                  className="mt-1"
                />
              </div>
              <Button
                onClick={() => setStep(2)}
                disabled={!canProceed()}
                className="w-full"
              >
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="websiteUrl">Website URL</Label>
                <Input
                  id="websiteUrl"
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://acme.com"
                  className="mt-1"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button onClick={() => setStep(3)} disabled={!canProceed()} className="flex-1">
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <Label>Industry Vertical</Label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((ind) => (
                      <SelectItem key={ind} value={ind}>
                        {ind}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  Back
                </Button>
                <Button onClick={() => setStep(4)} disabled={!canProceed()} className="flex-1">
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div>
                <Label>Competitors (up to {maxComp})</Label>
                <p className="text-sm text-gray-500 mb-3">
                  Add up to {maxComp} competitor brand names
                </p>
                <div className="flex gap-2">
                  <Input
                    value={newCompetitor}
                    onChange={(e) => setNewCompetitor(e.target.value)}
                    placeholder="Competitor name"
                    onKeyDown={(e) => e.key === 'Enter' && addCompetitor()}
                    disabled={competitors.length >= maxComp}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addCompetitor}
                    disabled={competitors.length >= maxComp || !newCompetitor.trim()}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {competitors.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {competitors.map((comp) => (
                      <Badge key={comp} variant="secondary" className="pl-2 pr-1 py-1">
                        {comp}
                        <button
                          onClick={() => removeCompetitor(comp)}
                          className="ml-2 hover:text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" onClick={() => setStep(3)} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleSubmit} disabled={loading} className="flex-1">
                  {loading ? 'Creating...' : 'Complete Setup'}
                  {!loading && <Check className="w-4 h-4 ml-2" />}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
