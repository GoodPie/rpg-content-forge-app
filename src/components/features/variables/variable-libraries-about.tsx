'use client';

interface VariableLibrariesAboutProps {
  title: string;
  description: string;
  featuresTitle: string;
  features: string[];
}

export function VariableLibrariesAbout({
  title,
  description,
  featuresTitle,
  features,
}: Readonly<VariableLibrariesAboutProps>) {
  return (
    <div className="mt-12 bg-muted p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <p className="mb-4">
        {description}
      </p>
      <h3 className="text-lg font-medium mt-6 mb-2">{featuresTitle}</h3>
      <ul className="list-disc pl-6 space-y-1">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  );
}