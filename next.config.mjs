/** @type {import('next').NextConfig} */

const nextConfig = {
  // To generate static pages on build
  output: 'export',

  // Paths for when Hosting on '/spark' ENTC Website
  basePath: '/spark',
  assetPrefix: '/spark',

  webpack: (config) => {
    const rules = config.module.rules
      .find((rule) => typeof rule.oneOf === 'object')
      .oneOf.filter((rule) => Array.isArray(rule.use));
    rules.forEach((rule) => {
      rule.use.forEach((moduleLoader) => {
        if (
          moduleLoader.loader !== undefined &&
          moduleLoader.loader.includes('css-loader') &&
          typeof moduleLoader.options.modules === 'object'
        ) {
          moduleLoader.options = {
            ...moduleLoader.options,
            modules: {
              ...moduleLoader.options.modules,
              // This is where we allow camelCase class names
              exportLocalsConvention: 'camelCase',
            },
          };
        }
      });
    });

    return config;
  },
};

export default nextConfig;
