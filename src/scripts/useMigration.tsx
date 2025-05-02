
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { migrateRecipes } from './migrateRecipes';

export function useMigration() {
  const [migrationComplete, setMigrationComplete] = useState(false);
  const [migrationInProgress, setMigrationInProgress] = useState(false);
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
        toast({
          title: "Data loading issue",
          description: "There was a problem loading the recipes",
          variant: "destructive",
        });
      } finally {
        setMigrationInProgress(false);
      }
    };

    runMigration();
  }, [toast]);

  return { migrationComplete, migrationInProgress };
}
