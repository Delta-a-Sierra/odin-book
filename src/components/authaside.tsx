import { Button } from "./button"
type authasideProps = {
  buttonText: string
  title: string
  body: string
}


export const AuthAside: React.FC<authasideProps> = ({ buttonText, title, body }) => {
  return (
    <aside className="bg-primary  z-10 p-4 hidden md:flex flex-col justify-center items-center gap-y-8  h-full  w-2/6 lg:w-2/6 xl:w-1/4">
      <h1 className="font-open font-extrabold text-white text-3xl text-center">
        {title}
      </h1>
      <p className="text-white font-nunito text-center text-base font-thin tracking-wider">
        {body}
      </p>
      <Button bgColor="accent" textColor='white' text={buttonText} />
    </aside>
  )
}
