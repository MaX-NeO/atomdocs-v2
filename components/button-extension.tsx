'use client';

import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react';
import { Button } from '@/components/ui/button';
import { Edit, ExternalLink } from 'lucide-react';
import { useState } from 'react';

// Button Node View Component
const ButtonComponent = ({ node, updateAttributes, deleteNode }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(node.attrs.text || 'Button');
  const [url, setUrl] = useState(node.attrs.url || '');
  const [variant, setVariant] = useState(node.attrs.variant || 'default');
  const [size, setSize] = useState(node.attrs.size || 'default');

  const handleSave = () => {
    updateAttributes({
      text,
      url,
      variant,
      size,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setText(node.attrs.text || 'Button');
    setUrl(node.attrs.url || '');
    setVariant(node.attrs.variant || 'default');
    setSize(node.attrs.size || 'default');
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <NodeViewWrapper className="inline-block">
        <div className="border rounded-lg p-4 bg-background shadow-sm space-y-3 min-w-[300px]">
          <div>
            <label className="text-sm font-medium">Button Text</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
              placeholder="Enter button text"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">URL (optional)</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
              placeholder="https://example.com"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Style</label>
              <select
                value={variant}
                onChange={(e) => setVariant(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
              >
                <option value="default">Default</option>
                <option value="secondary">Secondary</option>
                <option value="outline">Outline</option>
                <option value="destructive">Destructive</option>
                <option value="ghost">Ghost</option>
                <option value="link">Link</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Size</label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
              >
                <option value="sm">Small</option>
                <option value="default">Default</option>
                <option value="lg">Large</option>
              </select>
            </div>
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button size="sm" variant="destructive" onClick={deleteNode}>
              Delete
            </Button>
          </div>
        </div>
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper className="inline-block">
      <div className="relative group">
        <Button
          variant={variant as any}
          size={size as any}
          onClick={(e) => {
            e.preventDefault();
            if (url) {
              window.open(url, '_blank');
            }
          }}
          className="cursor-pointer"
        >
          {text}
          {url && <ExternalLink className="ml-2 h-3 w-3" />}
        </Button>
        
        <button
          onClick={() => setIsEditing(true)}
          className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-primary-foreground rounded-full p-1 text-xs"
          title="Edit button"
        >
          <Edit className="h-3 w-3" />
        </button>
      </div>
    </NodeViewWrapper>
  );
};

// TipTap Button Extension
export const ButtonExtension = Node.create({
  name: 'customButton',
  
  group: 'inline',
  
  inline: true,
  
  atom: true,
  
  addAttributes() {
    return {
      text: {
        default: 'Button',
      },
      url: {
        default: '',
      },
      variant: {
        default: 'default',
      },
      size: {
        default: 'default',
      },
    };
  },
  
  parseHTML() {
    return [
      {
        tag: 'custom-button',
      },
    ];
  },
  
  renderHTML({ HTMLAttributes }) {
    return ['custom-button', mergeAttributes(HTMLAttributes)];
  },
  
  addNodeView() {
    return ReactNodeViewRenderer(ButtonComponent);
  },
  
  addCommands() {
    return {
      setButton: (options: any) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: options,
        });
      },
    };
  },
});