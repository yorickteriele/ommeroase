import React from 'react';
import type { TinaCMS, TinaField } from 'tinacms';

export const colorOptions = ['blue', 'teal', 'green', 'yellow', 'orange', 'red', 'pink', 'purple', 'white'];

export const ColorPickerInput = (props: any) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <input
          type="color"
          id={props.input.name}
          value={props.input.value || '#000000'}
          onChange={(e) => props.input.onChange(e.target.value)}
          className="w-20 h-10 rounded border border-gray-200 cursor-pointer"
          style={{ padding: '2px' }}
        />
        <input
          type="text"
          value={props.input.value || ''}
          onChange={(e) => props.input.onChange(e.target.value)}
          placeholder="#000000"
          className="flex-1 px-3 py-2 border border-gray-200 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="text-xs text-gray-500">
        Click the color box to open color picker, or enter hex code manually
      </div>
    </div>
  );
};
