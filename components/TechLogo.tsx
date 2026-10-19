import Icon from './Icon'
const names: Record<string, string> = {
  Django: 'django',
  'Django 6': 'django',
  'ASP.NET Core': 'dotnet',
  'ASP.NET Core 9': 'dotnet',
  'Node.js': 'nodedotjs',
  'Next.js': 'nextdotjs',
  'Next.js 14': 'nextdotjs',
  React: 'react',
  Flutter: 'flutter',
  PostgreSQL: 'postgresql',
  'PostgreSQL 16': 'postgresql',
  MongoDB: 'mongodb',
  SQLite: 'sqlite',
  PyTorch: 'pytorch',
  Git: 'git',
  Docker: 'docker',
  'GitHub Actions': 'githubactions',
  Unity: 'unity',
  'C++': 'cplusplus',
  Java: 'openjdk',
  Python: 'python',
  Jupyter: 'jupyter',
  Dart: 'dart',
  HTML: 'html5',
  CSS: 'css',
  JavaScript: 'javascript',
  Express: 'express',
  EJS: 'ejs',
  Mongoose: 'mongoose',
  TypeScript: 'typescript',
  'Tailwind CSS': 'tailwindcss',
}
export default function TechLogo({
  name,
  size = 22,
}: {
  name: string
  size?: number
}) {
  const slug = names[name]
  if (name.includes('Gemini'))
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 0C12 8 8 12 0 12c8 0 12 4 12 12 0-8 4-12 12-12C16 12 12 8 12 0"
          fill="#5278ff"
        />
      </svg>
    )
  return slug ? (
    <img
      src={`/images/tech/${slug}.svg`}
      width={size}
      height={size}
      alt=""
      style={{ width: size, height: size, objectFit: 'contain', flexShrink: 0 }}
    />
  ) : (
    <Icon
      name={
        name.includes('AES') || name === 'RBAC'
          ? 'lock'
          : name === 'REST API' || name === 'Argon2id'
            ? 'settings'
            : name.includes('LSTM') || name === 'Attention'
              ? 'boxes'
              : name === 'localStorage'
                ? 'database'
                : 'code'
      }
      size={size}
    />
  )
}
