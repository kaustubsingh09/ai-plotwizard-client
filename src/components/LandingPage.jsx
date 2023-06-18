import Image from "next/image";
import { BsArrowUpRight } from "react-icons/bs";
import { MdWorkspacePremium } from "react-icons/md";
import Link from "next/link";

export default function LandingPage() {
  const companyName = "Plot Wizard";

  return (
    <div className="flex flex-wrap justify-start mt-15 p-10">
      <div className="flex flex-col gap-1">
        <h1 className="font-bold text-gray-100 text-5xl sm:text-6xl">
          {companyName}
        </h1>

        <p
          style={{ fontSize: "1.2rem" }}
          className=" font-semibold text-gray-400"
        >
          Unleash Your Imagination: Create captivating children's books with{" "}
          <br /> ease using our interactive web app. Craft unique characters,
          design <br /> enchanting settings, and weave magical plots. Harness
          the power of <br /> AI-generated illustrations to bring your stories
          to life. Ignite young <br /> minds and embark on a storytelling
          adventure with our innovative <br /> platform. Start creating today
          and watch your imagination soar!
        </p>

        <div className="flex mt-10 gap-3">
          <Link href="/login" className="btn">
            <div className="flex flex-row gap-1">
              Try {companyName}
              <BsArrowUpRight size={15} />
            </div>
          </Link>
          <button className="btn">
            <div className="flex flex-row gap-1">
              Go Pro
              <MdWorkspacePremium size={15} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
