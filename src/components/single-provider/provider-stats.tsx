'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, MousePointerClick, Hand } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type ProviderData = {
  id: string;
  name: string;
  impressions?: number;
  clicks?: number;
};

// This function generates placeholder monthly data based on total counts
const generateMonthlyData = (totalImpressions: number, totalClicks: number) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    // Simple distributions for placeholder data
    const impressionDistribution = [0.12, 0.1, 0.25, 0.18, 0.2, 0.15];
    const clickDistribution = [0.15, 0.11, 0.22, 0.2, 0.18, 0.14];

    return months.map((month, i) => ({
        name: month,
        Impressions: Math.round(totalImpressions * impressionDistribution[i]),
        Clicks: Math.round(totalClicks * clickDistribution[i]),
    }));
};

export default function ProviderStats({ provider }: { provider: ProviderData }) {
    const impressions = provider.impressions || 0;
    const clicks = provider.clicks || 0;
    const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;
    const monthlyData = generateMonthlyData(impressions, clicks);

    return (
        <div className="py-24 px-[3%] bg-[#FCFBF8]">
            <div className="max-w-6xl mx-auto space-y-8">
                <h2 className="text-3xl font-bold font-headline text-zinc-900 text-center mb-12">Provider Analytics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Impressions</CardTitle>
                            <Eye className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{impressions.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Clicks</CardTitle>
                            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{clicks.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Click-Through Rate</CardTitle>
                            <Hand className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{ctr.toFixed(2)}%</div>
                            <p className="text-xs text-muted-foreground">+2.1% from last month</p>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-center">Monthly Performance (Sample Data)</h3>
                    <div className="w-full h-[300px]">
                        <ResponsiveContainer>
                            <BarChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="Impressions" fill="#8884d8" />
                                <Bar dataKey="Clicks" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
