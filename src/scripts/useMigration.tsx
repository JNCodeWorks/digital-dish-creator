
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { migrateRecipes } from './migrateRecipes';

export function useMigration() {
  const [migrationComplete, setMigrationComplete] = useState(false);
  const [migrationInProgress, setMigrationInProgress] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const runMigration = async () => {
      try {
        setMigrationInProgress(true);
        await migrateRecipes();
        setMigrationComplete(true);
        toast({
          title: "Recipe data ready",
          description: "All recipes have been loaded successfully",
          duration: 3000,
        });
      } catch (error) {
        console.error('Migration failed:', error);
        
        // Only show toast on first attempt or final retry
        if (retryCount === 0 || retryCount >= 2) {
          toast({
            title: "Data loading issue",
            description: "There was a problem loading the recipes. Please refresh the page to try again.",
            variant: "destructive",
            duration: 5000,
          });
        }
        
        // Retry up to 2 times with a delay
        if (retryCount < 2) {
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, 2000);
        }
      } finally {
        setMigrationInProgress(false);
      }
    };

    if (!migrationComplete && !migrationInProgress) {
      runMigration();
    }
  }, [toast, migrationComplete, migrationInProgress, retryCount]);

  return { migrationComplete, migrationInProgress };
}
