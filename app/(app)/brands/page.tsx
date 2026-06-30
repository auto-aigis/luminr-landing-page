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
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  Building2,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';

const industries = [
  'SaaS',
  'E-commerce',
  'Healthcare',
  'FinTech',
  'Digital Media',
  'B2B Services',
  'Other',
];

export default function BrandsPage() {
  const router = useRouter();
  const { user, refresh } = useAuthContext();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [industry, setIndustry] = useState('');
  const [competitors, setCompetitors] = useState<string[]>([]);
  const [newCompetitor, setNewCompetitor] = useState('');

  const tier = user?.tier ?? 'free';
  const limits = TIER_LIMITS[tier];

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      const data = await brandApi.list();
      setBrands(data);
    } catch (err) {
      console.error('Failed to load brands:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setWebsiteUrl('');
    setIndustry('');
    setCompetitors([]);
    setNewCompetitor('');
    setEditingBrand(null);
    setError('');
  };

  const openCreate = () => {
    resetForm();
    setOpen(true);
  };

  const openEdit = (brand: Brand) => {
    setName(brand.name);
    setWebsiteUrl(brand.website_url);
    setIndustry(brand.industry_vertical);
    setCompetitors(brand.competitors || []);
    setEditingBrand(brand);
    setOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      if (editingBrand) {
        await brandApi.update(editingBrand.id, {
          name,
          website_url: websiteUrl,
          industry_vertical: industry,
          competitors,
        });
      } else {
        await brandApi.create({
          name,
          website_url: websiteUrl,
          industry_vertical: industry,
          competitors,
        });
      }
      setOpen(false);
      resetForm();
      await loadBrands();
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (brandId: string) => {
    if (!confirm('Are you sure you want to delete this brand?')) return;
    try {
      await brandApi.delete(brandId);
      await loadBrands();
      await refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete');
    }
  };

  const canAddBrand = brands.length < limits.max_brands;
  const canAddCompetitor = (compCount: number) => compCount < limits.max_competitors;

  const addCompetitor = () => {
    if (newCompetitor.trim() && competitors.length < limits.max_competitors) {
      setCompetitors([...competitors, newCompetitor.trim()]);
      setNewCompetitor('');
    }
  };

  const removeCompetitor = (comp: string) => {
    setCompetitors(competitors.filter(c => c !== comp));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Brand Profiles</h1>
          <p className="text-gray-600">Manage your monitored brands</p>
        </div>
        {canAddBrand ? (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreate}>
                <Plus className="w-4 h-4 mr-2" />
                Add Brand
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingBrand ? 'Edit Brand' : 'Add New Brand'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {error}
                  </div>
                )}
                <div>
                  <Label>Brand Name</Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Acme Inc."
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Website URL</Label>
                  <Input
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://acme.com"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Industry</Label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map(ind => (
                        <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Competitors ({competitors.length}/{limits.max_competitors})</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      value={newCompetitor}
                      onChange={(e) => setNewCompetitor(e.target.value)}
                      placeholder="Add competitor"
                      onKeyDown={(e) => e.key === 'Enter' && addCompetitor()}
                      disabled={competitors.length >= limits.max_competitors}
                    />
                    <Button
                      variant="outline"
                      onClick={addCompetitor}
                      disabled={competitors.length >= limits.max_competitors || !newCompetitor.trim()}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  {competitors.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {competitors.map(comp => (
                        <Badge key={comp} variant="secondary">
                          {comp}
                          <button onClick={() => removeCompetitor(comp)} className="ml-2 hover:text-red-500">
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button onClick={handleSave} disabled={saving || !name || !websiteUrl || !industry}>
                    {saving ? 'Saving...' : 'Save'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ) : (
          <Button disabled variant="outline">
            <AlertCircle className="w-4 h-4 mr-2" />
            Brand limit reached ({limits.max_brands})
          </Button>
        )}
      </div>

      {!canAddBrand && (
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="py-3 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <div>
              <p className="font-medium text-amber-800">Brand limit reached</p>
              <p className="text-sm text-amber-700">Upgrade to add more brands</p>
            </div>
            <Link href="/pricing" className="ml-auto">
              <Button size="sm">Upgrade</Button>
            </Link>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Your Brands</CardTitle>
          <CardDescription>
            {brands.length} of {limits.max_brands} brands
          </CardDescription>
        </CardHeader>
        <CardContent>
          {brands.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Building2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No brands yet. Add your first brand to get started.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Brand</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Competitors</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {brands.map(brand => (
                  <TableRow key={brand.id}>
                    <TableCell>
                      <div className="font-medium">{brand.name}</div>
                      <a
                        href={brand.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-teal-600 hover:underline flex items-center gap-1"
                      >
                        {brand.website_url}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{brand.industry_vertical}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {(brand.competitors || []).slice(0, 3).map(c => (
                          <Badge key={c} variant="secondary">{c}</Badge>
                        ))}
                        {(brand.competitors || []).length > 3 && (
                          <Badge variant="outline">+{(brand.competitors || []).length - 3}</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" onClick={() => openEdit(brand)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDelete(brand.id)}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
