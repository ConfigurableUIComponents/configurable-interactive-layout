const buildThemeProperties = (theme, themeProps) => {
  let themingProperties = {};
  if (theme) {
    themingProperties = {
      theme,
      themeCompose: themeProps.compose,
      themePrefix: themeProps.prefix,
    };
  }
  return themingProperties;
};

export default buildThemeProperties;
