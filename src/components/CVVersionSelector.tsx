import { FileText, X } from 'lucide-react';

type CVVersion = 'developer' | 'ict-support' | 'general';

interface CVVersionSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (version: CVVersion) => void;
}

export function CVVersionSelector({ isOpen, onClose, onSelect }: CVVersionSelectorProps) {
  if (!isOpen) return null;

  const versions = [
    {
      id: 'developer' as CVVersion,
      title: 'Software Developer CV',
      description: 'Focus on development projects, technical skills, and programming experience',
    },
    {
      id: 'ict-support' as CVVersion,
      title: 'ICT Support CV',
      description: 'Emphasis on technical support, systems administration, and user assistance',
    },
    {
      id: 'general' as CVVersion,
      title: 'General ICT CV',
      description: 'Comprehensive view including all competencies and experience',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl max-w-2xl w-full shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Choose CV Version
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {versions.map((version) => (
            <button
              key={version.id}
              onClick={() => {
                onSelect(version.id);
                onClose();
              }}
              className="w-full text-left p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-600 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <FileText className="text-blue-600 dark:text-blue-400 group-hover:text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {version.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {version.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
