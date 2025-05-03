
import React from 'react';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import { Recipe } from '@/types/recipe';

interface PrintButtonProps {
  recipe: Recipe;
  className?: string;
}

const PrintButton: React.FC<PrintButtonProps> = ({ recipe, className }) => {
  const handlePrint = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    // Create printable content
    const printContent = `
      <html>
      <head>
        <title>${recipe.title} Recipe</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          h1 {
            text-align: center;
            font-size: 24px;
            margin-bottom: 10px;
          }
          .recipe-meta {
            text-align: center;
            color: #666;
            margin-bottom: 20px;
            font-size: 14px;
          }
          .section-title {
            font-size: 18px;
            font-weight: bold;
            margin-top: 20px;
            margin-bottom: 10px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 5px;
          }
          ul, ol {
            padding-left: 20px;
          }
          li {
            margin-bottom: 8px;
          }
          .recipe-footer {
            margin-top: 30px;
            text-align: center;
            font-size: 12px;
            color: #999;
            border-top: 1px solid #eee;
            padding-top: 10px;
          }
        </style>
      </head>
      <body>
        <h1>${recipe.title}</h1>
        <div class="recipe-meta">
          <span>${recipe.prepTime} minutes prep time</span> • 
          <span>${recipe.cuisine} Cuisine</span> • 
          <span>Tags: ${recipe.tags.join(', ')}</span>
        </div>
        
        <div class="section-title">Ingredients</div>
        <ul>
          ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
        
        <div class="section-title">Instructions</div>
        <ol>
          ${recipe.steps.map(step => `<li>${step}</li>`).join('')}
        </ol>
        
        <div class="recipe-footer">
          Printed from Culinary Collection
          ${recipe.author ? `• Recipe by ${recipe.author}` : ''}
        </div>
      </body>
      </html>
    `;
    
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      
      // Print after images and resources are loaded
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };

  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={handlePrint}
      className={className}
      title="Print recipe"
    >
      <Printer className="h-4 w-4" />
    </Button>
  );
};

export default PrintButton;
