'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Encounter } from '@/app/template-editor/encounters/types';

interface RecentTemplatesProps {
  encounters?: Encounter[];
  maxItems?: number;
}

export const RecentTemplates = ({ 
  encounters = [], 
  maxItems = 5 
}: RecentTemplatesProps) => {
  // Take only the specified number of items
  const recentEncounters = encounters.slice(0, maxItems);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Templates</CardTitle>
      </CardHeader>
      <CardContent>
        {recentEncounters.length > 0 ? (
          <div className="space-y-4">
            {recentEncounters.map((encounter) => (
              <div key={encounter.id} className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0 last:pb-0">
                <div>
                  <h3 className="font-medium text-(--foreground)">
                    <Link href={`/template-editor/encounters/${encounter.id}`} className="hover:text-(--primary) transition-colors">
                      {encounter.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-(--muted-foreground) line-clamp-1">{encounter.description}</p>
                  {encounter.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {encounter.tags.map((tag) => (
                        <span 
                          key={tag.id} 
                          className="inline-block px-2 py-0.5 text-xs rounded-full bg-(--primary)/10 text-(--primary)"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/template-editor/encounters/${encounter.id}`}>
                    View
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-(--muted-foreground)">No recent templates found.</p>
            <p className="mt-2 text-(--muted-foreground)">Create a new template to get started.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};