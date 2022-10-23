
type FloatLinkProps = {
  center?: boolean;
  color?: string;
  size?: 'sm' | 'md' | 'xl'
};

export const FloatLink: React.FC<FloatLinkProps> = ({ center, color, size }) => {


  const floatLinkTemp = (
    <div className="w-min">
      <p className={` mb-1 w-max ${size && `text-${size}`} text-${color ?? "gray-500"} `}>
        Already Have an Account?
      </p>
      <div className={` h-0.5 bg-${color ?? "gray-500"}`} />
    </div>
  );

  if (center) {
    return <div className={`flex w-full justify-center `}>{floatLinkTemp}</div>;
  }

  return <>{floatLinkTemp}</>;
};
