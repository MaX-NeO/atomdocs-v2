'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface IconPickerProps {
  selectedIcon?: string;
  onIconSelect: (iconName: string) => void;
}

// 20 most useful icons for documentation
const mostUsefulIcons = [
  'BookOpen',
  'FileText',
  'Settings',
  'Users',
  'Database',
  'Code',
  'Terminal',
  'Globe',
  'Lock',
  'Key',
  'Zap',
  'Shield',
  'Rocket',
  'Heart',
  'Star',
  'CheckCircle',
  'AlertCircle',
  'Info',
  'HelpCircle',
  'Download'
];

export function IconPicker({ selectedIcon, onIconSelect }: IconPickerProps) {
  const [open, setOpen] = useState(false);

  const handleIconSelect = (iconName: string) => {
    onIconSelect(iconName);
    setOpen(false);
  };

  const clearIcon = () => {
    onIconSelect('');
  };

  const SelectedIcon = selectedIcon && (LucideIcons as any)[selectedIcon] 
    ? (LucideIcons as any)[selectedIcon] 
    : null;

  return (
    <div className="space-y-2">
      <Label>Icon (Optional)</Label>
      <div className="flex gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              {SelectedIcon ? (
                <>
                  <SelectedIcon className="h-4 w-4 mr-2" />
                  {selectedIcon}
                </>
              ) : (
                <>
                  <div className="h-4 w-4 mr-2 border border-dashed border-muted-foreground rounded" />
                  Select an icon...
                </>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="start">
            <div className="p-3 border-b">
              <h4 className="font-medium text-sm">Choose an icon</h4>
              <p className="text-xs text-muted-foreground">Select from our most useful icons</p>
            </div>
            <div className="grid grid-cols-5 gap-1 p-3">
              {mostUsefulIcons.map((iconName) => {
                const IconComponent = (LucideIcons as any)[iconName];
                if (!IconComponent) return null;
                
                return (
                  <Button
                    key={iconName}
                    variant="ghost"
                    size="sm"
                    className="h-12 w-12 p-0 hover:bg-accent flex flex-col items-center justify-center gap-1"
                    onClick={() => handleIconSelect(iconName)}
                    title={iconName}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="text-xs truncate w-full text-center">
                      {iconName.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </Button>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>
        
        {selectedIcon && (
          <Button variant="outline" size="icon" onClick={clearIcon}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {selectedIcon && SelectedIcon && (
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <SelectedIcon className="h-3 w-3" />
            {selectedIcon}
          </Badge>
        </div>
      )}
    </div>
  );
}