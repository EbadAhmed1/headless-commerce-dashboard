import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';

export default function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate loading data from GraphQL
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground mt-2">
            Track your business performance with detailed insights and metrics.
          </p>
        </div>

        {/* Analytics Dashboard */}
        <AnalyticsDashboard isLoading={isLoading} />
      </div>
    </DashboardLayout>
  );
}
