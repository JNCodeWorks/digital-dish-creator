
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/hooks/use-toast';

interface ShareButtonProps {
  title: string;
  recipeId: string;
  className?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  title,
  recipeId,
  className
}) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const shareUrl = `${window.location.origin}/recipes/${recipeId}`;
  
  const handleShare = async (platform: string) => {
    try {
      switch (platform) {
        case 'clipboard':
          await navigator.clipboard.writeText(shareUrl);
          toast({
            title: "Link copied!",
            description: "Recipe link copied to clipboard",
            duration: 2000,
          });
          break;
          
        case 'facebook':
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
          break;
          
        case 'twitter':
          window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`Check out this recipe: ${title}`)}`, '_blank');
          break;
          
        case 'email':
          window.open(`mailto:?subject=${encodeURIComponent(`Recipe: ${title}`)}&body=${encodeURIComponent(`Check out this recipe I found: ${shareUrl}`)}`, '_blank');
          break;
          
        case 'whatsapp':
          window.open(`https://wa.me/?text=${encodeURIComponent(`Check out this recipe: ${title} ${shareUrl}`)}`, '_blank');
          break;
      }
      setIsOpen(false);
    } catch (error) {
      console.error('Error sharing content:', error);
      toast({
        title: "Sharing failed",
        description: "Could not share this recipe",
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className={className}
          aria-label="Share recipe"
          onClick={(e) => e.preventDefault()}
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => handleShare('clipboard')}>
          Copy Link
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare('facebook')}>
          Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare('twitter')}>
          Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare('email')}>
          Email
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare('whatsapp')}>
          WhatsApp
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShareButton;
