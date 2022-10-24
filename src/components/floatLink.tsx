
type FloatLinkProps = {
  text: string;
  center?: boolean;
  color?: string;
  size?: "sm" | "md" | "xl";
  href: string
};

export const FloatLink: React.FC<FloatLinkProps> = ({
  center,
  color,
  size,
  text,
  href
}) => {
  const floatLinkTemp = (
    <a href={href} className="w-min">
      <p
        className={` mb-1 w-max  ${size && `text-${size}`} text-${color ?? "gray-500"
          } `}
      >
        {text}
      </p>
      <div className={` h-0.5  bg-${color ?? "gray-500"}`} />
    </a>
  );

  if (center) {
    return <div className={`flex w-full justify-center `}>{floatLinkTemp}</div>;
  }

  return <>{floatLinkTemp}</>;
};
