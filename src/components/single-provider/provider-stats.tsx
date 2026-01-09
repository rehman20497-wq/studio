
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

// Placeholder stats data for the chart
const monthlyStatsData = [
    { name: 'Jan', Clicks: 400, Impressions: 2400 },
    { name: 'Feb', Clicks: 300, Impressions: 1398 },
    { name: 'Mar', Clicks: 500, Impressions: 9800 },
    { name: 'Apr', Clicks: 478, Impressions: 3908 },
    { name: 'May', Clicks: 689, Impressions: 4800 },
    { name: 'Jun', Clicks: 890, Impressions: 3800 },
];

export default function ProviderStats({ provider }: { provider: ProviderData }) {
    const impressions = provider.impressions || 0;
    const clicks = provider.clicks || 0;
    const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;

    return (
        <div className="py-12 px-[3%] bg-[#FCFBF8]">
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
                    <h3 className="text-lg font-semibold mb-4 text-center">Monthly Performance</h3>
                    <div className="w-full h-[300px]">
                        <ResponsiveContainer>
                            <BarChart data={monthlyStatsData}>
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

    