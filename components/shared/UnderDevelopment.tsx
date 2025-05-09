import React from 'react';
import { Card, CardContent } from '../ui/card';
import { AlertTriangle } from 'lucide-react';

interface UnderDevelopmentProps {
  title: string;
  icon?: React.ReactNode;
  description?: string;
  size?: 'large' | 'medium' | 'small';
  small?: boolean;
  medium?: boolean;
  large?: boolean;
}

export const UnderDevelopment = ({
  title,
  icon,
  description,
  size,
  small,
  medium,
  large,
}: UnderDevelopmentProps) => {
  // Resolve final size: prefer boolean props, fallback to `size`, default to 'large'
  const resolvedSize: 'large' | 'medium' | 'small' =
    small ? 'small' : medium ? 'medium' : large ? 'large' : size || 'large';

  const sizeStyles = {
    large: {
      iconSize: 48,
      iconBox: 'w-24 h-24',
      title: 'text-2xl',
      spacing: 'py-12 px-6',
      desc: true,
    },
    medium: {
      iconSize: 32,
      iconBox: 'w-16 h-16',
      title: 'text-xl',
      spacing: 'py-8 px-4',
      desc: true,
    },
    small: {
      iconSize: 24,
      iconBox: 'w-12 h-12',
      title: 'text-base',
      spacing: 'py-4 px-3',
      desc: false,
    },
  };

  const styles = sizeStyles[resolvedSize];

  return (
    <Card className="border-2 border-dashed border-gray-300 bg-gray-50 text-center h-[83vh] md:h-auto m-2">
      <CardContent className={`flex flex-col items-center justify-center ${styles.spacing}`}>
        {/* Icon */}
        <div className={`rounded-full bg-gray-200 flex items-center justify-center mb-3 ${styles.iconBox}`}>
          {icon &&
            React.isValidElement(icon) &&
            React.cloneElement(
              icon as React.ReactElement<{ size?: number; color?: string }>,
              {
                size: styles.iconSize,
                color: 'gray',
              }
            )}
        </div>

        {/* Title */}
        <h3 className={`${styles.title} font-semibold mb-1`}>{title}</h3>

        {/* Badge */}
        <div className="flex items-center gap-1 mb-2 text-yellow-700 text-xs font-medium uppercase tracking-wide">
          <AlertTriangle size={12} className="inline" />
          Under Development
        </div>

        {/* Optional Description */}
        {styles.desc && (
          <p className="text-sm text-gray-700 max-w-sm">
            {description ||
              'This section is currently under development. Please check back soon.'}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
