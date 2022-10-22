type logoProps = {
  width?: string;
};

export const Logo: React.FC<logoProps> = ({ width }) => {
  return <img width={width ?? "60em"} src="/images/LogoCirc.png" />;
};
