import { buttonVariants } from "@/ui/Button";
import Paragraph from "@/ui/Paragraph";
import Icons from "@/components/Icons";
import Link from "next/link";
import LargeHeading from "@src/components/ui/LargeHeading";

const NotFound = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-col gap-2 items-center justify-center">
        <LargeHeading>404!</LargeHeading>
        <Paragraph>{"We Couldn't find the page you asked!"}</Paragraph>
        <Link
          className={buttonVariants({ variant: "ghost", className: "w-fit" })}
          href="/"
        >
          <Icons.ChevronLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
