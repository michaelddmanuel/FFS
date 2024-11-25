'use client';

import { useState } from 'react';

interface SettingsSection {
  title: string;
  description: string;
  fields: {
    label: string;
    type: string;
    value: string;
    options?: { value: string; label: string; }[];
  }[];
}

export default function Settings() {
  const [settings, setSettings] = useState<SettingsSection[]>([
    {
      title: 'Notifications',
      description: 'Manage how you receive notifications and alerts.',
      fields: [
        {
          label: 'Email Notifications',
          type: 'select',
          value: 'all',
          options: [
            { value: 'all', label: 'All notifications' },
            { value: 'important', label: 'Important only' },
            { value: 'none', label: 'None' }
          ]
        },
        {
          label: 'Daily Report Summary',
          type: 'select',
          value: 'enabled',
          options: [
            { value: 'enabled', label: 'Enabled' },
            { value: 'disabled', label: 'Disabled' }
          ]
        }
      ]
    },
    {
      title: 'Display',
      description: 'Customize your display preferences.',
      fields: [
        {
          label: 'Theme',
          type: 'select',
          value: 'system',
          options: [
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'system', label: 'System' }
          ]
        },
        {
          label: 'Date Format',
          type: 'select',
          value: 'MM/DD/YYYY',
          options: [
            { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
            { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
            { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' }
          ]
        }
      ]
    }
  ]);

  const handleSettingChange = (sectionIndex: number, fieldIndex: number, value: string) => {
    const newSettings = [...settings];
    newSettings[sectionIndex].fields[fieldIndex].value = value;
    setSettings(newSettings);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          Settings
        </h1>
      </div>

      <div className="space-y-6">
        {settings.map((section, sectionIndex) => (
          <div key={section.title} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">{section.title}</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{section.description}</p>

              <div className="mt-6 space-y-6">
                {section.fields.map((field, fieldIndex) => (
                  <div key={field.label}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {field.label}
                    </label>
                    <select
                      value={field.value}
                      onChange={(e) => handleSettingChange(sectionIndex, fieldIndex, e.target.value)}
                      className="
                        mt-2 block w-full rounded-xl
                        border-gray-200 dark:border-gray-700
                        bg-white dark:bg-gray-900
                        text-gray-900 dark:text-white
                        shadow-sm focus:border-meta-500 dark:focus:border-meta-400
                        focus:ring-meta-500 dark:focus:ring-meta-400
                      "
                    >
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          className="
            px-4 py-2 rounded-xl
            bg-meta-500 hover:bg-meta-600
            dark:bg-meta-400 dark:hover:bg-meta-500
            text-white font-medium
            transition-colors duration-200
          "
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
