import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Preferences() {
  const [darkMode, setDarkMode] = useState(false);
  const [currency, setCurrency] = useState('usd');
  const [dateFormat, setDateFormat] = useState('mdy');
  const [compactView, setCompactView] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const handleSave = () => {
    toast.success('Preferences saved successfully.');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Preferences</h1>
          <p className="text-muted-foreground mt-1">Customize the look and behavior of your dashboard.</p>
        </div>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Control how the dashboard looks.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Use a dark color scheme.</p>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Compact View</Label>
                <p className="text-sm text-muted-foreground">Reduce spacing for denser layouts.</p>
              </div>
              <Switch checked={compactView} onCheckedChange={setCompactView} />
            </div>
          </CardContent>
        </Card>

        {/* Regional */}
        <Card>
          <CardHeader>
            <CardTitle>Regional</CardTitle>
            <CardDescription>Currency and date display settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD ($)</SelectItem>
                  <SelectItem value="eur">EUR (€)</SelectItem>
                  <SelectItem value="gbp">GBP (£)</SelectItem>
                  <SelectItem value="cad">CAD (C$)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date Format</Label>
              <Select value={dateFormat} onValueChange={setDateFormat}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                  <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                  <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Data */}
        <Card>
          <CardHeader>
            <CardTitle>Data</CardTitle>
            <CardDescription>Control how data is loaded and refreshed.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-refresh</Label>
                <p className="text-sm text-muted-foreground">Automatically refresh dashboard data every 30 seconds.</p>
              </div>
              <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSave} className="w-full sm:w-auto">Save Preferences</Button>
      </div>
    </DashboardLayout>
  );
}
